import { IOClients } from '@vtex/api';
import Specification from './Specification'


export class Clients extends IOClients {
	public get specification () {
		return this.getOrSet('specification', Specification);
	}

}
