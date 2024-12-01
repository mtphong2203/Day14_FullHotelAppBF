import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RoomListComponent } from './room/room-list.component';
import { HotelServiceListComponent } from './hotel-service/hotel-service-list.component';
import { BookingListComponent } from './booking/booking-list.component';
import { UserListComponent } from './user/user-list.component';
import { RoleListComponent } from './role/role-list.component';

const routes: Routes = [
  {
    path: 'users',
    component: UserListComponent
  },
  {
    path: 'roles',
    component: RoleListComponent
  },
  {
    path: 'bookings',
    component: BookingListComponent
  },
  {
    path: 'hotel-services',
    component: HotelServiceListComponent
  },
  {
    path: 'rooms',
    component: RoomListComponent,
  },
  {
    path: '**',
    redirectTo: 'rooms',
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
