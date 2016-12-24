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
	animate,
	ChangeDetectorRef
} from '@angular/core'
import template from './template.html!text'
import styles from './style.css!text'
import {Observable, Subject, BehaviorSubject} from 'rxjs'
import {HotkeysService, Hotkey} from 'angular2-hotkeys'
import {DurationService} from 'a2/services'

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
	],
	// changeDetection: ChangeDetectionStrategy.OnPush
})
export class GamesList {
	@Input() games
	@Input() currentGame
	@Input() state
	@Output() onGameAdd = new EventEmitter()
	@Output() onGameClick = new EventEmitter()
	@Input() topIndex
	@Output() topIndexChange = new EventEmitter()
	constructor(hotkeys: HotkeysService) {
		Object.assign(this, {hotkeys})

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
		this.index = 55
	}
	ngOnInit() {
		this.keys = [
			new Hotkey('f', () => this.toggleSearch(), [], 'Find a game')
		]
		this.hotkeys.add(this.keys)
	}
	ngOnDestroy() {
		this.gamesInput$.unsubscribe()
		this.searchInput$.unsubscribe()
		this.hotkeys.remove(this.keys)
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

@Component({
	selector: 'games-duration',
	template: '{{ duration }}',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class GamesDuration {
	@Input() games
	constructor(cdr: ChangeDetectorRef, durationService: DurationService) {
		Object.assign(this, {cdr, durationService})
	}
	ngOnChanges(changes) {
		if ('games' in changes && changes.games.currentValue) {
			this.durationService.gamesDuration(changes.games.currentValue)
			.map(duration => this.durationService.format(duration))
			.map(value => value ? `(${value})` : '')
			.do(value => {
				this.duration = value
				this.cdr.markForCheck()
				this.cdr.detectChanges()
			})
			.subscribe()
		}
	}
}