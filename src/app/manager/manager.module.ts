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

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { OfferEditorComponent } from './offer-editor/offer-editor.component';
import { OrganizationEditorComponent } from './organization-editor/organization-editor.component';

@NgModule({
  declarations: [OrganizationsComponent, OfferEditorComponent, OrganizationEditorComponent],
  imports: [
    CommonModule,
    ManagerRoutingModule,
    ReactiveFormsModule,
    DialogComponent,
    DialogFooterDirective,
    DialogHeaderDirective,
    DialogContentDirective,
    AddOrganizatioComponent,
    FontAwesomeModule
  ],
  providers: [DataService],
})
export class ManagerModule {}
