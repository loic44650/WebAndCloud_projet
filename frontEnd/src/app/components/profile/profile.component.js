/**
 * Created by demeph on 17/04/2017.
 */
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
var core_1 = require("@angular/core");
var user_services_1 = require("../../services/User/user.services");
var user_model_1 = require("../../models/User/user.model");
var http_1 = require("@angular/http");
var adress_modele_1 = require("../../models/Adress/adress.modele");
var ProfileComponent = (function () {
    function ProfileComponent(userService, http) {
        this.userService = userService;
        this.http = http;
        this.model = {};
        this.infoUser = new user_model_1.User();
        this.adress = new adress_modele_1.Adress();
    }
    ProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userService.getCurrentUser().subscribe(function (complete) {
            _this.infoUser.copier(complete.json());
            _this.getAdress(complete.json()._links.adress.href);
        }, function (err) { return console.log(err); });
    };
    ProfileComponent.prototype.getAdress = function (url) {
        var _this = this;
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        var headers = new http_1.Headers({ 'X-Auth-Token': currentUser.token });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.get("http://www.datagrowb.com/ShopAssist/web/api" + url, options).subscribe(function (complete) {
            _this.adress.copy(complete.json()[0]);
            _this.infoUser.setAdress(_this.adress);
        });
    };
    ProfileComponent.prototype.updateInfo = function () {
    };
    ProfileComponent.prototype.updatePassword = function () {
        if (this.pwd != null) {
            if (this.password === this.model.plainPassword) {
            }
            else {
                this.error = "Les mots de passes ne sont pas identiques !";
            }
        }
        else {
            this.error = "Confirmer les changements par mot de passe actuelle";
        }
    };
    ProfileComponent.prototype.updateAdress = function () {
    };
    ProfileComponent.prototype.setpwd = function () {
        this.pwd = null;
    };
    return ProfileComponent;
}());
ProfileComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'profile.component.html',
        styleUrls: ['profile.component.css']
    }),
    __metadata("design:paramtypes", [user_services_1.UserService,
        http_1.Http])
], ProfileComponent);
exports.ProfileComponent = ProfileComponent;
//# sourceMappingURL=profile.component.js.map