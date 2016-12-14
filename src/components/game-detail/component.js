import {
	Component,
	HostBinding,
	trigger,
	state,
	transition,
	style,
	animate,
	Input,
	Output,
	EventEmitter,
	ChangeDetectionStrategy,
} from '@angular/core'
import {GamesService} from 'a2/services/games'
import template from './template.html!text'
import styles from './style.css!text'

@Component({
	selector: 'game-detail',
	template,
	styles: [styles],
	host: {
		'[@routeAnimation]': 'true'
	},
	animations: [
		trigger('routeAnimation', [
			state('*', style({
				transform: 'translateX(0%)'
			})),
			state('void', style({
				transform: 'translateX(100%)'
			})),
			transition('void => *', [
				animate(100)
			]),
			transition('* => void', [
				animate(100)
			]),
		])
	],
	// changeDetection: ChangeDetectionStrategy.OnPush
})
export default class GameDetail {
	@Input() game
	@Output() onClose = new EventEmitter()
	@Output() onGameStart = new EventEmitter
	@Output() onGameStop = new EventEmitter
	@Output() onGameStateChange = new EventEmitter
	constructor(gamesService: GamesService){
		Object.assign(this, {gamesService})
	}
	ngOnInit() {
		this.states = this.gamesService.states
	}
	startGame(game) {
		this.onGameStart.emit(game)
	}
	stopGame(game) {
		this.onGameStop.emit(game)
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
		return (this.game.sessions||[]).slice().reverse()
	}
}