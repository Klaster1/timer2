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
import GamesList from './components/games-list/component'
import GamesListItem from './components/games-list-item/component'
import NavigationBar from './components/navigation-bar/component'
import {ScreenSettings} from './components/screen-settings/component'
import {MenuGame} from './components/menu-game/component'
import {ButtonFile} from './components/button-file/component'
import {FileSaverService} from 'a2/services/FileSaver'
import {BackupService} from 'a2/services/Backup'
import {speakingurl} from 'a2/services/speakingurl'
import {LayoutService} from 'a2/services/layout'

import {MomentPipe} from 'a2/pipes/moment'
import {DurationPipe, GameDurationPipe, SessionDurationPipe} from 'a2/pipes/duration'
import {SlugPipe} from 'a2/pipes/slug'
import {GamesService} from 'a2/services/games'
import {StoreModule, combineReducers} from '@ngrx/store'
import {compose} from '@ngrx/core/compose'
import {localStorageSync} from 'ngrx-store-localstorage'
import {gamesReducer} from './stores/games'
import {MaterialModule} from '@angular/material'
import {VsFor} from 'ng2-vs-for'
import {GameSessionItem} from 'a2/components/game-session-item/component'
import {GameStateIcon} from 'a2/components/game-state-icon/component'

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
		)
	],
	declarations: [
		Timer,
		ScreenGames,
		GameDetail,
		GamesList,
		GamesListItem,
		DurationPipe,
		GameDurationPipe,
		SessionDurationPipe,
		SlugPipe,
		NavigationBar,
		ScreenSettings,
		MenuGame,
		VsFor,
		ButtonFile,
		GameSessionItem,
		GameStateIcon,
		MomentPipe,
	],
	providers: [
		GamesService,
		FileSaverService,
		BackupService,
		speakingurl,
		LayoutService,
	],
	bootstrap: [Timer]
})
export class App {}