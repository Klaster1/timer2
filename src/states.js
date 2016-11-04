import {UIRouter, Transition} from 'ui-router-ng2'
import {Injectable} from '@angular/core'
import {ScreenGames} from './components/screen-games/component'
import {ScreenGame} from './components/screen-game/component'
import {GamesService} from 'a2/services/games'

const states = [
	{
		name: 'timer',
		url: '/',
		redirectTo: 'games'
	},
	{
		name: 'games',
		component: ScreenGames,
		url: '/games'
	},
	{
		name: 'games.game',
		url: '/:id/:slug',
		views: {
			'@': {
				component: ScreenGame,
			}
		}
	}
]

@Injectable()
export default class RouterConfig {
	configure(uiRouter: UIRouter) {
		states.forEach(state => uiRouter.stateRegistry.register(state))
	}
}