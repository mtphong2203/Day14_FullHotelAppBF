import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RoomListComponent } from './room/room-list.component';
import { HotelServiceListComponent } from './hotel-service/hotel-service-list.component';
import { BookingListComponent } from './booking/booking-list.component';
import { UserListComponent } from './user/user-list.component';
import { RoleListComponent } from './role/role-list.component';
import { OrderService } from '../../services/order/order.service';
import { ORDER_SERVICE, ROLE_SERVICE, ROOM_SERVICE, USER_SERVICE } from '../../constants/injection.constant';
import { RoomService } from '../../services/room/room.service';
import { UserService } from '../../services/user/user.service';
import { RoleService } from '../../services/role/role.service';

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
  providers: [
    {
      provide: ORDER_SERVICE,
      useClass: OrderService
    },
    {
      provide: ROOM_SERVICE,
      useClass: RoomService
    },
    {
      provide: USER_SERVICE,
      useClass: UserService
    },
    {
      provide: ROLE_SERVICE,
      useClass: RoleService
    },
  ],
  imports: [
    CommonModule, RouterModule.forChild(routes)
  ]
})
export class ManagerModule { }
