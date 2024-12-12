import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class AuthInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authReq = req.clone({
            setHeaders: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
        });
        return next.handle(authReq);
    }

    // if using class need to provide in app module 
    // provide: HTTP_INTERCEPTOR,
    // useClass: AuthInterceptor,
    // multi: true

}