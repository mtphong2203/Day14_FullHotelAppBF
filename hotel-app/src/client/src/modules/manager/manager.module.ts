import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RoomListComponent } from './room/room-list.component';

const routes: Routes = [
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
