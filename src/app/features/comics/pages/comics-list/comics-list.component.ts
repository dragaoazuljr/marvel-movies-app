import { Component, OnInit } from '@angular/core';
import { ComicsService } from '../../services/comics.service';
import { Result } from '../../models/comic.model';

@Component({
	selector: 'marvel-movies-app-comics-list',
	templateUrl: './comics-list.component.html',
	styleUrls: ['./comics-list.component.scss'],
})
export class ComicsListComponent implements OnInit {
	comics: Result[] = [];

	constructor(private comicsService: ComicsService) { }

	ngOnInit() {
		this.comicsService.getComics('', 10, 0).subscribe(
			(response) => {
				this.comics = response.data.results;
			},
			(error) => {
				console.error(error);
			}
		);
	}

	getComicImage(comic: Result): string {
		let imgUrl = '';

		if (comic.images.length > 0) {
			imgUrl = `${comic.images[0].path}.${comic.images[0].extension}`;
		}

		return imgUrl;
	}
}
