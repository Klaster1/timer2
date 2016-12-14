import getSlug from 'speakingurl'
import {Injectable} from '@angular/core'

@Injectable()
export class speakingurl {
	getSlug(...args) {
		return getSlug(...args)
	}
}