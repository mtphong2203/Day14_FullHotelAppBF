import { Observable } from "rxjs";

export interface IAuthService {
    login(param: any): Observable<any>;

    register(param: any): Observable<any>;
}