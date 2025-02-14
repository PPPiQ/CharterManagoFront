import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatercraftsListingComponent } from './watercrafts-listing.component';

describe('WatercraftsListingComponent', () => {
  let component: WatercraftsListingComponent;
  let fixture: ComponentFixture<WatercraftsListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WatercraftsListingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WatercraftsListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
