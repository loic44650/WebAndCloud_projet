"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var forms_1 = require("@angular/forms");
var platform_browser_1 = require("@angular/platform-browser");
var app_component_1 = require("./app.component");
var header_component_1 = require("./components/header/header.component");
var sidebar_component_1 = require("./components/nav/sidebar.component");
var login_component_1 = require("./components/login/login.component");
var register_component_1 = require("./components/register/register.component");
var footer_component_1 = require("./components/footer/footer.component");
var receipt_component_1 = require("./components/receipt/receipt.component");
var profile_component_1 = require("./components/profile/profile.component");
var authentication_guard_1 = require("./guards/authentication.guard");
var authentication_services_1 = require("./services/Authentication/authentication.services");
var user_services_1 = require("./services/User/user.services");
var app_routing_1 = require("./app.routing");
var receipt_service_1 = require("./services/Receipt/receipt.service");
var dashboard_component_1 = require("./components/dashboard/dashboard.component");
var receipts_category_component_1 = require("./components/dashboard/receipt_category/receipts_category.component");
var keepalive_1 = require("@ng-idle/keepalive");
var shops_services_1 = require("./services/Shop/shops.services");
var categorys_service_1 = require("./services/Categorys/categorys.service");
var addreceipt_components_1 = require("./components/receipt/AddReceipt/addreceipt.components");
var validate_component_1 = require("./components/validate/validate.component");
var loyalitycards_component_1 = require("./components/LoyalityCards/loyalitycards.component");
var loyalityCards_service_1 = require("./services/LoyalityCards/loyalityCards.service");
var promotion_service_1 = require("./services/Promotion/promotion.service");
var promotion_component_1 = require("./components/promotion/promotion.component");
var item_service_1 = require("./services/Item/item.service");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            http_1.HttpModule,
            forms_1.FormsModule,
            app_routing_1.routing,
            keepalive_1.NgIdleKeepaliveModule.forRoot(),
        ],
        declarations: [
            app_component_1.AppComponent,
            header_component_1.HeaderComponent,
            sidebar_component_1.SidebarComponent,
            login_component_1.LoginComponent,
            register_component_1.RegisterComponent,
            footer_component_1.FooterComponent,
            receipt_component_1.ReceiptComponent,
            profile_component_1.ProfileComponent,
            dashboard_component_1.DashboardComponent,
            receipts_category_component_1.ReceiptsCategoryComponent,
            addreceipt_components_1.AddReceiptComponent,
            validate_component_1.ValidateComponent,
            loyalitycards_component_1.LoyalityCards,
            promotion_component_1.PromoComponent,
        ],
        bootstrap: [app_component_1.AppComponent],
        providers: [
            authentication_guard_1.AuthenticationGuard,
            authentication_services_1.AuthenticationService,
            user_services_1.UserService,
            receipt_service_1.ReceiptService,
            shops_services_1.ShopsService,
            categorys_service_1.CategorysService,
            loyalityCards_service_1.LoyalityCardsService,
            promotion_service_1.PromoService,
            item_service_1.ItemService
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map