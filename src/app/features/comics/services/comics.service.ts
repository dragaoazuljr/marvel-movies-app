import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comic } from '../models/comic.model';

@Injectable({
	providedIn: 'root',
})
export class ComicsService {
	private URL = process.env['NX_MARVEL_API'];

	constructor(private httpClient: HttpClient) { }

	getComics(title: string, limit = 10, offset = 0) {
		const params: Record<string, string | number> = {
			limit,
			offset,
		};

		if (title) {
			params['title'] = title;
		}

		return this.httpClient.get<Comic>(`${this.URL}/public/comics`, {
			params,
		});
	}
}
