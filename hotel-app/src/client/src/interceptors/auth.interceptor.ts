import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

export const authInterceptor: HttpInterceptorFn = (
    req: HttpRequest<any>,
    next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
    const accessToken: string | null = localStorage.getItem('accessToken');

    if (accessToken) {
        const cloned = req.clone({
            setHeaders: {
                authorization: 'Bearer ' + accessToken,
            }
        });
        return next(cloned);
    } else {
        return next(req);
    }
}