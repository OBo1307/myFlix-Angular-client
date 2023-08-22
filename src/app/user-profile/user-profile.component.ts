import { Component, Input, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: any = {};
  movies: any[] = [];
  favorites: any[] = [];

  @Input() updateUser = {
    Username: '',
    Password: '',
    Email: '',
    Birthday: '',
  };

  constructor(
    public fetchApiData: UserRegistrationService,
    public snackBar: MatSnackBar,
    public router: Router
    ) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.user = resp;
      this.updateUser.Username = resp.Username;
      this.updateUser.Email = resp.Email;
      this.updateUser.Birthday = resp.Birthday;
      return this.user;
    });
  }

  deleteUser(): void {
    if (confirm('Are you sure you want to delete your account?')) {
      this.router.navigate(['welcome']).then(() => {
        this.snackBar.open('Your account has been deleted!', 'OK', {
          duration: 2000
        });
      });
      this.fetchApiData.deleteUser().subscribe((result) => {
        localStorage.clear();
      })
    }
  }

  updateUserData(): void {
    this.fetchApiData.updateUser(this.updateUser).subscribe((result) => {
      this.snackBar.open('Your profile has been updated!', 'OK', {
        duration: 2000
      });
      localStorage.setItem('username', result.Username);
      window.location.reload();
    });
  }
}
