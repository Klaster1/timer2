import {
	Component,
	HostBinding,
	trigger,
	state,
	transition,
	style,
	animate
} from '@angular/core'
// import {Subject} from 'rxjs'
import {GameSessionItem} from '../game-session-item/component'
import {GamesService} from 'a2/services/games'
// import {StateService} from 'ui-router-ng2'
// import {DurationPipe} from 'a2/pipes/duration'
import template from './template.html!text'
import getSlug from 'speakingurl'
import styles from './style.css!text'
import {Router, ActivatedRoute} from '@angular/router'
import 'rxjs/add/operator/mergeMap'

@Component({
	selector: 'game-detail',
	template,
	directives: [GameSessionItem],
	styles: [styles],
	// pipes: [DurationPipe],
	// providers: [HotkeysService],
	host: {
		// 'hotkeys': 'hotkeys'
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
	constructor(games: GamesService, route: ActivatedRoute, router: Router){
		Object.assign(this, {games, route, router})
	}
	ngOnInit() {
		this.states = this.games.states
		this.subscription = this.route.params
		.flatMap(params => {
			this.state = params.state
			return this.games.getByID(params.id)
		})
		.do(game => {
			if (game) {
				this.game = game
			} else {
				this.close()
			}
		})
		.subscribe()
	}
	ngOnDestroy() {
		this.subscription.unsubscribe()
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
		this.router.navigate([
			'/games',
			{outlets: {
				detail: null
			}}
		])
	}
}