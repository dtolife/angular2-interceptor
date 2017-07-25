import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule,XHRBackend,RequestOptions } from '@angular/http';
import { ServerURLInterceptor } from './app.interceptor';
import { InterceptorService  } from 'ng2-interceptors';
import { AppComponent } from './app.component';

export function interceptorFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions,serverURLInterceptor:ServerURLInterceptor){
	let service = new InterceptorService(xhrBackend, requestOptions);
	service.addInterceptor(new ServerURLInterceptor());
	return service;
}
@NgModule({
	declarations: [
	AppComponent,
	],
	imports: [
	BrowserModule,
	HttpModule
	],
	providers: [
	ServerURLInterceptor, 
	{
		provide: InterceptorService,
		useFactory: interceptorFactory,
		deps: [XHRBackend, RequestOptions, ServerURLInterceptor]
	},
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
