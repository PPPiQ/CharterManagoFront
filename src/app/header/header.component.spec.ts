import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { provideRouter, Router } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let harness: RouterTestingHarness;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent, FontAwesomeTestingModule],
      providers: [
        provideRouter([
          { path: 'shopping-cart', component: ShoppingCartComponent },
        ]),
      ],
    }).compileComponents();
    harness = await RouterTestingHarness.create();
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain variable title equal "charterManago" ', () => {
    expect(component.title).toBe('CharterMenago');
  });

  it('should render title', () => {
    fixture.detectChanges();
    const renderedComponent: HTMLElement = fixture.nativeElement;

    expect(renderedComponent.querySelector('h1')?.textContent).toEqual(
      'CharterMenago'
    );
  });

  it('should route to shopping cart', fakeAsync(() => {
    spyOn(component, 'openCart').and.callThrough();
    spyOn(console, 'log');

    const iconOfCart: HTMLElement = fixture.nativeElement.querySelector(
      'img[alt="Shopping cart"]'
    );
    iconOfCart.click();
    tick();
    fixture.detectChanges();

    expect(component.openCart).toHaveBeenCalled();
    expect(iconOfCart.textContent).toEqual('');
    expect(console.log).toHaveBeenCalled();
    expect(router.url).toEqual('/shopping-cart');
  }));
});
