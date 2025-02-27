import { Routes } from '@angular/router';
import { OfferComponent } from './offer/offer.component';
import { OrganizationsComponent } from './manager/organizations/organizations.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { LoginComponent } from './authentication/login/login.component';
import { authGuard } from './authentication/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'offer', component: OfferComponent },

  { path: 'shopping-cart', component: ShoppingCartComponent },
  {
    path: 'user',
    canActivate: [ authGuard ],
    loadChildren: () =>
      import('./account/account.module').then((m) => m.AccountModule),
  },
  {
    path: 'organizations',
    canActivate: [ authGuard ],
    loadChildren: () =>
      import('./manager/manager.module').then((m) => m.ManagerModule),
  },
  { path: '', redirectTo: '/offer', pathMatch: 'full' },
  { path: '**', redirectTo: '/offer' },
];
