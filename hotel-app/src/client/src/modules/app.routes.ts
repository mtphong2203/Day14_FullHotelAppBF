import { Routes } from '@angular/router';
import { CustomerLayoutComponent } from './layouts/customer-layout/customer-layout.component';
import { ManagerLayoutComponent } from './layouts/manager-layout/manager-layout.component';
import { AuthenLayoutComponent } from './layouts/authen-layout/authen-layout.component';
import { AuthenticateGuard } from '../guards/auth.guard';
import { canActivateTeam } from '../guards/auth.fn.guard';

export const routes: Routes = [
    {
        path: 'auth',
        component: AuthenLayoutComponent,
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
    },
    {
        path: 'manager',
        component: ManagerLayoutComponent,
        // canActivate: [AuthenticateGuard],
        // fn
        canActivate: [canActivateTeam],
        loadChildren: () => import('./manager/manager.module').then(m => m.ManagerModule)

    },
    {
        path: 'error',
        component: CustomerLayoutComponent,
        loadChildren: () => import('./errors/errors.module').then(m => m.ErrorsModule)
    },
    {
        path: '',
        component: CustomerLayoutComponent,
        loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule)
    }
];
