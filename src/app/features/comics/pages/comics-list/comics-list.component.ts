import { Component, HostListener, OnInit } from '@angular/core';
import { ComicsService } from '../../services/comics.service';
import { Result } from '../../models/comic.model';
import { Subject, throttleTime } from 'rxjs';

/**
 * Represents a component for displaying a list of comics.
 */
@Component({
  selector: 'marvel-movies-app-comics-list',
  templateUrl: './comics-list.component.html',
  styleUrls: ['./comics-list.component.scss'],
})
export class ComicsListComponent implements OnInit {
  /**
   * An array of Result objects representing the comics to display.
   */
  comics: Result[] = [];

  /**
   * The title of the comics list.
   */
  title = '';

  /**
   * An observable subject that emits events when a key is pressed.
   */
  keyUp$ = new Subject<{ value: string; clear: boolean }>();

  /**
   * The maximum number of comics to fetch per request.
   */
  limit = 10;

  /**
   * The offset value for pagination.
   */
  offset = 0;

  /**
   * Creates an instance of ComicsListComponent.
   * @param comicsService - The service used for retrieving comics data.
   */
  constructor(private comicsService: ComicsService) {}

  /**
   * Event listener for the 'window:scroll' event.
   * @param event - The scroll event object.
   */
  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    const offsetHeight = event.srcElement?.scrollingElement?.offsetHeight;
    const clientHeight = event.srcElement?.scrollingElement?.clientHeight;
    const endOfThePage = window.scrollY >= (offsetHeight - clientHeight) * 0.75;

    if (endOfThePage) {
      this.offset += this.limit;
      this.keyUp$.next({ value: this.title, clear: false });
    }
  }

  /**
   * Initializes the component.
   */
  ngOnInit() {
    this.listenToSearch();
    this.getComics(this.title);
  }

  /**
   * Retrieves comics data based on the specified title.
   * @param title - The title of the comics to fetch.
   */
  getComics(title: string) {
    this.title = title;
    this.comicsService.getComics(this.title, this.limit, this.offset).subscribe(
      (response) => {
        this.comics.push(...response.data.results);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  /**
   * Retrieves the URL of the image associated with the given comic.
   * @param comic - The comics object.
   * @returns The URL of the comic's image.
   */
  getComicImage(comic: Result): string {
    let imgUrl = '/assets/images/default.jpg';

    if (comic.images.length > 0) {
      imgUrl = `${comic.images[0].path}.${comic.images[0].extension}`;
    }

    return imgUrl;
  }

  /**
   * Listens to keyup events and performs search operations.
   */
  listenToSearch() {
    this.keyUp$.pipe(throttleTime(300)).subscribe(({ value, clear }) => {
      if (clear) {
        this.comics = [];
        this.offset = 0;
      }
      this.getComics(value);
    });
  }
  /**
   * Event handler for the keyup event.
   * @param e - The KeyboardEvent object.
   */
  handleKeyUp(e: KeyboardEvent) {
    const value = (e.target as HTMLInputElement).value;

    this.keyUp$.next({ value, clear: true });
  }
}
