import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/interfaces/moviefilms-response';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  moviesList: Movie[] = [];
  text: string;

  constructor(private route: ActivatedRoute,
    private peliculasService: MoviesService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.text = params['text'];
      this.peliculasService.searchMovie(params['text']).subscribe(movies => {
        this.moviesList = movies;
      })
    });
  }

}
