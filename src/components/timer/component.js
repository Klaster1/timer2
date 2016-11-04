import {Component} from '@angular/core'
// import {UIROUTER_DIRECTIVES} from 'ui-router-ng2'
import template from './template.html'
import {GamesService} from 'a2/services/games'
import style from './style.css!text'

@Component({
	selector: 'timer',
	template,
	styles: [style]
	// directives: [UIROUTER_DIRECTIVES],
	// providers: [GamesService]
})
export class Timer {
	constructor(gamesService: GamesService) {
		this.gamesService = gamesService
	}
	addGame(title) {
		this.gamesService.addGame(title)
	}
}