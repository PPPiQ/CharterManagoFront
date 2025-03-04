import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../authentication/auth.service';
import { concatMap } from 'rxjs';

@Component({
  selector: 'app-organization-editor',
  standalone: false,
  templateUrl: './organization-editor.component.html',
  styleUrl: './organization-editor.component.scss',
})
export class OrganizationEditorComponent {
  organization: any = '';
  userRights: any[] = [];

  constructor(private activatedRoute: ActivatedRoute, private authService: AuthService) {

    activatedRoute.params.pipe(
      concatMap((params) => {
        this.organization = params?.['orgName'];
        return this.authService.getUserRights("67c5cbcd2938d273cfa10a3c");
      })
    ).subscribe(()=>{
      console.log("User rights downloaded.");
      
    });
  }
  

  addEiditor() {}
}
