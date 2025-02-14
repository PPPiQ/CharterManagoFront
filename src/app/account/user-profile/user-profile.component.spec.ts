import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileComponent } from './user-profile.component';
import { Component, Input } from '@angular/core';
import {FontAwesomeTestingModule} from '@fortawesome/angular-fontawesome/testing';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserProfileComponent, FontAwesomeTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
