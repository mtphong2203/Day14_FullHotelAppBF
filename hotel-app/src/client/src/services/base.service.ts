import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class BaseService {

    protected baseUrl: string = 'http://localhost:8080/api/v1/';

    constructor(protected apiUrl: String) {
        this.baseUrl = this.baseUrl + this.apiUrl;
    }
}
