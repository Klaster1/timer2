import {
	Directive,
	Input,
	ElementRef,
	TemplateRef,
	ViewContainerRef,
	IterableDiffers,
	ChangeDetectorRef,
} from '@angular/core'
import {Observable, Subject} from 'rxjs'
import {NUM_EXTRA} from './constants'

export class MdVirtualRepeatRow {
	constructor($implicit, index, count) {
		Object.assign(this, {$implicit, index, count})
	}
	get first() {
		return this.index === 0
	}
	get last() {
		return this.index === this.count - 1
	}
	get even() {
		return this.index % 2 === 0
	}
	get odd() {
		return !this.even
	}
}

class RecordViewTuple {
	constructor(record, view) {
		Object.assign(this, {record, view})
	}
}

@Directive({
	selector: '[mdVirtualRepeat][mdVirtualRepeatOf]'
})
export class MdVirtualRepeat {
	@Input('mdVirtualRepeatOf') items
	@Input('mdVirtualRepeatItemSize') itemSize = null
	@Input('mdVirtualRepeatTrackBy') trackBy
	constructor(
		$element: ElementRef,
		_template: TemplateRef,
		_viewContainer: ViewContainerRef,
		_differs: IterableDiffers,
		_cdr: ChangeDetectorRef
	) {
		Object.assign(this, {
			$element,
			_template,
			_viewContainer,
			_differs,
			_cdr
		})
		this.newStartIndex = 0
		
		this.newEndIndex = 0
		// this.newVisibleEnd = 0
		this.startIndex = 0
		this.endIndex = 0
		// this.isFirstRender = true
		// this.isVirtualRepeatUpdating_ = false
		// this.itemsLength = 0
		// this.blocks = {}
		// this.pooledBlocks = []
	}
	ngOnDestroy() {
		this.cleanupBlocks_()
	}
	ngOnInit() {
		this.sized = false

	}
	ngOnChanges(changes) {
		console.debug(changes)
		if ('items' in changes) {
			const value = changes.items.currentValue
			if (!this._differ && value) {
				try {
					this._differ = this._differs.find(value).create(this._cdr, this.trackBy)
				} catch (e) {
					throw new Error(`Cannot find a differ supporting object '${value}'`)
				}
			}
			if (value && !this.isVirtualRepeatUpdating_) {
				this.virtualRepeatUpdate_(value, changes.items.previousValue)
			}
		}
	}
	ngDoCheck() {
		if (this._differ) {
			const changes = this._differ.diff(this.items)
			if (changes) this._applyChanges(changes)
		}
	}
	_applyChanges(changes) {
		console.debug(changes)
		const insertTuples = []
		changes.forEachOperation((item, adjustedPreviousIndex, currentIndex) => {
			if (item.previousIndex == null) {
				const view = this._viewContainer.createEmbeddedView(
					this._template,
					new MdVirtualRepeatRow(null, null, null),
					currentIndex
				)
				const tuple = new RecordViewTuple(item, view)
				insertTuples.push(tuple)
			} else if (currentIndex == null) {
				this._viewContainer.remove(adjustedPreviousIndex)
			} else {
				const view = this._viewContainer.get(adjustedPreviousIndex)
				this._viewContainer.move(view, currentIndex)
				const tuple = new RecordViewTuple(item, view)
				insertTuples.push(tuple)
			}
		})

		for (let i = 0; i < insertTuples.length; i++) {
			this._perViewChange(insertTuples[i].view, insertTuples[i].record)
		}

		for (let i = 0, ilen = this._viewContainer.length; i < ilen; i++) {
			const viewRef = this._viewContainer.get(i)
			viewRef.context.index = i
			viewRef.context.count = ilen
		}

		changes.forEachIdentityChange(record => {
			const viewRef = this._viewContainer.get(record.currentIndex)
			viewRef.context.$implicit = record.item
		})
	}
	_perViewChange(view, record) {
		view.context.$implicit = record.item
	}
	cleanupBlocks_() {

	}
	containerUpdated() {
		// Here be $watches
		this.updateIndexes_()

		if (
			this.newStartIndex !== this.startIndex ||
			this.newEndIndex !== this.endIndex ||
			this.container.getScrollOffset() > this.container.getScrollSize()
		) {
			this.virtualRepeatUpdate_(this.items, this.items)
		}

		console.debug('containerUpdated')
		console.debug(this)
	}
	virtualRepeatUpdate_(items, oldItems) {
		this.isVirtualRepeatUpdating_ = true

		const itemsLength = items && items.length || 0
		const lengthChanged = false

/*		if (this.items && itemsLength < this.items.length && this.container.getScrollOffset() !== 0) {
			// this.items = items
			const previousScrollOffset = this.container.getScrollOffset()
			this.container.resetScroll()
			this.container.scrollTo(previousScrollOffset)
		}
*/

		this.container.setScrollSize(items.length * this.itemSize)

		this.isVirtualRepeatUpdating_ = false
	}
	updateIndexes_() {
		const itemsLength = this.items ? this.items.length : 0
		const containerLength = Math.ceil(this.container.getSize() / this.itemSize)

		this.newStartIndex = Math.max(0, Math.min(
			itemsLength - containerLength,
			Math.floor(this.container.getScrollOffset() / this.itemSize)
		))
		this.newVisibleEnd = this.newStartIndex + containerLength + NUM_EXTRA
		this.newEndIndex = Math.min(itemsLength, this.newVisibleEnd)
		this.newStartIndex = Math.max(0, this.newStartIndex - NUM_EXTRA)
	}
	readItemSize_() {
		if (this.itemSize) {
			return
		}

	}
	getItemSize() {
		return this.itemSize
	}
	getItemCount() {
		return this.items.length
	}
}