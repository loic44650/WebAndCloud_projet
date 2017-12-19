"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Created by danielahmed on 17/04/2017.
 */
var core_1 = require("@angular/core");
var user_services_1 = require("../../services/User/user.services");
var user_model_1 = require("../../models/user.model");
var core_2 = require("@ng-idle/core");
var keepalive_1 = require("@ng-idle/keepalive");
var authentication_services_1 = require("../../services/Authentication/authentication.services");
var router_1 = require("@angular/router");
var HeaderComponent = (function () {
    function HeaderComponent(userService, router, wait_to_logout, to_connecte, authService) {
        var _this = this;
        this.userService = userService;
        this.router = router;
        this.wait_to_logout = wait_to_logout;
        this.to_connecte = to_connecte;
        this.authService = authService;
        this.timedOut = false;
        this.user = new user_model_1.User();
        var user = JSON.parse(localStorage.getItem('currentUser'));
        if (user) {
            var test = JSON.parse(localStorage.getItem('testConnexion'));
            if (test.connected) {
                localStorage.setItem('testConnexion', JSON.stringify({ connected: false }));
                console.log("test");
                var nb = user.expiresIn;
                nb -= 600;
                this.wait_to_logout.setIdle(nb);
                this.wait_to_logout.setTimeout(500);
                this.wait_to_logout.setInterrupts(core_2.DEFAULT_INTERRUPTSOURCES);
                this.wait_to_logout.onIdleEnd.subscribe(function () {
                    _this.authService.refresh();
                    _this.timedOut = true;
                    _this.reset();
                });
                this.wait_to_logout.onTimeout.subscribe(function () {
                    _this.router.navigate(['login']);
                    _this.wait_to_logout.stop();
                });
                this.wait_to_logout.onIdleStart.subscribe(function () { return console.log('on va se deconnecter'); });
            }
            else {
                console.log("on a defini une seule fois");
            }
        }
        else {
        }
        this.reset();
    }
    HeaderComponent.prototype.reset = function () {
        this.wait_to_logout.watch();
        this.timedOut = false;
    };
    HeaderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userService.getCurrentUser().subscribe(function (complete) {
            _this.user = new user_model_1.User();
            _this.user = complete.json();
        }, function (error) { return console.log(error); }, function () {
            _this.user = _this.user;
        });
    };
    return HeaderComponent;
}());
HeaderComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'app-header',
        templateUrl: 'header.component.html',
        styleUrls: ['header.component.css']
    }),
    __metadata("design:paramtypes", [user_services_1.UserService,
        router_1.Router,
        core_2.Idle,
        keepalive_1.Keepalive,
        authentication_services_1.AuthenticationService])
], HeaderComponent);
exports.HeaderComponent = HeaderComponent;
//# sourceMappingURL=header.component.js.map