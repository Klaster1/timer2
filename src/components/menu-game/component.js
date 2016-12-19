import {
	Component,
	Input,
	Output,
	ViewChild,
	ChangeDetectionStrategy,
	EventEmitter
} from '@angular/core'
import {MenuGameService} from './service'
import {MdMenu} from '@angular/material'

MdMenu.prototype.ngOnDestroy = function ngOnDestroy() {
	this._tabSubscription && this._tabSubscription.unsubscribe()
}

@Component({
	selector: 'menu-game',
	template: `
		<md-menu>
			<button md-menu-item (click)="removeGame(game)">Delete</button>
			<button md-menu-item (click)="renameGame(game)">Rename</button>
		</md-menu>
	`,
	directives: [MdMenu],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuGame {
	@Output() onGameRename = new EventEmitter
	@Output() onGameRemove = new EventEmitter
	@ViewChild(MdMenu) menu
	constructor(service: MenuGameService) {
		Object.assign(this, {service})
		this.subscription = this.service.game$.subscribe(game => this.game = game)
	}
	ngOnInit() {
		this.service.menu$.next(this.menu)
	}
	ngOnDestroy() {
		this.subscription.unsubscribe()
	}
	renameGame(game) {
		this.onGameRename.emit(game)
	}
	removeGame(game) {
		this.onGameRemove.emit(game)
	}
}

@Component({
	selector: 'menu-game-trigger',
	template: `
		<button
			(click)="open($event, game)"
			[md-menu-trigger-for]="menu"
			md-icon-button
		>
			<md-icon>more_vert</md-icon>
		</button>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuGameTrigger {
	@Input() game
	constructor(service: MenuGameService) {
		Object.assign(this, {service})
	}
	ngOnInit() {
		this.service.menu$.subscribe(menu => this.menu = menu)
	}
	open($event) {
		$event.preventDefault()
		$event.stopPropagation()
		this.service.game$.next(this.game)
	}
}