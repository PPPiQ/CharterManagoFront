import { Component, OnInit, Signal } from '@angular/core';
import { DataService } from '../data.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OperationsResponse, OrganizationsI } from '../models/organizations';

@Component({
  standalone: false,
  selector: 'app-organizations',
  templateUrl: './organizations.component.html',
  styleUrl: './organizations.component.scss',
})
export class OrganizationsComponent  {
  organizations: Signal<OrganizationsI[]>;
  form = new FormGroup({
    organizationName: new FormControl(
      { value: '', disabled: false },
      { validators: [Validators.required, Validators.minLength(2)] }
    ),
  });

  constructor(private dataService: DataService) {
    this.organizations = this.dataService.$organizations;
    this.dataService.getOrganizations().subscribe({
      next: (result) => {
        console.log('Success');
        console.log(result);
       
      },
    });
  }


  hasOrganizations() {
    return this.dataService.$organizations().length > 0;
  }

  saveOrganization() {
    const orgname = this.form.controls['organizationName'].getRawValue();
    console.log(orgname);
    debugger;
    this.dataService.saveOrganization(orgname);
  }

  submit() {
    console.log('Submiting');
    console.log(this.form.controls['organizationName'].value);
  }
}
