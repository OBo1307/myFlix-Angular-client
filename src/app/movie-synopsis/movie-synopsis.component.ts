import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserRegistrationService } from '../fetch-api-data.service';

@Component({
  selector: 'app-movie-synopsis',
  templateUrl: './movie-synopsis.component.html',
  styleUrls: ['./movie-synopsis.component.scss'],
})
export class MovieSynopsisComponent implements OnInit {
  constructor(
    public fetchApiData: UserRegistrationService,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Title: string;
      Director: string;
      Genre: string;
      Description: string;
      Image: string;
    }
  ) {}
  ngOnInit(): void {}
}