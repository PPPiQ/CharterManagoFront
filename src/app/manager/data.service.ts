import { HttpClient, HttpHeaders } from '@angular/common/http';
import { effect, EffectRef, Injectable, OnDestroy, signal, Signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OperationsResponse, OrganizationsI } from './models/organizations';
import { ManagerModule } from './manager.module';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: ManagerModule,
})
export class DataService implements OnDestroy {
  private organizations: WritableSignal<OrganizationsI[]> = signal([]);
  public $organizations: Signal<OrganizationsI[]> =
    this.organizations.asReadonly();
  private organizationEffect: EffectRef;

  constructor(
    private http: HttpClient,
    private router: Router,
    private activetedRoute: ActivatedRoute
  ) {
    this.organizationEffect = effect(() => {
      console.log(`The organization was updated on effect`);
      console.log(this.organizations());
      
    });
  }
  ngOnDestroy(): void {
    this.organizationEffect.destroy();
  }

  saveOrganization(orgname: string | null) {
    console.log('Sending organization');

    if (!orgname) {
      return;
    }
    const headers = new HttpHeaders({
      'content-type': 'application/json',
    });
    const body = {
      name: orgname,
    };
    return this.http
      .post('http://127.0.0.1:5000/api/v1/add-organization', body, {
        headers,
      })
      .subscribe({
        next: (result) => {
          console.log(result);
        },
        error: (err) => {
          console.error(err);
        },
      });
  }

  getOrganizations(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http
      .get('http://127.0.0.1:5000/api/v1/organizations', {
        headers,
      })
      .pipe(
        tap((result) => {
          const orgData: OperationsResponse = result as OperationsResponse;
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
