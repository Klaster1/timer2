import {Component, Output, EventEmitter} from '@angular/core'
import template from './template.html!text'
import style from './style.css!text'

@Component({
	selector: 'button-file',
	template,
	styles: [style]
})
export class ButtonFile {
	@Output() onRead = new EventEmitter
	ngOnInit() {
		this.fr = new FileReader()
		this.fr.onload = () => this.onRead.emit(this.fr.result)
	}
	readFile($event) {
		this.fr.readAsText($event.target.files[0])
	}
}