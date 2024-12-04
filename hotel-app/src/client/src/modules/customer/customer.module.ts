import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { CommonService } from '../services/common.service';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { ServiceComponent } from './service/service.component';

const routes: Routes = [
  {
    path: 'restaurant',
    component: RestaurantComponent
  },
  {
    path: 'services',
    component: ServiceComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: '',
    component: HomeComponent
  }

]

@NgModule({
  declarations: [],
  providers: [CommonService],
  imports: [
    CommonModule, RouterModule.forChild(routes)
  ]
})
export class CustomerModule { }
