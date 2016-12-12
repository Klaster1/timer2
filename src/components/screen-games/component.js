import {Component} from '@angular/core'
import template from './template.html!text'
import {GamesListItem} from '../games-list-item/component'
import {GamesService} from 'a2/services/games'

@Component({
	selector: 'screen-games',
	template,
	directives: [GamesListItem],
})
export default class ScreenGames {
	constructor(gamesService: GamesService) {
		this.gamesService = gamesService
		this.games = gamesService.games$
			.map(games => games.slice().reverse().map(game => Object.assign({}, game, {
				total: game.sessions.reduce((a, s) => a + (s.stop - s.start), 0)
			})))
	}
	addGame(title) {
		this.gamesService.addGame(title)
	}
	renameGame(game) {
		this.gamesService.renameGame(game)
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