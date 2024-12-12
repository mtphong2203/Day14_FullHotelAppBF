import { Injectable } from "@angular/core";
import { IAuthService } from "./auth.interface";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class AuthService implements IAuthService {

    private apiUrl: string = 'http://localhost:8080/api/auth';

    private accessToken!: string;

    constructor(private http: HttpClient) {
        this.accessToken = localStorage.getItem('accessToken') || '';
    }
    public getAccessToken(): string {
        return this.accessToken;
    }
    isAuthenticated(): boolean {
        return !!this.accessToken;
    }
    isManager(): boolean {
        const roles = localStorage.getItem('roles');
        if (roles?.includes('Editor') || roles?.includes('Manager')) {
            return true;
        }
        return false;
    }
    login(param: string): Observable<any> {
        return this.http.post(`${this.apiUrl}/login`, param);
    }
    register(param: string): Observable<any> {
        return this.http.post(`${this.apiUrl}/register`, param);
    }

}