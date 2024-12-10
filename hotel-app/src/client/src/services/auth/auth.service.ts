import { Injectable } from "@angular/core";
import { IAuthService } from "./auth.interface";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class AuthService implements IAuthService {

    private apiUrl: string = 'http://localhost:8080/api/auth';

    constructor(private http: HttpClient) { }
    login(param: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/login`, param);
    }
    register(param: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/register`, param);
    }

}