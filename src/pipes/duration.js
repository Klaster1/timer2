import {Pipe} from '@angular/core'

@Pipe({name: 'duration'})
export class DurationPipe {
	transform(value) {
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
		.map(this.pad)
		.join(':')
	}
	pad(value) {
		return (value || 0).toString().length === 1 ? '0' + value : value
	}
}