import {Component} from '@angular/core'
import template from './template.html!text'
import style from './style.css!text'
import {BackupService} from 'a2/services/Backup'
import {GamesService} from 'a2/services/games'

@Component({
	selector: 'screen-settings',
	template,
	styles: [style]
})
export class ScreenSettings {
	constructor(backup: BackupService, games: GamesService) {
		Object.assign(this, {backup, games})
	}
	import(json) {
		this.backup.import(json)
	}
	export() {
		this.backup.export()
	}
	purge() {
		this.games.purgeGames()
	}
}