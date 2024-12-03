import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faRestroom, faBath, faSquareArrowUpRight, IconDefinition, faArrowRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-room',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink],
  templateUrl: './room.component.html',
  styleUrl: './room.component.css'
})
export class RoomComponent {

  @Input('roomItem') roomItem: any = {};

  public faSquare: IconDefinition = faSquareArrowUpRight;
  public faRoom: IconDefinition = faRestroom;
  public faBath: IconDefinition = faBath;
  public faArrow: IconDefinition = faArrowRight;

}
