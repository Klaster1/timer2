import {
	Input,
	Component,
	ChangeDetectionStrategy
} from '@angular/core'
import template from './template.html!text'
import {GamesService} from 'a2/services'
import style from './style.css!text'

@Component({
	selector: 'game-state-icon',
	template,
	changeDetection: ChangeDetectionStrategy.OnPush,
	styles: [style]
})
export class GameStateIcon {
	@Input() state
	constructor(games: GamesService) {
		Object.assign(this, {games})
	}
	getIcon(state) {
		const s = this.games.states.find(s => s.id === state)
		return s ? s.icon : 'error'
	}
}