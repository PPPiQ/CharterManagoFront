import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrganizationsComponent } from './organizations/organizations.component';
import { AddOrganizatioComponent } from '../form-elements/add-organization/add-organizatio.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: OrganizationsComponent },
      { path: 'add-organization', component: AddOrganizatioComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagerRoutingModule {}
