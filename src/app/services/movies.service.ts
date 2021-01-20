import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MovieFilmsResponse, Movie } from '../interfaces/moviefilms-response';
import { catchError, map, tap } from "rxjs/operators";
import { MovieResponse } from '../interfaces/movie-response';
import { Cast, CreditsResponse } from '../interfaces/credits-response';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private url: string = 'https://api.themoviedb.org/3'
  private movieFilmsPage: number = 1;
  loading: boolean = false;

  constructor(private http: HttpClient) {
  }

  get params() {
    return {
      api_key: '27c39abf5209525637b3157d39381905',
      language: 'es-ES',
      page: this.movieFilmsPage.toString()
    }
  }

  getMovie(idMovie: number | string) {
    return this.http.get<MovieResponse>(`${this.url}/movie/${idMovie}?api_key=${this.params.api_key}&language=es-ES`)
      .pipe(
        catchError(err => of(null))
      );
  }

  getCast(movie_id: string): Observable<Cast[]> {
    return this.http.get<CreditsResponse>(`${this.url}/movie/${movie_id}/credits`, {
      params: this.params
    }).pipe(map(movie => movie.cast),
      catchError(err => of([])));
  }

  getMovieFilms(): Observable<Movie[]> {
    if (this.loading) {
      return of([]);
    }
    this.loading = true;
    return this.http.get<MovieFilmsResponse>(`${this.url}/movie/now_playing`, {
      params: this.params
    }).pipe(map((data) => data.results),
      tap(() => {
        this.movieFilmsPage += 1;
        this.loading = false;
      })
    )
  }

  searchMovie(query: string) {
    const params = { ...this.params, page: '1', query };
    return this.http.get<MovieFilmsResponse>(`${this.url}/search/movie`, {
      params
    }).pipe(
      map(data =>
        data.results))
  }

  resetCarteleraPage() {
    this.movieFilmsPage = 1;
  }

}
