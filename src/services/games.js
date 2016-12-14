import 'rxjs/add/operator/map'
import 'rxjs/add/operator/take'
import {Injectable} from '@angular/core'
import {Store} from '@ngrx/store'
import {
	ADD_GAME,
	RENAME_GAME,
	REMOVE_GAME,
	SET_GAME_STATE,
	START_GAME,
	STOP_GAME,
	IMPORT_GAMES
} from 'a2/stores/games'

@Injectable()
export class GamesService {
	constructor(store: Store) {
		this.store = store
		this.games$ = store.select('games')
		this.states = [
			{
				id: 'active',
				icon: 'play_circle_filled',
				name: 'Active'
			}, 
			{
				id: 'finished',
				icon: 'check_circle',
				name: 'Finished'
			}, 
			{
				id: 'dropped',
				icon: 'delete',
				name: 'Dropped'
			}, 
			{
				id: 'hold',
				icon: 'low_priority',
				name: 'On hold'
			}, 
			{
				id: 'wish',
				icon: 'bookmark',
				name: 'Wishlist'
			}
		]
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
	importGames(games) {
		this.store.dispatch({
			type: IMPORT_GAMES,
			payload: games
		})
	}
}