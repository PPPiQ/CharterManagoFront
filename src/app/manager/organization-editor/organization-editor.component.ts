import { Component, Input, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../authentication/auth.service';
import { concatMap } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogComponent } from '../../dialogs/dialog/dialog.component';

@Component({
  selector: 'app-organization-editor',
  standalone: false,
  templateUrl: './organization-editor.component.html',
  styleUrl: './organization-editor.component.scss',
})
export class OrganizationEditorComponent {
  organization: any = '';
  groupRolePermissions: any[] = [];

  addGroupForm = new FormGroup({
    groupName: new FormControl({ value: '', disabled: false }, [
      Validators.required,
      Validators.minLength(2),
    ]),
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {
    activatedRoute.params
      .pipe(
        concatMap((params) => {
          this.organization = params?.['orgName'];
          return this.authService.getUserRights('67c5cbcd2938d273cfa10a3c');
        })
      )
      .subscribe(() => {
        console.log('User rights downloaded.');
      });
  }



  addEiditor() {}
}
