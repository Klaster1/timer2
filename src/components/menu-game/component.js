import {Component, Input, ViewChild, ChangeDetectionStrategy} from '@angular/core'
import {GamesService} from 'a2/services/games'
import {MdMenuTrigger, MdMenu} from '@angular/material'
import template from './template.html!text'

MdMenu.prototype.ngOnDestroy = function ngOnDestroy() {
	this._tabSubscription && this._tabSubscription.unsubscribe()
}

@Component({
	selector: 'menu-game',
	template,
	directives: [MdMenu],
	changeDetection: ChangeDetectionStrategy.OnPush
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