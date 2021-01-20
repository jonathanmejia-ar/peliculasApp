import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/moviefilms-response';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  movies: Movie[] = [];
  moviesSlideshow: Movie[] = [];

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + 1300;
    const max = (document.documentElement.scrollHeight || document.body.scrollHeight);

    if (pos > max) {
      if (this.moviesServices.loading) { return; }
      this.moviesServices.getMovieFilms().subscribe(movies => {
        this.movies.push(...movies);
      });
    }
  }

  constructor(private moviesServices: MoviesService) { }

  ngOnInit(): void {
    this.moviesServices.getMovieFilms()
      .subscribe(movies => {
        this.movies = movies;
        this.moviesSlideshow = movies;
      })
  }

  ngOnDestroy() {
    this.moviesServices.resetCarteleraPage();
  }

}
