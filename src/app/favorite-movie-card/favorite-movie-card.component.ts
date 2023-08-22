import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';

import { GenreDetailsComponent } from '../genre-details/genre-details.component';
import { DirectorDetailsComponent } from '../director-details/director-details.component';
import { MovieSynopsisComponent } from '../movie-synopsis/movie-synopsis.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-favorite-movie-card',
  templateUrl: './favorite-movie-card.component.html',
  styleUrls: ['./favorite-movie-card.component.scss'],
})
export class FavoriteMovieCardComponent {
  movies: any[] = [];
  favorites: any[] = [];
  listOfFavoriteMovies: any[] = [];

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.getMovies();
    this.getFavoriteMovies();
    this.getListOfFavorite();
  }

  async getListOfFavorite() {
    let allMovies = await this.getMovies();
    let favoriteMoviesID = await this.getFavoriteMovies()
    console.log(allMovies);
    console.log(favoriteMoviesID);
    // this.listOfFavoriteMovies = this.movies.filter((m) => {
    //   this.favorites.includes(m.id);
    // });
    // console.log(this.listOfFavoriteMovies);
    // return this.listOfFavoriteMovies;
  }

  getMovies(): void {
    // We make API call to get full list of movies
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      // we set movies variable to keep what we get as a response from API call
      this.movies = resp;
      console.log(this.movies);

      return this.movies;
    });
  }
  getFavoriteMovies(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.favorites = resp.FavoriteMovies;
      console.log(this.favorites);
      return this.favorites;
    });
  }
  isFavorite(id: string): boolean {
    return this.favorites.includes(id);
  }

  addToFavorites(id: string): void {
    console.log(id);
    this.fetchApiData.addMovieToFavorites(id).subscribe((result) => {
      console.log(result);
      this.snackBar.open('Movie added to favorites', 'OK', {
        duration: 4000,
      });
      this.ngOnInit();
    });
  }

  deleteFromFavorites(id: string): void {
    console.log(id);
    this.fetchApiData.deleteMovieFromFavorites(id).subscribe((result) => {
      console.log(result);
      this.snackBar.open('Movie deleted from favorites', 'OK', {
        duration: 4000,
      });
      this.ngOnInit();
    });
  }

  openGenreDetails(name: string, description: string): void {
    console.log(name);
    this.dialog.open(GenreDetailsComponent, {
      data: {
        Name: name,
        Description: description,
      },
      // panelClass: 'genre-dialog-background',
      // width: '400px',
    });
  }

  openDirectorDetails(name: string, bio: string, birth: string): void {
    console.log(name);
    this.dialog.open(DirectorDetailsComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birth: birth,
      },
    });
  }

  openMovieSynopsis(
    title: string,
    movieDirector: string,
    movieGenre: string,
    movieDescription: string,
    movieImageURL: string
  ): void {
    this.dialog.open(MovieSynopsisComponent, {
      data: {
        Title: title,
        Director: movieDirector,
        Genre: movieGenre,
        Description: movieDescription,
        Image: movieImageURL,
      },
    });
  }
}