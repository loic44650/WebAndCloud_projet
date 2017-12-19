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
 * Created by danielahmed on 16/04/2017.
 */
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Rx_1 = require("rxjs/Rx");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
//import 'rxjs/add/observable/throw';
var UserService = (function () {
    function UserService(http) {
        this.http = http;
    }
    UserService.prototype.getCurrentUser = function () {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        var headers = new http_1.Headers({ 'X-Auth-Token': currentUser.token });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.get("http://www.datagrowb.com/ShopAssist/web/api/users/" + currentUser.username, options);
    };
    UserService.prototype.postUser = function (user) {
        return this.http.post("http://www.datagrowb.com/ShopAssist/web/api/users", user).map(function (response) {
            var idUser = response.json() && response.json().id;
            if (idUser) {
                return true;
            }
            return false;
        }).catch(this.handleError);
    };
    UserService.prototype.handleError = function (error) {
        var errMsg;
        if (error instanceof http_1.Response) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        return Rx_1.Observable.throw(errMsg);
    };
    return UserService;
}());
UserService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.services.js.map