import {
	Component,
	Directive,
	HostBinding,
	Input,
	ViewChildren,
	ViewChild,
	ContentChild,
	ElementRef,
	EventEmitter,
	Output,
	HostListener,
} from '@angular/core'
import {Observable, Subject} from 'rxjs'
import {MdVirtualRepeat} from './repeater'
import style from './style.css!text'
import template from './container.html!text'
import {NUM_EXTRA, ELEMENT_MAX_PIXELS} from './constants'

@Component({
	selector: 'md-virtual-repeat-container',
	template,
	styles: [style]
})
export class MdVirtualRepeatContainer {
	@ViewChild('scroller') scroller
	@ViewChild('sizer') sizer
	@ViewChild('offsetter') offsetter
	@Input('md-orient-horizontal') horizontal
	@Input() autoShrink
	@Input('md-auto-shrink-min') autoShrinkMin = 0
	@Input('md-offset-size') offsetSize = 0
	@Output() $mdResizeEnable = new EventEmitter
	@HostBinding('class') mdOrient = 'md-orient-vertical'
	constructor($element: ElementRef) {
		Object.assign(this, {$element})

		this.size = 0
		this.scrollSize = 0
		this.scrollOffset = 0
		this.repeater = null
		this.originalSize = null
		this.oldElementSize = null
		this.maxElementPixels = ELEMENT_MAX_PIXELS
	}
	@ContentChild(MdVirtualRepeat)
	set repeater(value) {
		this._repeater = value
		if (value) value.container = this
	}
	get repeater() {
		return this._repeater
	}
	@Output() topIndexChange = new EventEmitter
	@Input() topIndex
	@HostListener('window:resize', ['$event'])
	@HostListener('$mdResize', ['$event'])
	onResize(e) {
		this.sizeUpdates$.next(e)
	}
	ngOnInit() {
		if (!this.topIndex) this.topIndex = 0
	}
	ngAfterViewInit() {
		requestAnimationFrame(() => {
			this.updateSize()

			this.sizeUpdates$ = new Subject

			this.sizeUpdates$
				.debounceTime(10)
				.do(() => this.updateSize())
				.subscribe()

			this.sizeUpdates$.next(true)
			this.$mdResizeEnable.emit()
		})
		
	}
	ngOnChanges(changes) {
		if (changes.horizontal) {
			this.mdOrient = changes.horizontal.currentValue
				? 'md-orient-horizontal'
				: 'md-orient-vertical'
		}
		if (changes.topIndex) {
			const {currentValue, previousValue} = changes.topIndex
			if (currentValue !== previousValue) {
				this.scrollToIndex(currentValue)
			}
		}
	}
	ngOnDestroy() {
		this.sizeUpdates$.unsubscribe()
	}
	scrollToIndex(index) {
		console.debug(`scrollToIndex: ${index}`)
	}
	isHorizontal() {
		return this.horizontal
	}
	getSize() {
		return this.size
	}
	setSize_(size) {
		const dimension = this.getDimensionName_()

		this.size = size
		this.$element.style[dimension] = `${size}px`
	}
	unsetSize_() {
		this.$element.style[this.getDimensionName_()] = this.oldElementSize
		this.oldElementSize = null
	}
	updateSize() {
		if (this.originalSize) return

		this.size = this.isHorizontal()
			? this.$element.nativeElement.clientWidth
			: this.$element.nativeElement.clientHeight

		this.handleScroll_()

		this.repeater && this.repeater.containerUpdated()
	}
	getScrollSize() {
		return this.scrollSize
	}
	getDimensionName_() {
		return this.isHorizontal() ? 'width' : 'height'
	}
	sizeScroller_(size) {
		const dimension = this.getDimensionName_()
		const crossDimension = this.isHorizontal() ? 'height' : 'width'

		this.sizer.nativeElement.innerHTML = ''

		if (size < this.maxElementPixels) {
			this.sizer.nativeElement.style[dimension] = `${size}px`
		} else {
			this.sizer.nativeElement.style[dimension] = 'auto'
			this.sizer.nativeElement.style[crossDimension] = 'auto'

			const numChildren = Math.floor(size / this.maxElementPixels)
			const sizerChild = document.createElement('div')
			sizerChild.style[dimension] = `${this.maxElementPixels}px`
			sizerChild.style[crossDimension] = '1px'

			for (let i = 0; i < numChildren; i++) {
				this.sizer.nativeElement.appendChild(sizerChild.cloneNode(false))
			}

			sizerChild.style[dimension] = `${(size - (numChildren * this.maxElementPixels))}px`
			this.sizer.nativeElement.appendChild(sizerChild)
		}
	}
	autoShrink_(size) {
		const shrinkSize = Math.max(size, this.autoShrinkMin * this.repeater.getItemSize())

		if (this.autoShrink && shrinkSize !== this.size) {
			if (this.oldElementSize === null) {
				this.oldElementSize = this.$element.nativeElement.style[this.getDimensionName_()]
			}

			const currentSize = this.originalSize || this.size

			if (!currentSize || shrinkSize < currentSize) {
				if (!this.originalSize) {
					this.originalSize = this.size
				}

				this.setSize_(shrinkSize)
			} else if (this.originalSize !== null) {
				this.unsetSize_()

				const _originalSize = this.originalSize
				this.originalSize = null

				if (!_originalSize) this.updateSize()

				this.setSize_(_originalSize || this.size)
			}

			this.repeater.containerUpdated()
		}
	}
	setScrollSize(itemsSize) {
		const size = itemsSize + this.offsetSize
		if (this.scrollSize === size) return

		this.sizeScroller_(size)
		this.autoShrink_(size)
		this.scrollSize = size
	}
	getScrollOffset() {
		return this.scrollOffset
	}
	scrollTo(position) {
		this.scroller.nativeElement[this.isHorizontal() ? 'scrollLeft' : 'scrollTop'] = position
		this.handleScroll_()
	}
	scrollToIndex(index) {
		const itemsSize = this.repeater.getItemSize()
		const itemsLength = this.repeater.itemsLength
		if (index > itemsLength) {
			index = itemsLength - 1
		}
		this.scrollTo(itemsSize * index)
	}
	resetScroll() {
		this.scrollTo(0)
	}
	handleScroll_() {
		const ltr = document.dir != 'rtl' && document.body.dir !== 'rtl'
		if (!ltr && this.maxSize) {
			this.scroller.nativeElement.scrollLeft = this.scrollSize
			this.maxSize = this.scroller.nativeElement.scrollLeft
		}
		const offset = this.isHorizontal() ?
			(ltr ? this.scroller.nativeElement.scrollLeft : this.maxSize - this.scroller.nativeElement.scrollLeft)
			: this.scroller.nativeElement.scrollTop
		if (offset === this.scrollOffset || offset > this.scrollSize - this.size) return

		const itemSize = this.repeater.getItemSize()
		if (!itemSize) return

		const numItems = Math.max(0, Math.floor(offset / itemSize) - NUM_EXTRA)

		const transform = (this.isHorizontal() ? 'translateX(' : 'translateY(') +
			(!this.isHorizontal() || ltr ? (numItems * itemSize) : - (numItems * itemSize)) + 'px)'
		
		this.scrollOffset = offset
		this.offsetter.nativeElement.style.webkitTransform = transform
		this.offsetter.nativeElement.style.transform = transform

		{
			const topIndex = Math.floor(offset / itemSize)
			if (topIndex !== this._topIndex && topIndex < this.repeater.getItemCount()) {
				this.topIndex = topIndex
				this.topIndexChange.emit(topIndex)
			}
		}

		this.repeater.containerUpdated()
	}
}