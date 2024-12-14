import { Component } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { SiteComponent } from "../../common/site/site.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [SiteComponent, CommonModule],
  templateUrl: './location.component.html',
  styleUrl: './location.component.css'
})
export class LocationComponent {

  public location: any[] = [];

  constructor(private commonService: CommonService) {
    this.location = this.commonService.hotLocation();
  }

}
