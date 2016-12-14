import FileSaver from 'FileSaver'
import {Injectable} from '@angular/core'

@Injectable()
export class FileSaverService {
	saveAs(...args) {
		return FileSaver(...args)
	}
}