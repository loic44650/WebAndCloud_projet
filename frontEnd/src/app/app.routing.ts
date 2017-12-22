import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthenticationGuard } from './guards/authentication.guard';
import {error403} from "./components/error/403/error403.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {CalculFollowersComponent} from "./components/CalculFollowers/calculFollowers.compotent";
import {usersToFollowComponent} from "./components/userstofofollow/userstofollow.component";
import {testComponent} from "./components/testMessage/testMessage.component";
import {ReadmeComponent} from "./components/readme/readme.component";

const appRoutes : Routes = [
    {path: '', component: DashboardComponent },
    {path : 'login', component : LoginComponent},
    {path : 'dashboard',component:DashboardComponent},
    {path : '403',component: error403},
    {path : 'profile',component:ProfileComponent},
    {path : 'calcul1',component:CalculFollowersComponent},
    {path : 'readme', component:ReadmeComponent},
    {path : 'userstofollow',component:usersToFollowComponent},
    {path : 'testMessages',component:testComponent},
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
