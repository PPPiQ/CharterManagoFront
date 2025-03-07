import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagerRoutingModule } from './manager-routing.module';
import { OrganizationsComponent } from './organizations/organizations.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogComponent } from '../dialogs/dialog/dialog.component';
import { DialogFooterDirective } from '../dialogs/dialog-footer.directive';
import { DialogHeaderDirective } from '../dialogs/dialog-header.directive';
import { DialogContentDirective } from '../dialogs/dialog-content.directive';
import { DataService } from './data.service';
import { AddOrganizatioComponent } from '../form-elements/add-organization/add-organizatio.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { OfferEditorComponent } from './offer-editor/offer-editor.component';
import { OrganizationEditorComponent } from './organization-editor/organization-editor.component';
import { AddGrupComponent } from '../form-elements/add-group/add-group.component';

@NgModule({
  declarations: [
    OrganizationsComponent,
    OfferEditorComponent,
    OrganizationEditorComponent,
  ],
  imports: [
    CommonModule,
    ManagerRoutingModule,
    ReactiveFormsModule,
    DialogComponent,
    DialogFooterDirective,
    DialogHeaderDirective,
    DialogContentDirective,
    AddOrganizatioComponent,
    AddGrupComponent,
    FontAwesomeModule,
  ],
  providers: [DataService],
})
export class ManagerModule {}
