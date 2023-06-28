import { Component, OnInit, Input } from '@angular/core';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';
// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';
// This import brings in the API calls we created earlier
import { UserRegistrationService } from '../fetch-api-data.service';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  @Input() loginData = { Username: '', Password: '' };

  constructor(
    public FetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }
  // This is the function responsible for sending the form inputs to the backend
  loginUser(): void {
    this.FetchApiData.userLogin(this.loginData).subscribe({
      next: (result) => {
        localStorage.setItem('username', result.user.Username);
        localStorage.setItem('token', result.token);
        this.dialogRef.close(); // This will close the modal on success!
        // informs user that login was successful
        this.snackBar.open('User logged in succesfully!', 'OK', {
          duration: 4000,
        });
      },
      error: (result) => {
        this.snackBar.open(result, 'OK', {
          duration: 4000,
        });
        console.log(result);
      },
    });
  }
}
