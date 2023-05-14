import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Characters, Comic } from '../models/comic.model';

/**
 * A service for retrieving comic-related data from the Marvel API.
 */
@Injectable({
  providedIn: 'root',
})
export class ComicsService {
  /**
   * The base URL of the Marvel API.
   */
  private URL = process.env['NX_MARVEL_API'];

  /**
   * Creates an instance of ComicsService.
   * @param httpClient - The HttpClient service for making HTTP requests.
   */
  constructor(private httpClient: HttpClient) {}

  /**
   * Retrieves a list of comics based on the specified title, limit, and offset.
   * @param title - The title of the comics to fetch.
   * @param limit - The maximum number of comics to fetch (default: 10).
   * @param offset - The offset value for pagination (default: 0).
   * @returns An Observable emitting the response containing the list of comics.
   */
  getComics(title: string, limit = 10, offset = 0) {
    const params: Record<string, string | number> = {
      limit,
      offset,
      orderBy: '-focDate',
    };

    if (title) {
      params['titleStartsWith'] = title;
    }

    return this.httpClient.get<Comic>(`${this.URL}/public/comics`, {
      params,
    });
  }
  /**
   * Retrieves detailed information about a comic based on the specified ID.
   * @param id - The ID of the comic to fetch.
   * @returns An Observable emitting the response containing the comic details.
   */
  getComicsById(id: string | null) {
    return this.httpClient.get<Comic>(`${this.URL}/public/comics/${id}`);
  }

  /**
   * Retrieves a list of characters associated with a comic based on the specified comic ID.
   * @param id - The ID of the comic.
   * @returns An Observable emitting the response containing the list of characters.
   */
  getComicsCharacters(id: string | null) {
    return this.httpClient.get<Characters>(
      `${this.URL}/public/comics/${id}/characters`
    );
  }

  /**
   * Retrieves a list of creators associated with a comic based on the specified comic ID.
   * @param id - The ID of the comic.
   * @returns An Observable emitting the response containing the list of creators.
   */
  getComicsCreators(id: string | null) {
    return this.httpClient.get<Characters>(
      `${this.URL}/public/comics/${id}/creators`
    );
  }
}
