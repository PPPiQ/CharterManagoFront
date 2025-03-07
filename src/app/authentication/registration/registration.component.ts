import { Component, OnDestroy } from '@angular/core';
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
import { AuthService } from '../auth.service';
import { UserDataDetails } from '../../models/auth';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-registration',
  imports: [ReactiveFormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
})
export class RegistrationComponent implements OnDestroy {
  registrationSubRef: Subscription | undefined;
  constructor(private authService: AuthService) {}


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
        validators: [Validators.required, Validators.minLength(15)],
      }),
      confirmPassword: new FormControl('', {
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

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    return password &&
      confirmPassword &&
      password.value === confirmPassword.value
      ? null
      : { mismatch: true };
  }

  register() {
    const formValues: UserDataDetails | undefined = this.registrationForm.getRawValue();
    if (this.registrationForm.valid && formValues) {
      this.registrationSubRef = this.authService.register(formValues).subscribe({
        next: (result) => {
          console.log('Finished registering');
          console.log(result);
        },
      });
    }
  }

  ngOnDestroy(): void {
    this.registrationSubRef && this.registrationSubRef.unsubscribe();
  }
}
