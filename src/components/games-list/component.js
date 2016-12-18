import 'rxjs/add/operator/pluck'
import 'rxjs/add/operator/combineLatest'
import {
	Component,
	Input,
	Output,
	EventEmitter,
	ChangeDetectionStrategy,
	trigger,
	state,
	transition,
	style,
	animate
} from '@angular/core'
import template from './template.html!text'
import styles from './style.css!text'
import {Observable, Subject, BehaviorSubject} from 'rxjs'

@Component({
	selector: 'games-list',
	template,
	styles: [styles],
	animations: [
		trigger('search', [
			state('hidden', style({
				transform: 'translateX(0)'
			})),
			state('visible', style({
				transform: 'translateX(calc(-100%))'
			})),
			transition('* <=> *', [
				animate(150)
			])
		])
	]
	// changeDetection: ChangeDetectionStrategy.OnPush
})
export default class GamesList {
	@Input() games
	@Input() state
	@Output() onGameAdd = new EventEmitter()
	@Output() onGameClick = new EventEmitter()
	constructor() {
		this.searchState = 'hidden'
		this.searchInput$ = new Subject
		this.searchQuery$ = this.searchInput$
			.debounceTime(150)
			.map((query = '') => query.toLowerCase())
			.startWith()

		this.gamesInput$ = new BehaviorSubject()
		this.games$ = Observable.combineLatest(
			this.searchQuery$,
			this.gamesInput$,
			(query, games) => {
				if (!query) {
					return games
				} else {
					return games.filter(game => (
						game.title.toLowerCase().includes(query)
					))			
				}
			}
		)
	}
	addGame($event) {
		this.onGameAdd.emit()
	}
	gameClick(game) {
		this.onGameClick.emit(game)
	}
	toggleSearch(value = this.searchState) {
		this.searchState = value === 'hidden' ? 'visible' : 'hidden'
	}
	ngOnChanges(changes) {
		if (changes.games) {
			this.gamesInput$.next(changes.games.currentValue)
		}
	}
	focus(e, el) {
		if (e.toState === 'visible') el.focus()
		if (e.toState === 'hidden') {
			el.value = ''
			this.searchInput$.next()
		}
	}
	doSearch(query) {
		this.searchInput$.next(query)
	}
	trackBy(index, item) {
		return item.id
	}
}