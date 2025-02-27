import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrganizatioComponent } from './add-organizatio.component';

describe('AddOrganizatioComponent', () => {
  let component: AddOrganizatioComponent;
  let fixture: ComponentFixture<AddOrganizatioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddOrganizatioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOrganizatioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
