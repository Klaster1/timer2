import {
	Component,
	Input,
	Output,
	EventEmitter,
	ChangeDetectionStrategy,
	HostListener,
	ViewChild,
	AfterViewInit
} from '@angular/core'
import template from './template.html!text'
import style from './style.css!text'
import {MdMenuTrigger} from '@angular/material'

@Component({
	selector: 'games-list-item',
	template,
	styles: [style],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export default class GamesListItem {
	@Input() game
	@Input() states
	@Output() onRenamed = new EventEmitter
	@Output() onStateSet = new EventEmitter
	@Output() onRemoved = new EventEmitter
	@Output() onStarted = new EventEmitter
	@Output() onStopped = new EventEmitter
	@ViewChild(MdMenuTrigger) menu
	rename(game) {
		this.onRenamed.emit(game)
	}
	setState(game, state) {
		this.onStateSet.emit({game, state})
	}
	remove(game) {
		this.onRemoved.emit(game)
	}
	start(game) {
		this.onStarted.emit(game)
	}
	stop(game) {
		this.onStopped.emit(game)
	}
	@HostListener('contextmenu', ['$event'])
	onClick(e) {
		e.preventDefault()
		console.debug(e, this.menu)
		this.menu.openMenu()
	}
	getIcon(state) {
		const s = this.states.find(s => s.id === state)
		if (s) return s.icon
	}
}