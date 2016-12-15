import 'rxjs/add/operator/share'
import {
	Component,
	trigger,
	state,
	transition,
	style,
	animate
} from '@angular/core'
import template from './template.html!text'
import styles from './style.css!text'
import {GamesService} from 'a2/services/games'
import {speakingurl} from 'a2/services/speakingurl'
import {LayoutService} from 'a2/services/layout'
import {ActivatedRoute,	Router} from '@angular/router'
import {Observable, BehaviorSubject} from 'rxjs'

@Component({
	selector: 'screen-games',
	template,
	styles: [styles],
	animations: [
		trigger('appear', [
			state('opened-big', style({
				transform: 'translateX(0%)',
				opacity: '1'
			})),
			state('opened-small', style({
				transform: 'translateX(0%)',
				opacity: '1'
			})),
			state('void', style({
				transform: 'translateX(100%)',
				opacity: '0'
			})),
			transition('void <=> *', [
				animate(200)
			])
		]),
		trigger('move', [
			state('opened-big', style({
				transform: 'translateX(0%)'
			})),
			state('opened-small', style({
				transform: 'translateX(-50%)'
			})),
			state('closed-big', style({
				transform: 'translateX(50%)'
			})),
			state('closed-small', style({
				transform: 'translateX(50%)'
			})),
			transition('* <=> *', [
				animate(200)
			]),
		])

	],
})
export default class ScreenGames {
	constructor(layout: LayoutService, speakingurl: speakingurl, gamesService: GamesService, route: ActivatedRoute, router: Router) {
		Object.assign(this, {layout, speakingurl, gamesService, route, router})
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

		this.game$ = this.route.queryParams
			.pluck('id')
			.flatMap(id => {
				if (id) {
					return this.gamesService.getByID(id)
				} else {
					return Observable.of(null)
				}
			})

		this.gameDetailState$ = this.game$.map(game => {
			return game ? 'opened' : 'closed'
		})

		this.stateGames$ = allGames$.combineLatest(this.state$, (games, state) => {
			if (state.id === 'all') {
				return games
			} else {
				return games.filter(game => game.state === state.id)
			}
		})

		this.animationState$ = Observable.combineLatest(
			this.gameDetailState$,
			this.layout.layout$,
			(gameDetailState, layout) => {
				return `${gameDetailState}-${layout}`
			}
		)
	}
	addGame(title = prompt('Title')) {
		if (title) {
			this.gamesService.addGame(title)
			this.gamesService.games$.take(1).map(games => {
				return games[games.length - 1]
			}).do(game => {
				this.router.navigate(['games', 'active'], {
					queryParams: {
						id: game.id,
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
			this.router.navigate(['games', state.id], {
				queryParams: {
					id: game.id,
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