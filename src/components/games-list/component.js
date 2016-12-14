import 'rxjs/add/operator/pluck'
import 'rxjs/add/operator/combineLatest'
import {
	Component,
	Input,
	Output,
	EventEmitter,
	ChangeDetectionStrategy
} from '@angular/core'
import template from './template.html!text'
import style from './style.css!text'

@Component({
	selector: 'games-list',
	template,
	styles: [style],
	// changeDetection: ChangeDetectionStrategy.OnPush
})
export default class GamesList {
	@Input() games
	@Input() state
	@Output() onGameAdd = new EventEmitter()
	@Output() onGameClick = new EventEmitter()
	addGame($event) {
		this.onGameAdd.emit()
	}
	gameClick(game) {
		this.onGameClick.emit(game)
	}
}