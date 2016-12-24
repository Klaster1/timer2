import {Pipe} from '@angular/core'
import {Observable} from 'rxjs'
import {DurationService} from 'a2/services/duration'

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
	transform(game) {
		const interval = 60 * 1000
		
		let sessionsSeen, completeTotal, unfinishedStart, current

		return Observable.interval(interval).startWith(0).map(i => {
			if (game.sessions && game.sessions.length !== sessionsSeen) {
				completeTotal = this.calcCompleteTotal(game)
				sessionsSeen = game.sessions.length
				unfinishedStart = this.unfinishedStart(game)
			}
			if (unfinishedStart) {
				completeTotal += interval
			}
			return completeTotal
		})
	}
	calcCompleteTotal(game) {
		return game.sessions.reduce((total, s) => {
			return s.stop ? total + (s.stop - s.start) : total
		}, 0)
	}
	unfinishedStart(game) {
		if (!game || !game.sessions || !game.sessions.length) {
			return
		}
		const lastSession = game.sessions[game.sessions.length - 1]
		return lastSession.stop ? false : lastSession.start
	}
}

@Pipe({
	name: 'sessionDuration'
})
export class SessionDurationPipe {
	transform(session) {
		const interval = 60 * 1000
		
		let current = Date.now() - session.start - interval

		return Observable.interval(interval).startWith(0).map(i => {
			if (session.start && session.stop) {
				return session.stop - session.start
			} else if (!session.stop) {
				return current += interval
			}
		})
	}
}