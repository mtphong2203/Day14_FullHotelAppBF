import { Injectable } from '@angular/core';
import { IOrderService } from './order.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MasterService } from '../master.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends MasterService implements IOrderService {

  constructor(public override httpClient: HttpClient) {
    super('orders', httpClient);
  }

}
