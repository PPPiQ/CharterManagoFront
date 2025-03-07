import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../authentication/auth.service';
import { AccountData, UserAccount, UserDataResponse } from '../../models/auth';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  imports: [CommonModule, FontAwesomeModule],
  providers: [HttpClient],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent implements OnInit {
  public accountData: UserAccount = new AccountData({ email: '' });

  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http
      .get('http://127.0.0.1:5000/api/v1/user', {
        headers,
        withCredentials: true,
      })
      .subscribe({
        next: (response) => {
          const dataObject: UserDataResponse = response as UserDataResponse;
         this.accountData.firstName = dataObject.user?.firstName;
         this.accountData.email = dataObject.user?.email;
          console.log('User obteined');
          
        },
        error: (err) => {
          console.log('HTTP Error', err)
          console.log(err.message);
          console.log(err?.error?.msg);
        },
        complete: () => console.log('HTTP request completed.'),
      });
  }

  refresh() {
    this.authService.refresh().subscribe((response) => {
      console.log('This is get user response: ');

    });
  }

  getUserData() {
    return this.accountData;
  }
}
