import { Inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AUTH_SERVICE } from "../constants/injection.constant";
import { IAuthService } from "../services/auth/auth.interface";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthenticateGuard implements CanActivate {

    constructor(@Inject(AUTH_SERVICE) private authService: IAuthService, private router: Router) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | boolean | UrlTree {
        if (this.authService.isAuthenticated()) {
            if (this.authService.isManager()) {
                return true;
            } else {
                this.router.navigate(['/error/403']);
                return false;
            }
        }

        this.router.navigate(['/auth/login']);
        return false;
    }

}