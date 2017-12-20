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
 * Created by danielahmed on 15/04/2017.
 */
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var user_services_1 = require("../User/user.services");
require("rxjs/add/operator/map");
var AuthenticationService = (function () {
    function AuthenticationService(http, userServ) {
        this.http = http;
        this.userServ = userServ;
    }
    AuthenticationService.prototype.login = function (username, password) {
        var _this = this;
        return this.http.post("http://www.datagrowb.com/ShopAssist/web/api/auth-tokens", { login: username, password: password }).map(function (response) {
            var token = response.json() && response.json().token;
            var id = response.json() && response.json().id;
            var refreshToken = response.json() && response.json().refreshToken;
            var expiresIn = response.json() && response.json().expiresIn;
            if (token) {
                _this.token = token;
                localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token, refreshToken: refreshToken, id: id, expiresIn: expiresIn, }));
                localStorage.setItem('testConnexion', JSON.stringify({ connected: true }));
                _this.userServ.getCurrentUser().subscribe(function (complete) { return localStorage.setItem('user', JSON.stringify(complete.json())); });
                return true;
            }
            else {
                return false;
            }
        });
    };
    AuthenticationService.prototype.refresh = function () {
        var _this = this;
        console.log("ici");
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        var headers = new http_1.Headers({ 'X-Refresh-Token': currentUser.refreshToken });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.get("http://www.datagrowb.com/ShopAssist/web/api/refresh-tokens", options).subscribe(function (response) {
            var token = response.json() && response.json().token;
            var id = response.json() && response.json().id;
            var refreshToken = response.json() && response.json().refreshToken;
            var expiresIn = response.json() && response.json().expiresIn;
            if (token) {
                _this.token = token;
                var user = JSON.parse(localStorage.getItem('user'));
                localStorage.clear();
                localStorage.setItem('currentUser', JSON.stringify({ username: user.username, token: token, refreshToken: refreshToken, id: id, expiresIn: expiresIn, }));
                _this.userServ.getCurrentUser().subscribe(function (complete) { return localStorage.setItem('user', JSON.stringify(complete.json())); });
                return true;
            }
            else {
                return false;
            }
        });
    };
    AuthenticationService.prototype.logout = function () {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            var headers = new http_1.Headers({ 'X-Auth-Token': currentUser.token });
            var options = new http_1.RequestOptions({ headers: headers });
            console.log(currentUser.id);
            var id_1 = currentUser.id;
            this.token = null;
            localStorage.removeItem('currentUser');
            localStorage.removeItem('testConnexion');
            this.http.delete("http://www.datagrowb.com/ShopAssist/web/api/auth-tokens/" + currentUser.id, options).subscribe(function (complete) {
                console.log(id_1);
            }, function (err) { return console.log(err); });
        }
    };
    return AuthenticationService;
}());
AuthenticationService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http,
        user_services_1.UserService])
], AuthenticationService);
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=authentication.services.js.map