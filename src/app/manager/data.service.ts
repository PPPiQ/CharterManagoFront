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
import {
  OrganizationsListingResponse,
  OrganizationsI,
  ResponseOnDelete,
  OrganizationCreateResponse,
  AuthorizationGroupsI,
} from './models/organizations';
import { ManagerModule } from './manager.module';
import { catchError, map, Observable, Subscription, tap } from 'rxjs';

@Injectable({
  providedIn: ManagerModule,
})
export class DataService implements OnDestroy {
  private organizations: WritableSignal<OrganizationsI[]> = signal([]);
  public $organizations: Signal<OrganizationsI[]> =
    this.organizations.asReadonly();
  private authorizationGroups: WritableSignal<AuthorizationGroupsI[]> = signal(
    []
  );
  public $authorizationGroups: Signal<AuthorizationGroupsI[]> =
    this.authorizationGroups.asReadonly();
  private organizationEffect: EffectRef;
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  private options = { headers: this.headers };
  private organizationSaveRef: Subscription | undefined;
  private addNewGroupRef: Subscription | undefined;

  constructor(
    private http: HttpClient
  ) {
    this.organizationEffect = effect(() => {
      console.log(`The organization was updated on effect`);
    });
  }

  saveOrganization(orgname: string | null): void {
    console.log('Sending organization');

    if (!orgname) {
      return;
    }

    this.organizationSaveRef = this.http
      .post<OrganizationCreateResponse>(
        'http://127.0.0.1:5000/api/v1/add-organization',
        { name: orgname },
        this.options
      )
      .pipe(catchError(this.handleError))
      .subscribe({
        next: (result: OrganizationCreateResponse) => {
          const orgObj: OrganizationsI = result.data;
          if (result?.success) {
            this.organizations.update((value: OrganizationsI[]) =>
              value.concat(orgObj)
            );
          }
          console.log('Organization sent.');
        },
        error: (err) => {
          console.error(err);
        },
      });
  }

  getOrganizations(): Observable<any> {
    return this.http
      .get<OrganizationsListingResponse>(
        'http://127.0.0.1:5000/api/v1/organizations',
        this.options
      )
      .pipe(
        catchError(this.handleError),
        tap((result: OrganizationsListingResponse) => {
          if (result && result.success) {
            this.setOrganizations(result?.data);
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
      .delete<ResponseOnDelete>(
        `http://127.0.0.1:5000/api/v1/delete/${id}`,
        this.options
      )
      .pipe(
        catchError(this.handleError),
        map((value: ResponseOnDelete) => {
          if (value.success) {
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
      this.organizations.set(data);
    } catch (error) {
      console.error('Was not able to set organizations signal.');
    }
  }

  addNewGroup(groupName: string): void {
    this.addNewGroupRef = this.http
      .post(
        'http://127.0.0.1:5000/api/v1/add-group',
        { groupName },
        this.options
      )
      .subscribe({
        complete: () => {
          console.log('New group creation request completed.');
        },
      });
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    throw error;
  }

  ngOnDestroy(): void {
    this.organizationEffect.destroy();
    this.organizationSaveRef && this.organizationSaveRef.unsubscribe();
    this.addNewGroupRef && this.addNewGroupRef.unsubscribe();
  }
}
