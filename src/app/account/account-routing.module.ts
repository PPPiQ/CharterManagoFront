import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultViewComponent } from './default-view/default-view.component';
import { authGuard } from '../authentication/auth.guard';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  { path: '',
    children: [
      { path: '', component: DefaultViewComponent },
      { path: 'user-profile', component: UserProfileComponent },
    ]
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { 

  constructor() { }
}
