import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { EMAIL_PATTERN } from '../../constants';

@Component({
  selector: 'app-registration',
  imports: [ReactiveFormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
})
export class RegistrationComponent {
  registrationForm: FormGroup = new FormGroup(
    {
      firstName: new FormControl('', {
        updateOn: 'blur',
        validators: [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ],
      }),
      lastName: new FormControl('', {
        updateOn: 'blur',
        validators: [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ],
      }),
      email: new FormControl('', {
        updateOn: 'blur',
        validators: [Validators.required, Validators.pattern(EMAIL_PATTERN)],
      }),
      password: new FormControl('', {
        updateOn: 'blur',
        validators: [Validators.required, Validators.minLength(15)],
      }),
      confirmPassword: new FormControl('', {
        updateOn: 'blur',
        validators: [Validators.required, Validators.minLength(15)],
      }),
    },
    { validators: this.passwordMatchValidator }
  );

  getErrors(controlName: string, error: string) {
    const control: AbstractControl | null =
      this.registrationForm.get(controlName);
    return control?.hasError(error) && (control.dirty || control.touched);
  }

  constructor(private fb: FormBuilder) {
    this.registrationForm.valueChanges.subscribe({
      next: (result) => {
        console.log(this.registrationForm.errors);
        console.log(result);
      },
    });
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    return password && confirmPassword && password === confirmPassword
      ? null
      : { mismatch: true };
  }
}
