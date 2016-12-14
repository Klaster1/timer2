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
	EventEmitter
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
	]
})
export default class GameDetail {
	@Input() game
	@Output() onClose = new EventEmitter()
	constructor(games: GamesService){
		Object.assign(this, {games})
	}
	ngOnInit() {
		this.states = this.games.states
	}
	setGameState(game, state) {
		this.games.setGameState(game, state)
	}
	startGame(game) {
		this.games.startGame(game)
	}
	stopGame(game) {
		this.games.stopGame(game)
	}
	isRunning(game) {
		if (!game) return
		const lastSession = game.sessions[game.sessions.length - 1]
		return lastSession && !lastSession.stop
	}
	close() {
		this.onClose.emit()
	}
}