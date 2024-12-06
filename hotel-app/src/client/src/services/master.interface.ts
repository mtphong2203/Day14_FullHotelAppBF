import { Observable } from "rxjs";

export interface IMasterService {
    getAll(): Observable<any>;

    getById(id: string): Observable<any>;

    search(param: any): Observable<any>;

    create(param: any): Observable<any>;

    update(id: string, param: any): Observable<any>;

    delete(id: string): Observable<any>;
}