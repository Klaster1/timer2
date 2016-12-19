import {Injectable} from '@angular/core'
import {BehaviorSubject} from 'rxjs'

@Injectable()
export class MenuGameService {
	constructor() {
		this.menu$ = new BehaviorSubject
		this.game$ = new BehaviorSubject
	}
}