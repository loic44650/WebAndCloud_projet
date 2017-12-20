"use strict";
/**
 * Created by danielahmed on 16/04/2017.
 */
var router_1 = require("@angular/router");
var login_component_1 = require("./components/login/login.component");
var register_component_1 = require("./components/register/register.component");
var receipt_component_1 = require("./components/receipt/receipt.component");
var profile_component_1 = require("./components/profile/profile.component");
var addreceipt_components_1 = require("./components/receipt/AddReceipt/addreceipt.components");
var authentication_guard_1 = require("./guards/authentication.guard");
var dashboard_component_1 = require("./components/dashboard/dashboard.component");
var validate_component_1 = require("./components/validate/validate.component");
var loyalitycards_component_1 = require("./components/LoyalityCards/loyalitycards.component");
var promotion_component_1 = require("./components/promotion/promotion.component");
var appRoutes = [
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'register', component: register_component_1.RegisterComponent },
    { path: 'profile', component: profile_component_1.ProfileComponent },
    { path: 'receipt', component: receipt_component_1.ReceiptComponent, canActivate: [authentication_guard_1.AuthenticationGuard] },
    { path: 'receipt/addreceipt', component: addreceipt_components_1.AddReceiptComponent, canActivate: [authentication_guard_1.AuthenticationGuard] },
    { path: 'validate', component: validate_component_1.ValidateComponent },
    { path: 'cards', component: loyalitycards_component_1.LoyalityCards },
    { path: 'promos', component: promotion_component_1.PromoComponent },
    { path: '', component: dashboard_component_1.DashboardComponent, canActivate: [authentication_guard_1.AuthenticationGuard] },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map