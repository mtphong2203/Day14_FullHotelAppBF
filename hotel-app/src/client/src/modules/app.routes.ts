import { Routes } from '@angular/router';
import { CustomerLayoutComponent } from './layouts/customer-layout/customer-layout.component';
import { ManagerLayoutComponent } from './layouts/manager-layout/manager-layout.component';
import { AuthenLayoutComponent } from './layouts/authen-layout/authen-layout.component';

export const routes: Routes = [
    {
        path: 'auth',
        component: AuthenLayoutComponent,
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
    },
    {
        path: 'manager',
        component: ManagerLayoutComponent,
        loadChildren: () => import('./manager/manager.module').then(m => m.ManagerModule)
    },
    {
        path: '',
        component: CustomerLayoutComponent,
        loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule)
    }
];
