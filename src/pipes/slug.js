import getSlug from 'speakingurl'
import {Pipe} from '@angular/core'

@Pipe({name: 'slug'})
export class SlugPipe {
	transform(value) {
		return getSlug(value)
	}
}