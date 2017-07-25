import { Injectable }    from '@angular/core';
import { InterceptorService } from "ng2-interceptors";
import { Http ,Headers } from '@angular/http';
import { Rooms } from './app.rooms';
import 'rxjs/add/operator/toPromise';
@Injectable()
export class EncService {
	private headers = new Headers({'Content-Type': 'application/json'});
	private rooms: Rooms[] = [];
	
	constructor(private http:InterceptorService) {}

	getRooms(): Promise<Rooms[]> {
		return this.http.get('http://localhost:3000/rooms?a=1')
		.toPromise()
		.then(response => response.json().results)
		.catch(this.handleError);
	}

	getMsg(): Promise<Rooms[]> {
		return this.http.post('http://localhost:3000/message/get_msg',
			JSON.stringify({roomname: 'test3'}),{headers: this.headers})
		.toPromise()
		.then(response => response.json().results)
		.catch(this.handleError);
	}
	
	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error); // for demo purposes only
		return Promise.reject(error.message || error);
	}
}