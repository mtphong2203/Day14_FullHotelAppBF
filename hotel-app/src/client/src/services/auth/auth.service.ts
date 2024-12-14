import { Injectable } from "@angular/core";
import { IAuthService } from "./auth.interface";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class AuthService implements IAuthService {

    private apiUrl: string = 'http://localhost:8080/api/auth';
    private accessToken!: string;

    private authenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    public authenticated$: Observable<boolean> = this.authenticated.asObservable();

    private userInformation: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    public userInformation$: Observable<boolean> = this.userInformation.asObservable();

    constructor(private http: HttpClient) {
        this.accessToken = localStorage.getItem('accessToken') || '';
        this.authenticated.next(!!this.accessToken);
        const userInformationRaw = localStorage.getItem('userInformation');
        if (userInformationRaw) {
            this.userInformation.next(JSON.parse(userInformationRaw));
        }
    }

    public getUserInformation(): Observable<any> {
        return this.userInformation$;
    }

    public logout(): void {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userInformation');
        this.authenticated.next(false);
        this.userInformation.next(null);
    }

    public getAccessToken(): string {
        return this.accessToken;
    }

    public isAuthenticated(): Observable<boolean> {
        return this.authenticated$;
    }

    public isManager(): boolean {
        const userInformation = JSON.parse(
            localStorage.getItem('userInformation')?.toString() || ''
        );
        const roles = userInformation.roles;

        if (roles?.includes('Admin') || roles?.includes('Manager')) {
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
                    const userInformation = JSON.stringify(res.userInformationDTO);
                    localStorage.setItem('userInformation', userInformation);
                }
                this.authenticated.next(true);
                this.userInformation.next(res.userInformationDTO);
            })
        );
    }
    register(param: string): Observable<any> {
        return this.http.post(`${this.apiUrl}/register`, param);
    }

}