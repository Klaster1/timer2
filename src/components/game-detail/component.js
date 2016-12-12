import {Component} from '@angular/core'
// import {Subject} from 'rxjs'
import {GameSessionItem} from '../game-session-item/component'
import {GamesService} from 'a2/services/games'
// import {StateService} from 'ui-router-ng2'
// import {DurationPipe} from 'a2/pipes/duration'
import template from './template.html!text'
import getSlug from 'speakingurl'
import style from './style.css!text'
import {Router, ActivatedRoute} from '@angular/router'
import 'rxjs/add/operator/mergeMap'

@Component({
	selector: 'game-detail',
	template,
	directives: [GameSessionItem],
	styles: [style],
	// pipes: [DurationPipe],
	// providers: [HotkeysService],
	host: {
		'hotkeys': 'hotkeys'
	}
})
export default class GameDetail {
	constructor(games: GamesService, route: ActivatedRoute, router: Router){
		Object.assign(this, {games, route, router})
	}
	goToGames() {
		this.router.navigate(['/games'])
	}
	ngOnInit() {
		this.states = this.games.states
		this.subscription = this.route.params
		.flatMap(params => {
			this.state = params.state
			return this.games.getByID(params.id)
		})
		.do(game => {
			this.game = game
		})
		.subscribe()
	}
	ngOnDestroy() {
		this.subscription.unsubscribe()
	}
	renameGame(game) {
		this.games.renameGame(game, prompt('Title', game.title))
		this.router.navigate(['/games/game', this.game.id, getSlug(this.game.title)])
	}
	removeGame(game) {
		this.games.removeGame(game)
		this.goToGames()
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
}