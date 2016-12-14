import 'hammerjs'
import 'zone.js'
import 'reflect-metadata'
import {NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {Timer} from './components/timer/component'
import {RouterModule} from '@angular/router'
import '@angular/material/list/list.css!'
import '@angular/material/core/theming/prebuilt/deeppurple-amber.css!'
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

import {DurationPipe} from 'a2/pipes/duration'
import {SlugPipe} from 'a2/pipes/slug'
import {GamesService} from 'a2/services/games'
import {StoreModule, combineReducers} from '@ngrx/store'
import {compose} from '@ngrx/core/compose'
import {localStorageSync} from 'ngrx-store-localstorage'
import {gamesReducer} from './stores/games'
import {MaterialModule} from '@angular/material'
import {VsFor} from 'ng2-vs-for'
import {GameSessionItem} from 'a2/components/game-session-item/component'

@NgModule({
	imports: [
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
				path: 'games/:state/:id',
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
		SlugPipe,
		NavigationBar,
		ScreenSettings,
		MenuGame,
		VsFor,
		ButtonFile,
		GameSessionItem,
	],
	providers: [
		GamesService,
		FileSaverService,
		BackupService,
		speakingurl,
	],
	bootstrap: [Timer]
})
export class App {}


/*import 'rxjs/Rx'
import {Timer} from './components/timer/component'
import {provide, PLATFORM_DIRECTIVES} from '@angular/core'
import {LocationStrategy, PathLocationStrategy} from '@angular/common'
import {bootstrap} from '@angular/platform-browser-dynamic'
// import {UIRouterConfig, UIROUTER_PROVIDERS, UIROUTER_DIRECTIVES} from 'ui-router-ng2'
import {provideStore, combineReducers} from '@ngrx/store'
import {compose} from '@ngrx/core/compose'
import {localStorageSync} from 'ngrx-store-localstorage'
import RouterConfig from './states'
import {gamesReducer} from './stores/games'
import {GamesService} from 'a2/services/games'
import {instrumentStore} from '@ngrx/store-devtools'
import {useLogMonitor} from '@ngrx/store-log-monitor'

bootstrap(Timer, [
	// ...UIROUTER_PROVIDERS,
	provide(UIRouterConfig, {useClass: RouterConfig}),
	provide(LocationStrategy, {useClass: PathLocationStrategy}),
	provide(PLATFORM_DIRECTIVES, {useValue: UIROUTER_DIRECTIVES, multi: true}),
	provideStore(
		compose(
			localStorageSync(['games'], true), combineReducers
		)({games: gamesReducer})
	),
    instrumentStore({
        monitor: useLogMonitor({
            visible: true,
            position: 'right'
        })
    }),
	GamesService
])*/