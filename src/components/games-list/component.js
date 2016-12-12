import 'rxjs/add/operator/pluck'
import 'rxjs/add/operator/combineLatest'
import {Component} from '@angular/core'
import template from './template.html!text'
import {GamesListItem} from '../games-list-item/component'
import {GamesService} from 'a2/services/games'
import style from './style.css!text'
import {ActivatedRoute} from '@angular/router'

@Component({
	selector: 'games-list',
	template,
	directives: [GamesListItem],
	styles: [style]
})
export default class GamesList {
	constructor(gamesService: GamesService, route: ActivatedRoute) {
		Object.assign(this, {gamesService, route})
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
	}
	addGame(title = prompt('Title')) {
		if (title) this.gamesService.addGame(title)
	}
	renameGame(game) {
		const title = prompt('Title', game.title)
		if (title) this.gamesService.renameGame(game, title)
	}
	removeGame(game) {
		this.gamesService.removeGame(game)
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