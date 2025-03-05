import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input } from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrl: './add-group.component.scss',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AddGrupComponent),
      multi: true,
    },
  ],
})
export class AddGrupComponent implements ControlValueAccessor {
  private _name: string = '';
  disable: boolean | undefined = false;
  @Input({ required: true }) placeholder: string = 'insert name';
  
  onChange = (event: Event) => {};
  onTaughed = () => {};

  get name(): string {
    return this._name;
  }

  set name(nameValue: string) {
    this._name = nameValue;
  }
  writeValue(name: string): void {
    this._name = name;
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
