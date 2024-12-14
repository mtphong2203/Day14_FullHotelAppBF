import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBath, faMinus, faRestroom, faSquareArrowUpRight, faArrowRight, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FormatDatePipe } from '../../pipe/format-date.pipe';
import { RoomComponent } from "../../common/room/room.component";
import { CommonService } from '../../services/common.service';
import { EventComponent } from "../../common/event/event.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, RoomComponent, EventComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  public brandHome: string = './assets/images/homebody.jpg';

  public rooms: any[] = [];
  public events: any[] = [];
  constructor(private commonService: CommonService) {
    this.rooms = this.commonService.getData();
    this.events = this.commonService.getEvent();
  }




  // icon
  public faMinus: IconDefinition = faMinus;

}
