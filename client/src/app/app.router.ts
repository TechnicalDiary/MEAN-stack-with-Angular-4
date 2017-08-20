import { RouterModule, Routes, Router } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { BlogComponent } from './components/blog/blog.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/notAuth.guard';


const appRoutes: Routes = [
    {
        path:'login',
        component: LoginComponent,
        canActivate:[NotAuthGuard]
    },
    {
        path:'home',
        component: HomeComponent
    },
    {
        path:'profile',
        component: ProfileComponent,
        canActivate:[AuthGuard]
    },
    {
        path:'blog',
        component: BlogComponent,
        canActivate:[AuthGuard]
    },
    {
        path:'dashboard',
        component: DashboardComponent,
        canActivate:[AuthGuard]
    },
    {
        path:'register',
        component: RegisterComponent,
        canActivate:[NotAuthGuard]
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