import { CommonModule } from '@angular/common';
import { Component, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-add-organization',
  templateUrl: './add-organizatio.component.html',
  styleUrl: './add-organizatio.component.scss',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AddOrganizatioComponent),
      multi: true,
    },
  ],
})
export class AddOrganizatioComponent implements ControlValueAccessor {
  private _name: string = '';
  disable: boolean | undefined = false;
  onChange = (event: Event) => {};
  onTaughed = () => {};

  get name(): string {
    return this._name;
  }

  set name(nameValue: string) {
    this._name = nameValue;
  }
  writeValue(organization: string): void {
    this._name = organization;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTaughed = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disable = isDisabled;
  }
}
