import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

  public about01: string = './assets/images/about01.jpg';
  public about02: string = './assets/images/room01.jpg';
  public about03: string = './assets/images/room02.jpg';

}
