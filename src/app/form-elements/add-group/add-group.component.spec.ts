import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGrupComponent } from './add-group.component';

describe('AddgroupComponent', () => {
  let component: AddGrupComponent;
  let fixture: ComponentFixture<AddGrupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddGrupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddGrupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
