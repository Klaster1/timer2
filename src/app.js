import 'hammerjs'
import 'zone.js'
import 'reflect-metadata'
import {NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {Timer} from './components/timer/component'
import {RouterModule} from '@angular/router'
import {FormsModule} from '@angular/forms'
import ScreenGames from './components/screen-games/component'
import GameDetail from './components/game-detail/component'
import {GamesList, GamesDuration} from './components/games-list/component'
import GamesListItem from './components/games-list-item/component'
import NavigationBar from './components/navigation-bar/component'
import {ScreenSettings} from './components/screen-settings/component'
import {MenuGame, MenuGameTrigger} from './components/menu-game/component'
import {MenuGameService} from './components/menu-game/service'
import {ButtonFile} from './components/button-file/component'

import {MomentPipe} from 'a2/pipes/moment'
import {DurationPipe, GameDurationPipe, SessionDurationPipe} from 'a2/pipes/duration'
import {SlugPipe} from 'a2/pipes/slug'
import {StoreModule, combineReducers} from '@ngrx/store'
import {compose} from '@ngrx/core/compose'
import {localStorageSync} from 'ngrx-store-localstorage'
import {gamesReducer} from './stores/games'
import {MaterialModule} from '@angular/material'
import {GameSessionItem} from 'a2/components/game-session-item/component'
import {GameStateIcon} from 'a2/components/game-state-icon/component'
import {HotkeyModule} from 'angular2-hotkeys'
import * as services from './services'

import {VirtualRepeaterModule} from 'a2/components/virtual-repeater/module'

@NgModule({
	imports: [
		VirtualRepeaterModule,
		BrowserModule,
		FormsModule,
		MaterialModule.forRoot(),
		RouterModule.forRoot([
			{
				path: '',
				redirectTo: 'games/all',
				pathMatch: 'full'
			},
			{
				path: 'games',
				redirectTo: 'games/all',
				pathMatch: 'full'
			},
			{
				path: 'games/:state',
				component: ScreenGames,
			},
			{
				path: 'settings',
				component: ScreenSettings
			}
		]),
		StoreModule.provideStore(
			compose(
				localStorageSync(['games'], true), combineReducers
			)({games: gamesReducer})
		),
		HotkeyModule.forRoot()
	],
	declarations: [
		Timer,
		ScreenGames,
		GameDetail,
		GamesList,
		GamesDuration,
		GamesListItem,
		DurationPipe,
		GameDurationPipe,
		SessionDurationPipe,
		SlugPipe,
		NavigationBar,
		ScreenSettings,
		MenuGame,
		MenuGameTrigger,
		ButtonFile,
		GameSessionItem,
		GameStateIcon,
		MomentPipe,
	],
	providers: [
		...Object.keys(services).map(key => services[key]),
		MenuGameService
	],
	bootstrap: [Timer]
})
export class App {}