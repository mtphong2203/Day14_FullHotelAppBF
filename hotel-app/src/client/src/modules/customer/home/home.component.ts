import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBath, faMinus, faRestroom, faSquareArrowUpRight, faArrowRight, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FormatDatePipe } from '../../pipe/format-date.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, FontAwesomeModule, CommonModule, FormatDatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  public brandHome: string = './assets/images/homebody.jpg';
  public event01: string = './assets/images/event-1.jpg';
  public event02: string = './assets/images/event-2.jpg';
  public event03: string = './assets/images/event-3.jpg';
  public event04: string = './assets/images/event-4.jpg';
  public event05: string = './assets/images/event-5.jpg';
  public event06: string = './assets/images/event-6.jpg';
  public room01: string = './assets/images/room01.jpg';
  public room02: string = './assets/images/room02.jpg';
  public room03: string = './assets/images/room03.jpg';
  public room04: string = './assets/images/room04.jpg';


  // icon
  public faSquare: IconDefinition = faSquareArrowUpRight;
  public faRoom: IconDefinition = faRestroom;
  public faBath: IconDefinition = faBath;
  public faArrow: IconDefinition = faArrowRight;
  public faMinus: IconDefinition = faMinus;

}
