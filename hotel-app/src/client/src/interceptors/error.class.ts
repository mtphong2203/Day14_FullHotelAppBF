import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ErrorCatchInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    console.log("Unauthorized");
                } else if (error.status === 403) {
                    console.log("Something went wrong");
                }

                return throwError(error);
            })
        );
    }

}