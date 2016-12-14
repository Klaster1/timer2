import {Component} from '@angular/core'
import template from './template.html!text'
import style from './style.css!text'
import {GamesService} from 'a2/services/games'
import {speakingurl} from 'a2/services/speakingurl'
import {ActivatedRoute, Router} from '@angular/router'
import {Observable} from 'rxjs'

@Component({
	selector: 'screen-games',
	template,
	styles: [style]
})
export default class ScreenGames {
	constructor(speakingurl: speakingurl, gamesService: GamesService, route: ActivatedRoute, router: Router) {
		Object.assign(this, {speakingurl, gamesService, route, router})
	}
	ngOnInit() {
		this.state$ = this.route.params
			.pluck('state')
			.map(state => {
				const foundState = this.gamesService.states.find(i => i.id === state)
				const defaultState = {name: 'All', id: 'all'}
				return foundState || defaultState
			})

		const allGames$ = this.gamesService.games$
			.map(games => games.slice().reverse().map(game => Object.assign({}, game, {
				total: game.sessions.reduce((a, s) => a + (s.stop - s.start), 0)
			})))

		this.game$ = this.route.params
			.pluck('id')
			.flatMap(id => {
				if (id) {
					return this.gamesService.getByID(id)
				} else {
					return Observable.of(null)
				}
			})

		this.stateGames$ = allGames$.combineLatest(this.state$, (games, state) => {
			if (state.id === 'all') {
				return games
			} else {
				return games.filter(game => game.state === state.id)
			}
		})
	}
	addGame(title = prompt('Title')) {
		if (title) {
			this.gamesService.addGame(title)
			this.gamesService.games$.take(1).map(games => {
				return games[games.length - 1]
			}).do(game => {
				this.router.navigate(['games', 'active', game.id], {
					queryParams: {
						slug: this.speakingurl.getSlug(game.title)
					}
				})
			}).subscribe()
		}
	}
	startGame(game) {
		this.gamesService.startGame(game)
	}
	stopGame(game) {
		this.gamesService.stopGame(game)
	}
	setGameState({game, state}) {
		this.gamesService.setGameState(game, state)
	}
	openGame(game) {
		this.state$.take(1).do(state => {
			this.router.navigate(['games', state.id, game.id], {
				queryParams: {
					slug: this.speakingurl.getSlug(game.title)
				}
			})
		}).subscribe()
	}
	closeGame() {
		this.state$.take(1).do(state => {
			this.router.navigate(['games', state.id])
		}).subscribe()
	}
}