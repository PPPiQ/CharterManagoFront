import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  effect,
  EffectRef,
  Injectable,
  OnDestroy,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  OrganizationsListingResponse,
  OrganizationsI,
  ResponseOnDelete,
  OrganizationCreateResponse,
} from './models/organizations';
import { ManagerModule } from './manager.module';
import { EMPTY, map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: ManagerModule,
})
export class DataService implements OnDestroy {
  private organizations: WritableSignal<OrganizationsI[]> = signal([]);
  public $organizations: Signal<OrganizationsI[]> =
    this.organizations.asReadonly();
  private organizationEffect: EffectRef;
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  private options = { headers: this.headers };

  constructor(
    private http: HttpClient,
    private router: Router,
    private activetedRoute: ActivatedRoute
  ) {
    this.organizationEffect = effect(() => {
      console.log(`The organization was updated on effect`);
    });
  }
  ngOnDestroy(): void {
    this.organizationEffect.destroy();
  }

  saveOrganization(orgname: string | null): Observable<any> {
    console.log('Sending organization');

    if (!orgname) {
      return EMPTY;
    }

    return this.http
      .post(
        'http://127.0.0.1:5000/api/v1/add-organization',
        { name: orgname },
        this.options
      )
      .pipe(
        map((result) => {
          const orgResp: OrganizationCreateResponse =
            result as OrganizationCreateResponse;
          const orgObj: OrganizationsI = orgResp.data;
          if (orgResp?.success) {
            this.organizations.update((value: OrganizationsI[]) => value.concat(orgObj) );
          }
        })
      );
  }

  getOrganizations(): Observable<any> {
    return this.http
      .get('http://127.0.0.1:5000/api/v1/organizations', this.options)
      .pipe(
        tap((result) => {
          const orgData: OrganizationsListingResponse =
            result as OrganizationsListingResponse;
          if (orgData && orgData.success) {
            this.setOrganizations(orgData?.data);
          } else {
            console.error(
              'Response from organizations did not contained any data. '
            );
          }
        })
      );
  }

  deleteOrganization(id: string) {
    console.log(`Deleting organization ${id}`);
    return this.http
      .delete(`http://127.0.0.1:5000/api/v1/delete/${id}`, this.options)
      .pipe(
        map((value) => {
          const deleteResponseObject: ResponseOnDelete =
            value as ResponseOnDelete;
          if (deleteResponseObject.success) {
            this.organizations.update((values) =>
              values.filter((value) => value.id !== id)
            );
          }
          console.log('Deleted');
        })
      );
  }

  setOrganizations(data: OrganizationsI[]) {
    try {
      const organizations: OrganizationsI[] = data as any;
      this.organizations.set(organizations);
    } catch (error) {
      console.error('Was not able to set organizations signal.');
    }
  }

  addOrganization() {
    console.log('Adding organization');
    this.router.navigate(['add-organization'], {
      relativeTo: this.activetedRoute,
    });
  }
}
