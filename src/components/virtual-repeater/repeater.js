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
		this.newVisibleEnd = 0
		this.startIndex = 0
		this.endIndex = 0
		this.visibleItems = []
		this.isVirtualRepeatUpdating_ = false
	}
	ngOnInit() {
		this.sized = false
	}
	ngOnChanges(changes) {
		if ('items' in changes) {
			const value = changes.items.currentValue
			if (!this._differAll && value) {
				try {
					this._differAll = this._differs.find(value).create(this._cdr, this.trackBy)
				} catch (e) {
					throw new Error(`Cannot find a differ supporting object '${value}'`)
				}
			}
			if (!this._differVisible && value) {
				try {
					this._differVisible = this._differs.find(this.visibleItems).create(this._cdr, this.trackBy)
				} catch (e) {
					throw new Error(`Cannot find a differ supporting object '${value}'`)
				}
			}
		}
	}
	ngDoCheck() {
		if (this._differAll) {
			const changes = this._differAll.diff(this.items)
			if (changes) {
				this.itemsUpdate_(changes)
			}
		}
		if (this._differVisible && !this.isVirtualRepeatUpdating_) {
			const changes = this._differVisible.diff(this.visibleItems)
			if (changes) {
				this.virtualRepeatUpdate_(changes)
			}
		}
	}
	itemsUpdate_(changes) {
		this.updateIndexes_()
		this.sliceVisibleItems_(this.newStartIndex, this.newEndIndex)

		let addedItems = 0, removedItems = 0

		changes.forEachAddedItem(() => addedItems += 1)
		changes.forEachRemovedItem(() => removedItems += 1)

		const lengthChange = addedItems - removedItems
		const lengthChanged = lengthChange !== 0
		const lengthShrank = lengthChange < 0
		const lengthGrew = lengthChange > 0

		if (lengthShrank) {
			const previousScrollOffset = this.container.getScrollOffset()
			this.container.resetScroll()
			this.container.scrollTo(previousScrollOffset)
		}

		if (lengthChanged) {
			this.container.setScrollSize(this.items.length * this.itemSize)
		}
	}
	_applyChanges(changes) {
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
	sliceVisibleItems_(start = 0, end = 0) {
		// console.time('slice')
		const itemsToInsert = this.items.slice(start, end)
		this.visibleItems.splice(0, this.visibleItems.length, ...itemsToInsert)
		// console.timeEnd('slice')
	}
	containerUpdated() {
		if (!this.items || !this._differVisible) return
		this.updateIndexes_()

		if (
				this.newStartIndex !== this.startIndex ||
				this.newEndIndex !== this.endIndex
		) {
			this.sliceVisibleItems_(this.newStartIndex, this.newEndIndex)
			const changes = this._differVisible.diff(this.visibleItems)
			if (changes) this.virtualRepeatUpdate_(changes)
		}

	}
	virtualRepeatUpdate_(changes) {
		this.isVirtualRepeatUpdating_ = true

		// console.debug(`start: ${this.startIndex} -> ${this.newStartIndex}`)
		// console.debug(`end: ${this.endIndex} -> ${this.newEndIndex}`)

		const itemsLength = this.items && this.items.length || 0
		const lengthChanged = false

		this.container.setScrollSize(this.items.length * this.itemSize)

		this._applyChanges(changes)


		this.startIndex = this.newStartIndex
		this.endIndex = this.newEndIndex
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
	getItemSize() {
		return this.itemSize
	}
	getItemCount() {
		return this.items.length
	}
}