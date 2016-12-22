import {platformBrowserDynamic} from '@angular/platform-browser-dynamic'
import {enableProdMode} from '@angular/core'
import {App} from './app'
import {prodModeEnabled} from 'env'

if (prodModeEnabled) enableProdMode()
platformBrowserDynamic().bootstrapModule(App)