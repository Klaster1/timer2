import {
	Component,
	Input,
	Output,
	EventEmitter,
	ChangeDetectionStrategy,
} from '@angular/core'
import template from './template.html!text'
import style from './style.css!text'

@Component({
	selector: 'games-list-item',
	template,
	styles: [style],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export default class GamesListItem {
	@Input() isCurrent
	@Input() game
	@Output() onGameClick = new EventEmitter()
	gameClick(game) {
		this.onGameClick.emit(game)
	}
	ngOnChanges(changes) {
		if ('game' in changes) {
			const game = changes.game.currentValue
			this.isRunning = game && game.sessions.length && !game.sessions[game.sessions.length - 1].stop
		}
	}
}