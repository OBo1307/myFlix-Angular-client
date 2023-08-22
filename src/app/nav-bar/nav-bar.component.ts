import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WelcomePageComponent } from '../welcome-page/welcome-page.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  constructor(public router: Router) { }
  ngOnInit(): void {}

  allMovies(): void {
    this.router.navigate(['movies']);
  }

  userProfile(): void {
    this.router.navigate(['profile']);
  }

  logout(): void {
    this.router.navigate(['welcome']);
  }
}
