import {Injectable} from '@angular/core'
import {FileSaverService, GamesService} from 'a2/services'

@Injectable()
export class BackupService {
	constructor(FileSaver: FileSaverService, games: GamesService) {
		Object.assign(this, {FileSaver, games})
	}
	export() {
		this.games.games$.take(1).do(games => {
			const json = JSON.stringify(games, null, '\t')
			const file = new File([json], 'games-backup.json', {type: 'text/plain;charset=utf-8'})
			this.FileSaver.saveAs(file)
		}).subscribe()
	}
	import(json) {
		this.games.importGames(JSON.parse(json))
	}
}