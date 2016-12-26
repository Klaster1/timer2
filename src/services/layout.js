import {Injectable, NgZone} from '@angular/core'
import {Observable} from 'rxjs'

@Injectable()
export class LayoutService {
	constructor(zone: NgZone) {
		this.layout$ = Observable.create(subscription => {
			const detectLayout = matches => matches ? 'small' : 'big'
			const mq = window.matchMedia('(max-width: 960px)')
			const fn = e => zone.run(() => subscription.next(detectLayout(e.matches)))
			mq.addListener(fn)
			subscription.next(detectLayout(mq.matches))
			return () => mq.removeListener(fn)
		}).publishReplay().refCount()
	}
}