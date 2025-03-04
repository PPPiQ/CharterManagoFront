import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrganizationsComponent } from './organizations/organizations.component';
import { OrganizationEditorComponent } from './organization-editor/organization-editor.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: OrganizationsComponent },
      { path: 'edit/:orgId', component: OrganizationEditorComponent}
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagerRoutingModule {}
