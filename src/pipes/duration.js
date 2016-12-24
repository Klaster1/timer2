import {Pipe} from '@angular/core'
import {Observable} from 'rxjs'
import {DurationService} from 'a2/services'

@Pipe({name: 'duration'})
export class DurationPipe {
	constructor(duration: DurationService) {
		Object.assign(this, {duration})
	}
	transform(value) {
		return this.duration.format(value)
	}
}

@Pipe({
	name: 'gameDuration'
})
export class GameDurationPipe {
	constructor(duration: DurationService) {
		Object.assign(this, {duration})
	}
	transform(game) {
		return Observable.merge(
			Observable.of(this.duration.gameDurationSync(game)),
			Observable.interval(60 * 1000).flatMap(() => this.duration.gameDuration(game))
		)
	}
}

@Pipe({
	name: 'sessionDuration'
})
export class SessionDurationPipe {
	constructor(duration: DurationService) {
		Object.assign(this, {duration})
	}
	transform(session) {
		return Observable
			.interval(60 * 1000)
			.startWith(0)
			.map(() => this.duration.sessionDurationSync(session))
	}
}