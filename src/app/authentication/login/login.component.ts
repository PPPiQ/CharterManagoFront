import { Component, forwardRef } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EMAIL_PATTERN } from '../../constants';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LoginComponent),
    },
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;


  get loginFieldValue() {
    return this.loginForm.get('login');
  }

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.loginForm = this.fb.group({
      email: new FormControl('', {
        updateOn: 'blur',
        validators: [
          Validators.required,
          Validators.minLength(4),
          Validators.pattern(EMAIL_PATTERN),
        ],
      }),
      password: new FormControl('', {
        updateOn: 'blur',
        validators: [Validators.required, Validators.minLength(8)],
      }),
    });
  }

  public login(): void {
    this.authService
      .login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe((result) => {
        let destination: string = this.authService.getDestiantionUrl() || '/';
        this.router.navigate([destination], { relativeTo: this.activatedRoute });
      });
  }

  public register(): void {
    this.router.navigate(['/register']);
  }
}
