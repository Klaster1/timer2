import 'rxjs/add/operator/pluck'
import 'rxjs/add/operator/combineLatest'
import {Component} from '@angular/core'
import template from './template.html!text'
import {GamesService} from 'a2/services/games'
import style from './style.css!text'
import {ActivatedRoute} from '@angular/router'

@Component({
	selector: 'games-list',
	template,
	styles: [style]
})
export default class GamesList {
	constructor(gamesService: GamesService, route: ActivatedRoute) {
		Object.assign(this, {gamesService, route})
		this.states = gamesService.states
	}
	ngOnInit() {
		const $state = this.route.params
			.pluck('state')
			.do(state => {
				this.state = this.gamesService.states.find(i => i.id === state) || {name: 'All'}
			})

		const $allGames = this.gamesService.games$
			.map(games => games.slice().reverse().map(game => Object.assign({}, game, {
				total: game.sessions.reduce((a, s) => a + (s.stop - s.start), 0)
			})))

		this.$stateGames = $allGames.combineLatest($state, (games, state) => {
			if (!state || state === 'all') {
				return games
			} else {
				return games.filter(game => game.state === state)
			}
		})
		.do(games => this.games = games)
		.subscribe()
	}
	ngOnDestroy() {
		this.$stateGames.unsubscribe()
	}
	addGame(title = prompt('Title')) {
		if (title) this.gamesService.addGame(title)
	}
	setGameState(game, state) {
		this.gamesService.setGameState(game, state)
	}
	startGame(game) {
		this.gamesService.startGame(game)
	}
	stopGame(game) {
		this.gamesService.stopGame(game)
	}
}