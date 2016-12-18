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
import {HotkeysService, Hotkey} from 'angular2-hotkeys'

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
	constructor(hotkeys: HotkeysService, layout: LayoutService, speakingurl: speakingurl, gamesService: GamesService, route: ActivatedRoute, router: Router) {
		Object.assign(this, {hotkeys, layout, speakingurl, gamesService, route, router})
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
			.map(games => games.slice().reverse())

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

		this.keys = [
			new Hotkey('a', () => this.addGame(), [], 'Add game'),
			new Hotkey('r g', () => {
				this.game$.take(1).subscribe(game => {
					game && this.removeGame(game)
				})
			}, [], 'Remove game'),
			new Hotkey('s', () => {
				this.game$.take(1).subscribe(game => {
					if (!game) return
					this.startStopGame(game)
				})
			}, [], 'Start/stop game'),
			new Hotkey('c', () => this.closeGame(), [], 'Close opened game'),
			new Hotkey('j', () => this.selectPrevGame(), [], 'Select prev game'),
			new Hotkey('k', () => this.selectNextGame(), [], 'Select next game'),
			...this.gamesService.states.map(state => {
				return new Hotkey(
					`m ${state.id[0]}`,
					(e) => {
						this.game$.take(1).subscribe(game => {
							if (game) this.setGameState({game, state: state.id})
						})
					},
					[],
					`Set game state (${state.name})`
				)
			})
		]
		this.hotkeys.add(this.keys)
	}
	ngOnDestroy() {
		this.hotkeys.remove(this.keys)
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
	removeGame(game) {
		this.gamesService.removeGame(game)
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
	selectPrevGame() {
		this.stateGames$.withLatestFrom(this.game$).take(1).subscribe(([games, game]) => {
			let index = games.indexOf(game) - 1
			if (index < 0) index = games.length - 1
			this.openGame(games[index])
		})
	}
	selectNextGame() {
		this.stateGames$.withLatestFrom(this.game$).take(1).subscribe(([games, game]) => {
			let index = games.indexOf(game) + 1
			if (index === games.length) index = 0
			this.openGame(games[index])
		})
	}
	startStopGame(game) {
		this.isRunning(game) ? this.stopGame(game) : this.startGame(game)
	}
	isRunning(game) {
		if (!game) return
		const lastSession = game.sessions[game.sessions.length - 1]
		return lastSession && !lastSession.stop
	}
}