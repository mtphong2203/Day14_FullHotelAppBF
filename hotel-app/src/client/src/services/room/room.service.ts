import { Injectable } from '@angular/core';
import { IRoomService } from './room.interface';
import { HttpClient } from '@angular/common/http';
import { MasterService } from '../master.service';

@Injectable({
  providedIn: 'root'
})
export class RoomService extends MasterService implements IRoomService {

  constructor(protected override httpClient: HttpClient) {
    super('rooms', httpClient);
  }

}
