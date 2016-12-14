import {speakingurl} from 'a2/services/speakingurl'
import {Pipe} from '@angular/core'

@Pipe({name: 'slug'})
export class SlugPipe {
	constructor(speakingurl: speakingurl) {
		Object.assign(this, {speakingurl})
	}
	transform(value) {
		return this.speakingurl.getSlug(value)
	}
}