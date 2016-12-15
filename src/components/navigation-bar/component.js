import {Component} from '@angular/core'
import template from './template.html!text'
import style from './style.css!text'
import {GamesService} from 'a2/services/games'
import {hasAssets} from 'a2/decorators'
import {LayoutService} from 'a2/services/layout'

@hasAssets
@Component({
	moduleId: __moduleName,
	selector: 'navigation-bar',
	template,
	styles: [style]
})
export default class NavigationBar {
	constructor(layout: LayoutService, games: GamesService) {
		Object.assign(this, {games, layout})
		this.states = this.games.states
		this.tooltipPosition$ = this.layout.layout$.map(layout => {
			switch (layout) {
				case 'small':
					return 'bottom'
				case 'big':
				default:
					return 'right'
			}
		})
	}
	tooltipText(text) {
		return this.layout.layout$.map(layout => {
			switch (layout) {
				case 'small':
					return ''
				case 'big':
				default:
					return text
			}
		})
	}
}