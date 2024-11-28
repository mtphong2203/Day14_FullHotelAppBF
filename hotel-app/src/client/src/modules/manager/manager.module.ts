import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RoomListComponent } from './room/room-list.component';
import { HotelServiceListComponent } from './hotel-service/hotel-service-list.component';

const routes: Routes = [
  {
    path: 'hotel-services',
    component: HotelServiceListComponent
  },
  {
    path: 'room-list',
    component: RoomListComponent,
  },
  {
    path: '**',
    redirectTo: 'room-list',
    pathMatch: 'full'
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule, RouterModule.forChild(routes)
  ]
})
export class ManagerModule { }
