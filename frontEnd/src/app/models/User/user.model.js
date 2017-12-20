"use strict";
var adress_modele_1 = require("../Adress/adress.modele");
/**
 * Created by danielahmed on 16/04/2017.
 */
var User = (function () {
    function User() {
        this.adress = new adress_modele_1.Adress();
    }
    User.prototype.copier = function (user) {
        this.username = user.username;
        this.email = user.email;
        this.lastLogin = user.lastlogin;
        this.phoneNumber = user.phoneNumber;
    };
    User.prototype.setAdress = function (value) {
        this.adress = value;
    };
    return User;
}());
exports.User = User;
//# sourceMappingURL=user.model.js.map