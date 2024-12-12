import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent, HttpErrorResponse } from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";

export const errorInterceptor: HttpInterceptorFn = (
    req: HttpRequest<any>,
    next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
    return next(req).pipe(
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