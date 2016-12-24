import {
	Component,
	Input,
	Output,
	EventEmitter,
	ChangeDetectionStrategy,
} from '@angular/core'
import {GamesService} from 'a2/services'
import template from './template.html!text'
import styles from './style.css!text'
import moment from 'moment'
import {ReplaySubject, Observable} from 'rxjs'

@Component({
	selector: 'game-detail',
	template,
	styles: [styles],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export default class GameDetail {
	@Input() game
	@Output() onClose = new EventEmitter()
	@Output() onGameStartStop = new EventEmitter
	@Output() onGameStateChange = new EventEmitter
	constructor(gamesService: GamesService){
		this.states = gamesService.states
		this._sessions = new ReplaySubject(1)
		this.sessions$ = Observable.of(null)
			.delay(200)
			.flatMap(() => this._sessions)
			.map(value => value.slice().reverse())
	}
	ngOnChanges(changes) {
		if (changes.game) {
			this._sessions.next(changes.game.currentValue.sessions || [])
		}
	}
	startStopGame(game) {
		this.onGameStartStop.emit(game)
	}
	changeGameState(game, state) {
		this.onGameStateChange.emit({game, state})
	}
	isRunning(game) {
		if (!game) return
		const lastSession = game.sessions[game.sessions.length - 1]
		return lastSession && !lastSession.stop
	}
	close() {
		this.onClose.emit()
	}
	get sessions() {
		return (this.game?this.game.sessions:[]).slice().reverse()
	}
	trackBy(index, item) {
		return item.start
	}
}