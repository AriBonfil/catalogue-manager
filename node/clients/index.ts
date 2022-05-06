import { IOClients } from '@vtex/api';
import Sender from './sender'


export class Clients extends IOClients {
	public get sender () {
		return this.getOrSet('sender', Sender);
	}

}
