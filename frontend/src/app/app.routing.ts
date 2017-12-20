/**
 * Created by danielahmed on 16/04/2017.
 */
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthenticationGuard } from './guards/authentication.guard';
import {error403} from "./components/error/403/error403.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {CalculFollowersComponent} from "./CalculFollowers/calculFollowers.compotent";

const appRoutes : Routes = [
    {path: '', component: LoginComponent },
    {path : 'login', component : LoginComponent},
    {path : 'dashboard',component:DashboardComponent},
    {path : "home",component : DashboardComponent},
    {path : '403',component: error403,canActivate : [AuthenticationGuard]},
    {path : 'profile',component:ProfileComponent,canActivate : [AuthenticationGuard]},
    {path: 'calculfollowers',component:CalculFollowersComponent},
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);   
