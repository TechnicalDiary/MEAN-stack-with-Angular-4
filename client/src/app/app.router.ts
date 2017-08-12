import { RouterModule, Routes, Router } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const appRoutes: Routes = [
    {
        path:'home',
        component: HomeComponent
    },
    {
        path:'dashboard',
        component: DashboardComponent
    }    
]

export const AppRouting = RouterModule.forRoot(appRoutes);

// const appRoutes: Routes = [
//   {
//     path: 'login' , component: LoginComponent
//   },
//   {
//     path: 'dist/login' , component: LoginComponent
//   },
//   {
//     path: 'single-request', component: SingleRequestComponent , canActivate: [AuthGuardLogin], 
//     data: { roles: ['employee', 'admin','user'] } 
//   },
//   {
//     path: 'schedule-request', 
//     loadChildren:'./employee/schedule-request/schedule-request.module#ScheduleRequestModule' ,
//     canActivate: [AuthGuardLogin], 
//     data: { roles: ['employee', 'admin','user'] } 
//   },
//   {
//     path: 'manager-dashboard',
//     component: ApprovalSingleRequestComponent, 
//     canActivate: [AuthGuardLogin],
//     data: { roles: ['employee', 'admin','user'] } 
//     /*, children : [{path: 'schedule-approve', component: ApprovalScheduleRequestComponent}]*/
//   },
//   {
//     path: '', redirectTo: 'login' , pathMatch: 'full'
//   }
// ];

// export const AppRouting = RouterModule.forRoot(appRoutes);