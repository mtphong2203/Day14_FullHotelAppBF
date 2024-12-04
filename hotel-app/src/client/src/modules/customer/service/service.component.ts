import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMinus, IconDefinition, faClock, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-service',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink, CommonModule],
  templateUrl: './service.component.html',
  styleUrl: './service.component.css'
})
export class ServiceComponent {

  public serviceLogo: string = './assets/images/service.jpg';
  public service01: string = './assets/images/service-1.jpg'
  public service02: string = './assets/images/service-2.jpg'
  public service03: string = './assets/images/service-3.jpg'
  public service04: string = './assets/images/service-04.jpg'
  public service05: string = './assets/images/service-5.jpg'
  public service06: string = './assets/images/service-6.jpg'
  public service07: string = './assets/images/service-7.jpg'
  public faMinus: IconDefinition = faMinus;
  public faClock: IconDefinition = faClock;

  public isShow: boolean = false;
  public isTour: boolean = false;

  public faPlus: IconDefinition = faPlusCircle;

  public onOpen(): void {
    this.isShow = !this.isShow;
  }

  public onShow(): void {
    this.isTour = !this.isTour;
  }

}
