import { NgModule }      from '@angular/core';
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

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {UserService} from "./services/User/user.services";
import {CalculFollowersComponent} from "./CalculFollowers/calculFollowers.compotent";
import {TwittsService} from "./services/Twitts/twitts.service";
import {HttpModule} from "@angular/http";
import {GoogleApiModule, NG_GAPI_CONFIG, NgGapiClientConfig} from "ng-gapi";

let gapiClientConfig: NgGapiClientConfig = {
  client_id: "webcloud-122127",
  discoveryDocs: ["https://analyticsreporting.googleapis.com/$discovery/rest?version=v4"],
  scope: [
    "https://www.googleapis.com/auth/analytics.readonly",
    "https://www.googleapis.com/auth/analytics"
  ].join(" ")
};

@NgModule({
    imports:      [
        BrowserModule,
        FormsModule,
        routing,
        HttpModule,
        BrowserAnimationsModule,
        GoogleApiModule.forRoot({
          provide: NG_GAPI_CONFIG,
          useValue: gapiClientConfig
        }),
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
        UserService,
        TwittsService
    ],
})
export class AppModule { }
