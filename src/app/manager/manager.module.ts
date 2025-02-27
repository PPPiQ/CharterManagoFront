import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagerRoutingModule } from './manager-routing.module';
import { OrganizationsComponent } from './organizations/organizations.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogComponent } from '../Dialogs/dialog/dialog.component';
import { DialogFooterDirective } from '../Dialogs/dialog-footer.directive';
import { DialogHeaderDirective } from '../Dialogs/dialog-header.directive';
import { DialogContentDirective } from '../Dialogs/dialog-content.directive';
import { DataService } from './data.service';
import { AddOrganizatioComponent } from '../form-elements/add-organization/add-organizatio.component';

@NgModule({
  declarations: [OrganizationsComponent],
  imports: [
    CommonModule,
    ManagerRoutingModule,
    ReactiveFormsModule,
    DialogComponent,
    DialogFooterDirective,
    DialogHeaderDirective,
    DialogContentDirective,
    AddOrganizatioComponent
  ],
  providers: [DataService],
})
export class ManagerModule {}
