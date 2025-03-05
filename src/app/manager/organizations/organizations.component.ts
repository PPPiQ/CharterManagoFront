import { Component, Signal, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthorizationGroupsI, OrganizationsI } from '../models/organizations';
import { faTrashCan, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { DialogComponent } from '../../Dialogs/dialog/dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../authentication/auth.service';
import { Observable } from 'rxjs';

@Component({
  standalone: false,
  selector: 'app-organizations',
  templateUrl: './organizations.component.html',
  styleUrl: './organizations.component.scss',
})
export class OrganizationsComponent {
  faTrashCan: IconDefinition = faTrashCan;
  organizations: Signal<OrganizationsI[]>;
  authenticationGroups: Signal<AuthorizationGroupsI[]>;


  @ViewChild('addOrganizationDialog') addOrganizationDialogRef:
    | DialogComponent
    | undefined;
  @ViewChild('addGroupDialog') addGroupDialogRef: DialogComponent | undefined;

  form = new FormGroup({
    organizationName: new FormControl({ value: '', disabled: false }, [
      Validators.required,
      Validators.minLength(2),
    ]),
  });

  addGroupForm = new FormGroup({
    groupName: new FormControl({ value: '', disabled: false }, [
      Validators.required,
      Validators.minLength(2),
    ]),
  });

  constructor(
    private dataService: DataService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {
    this.organizations = this.dataService.$organizations;
    this.authenticationGroups = this.dataService.$authorizationGroups;
    this.dataService.getOrganizations().subscribe({
      complete() {
        console.log('Completed loading organizations');
      },
    });

  }

  hasOrganizations() {
    return this.dataService.$organizations().length > 0;
  }

  saveOrganization() {
    const orgname = this.form.controls['organizationName'].getRawValue();
    this.dataService.saveOrganization(orgname);
  }

  addNewGroup() {
    console.log('Adding access group.');
    const groupName: string | null = this.addGroupForm.controls['groupName'].value;
    if (groupName) {
      this.dataService.addNewGroup(groupName);
    }
  }

  deleteOrganization(id: string) {
    this.dataService.deleteOrganization(id).subscribe({
      complete: () => {
        console.log('Deleting completed.');
      },
    });
  }

  editOrganization(org: OrganizationsI) {
    console.log(`Editing organization: ${org.id}`);
    this.router.navigate([`edit/${org.id}`, { orgName: org.name }], {
      relativeTo: this.activatedRoute,
    });
  }
}
