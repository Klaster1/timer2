import {Component, ViewEncapsulation} from '@angular/core'
import template from './template.html!text'
import {GamesService} from 'a2/services/games'
import style from './style.css!text'

@Component({
	selector: 'timer',
	template,
	styles: [style],
	encapsulation: ViewEncapsulation.None
})
export class Timer {
	constructor(gamesService: GamesService) {
		this.gamesService = gamesService
	}
	addGame(title) {
		this.gamesService.addGame(title)
	}
}