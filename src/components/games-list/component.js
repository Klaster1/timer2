import 'rxjs/add/operator/pluck'
import 'rxjs/add/operator/combineLatest'
import {
	Component,
	Input,
	Output,
	EventEmitter,
	ChangeDetectionStrategy
} from '@angular/core'
import template from './template.html!text'
import {GamesService} from 'a2/services/games'
import style from './style.css!text'
import {ActivatedRoute} from '@angular/router'

@Component({
	selector: 'games-list',
	template,
	styles: [style],
	// changeDetection: ChangeDetectionStrategy.OnPush
})
export default class GamesList {
	@Input() games
	@Input() state
	@Output() onGameAdd = new EventEmitter()
	@Output() onGameClick = new EventEmitter()
	constructor(gamesService: GamesService, route: ActivatedRoute) {
		Object.assign(this, {gamesService, route})
		this.states = gamesService.states
	}
	addGame($event) {
		this.onGameAdd.emit()
	}
	gameClick(game) {
		this.onGameClick.emit(game)
	}
}