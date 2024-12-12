import { Injectable } from "@angular/core";
import { IAuthService } from "./auth.interface";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class AuthService implements IAuthService {

    private apiUrl: string = 'http://localhost:8080/api/auth';

    private authenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    public authenticated$: Observable<boolean> = this.authenticated.asObservable();

    private accessToken!: string;

    constructor(private http: HttpClient) {
        this.accessToken = localStorage.getItem('accessToken') || '';
    }

    public logout(): void {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('roles');
        this.authenticated.next(false);
    }

    public getAccessToken(): string {
        return this.accessToken;
    }

    public isAuthenticated(): Observable<boolean> {
        return this.authenticated$;
    }

    public isManager(): boolean {
        const roles = localStorage.getItem('roles');
        if (roles?.includes('Editor') || roles?.includes('Manager')) {
            return true;
        }
        return false;
    }

    login(param: string): Observable<any> {
        return this.http.post(`${this.apiUrl}/login`, param).pipe(
            tap((res: any) => {
                const token = res.accessToken;
                if (token) {
                    localStorage.setItem('accessToken', token);
                    localStorage.setItem('roles', res.roles);
                }
                this.authenticated.next(true);
            })
        );
    }
    register(param: string): Observable<any> {
        return this.http.post(`${this.apiUrl}/register`, param);
    }

}