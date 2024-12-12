import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authInterceptor } from '../interceptors/auth.interceptor';
import { AUTH_SERVICE } from '../constants/injection.constant';
import { AuthService } from '../services/auth/auth.service';
import { errorInterceptor } from '../interceptors/error.funtion';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
  provideHttpClient(withInterceptors([authInterceptor, errorInterceptor]), withFetch()),
  {
    provide: AUTH_SERVICE,
    useClass: AuthService
  }
  ],
};
