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
var user_model_1 = require("../../models/user.model");
var user_services_1 = require("../../services/User/user.services");
var SidebarComponent = (function () {
    function SidebarComponent(userService) {
        this.userService = userService;
        this.user = new user_model_1.User();
        this.info = new user_model_1.User();
    }
    SidebarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userService.getCurrentUser().subscribe(function (complete) {
            _this.user = complete.json();
        }, function (error) { return console.log(error); }, function () {
            _this.info = _this.user;
        });
    };
    return SidebarComponent;
}());
SidebarComponent = __decorate([
    core_1.Component({
        selector: 'sidebar',
        templateUrl: './sidebar.component.html',
        styleUrls: ['./sidebar.component.css']
    }),
    __metadata("design:paramtypes", [user_services_1.UserService])
], SidebarComponent);
exports.SidebarComponent = SidebarComponent;
/**
 * Created by danielahmed on 17/04/2017.
 */
//# sourceMappingURL=sidebar.component.js.map