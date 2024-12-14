import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authInterceptor } from '../interceptors/auth.interceptor';
import { AUTH_SERVICE, PERMISSION_SERVICE } from '../constants/injection.constant';
import { AuthService } from '../services/auth/auth.service';
import { errorInterceptor } from '../interceptors/error.funtion';
import { AuthenticateGuard } from '../guards/auth.guard';
import { PermissionService } from '../services/permissions/permission.service';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
  provideHttpClient(withInterceptors([authInterceptor, errorInterceptor]), withFetch()),
  importProvidersFrom(AuthenticateGuard),
  {
    provide: AUTH_SERVICE,
    useClass: AuthService
  },
  {
    provide: PERMISSION_SERVICE,
    useClass: PermissionService
  }
  ],
};
