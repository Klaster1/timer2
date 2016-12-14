import {Component} from '@angular/core'
import template from './template.html!text'
import style from './style.css!text'
import {BackupService} from 'a2/services/Backup'

@Component({
	selector: 'screen-settings',
	template,
	styles: [style]
})
export class ScreenSettings {
	constructor(backup: BackupService) {
		Object.assign(this, {backup})
	}
	import(json) {
		this.backup.import(json)
	}
	export() {
		this.backup.export()
	}
}