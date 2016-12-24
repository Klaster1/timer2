import {Injectable} from '@angular/core'
import {Observable, Subject} from 'rxjs'

@Injectable()
export class DurationService {
	constructor() {
		this.gameDurationSync = game => game.sessions.reduce((acc, session) => (
			acc + (session.stop || Date.now()) - session.start
		), 0)

		this.gamesDurationSync = games => games.reduce((acc, game) => (
			game.sessions.reduce((acc, session) => (
				acc + (session.stop || Date.now()) - session.start
			), acc)
		), 0)

		const blob = new Blob([`
			self.game = ${this.gameDurationSync.toString()}
			self.games = ${this.gamesDurationSync.toString()}
			self.onmessage = ({data: {type, data, mid}}) => self.postMessage({
				data: self[type](data),
				midref: mid
			})
		`], {type: 'text/javascript'})

		this._worker = new Worker(window.URL.createObjectURL(blob))
		this._workerSubject = new Subject
		this._worker.onmessage = e => this._workerSubject.next(e.data)
		this._mid = 0
	}
	format(value) {
		if (value <= 0) return

		return ['h','m']
		.map(function (part) {
			switch (part) {
				case 'h':
					return ~~(value / 3600000)
				case 'm':
					return ~~((value % 3600000) / 60000)
			}
		})
		.map(this._pad)
		.join(':')
	}
	_pad(value) {
		return (value || 0).toString().length === 1 ? '0' + value : value
	}
	_postMessage({type, data}) {
		const mid = this._mid++
		this._worker.postMessage({type, data, mid})
		return this._workerSubject
			.filter(({midref}) => mid === midref)
			.map(({data}) => data)
			.take(1)
	}
	gameDuration(game)  {
		return this._postMessage({type: 'game', data: game})
	}
	gamesDuration(games = [])  {
		return this._postMessage({type: 'games', data: games})
	}
}