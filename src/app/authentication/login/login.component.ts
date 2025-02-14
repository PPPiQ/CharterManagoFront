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
  imports: [FormsModule, ReactiveFormsModule, NgFor],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LoginComponent),
    },
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements ControlValueAccessor {
  loginForm: FormGroup;
  emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  get loginFieldValue() {
    return this.loginForm.get('login');
  }

  constructor(private fb: FormBuilder, private authService: AuthService, private route: Router, private activatedRoute: ActivatedRoute) {
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

  writeValue(obj: any): void {
    if (obj) {
      this.loginForm.setValue(obj, { emitEvent: false });
    }
  }
  registerOnChange(fn: any): void {
    console.log('Changed');

    // this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    // this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.loginForm.disable();
    } else {
      this.loginForm.enable();
    }
  }

  public login(): void {

    this.authService
      .login(this.loginForm.value.login, this.loginForm.value.password)
      .subscribe((result) => {
        let destination: string = this.authService.getDestiantionUrl() || '/';
        this.route.navigate([destination], { relativeTo: this.activatedRoute}) 
      });
  }

  public onCredentialsChange(): void {
    // this.onChange()
  }

  public onBlur(): void {
    // this.onTouched();
  }
}
