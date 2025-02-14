import {
  Component,
  effect,
  OnInit,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../authentication/auth.service';

@Component({
  selector: 'app-user-profile',
  imports: [CommonModule, FontAwesomeModule],
  providers: [HttpClient],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent implements OnInit {
  public isAuth: Signal<boolean>

  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient
  ) { 
    this.isAuth = this.authService.$isAuthorized;
  }

  ngOnInit(): void {
    // this.authService.$isAuthorized.subscribe((result) => {
    //   console.log("CHange in authorization");
    //   console.log(result);
    //   this.isAuth = result;
    // });
  }

  login() {
    this.router.navigate(['/login'], { relativeTo: this.activatedRoute });
  }

  logout() {
    this.authService.logout().subscribe((result) => {
      console.log('Lout out finalized.');
    });
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
      .subscribe((response) => {
        console.log('User request finished ');
      });
  }

  refresh() {
    console.log('Get user start.');
    // return this.http
    //   .post(
    //     'http://127.0.0.1:5000/api/v1/refresh', null,
    //     {
    //       headers,
    //       withCredentials: true,
    //     }
    //   )
    this.authService.refresh().subscribe((response) => {
      console.log('This is get user response: ');
      console.log(response);
    });
  }

  getUserLoginState() {
    let authState = this.authService.getAuthState();
    console.log(authState);

    return authState;
  }
}
