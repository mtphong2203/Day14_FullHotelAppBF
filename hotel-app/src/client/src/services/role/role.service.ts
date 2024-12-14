import { Injectable } from '@angular/core';
import { MasterService } from '../master.service';
import { IRoleService } from './role.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoleService extends MasterService implements IRoleService {

  constructor(protected override httpClient: HttpClient) {
    super('roles', httpClient);
  }
}
