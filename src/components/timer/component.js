import {Component, ViewEncapsulation} from '@angular/core'
import template from './template.html!text'
import {GamesService} from 'a2/services'
import style from './style.css!text'
import {HotkeysService, Hotkey} from 'angular2-hotkeys'
import {Router} from '@angular/router'
import {MdIconRegistry} from '@angular/material'
import {DomSanitizer} from '@angular/platform-browser'

@Component({
	moduleId: __moduleName,
	selector: 'timer',
	template,
	styles: [style],
	encapsulation: ViewEncapsulation.None
})
export class Timer {
	constructor(sanitizer: DomSanitizer, icons: MdIconRegistry, router: Router, gamesService: GamesService, hotkeys: HotkeysService) {
		Object.assign(this, {router, gamesService, hotkeys})

		const logoURL = __moduleName.replace(/[^\/]+$/, 'logo.svg')
		const safeLogoURL = sanitizer.bypassSecurityTrustResourceUrl(logoURL)

		icons.addSvgIcon('logo', safeLogoURL)

		this.hotkeys.add([
			new Hotkey(
				'g g',
				(e) => {
					console.debug(e)
					this.router.navigate(['games', 'all'])
				},
				[],
				'Go to games'
			),
			...gamesService.states.map(state => {
				return new Hotkey(
					`g ${state.id[0]}`,
					() => this.router.navigate(['games', state.id]),
					[],
					`Go to games (${state.name})`
				)
			}),
			new Hotkey(
				'g s',
				(e) => {
					console.debug(e)
					this.router.navigate(['settings'])
				},
				[],
				'Go to settings'
			),
		])
	}
}