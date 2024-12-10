import { HttpClient } from "@angular/common/http";
import { MasterService } from "../master.service";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class BookingService extends MasterService {
    constructor(protected override httpClient: HttpClient) {
        super('bookings', httpClient);
    }
}