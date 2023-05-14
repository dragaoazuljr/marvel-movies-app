import { Component, OnInit } from '@angular/core';
import { CharactersResult, Result } from '../../models/comic.model';
import { ComicsService } from '../../services/comics.service';
import { ActivatedRoute } from '@angular/router';

/**
 * Represents a component for displaying detailed information about a comic.
 */
@Component({
  selector: 'marvel-movies-app-comics-detail',
  templateUrl: './comics-detail.component.html',
  styleUrls: ['./comics-detail.component.scss'],
})
export class ComicsDetailComponent implements OnInit {
  /**
   * The comic object to display details for.
   */
  comics!: Result | null;

  /**
   * The price of the comic.
   */
  price!: number;

  /**
   * An array of characters associated with the comic.
   */
  characters!: CharactersResult[];

  /**
   * An array of creators associated with the comic.
   */
  creators!: CharactersResult[];

  /**
   * Creates an instance of ComicsDetailComponent.
   * @param comicsService - The service used for retrieving comic data.
   * @param route - The activated route service for accessing route parameters.
   */
  constructor(
    private comicsService: ComicsService,
    private route: ActivatedRoute
  ) {}

  /**
   * Initializes the component and fetches the comic details based on the ID provided in the route parameters.
   */
  ngOnInit() {
    this.route.params.subscribe(({ id }) => {
      this.comicsService.getComicsById(id).subscribe((result) => {
        this.comics = result.data.results[0];
        this.price = result.data.results[0].prices[0].price;
      });

      this.comicsService.getComicsCharacters(id).subscribe((result) => {
        if (result.data.results.length) {
          this.characters = result.data.results;
        }
      });

      this.comicsService.getComicsCreators(id).subscribe((result) => {
        if (result.data.results.length) {
          this.creators = result.data.results;
        }
      });
    });
  }

  /**
   * Retrieves the URL of the image associated with the comic.
   * @returns The URL of the comic's image, or a default image URL if the comic is not available.
   */
  getImage() {
    let imgUrl = '/assets/images/default.jpg';

    if (!this.comics) {
      return imgUrl;
    }

    if (this.comics?.images?.length > 0) {
      imgUrl = `${this.comics.images[0].path}.${this.comics?.images[0].extension}`;
    }

    return imgUrl;
  }
}
