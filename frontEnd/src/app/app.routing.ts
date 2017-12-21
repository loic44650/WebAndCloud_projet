import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthenticationGuard } from './guards/authentication.guard';
import {error403} from "./components/error/403/error403.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {CalculFollowersComponent} from "./components/CalculFollowers/calculFollowers.compotent";
import {usersToFollowComponent} from "./components/userstofofollow/userstofollow.component";
import {testComponent} from "./components/testMessage/testMessage.component";

const appRoutes : Routes = [
    {path: '', component: LoginComponent },
    {path : 'login', component : LoginComponent},
    {path : 'dashboard',component:DashboardComponent},
    {path : '403',component: error403,canActivate : [AuthenticationGuard]},
    {path : 'profile',component:ProfileComponent,canActivate : [AuthenticationGuard]},
    {path : 'calcul1',component:CalculFollowersComponent,canActivate : [AuthenticationGuard]},
    {path : 'userstofollow',component:usersToFollowComponent,canActivate :[AuthenticationGuard]},
    {path : 'testMessages',component:testComponent,canActivate : [AuthenticationGuard]},
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
