import { Observable } from "rxjs";

export interface IAuthService {
    login(param: string): Observable<any>;

    register(param: string): Observable<any>;

    isAuthenticated(): Observable<boolean>;

    getAccessToken(): string;

    isManager(): boolean

    logout(): void
}