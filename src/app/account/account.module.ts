import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AuthService } from '../authentication/auth.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AccountRoutingModule
  ],
  providers: [
  ]
})
export class AccountModule { }
