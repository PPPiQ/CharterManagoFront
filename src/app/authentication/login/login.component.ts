import { Component, forwardRef } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { AuthService } from '../auth.service';
import { NgFor } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

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
  emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

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
      login: new FormControl('', {
        updateOn: 'blur',
        validators: [
          Validators.required,
          Validators.minLength(4),
          Validators.pattern(this.emailPattern),
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
      .login(this.loginForm.value.login, this.loginForm.value.password)
      .subscribe((result) => {
        let destination: string = this.authService.getDestiantionUrl() || '/';
        this.router.navigate([destination], { relativeTo: this.activatedRoute });
      });
  }

  public register(): void {
    this.router.navigate(['/register']);
  }
}
