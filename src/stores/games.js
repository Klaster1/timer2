import {ActionReducer} from '@ngrx/store'
import * as uuid from 'uuid'

export const ADD_GAME = 'ADD_GAME'
export const REMOVE_GAME = 'REMOVE_GAME'
export const RENAME_GAME = 'RENAME_GAME'
export const SET_GAME_STATE = 'SET_GAME_STATE'
export const START_GAME = 'START_GAME'
export const STOP_GAME = 'STOP_GAME'
export const IMPORT_GAMES = 'IMPORT_GAMES'
export const PURGE_GAMES = 'PURGE_GAMES'

const gameReducer = (state, action) => {
	switch (action.type) {
		case RENAME_GAME:
			if (state.id === action.payload.id) {
				return Object.assign({}, state, {title: action.payload.title})
			}
		case SET_GAME_STATE:
			if (state.id === action.payload.id) {
				return Object.assign({}, state, {state: action.payload.state})
			}
		case START_GAME:
			if (state.id === action.payload.id) {
				return Object.assign({}, state, {
					sessions: state.sessions.concat({start: Date.now()})
				})
			}
		case STOP_GAME:
			if (state.id === action.payload.id) {
				return Object.assign({}, state, {
					sessions: state.sessions.map((session, index, sessions) => {
						if (index !== sessions.length - 1) return session
						return Object.assign({}, session, {stop: Date.now()})
					})
				})
			}
		default:
			return state
	}
}

export const gamesReducer = (state = [], action) => {
	switch (action.type) {
		case ADD_GAME:
			return state.concat({
				title: action.payload,
				id: uuid.v1(),
				state: 'active',
				sessions: []
			})
		case REMOVE_GAME:
			return state.filter(game => game.id !== action.payload)
		case RENAME_GAME:
		case SET_GAME_STATE:
		case START_GAME:
		case STOP_GAME:
			return state.map(game => gameReducer(game, action))
		case IMPORT_GAMES:
			return action.payload
		case PURGE_GAMES:
			return []
		default:
			return state
	}
}