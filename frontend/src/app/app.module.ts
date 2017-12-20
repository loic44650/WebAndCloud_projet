import { NgModule }      from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { HeaderComponent }  from './components/header/header.component';
import { SidebarComponent } from './components/nav/sidebar.component';
import { LoginComponent } from './components/login/login.component';
import { FooterComponent } from './components/footer/footer.component';
import {ProfileComponent} from "./components/profile/profile.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";

import { AuthenticationGuard } from './guards/authentication.guard';
import { AuthenticationService } from './services/Authentication/authentication.services';
import {error403} from "./components/error/403/error403.component";

import { routing } from './app.routing';


import {NgIdleKeepaliveModule } from '@ng-idle/keepalive';

import { Ng2CompleterModule } from "ng2-completer";

import {DataTableModule} from 'primeng/components/datatable/datatable';
import {DialogModule,CalendarModule} from 'primeng/primeng';
import {ChartsModule} from "ng2-charts";


import {MdDialogModule,MdButtonModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';



import {NgSpinningPreloader} from 'ng2-spinning-preloader';
import {UserService} from "./services/User/user.services";
import {CalculFollowersComponent} from "./CalculFollowers/calculFollowers.compotent";
import {TwittsService} from "./services/Twitts/twitts.service";


@NgModule({
    imports:      [
        BrowserModule,
        HttpModule,
        FormsModule,
        routing,
        MdDialogModule,
        MdButtonModule,
        DialogModule,
        BrowserAnimationsModule,
        NgIdleKeepaliveModule.forRoot(),
        Ng2CompleterModule,
        DataTableModule,
        ChartsModule,
        CalendarModule
    ],
    declarations: [
        AppComponent,
        HeaderComponent,
        SidebarComponent,
        LoginComponent,
        FooterComponent,
        ProfileComponent,
        DashboardComponent,
        CalculFollowersComponent,
        error403
    ],
    bootstrap:    [ AppComponent ],
    providers : [
        AuthenticationGuard,
        AuthenticationService,
        NgSpinningPreloader,
        UserService,
        TwittsService
    ],
})
export class AppModule { }
