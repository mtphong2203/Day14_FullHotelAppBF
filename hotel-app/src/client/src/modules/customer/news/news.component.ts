import { Component } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { EventComponent } from "../../common/event/event.component";
import { CommonModule } from '@angular/common';
import { LocationComponent } from "../location/location.component";
import { SiteComponent } from "../../common/site/site.component";

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule, SiteComponent],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css'
})
export class NewsComponent {

  public data: any[] = [];
  constructor(private commonService: CommonService) {
    this.data = this.commonService.getLocation();
  }

  public newSapa: string = './assets/images/sapa.jpg';

}
