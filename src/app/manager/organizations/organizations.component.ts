import {
  Component,
  Signal,
  ViewChild,
} from '@angular/core';
import { DataService } from '../data.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OrganizationsI } from '../models/organizations';
import { faTrashCan, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { DialogComponent } from '../../Dialogs/dialog/dialog.component';

@Component({
  standalone: false,
  selector: 'app-organizations',
  templateUrl: './organizations.component.html',
  styleUrl: './organizations.component.scss',
})
export class OrganizationsComponent {
  faTrashCan: IconDefinition = faTrashCan;
  organizations: Signal<OrganizationsI[]>;

  @ViewChild('dialog') dialogRef: DialogComponent | undefined;

  form = new FormGroup({
    organizationName: new FormControl({ value: '', disabled: false }, [
      Validators.required,
      Validators.minLength(2),
    ]),
  });

  constructor(private dataService: DataService) {
    this.organizations = this.dataService.$organizations;
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

    this.dataService.saveOrganization(orgname).subscribe({
      next: (result) => {
        this.dialogRef?.close();
        console.log('Organization created.');
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  deleteOrganization(id: string) {
    this.dataService.deleteOrganization(id).subscribe({
      complete: () => {
        console.log('Deleting completed.');
      },
    });
  }
}
