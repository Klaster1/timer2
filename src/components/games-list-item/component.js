import {
	Component,
	Input,
	Output,
	EventEmitter,
	ChangeDetectionStrategy
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
	@Output() onGameClick = new EventEmitter()
	getIcon(state) {
		const s = this.states.find(s => s.id === state)
		if (s) return s.icon
	}
	gameClick(game) {
		this.onGameClick.emit(game)
	}
}