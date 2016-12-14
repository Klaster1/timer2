import {Component, Input, ViewChild} from '@angular/core'
import {GamesService} from 'a2/services/games'
import {MdMenuTrigger} from '@angular/material'
import template from './template.html!text'

@Component({
	selector: 'menu-game',
	template
})
export class MenuGame {
	@Input() game
	@ViewChild(MdMenuTrigger) menu
	constructor(gamesService: GamesService) {
		Object.assign(this, {gamesService})
	}
	renameGame(game) {
		const title = prompt('Title', game.title)
		if (title) this.gamesService.renameGame(game, title)
	}
	removeGame(game) {
		this.gamesService.removeGame(game)
	}
	openMenu() {
		this.menu.openMenu()
	}
}