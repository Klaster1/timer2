import {Component, Input} from '@angular/core'
import {DurationPipe} from 'a2/pipes/duration'
import template from './template.html!text'

@Component({
	selector: 'game-session-item',
	template,
	pipes: [DurationPipe]
})
export class GameSessionItem {
	@Input() session
}