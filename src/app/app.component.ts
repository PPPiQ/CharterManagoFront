import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import {
  faHouse,
  IconDefinition,
  faRightFromBracket,
  faRightToBracket,
} from '@fortawesome/free-solid-svg-icons';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',

  imports: [HeaderComponent, FooterComponent, FontAwesomeModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  faHouse: IconDefinition = faHouse;
  faRightFromBracket: IconDefinition = faRightFromBracket;
  faRightToBracket: IconDefinition = faRightToBracket;

  constructor(library: FaIconLibrary) {
    library.addIcons(faHouse, faRightFromBracket, faRightToBracket);
  }
}
