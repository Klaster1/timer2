import 'rxjs/add/operator/map'
import {Injectable} from '@angular/core'
import {Store} from '@ngrx/store'
import {ADD_GAME, RENAME_GAME, REMOVE_GAME, SET_GAME_STATE, START_GAME, STOP_GAME} from 'a2/stores/games'

@Injectable()
export class GamesService {
	constructor(store: Store) {
		this.store = store
		this.games$ = store.select('games')
	}
	get states() {
		return ['active', 'finished', 'dropped', 'hold', 'wish']
	}
	getByID(id) {
		return this.games$.map(games => {
			return games.find(game => game.id === id)
		})
	}
	addGame(title) {
		this.store.dispatch({
			type: ADD_GAME,
			payload: title
		})
	}
	renameGame(game, title) {
		this.store.dispatch({
			type: RENAME_GAME,
			payload: {
				id: game.id,
				title: title
			}
		})
	}
	removeGame(game) {
		this.store.dispatch({
			type: REMOVE_GAME,
			payload: game.id
		})
	}
	setGameState(game, state) {
		this.store.dispatch({
			type: SET_GAME_STATE,
			payload: {
				id: game.id,
				state: state
			}
		})
	}
	startGame(game) {
		this.store.dispatch({
			type: START_GAME,
			payload: {
				id: game.id,
			}
		})
	}
	stopGame(game) {
		this.store.dispatch({
			type: STOP_GAME,
			payload: {
				id: game.id,
			}
		})
	}
}