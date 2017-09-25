import { Component ,OnInit } from '@angular/core';
import { Headers ,RequestOptions ,URLSearchParams} from '@angular/http';
import { InterceptorService } from 'ng2-interceptors';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
	title = 'My First Angular App';
	private headers = new Headers({'Content-Type': 'application/json'});

	constructor(
		private http: InterceptorService) {
	}

	getRooms(): void {
		this.http.get("https://demo.flksec.com:2017/1/secrets?a=flk_test&m=1.2&t=112&o=20160229&v=1.0.0.").subscribe(
			(res) => console.log(res),
			(err) => console.error(err));
	}

	getMsg(): void {
		this.http.post("http://localhost:3030/message/get_msg",
			JSON.stringify({roomname: 'test3'}),{headers: this.headers})
		.subscribe(
			(res) => console.log(res),
			(err) => console.error(err));
	}
	ngOnInit(){
		this.getRooms();
		//this.getMsg();
	}
}
