import { Component } from '@angular/core';
import { navLinks } from '../data/nav-links';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserProfileComponent } from '../account/user-profile/user-profile.component';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';

@Component({
  selector: 'app-header',
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterLink,
    UserProfileComponent,
    ShoppingCartComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  navLinks: any[] = navLinks;
  title: String = 'CharterMenago';

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  getIconIfExists(item: any): string {
    return item?.icon.length > 0 ? item.icon : item.text;
  }

  openCart() {
    console.log('redirecting to shopping cart');
    
    this.router.navigate(['shopping-cart'], {
      relativeTo: this.activatedRoute,
    });
  }
}
