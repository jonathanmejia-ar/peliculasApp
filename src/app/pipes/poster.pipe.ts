import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'poster'
})
export class PosterPipe implements PipeTransform {
  // https://image.tmdb.org/t/p/w500{{ movie.poster_path | }}
  // ../../../assets/images/no-image.jpg
  noImage: string = '../../../assets/images/no-image.jpg';
  image: string = 'https://image.tmdb.org/t/p/w500';

  transform(poster: string): string {
    if (poster) {
      return this.image + poster;
    } else {
      return this.noImage
    }

  }

}
