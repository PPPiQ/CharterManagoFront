import { Component, Signal } from '@angular/core';
import { navLinks } from '../data/nav-links';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserProfileComponent } from '../account/user-profile/user-profile.component';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';
import { AuthService } from '../authentication/auth.service';

@Component({
  selector: 'app-header',
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterLink,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  navLinks: any[] = navLinks;
  title: String = 'CharterManago';
  public isAuth: Signal<boolean>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    this.isAuth = this.authService.$isAuthorized;
  }

  getIconIfExists(item: any): string {
    return item?.icon.length > 0 ? item.icon : item.text;
  }

  openCart() {
    console.log('redirecting to shopping cart');

    this.router.navigate(['shopping-cart'], {
      relativeTo: this.activatedRoute,
    });
  }

  login() {
    this.router.navigate(['/login'], { relativeTo: this.activatedRoute });
  }

  logout() {
    this.authService.logout().subscribe((result) => {
      console.log('Lout out finalized.');
    });
  }

  getUserLoginState() {
    let authState = this.authService.$isAuthorized();
    console.log(authState);

    return authState;
  }

  goToAccount() {
    this.router.navigate(['/user/user-profile'])
  }
}
