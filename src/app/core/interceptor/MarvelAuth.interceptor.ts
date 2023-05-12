import { Injectable } from '@angular/core';
import {
	HttpEvent,
	HttpInterceptor,
	HttpHandler,
	HttpRequest,
} from '@angular/common/http';
import { Md5 } from 'ts-md5/dist/esm/md5';

import { Observable } from 'rxjs';

@Injectable()
export class MarvelAuthInterceptor implements HttpInterceptor {
	intercept(
		req: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		const date = new Date();
		const publicKey = process.env['NX_MARVEL_PUBLIC_KEY'] || '';
		const privateKey = process.env['NX_MARVEL_PRIVATE_KEY'] || '';
		const ts = date.getTime();

		const md5 = new Md5();
		md5.appendStr(ts.toString()).appendStr(privateKey).appendStr(publicKey);

		const hash = md5.end();

		const newReq = req.clone({
			params: req.params
				.set('hash', hash?.toString() || '')
				.set('ts', ts)
				.set('apikey', publicKey),
		});

		return next.handle(newReq);
	}
}
