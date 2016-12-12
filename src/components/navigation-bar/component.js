import {Component} from '@angular/core'
import template from './template.html!text'
import style from './style.css!text'
import {GamesService} from 'a2/services/games'
import {hasAssets} from 'a2/decorators'

@hasAssets
@Component({
	moduleId: __moduleName,
	selector: 'navigation-bar',
	template,
	styles: [style]
})
export default class NavigationBar {
	constructor(games: GamesService) {
		Object.assign(this, {games})
		this.states = this.games.states
	}
	ngOnInit() {
	}
}