import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from '../../authentication/login/login.component';

@Component({
  selector: 'app-default-view',
  imports: [RouterOutlet, LoginComponent],
  templateUrl: './default-view.component.html',
  styleUrl: './default-view.component.scss'
})
export class DefaultViewComponent {

}
