import { NgModule } from '@angular/core';
import { mapToCanActivate, RouterModule, Routes } from '@angular/router';

import { DefaultViewComponent } from './default-view/default-view.component';
import { authGuard } from '../authentication/auth.guard';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthService } from '../authentication/auth.service';

const routes: Routes = [
  { path: '', canActivate:[authGuard],
    children: [
      { path: '', component: DefaultViewComponent },
      { path: 'user-profile', component: UserProfileComponent, canActivate:[authGuard],},
    ]
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { 

  constructor(private authService: AuthService) { }
}
