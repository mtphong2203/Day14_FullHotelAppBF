import { Component } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { CommonModule } from '@angular/common';
import { RoomComponent } from "../../common/room/room.component";

@Component({
  selector: 'app-room-suite',
  standalone: true,
  imports: [CommonModule, RoomComponent],
  templateUrl: './room-suite.component.html',
  styleUrl: './room-suite.component.css'
})
export class RoomSuiteComponent {

  public rooms: any[] = [];
  public extra: any[] = [];

  public logo: string = './assets/images/room-suite.jpg';

  constructor(private commonService: CommonService) {
    this.getRooms();
    this.rooms = this.commonService.getData();
  }

  private getRooms(): void {
    this.extra = [
      {
        title: 'E Trip – Executive Triple Balcony',
        size: '60m2',
        bed: '3 beds',
        bathroom: '1 bathroom',
        description: 'Lựa chọn hiện đại và tiện lợi',
        images: './assets/images/room01.jpg',
      },
      {
        title: 'EVV – Executive Family',
        size: '42m2',
        bed: '1 beds',
        bathroom: '1 bathroom',
        description: 'Lựa chọn độc đáo và sáng tạo',
        images: './assets/images/room02.jpg',
      },
    ]
  }

}
