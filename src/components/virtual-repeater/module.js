import {NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {MdVirtualRepeatContainer} from './container'
import {MdVirtualRepeat} from './repeater'

@NgModule({
	imports: [
		BrowserModule
	],
	declarations: [
		MdVirtualRepeatContainer,
		MdVirtualRepeat
	],
	exports: [
		MdVirtualRepeatContainer,
		MdVirtualRepeat
	]
})
export class VirtualRepeaterModule {}