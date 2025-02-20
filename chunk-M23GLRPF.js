import {
  AuthGuard,
  CheckoutComponent,
  PromotionTimerComponent
} from "./chunk-DMRZXG32.js";
import {
  PromotionService
} from "./chunk-YUHDZK45.js";
import {
  ActivatedRoute,
  AuthService,
  CartService,
  ClientService,
  CommonModule,
  CurrencyPipe,
  DatePipe,
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgControlStatusGroup,
  NgForOf,
  NgForm,
  NgIf,
  NgModel,
  NgSelectOption,
  NotificationService,
  OrderService,
  ProductService,
  RequiredValidator,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterModule,
  RouterOutlet,
  SelectControlValueAccessor,
  take,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-3KO5M7KA.js";

// src/app/feature/Dashboard/DashboardComponent/client/client-dashboard.component.ts
var ClientDashboardComponent = class _ClientDashboardComponent {
  // Injection des services nécessaires dans le constructeur
  constructor(authService, router) {
    this.authService = authService;
    this.router = router;
  }
  // Méthode de déconnexion
  logout() {
    if (confirm("\xCAtes-vous s\xFBr de vouloir vous d\xE9connecter ?")) {
      this.authService.logout();
      this.router.navigate(["/login"]);
    }
  }
  static {
    this.\u0275fac = function ClientDashboardComponent_Factory(t) {
      return new (t || _ClientDashboardComponent)(\u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(Router));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ClientDashboardComponent, selectors: [["app-client-dashboard"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 55, vars: 0, consts: [[1, "client-layout"], [1, "sidebar"], [1, "logo"], [1, "nav-links"], ["routerLink", "products", "routerLinkActive", "active"], [1, "icon"], ["routerLink", "prescriptions", "routerLinkActive", "active"], ["routerLink", "/manufacturing/request", "routerLinkActive", "active", 1, "custom-med-link"], ["routerLink", "appointments", "routerLinkActive", "active"], ["routerLink", "cart", "routerLinkActive", "active"], ["routerLink", "orders", "routerLinkActive", "active"], ["routerLink", "profile", "routerLinkActive", "active"], ["routerLink", "/manufacturing/list", "routerLinkActive", "active"], [1, "logout"], [1, "logout-btn", 3, "click"], [1, "main-content"]], template: function ClientDashboardComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "nav", 1)(2, "div", 2)(3, "h1");
        \u0275\u0275text(4, "GOHAN-MED");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "p");
        \u0275\u0275text(6, "Espace Client");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(7, "ul", 3)(8, "li")(9, "a", 4)(10, "span", 5);
        \u0275\u0275text(11, "\u{1F3E5}");
        \u0275\u0275elementEnd();
        \u0275\u0275text(12, " Nos Produits ");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(13, "li")(14, "a", 6)(15, "span", 5);
        \u0275\u0275text(16, "\u{1F4CB}");
        \u0275\u0275elementEnd();
        \u0275\u0275text(17, " Mes Ordonnances ");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(18, "li")(19, "a", 7)(20, "span", 5);
        \u0275\u0275text(21, "\u2697\uFE0F");
        \u0275\u0275elementEnd();
        \u0275\u0275text(22, " Fabrication sur Mesure ");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(23, "li")(24, "a", 8)(25, "span", 5);
        \u0275\u0275text(26, "\u{1F4C5}");
        \u0275\u0275elementEnd();
        \u0275\u0275text(27, " Rendez-vous ");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(28, "li")(29, "a", 9)(30, "span", 5);
        \u0275\u0275text(31, "\u{1F6D2}");
        \u0275\u0275elementEnd();
        \u0275\u0275text(32, " Mon Panier ");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(33, "li")(34, "a", 10)(35, "span", 5);
        \u0275\u0275text(36, "\u{1F4E6}");
        \u0275\u0275elementEnd();
        \u0275\u0275text(37, " Mes Commandes ");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(38, "li")(39, "a", 11)(40, "span", 5);
        \u0275\u0275text(41, "\u{1F464}");
        \u0275\u0275elementEnd();
        \u0275\u0275text(42, " Mon Profil ");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(43, "li")(44, "a", 12)(45, "span", 5);
        \u0275\u0275text(46, "\u{1F9EA}");
        \u0275\u0275elementEnd();
        \u0275\u0275text(47, " Mes Fabrications ");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(48, "div", 13)(49, "button", 14);
        \u0275\u0275listener("click", function ClientDashboardComponent_Template_button_click_49_listener() {
          return ctx.logout();
        });
        \u0275\u0275elementStart(50, "span", 5);
        \u0275\u0275text(51, "\u{1F6AA}");
        \u0275\u0275elementEnd();
        \u0275\u0275text(52, " Se d\xE9connecter ");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(53, "main", 15);
        \u0275\u0275element(54, "router-outlet");
        \u0275\u0275elementEnd()();
      }
    }, dependencies: [CommonModule, RouterModule, RouterOutlet, RouterLink, RouterLinkActive], styles: ['@charset "UTF-8";\n\n\n\n.client-layout[_ngcontent-%COMP%] {\n  display: flex;\n  min-height: 100vh;\n}\n.sidebar[_ngcontent-%COMP%] {\n  width: 250px;\n  background: #0066CC;\n  padding: 1.5rem;\n  color: white;\n  display: flex;\n  flex-direction: column;\n  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);\n}\n.logo[_ngcontent-%COMP%] {\n  padding: 1rem;\n  text-align: center;\n  border-bottom: 1px solid rgba(255, 255, 255, 0.1);\n  margin-bottom: 1.5rem;\n}\n.logo[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  margin: 0;\n  font-weight: bold;\n  color: white;\n}\n.logo[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0.5rem 0 0;\n  font-size: 0.9rem;\n  opacity: 0.8;\n}\n.nav-links[_ngcontent-%COMP%] {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n  flex: 1;\n}\n.nav-links[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  padding: 0.75rem 1rem;\n  color: white;\n  text-decoration: none;\n  border-radius: 6px;\n  margin-bottom: 0.5rem;\n  transition: all 0.2s ease;\n  font-weight: 500;\n}\n.nav-links[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   .icon[_ngcontent-%COMP%] {\n  margin-right: 0.75rem;\n  font-size: 1.2rem;\n}\n.nav-links[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, 0.1);\n  transform: translateX(5px);\n}\n.nav-links[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a.active[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.2);\n  font-weight: bold;\n}\n.logout[_ngcontent-%COMP%] {\n  padding-top: 1rem;\n  border-top: 1px solid rgba(255, 255, 255, 0.1);\n}\n.logout-btn[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 0.75rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: none;\n  color: #FFD2D2;\n  border: 1px solid #FFD2D2;\n  border-radius: 6px;\n  cursor: pointer;\n  font-weight: 500;\n  transition: all 0.2s ease;\n}\n.logout-btn[_ngcontent-%COMP%]   .icon[_ngcontent-%COMP%] {\n  margin-right: 0.5rem;\n}\n.logout-btn[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 210, 210, 0.1);\n  color: white;\n}\n.main-content[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 2rem;\n  background: #f8fafc;\n  overflow-y: auto;\n}\n@media (max-width: 768px) {\n  .client-layout[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .sidebar[_ngcontent-%COMP%] {\n    width: 100%;\n    padding: 1rem;\n  }\n  .nav-links[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n    padding: 1rem;\n    justify-content: center;\n  }\n  .nav-links[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   .icon[_ngcontent-%COMP%] {\n    margin-right: 0.5rem;\n  }\n}\n.custom-med-link[_ngcontent-%COMP%] {\n  background: #4CAF50 !important;\n  color: white !important;\n  border-radius: 20px !important;\n  margin: 0.5rem 0;\n}\n.custom-med-link[_ngcontent-%COMP%]:hover {\n  background: #45a049 !important;\n  transform: translateX(5px) translateY(-2px) !important;\n}\n/*# sourceMappingURL=client-dashboard.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ClientDashboardComponent, { className: "ClientDashboardComponent", filePath: "src\\app\\feature\\Dashboard\\DashboardComponent\\client\\client-dashboard.component.ts", lineNumber: 222 });
})();

// src/app/feature/Dashboard/DashboardComponent/client/profile/client-profile.component.ts
function ClientProfileComponent_Conditional_3_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "form", 5);
    \u0275\u0275listener("ngSubmit", function ClientProfileComponent_Conditional_3_Conditional_23_Template_form_ngSubmit_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.updateProfile());
    });
    \u0275\u0275elementStart(1, "div", 6)(2, "label", 7);
    \u0275\u0275text(3, "Nom");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "input", 8);
    \u0275\u0275twoWayListener("ngModelChange", function ClientProfileComponent_Conditional_3_Conditional_23_Template_input_ngModelChange_4_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.editForm.lastName, $event) || (ctx_r1.editForm.lastName = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 6)(6, "label", 9);
    \u0275\u0275text(7, "Pr\xE9nom");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "input", 10);
    \u0275\u0275twoWayListener("ngModelChange", function ClientProfileComponent_Conditional_3_Conditional_23_Template_input_ngModelChange_8_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.editForm.firstName, $event) || (ctx_r1.editForm.firstName = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 6)(10, "label", 11);
    \u0275\u0275text(11, "Adresse");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "input", 12);
    \u0275\u0275twoWayListener("ngModelChange", function ClientProfileComponent_Conditional_3_Conditional_23_Template_input_ngModelChange_12_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.editForm.address, $event) || (ctx_r1.editForm.address = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "div", 13)(14, "button", 14);
    \u0275\u0275text(15, "Enregistrer");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "button", 15);
    \u0275\u0275listener("click", function ClientProfileComponent_Conditional_3_Conditional_23_Template_button_click_16_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.editMode = false);
    });
    \u0275\u0275text(17, " Annuler ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.editForm.lastName);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.editForm.firstName);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.editForm.address);
  }
}
function ClientProfileComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "label");
    \u0275\u0275text(3, "Nom");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 2)(7, "label");
    \u0275\u0275text(8, "Pr\xE9nom");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "p");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div", 2)(12, "label");
    \u0275\u0275text(13, "Email");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "p");
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "div", 2)(17, "label");
    \u0275\u0275text(18, "Adresse");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "p");
    \u0275\u0275text(20);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "button", 3);
    \u0275\u0275listener("click", function ClientProfileComponent_Conditional_3_Template_button_click_21_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.editMode = true);
    });
    \u0275\u0275text(22, " Modifier le profil ");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(23, ClientProfileComponent_Conditional_3_Conditional_23_Template, 18, 3, "form", 4);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.client.lastName);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.client.firstName);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.client.user.email);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.client.address);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(23, ctx_r1.editMode ? 23 : -1);
  }
}
var ClientProfileComponent = class _ClientProfileComponent {
  // Injection du service ClientService pour interagir avec l'API
  constructor(clientService) {
    this.clientService = clientService;
    this.client = null;
    this.editMode = false;
    this.editForm = {};
  }
  // Méthode appelée lors de l'initialisation du composant
  ngOnInit() {
    this.loadProfile();
  }
  // Méthode pour charger le profil du client via le service
  loadProfile() {
    this.clientService.getClientProfile().subscribe({
      next: (clientData) => {
        if (clientData && clientData.user) {
          this.client = clientData;
          this.editForm = {
            firstName: this.client.firstName,
            lastName: this.client.lastName,
            address: this.client.address
          };
        }
      },
      error: (error) => {
        console.error("Erreur chargement profil:", error);
      }
    });
  }
  // Méthode pour mettre à jour le profil du client
  updateProfile() {
    if (this.client && this.editForm) {
      this.clientService.updateProfile(this.client.clientId, this.editForm).subscribe({
        next: (updatedClient) => {
          if (updatedClient && updatedClient.user) {
            this.client = updatedClient;
            this.editMode = false;
          }
        },
        error: (error) => {
          console.error("Erreur mise \xE0 jour profil:", error);
        }
      });
    }
  }
  static {
    this.\u0275fac = function ClientProfileComponent_Factory(t) {
      return new (t || _ClientProfileComponent)(\u0275\u0275directiveInject(ClientService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ClientProfileComponent, selectors: [["app-client-profile"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 4, vars: 1, consts: [[1, "profile-container"], [1, "profile-info"], [1, "info-group"], [1, "edit-btn", 3, "click"], [1, "edit-form"], [1, "edit-form", 3, "ngSubmit"], [1, "form-group"], ["for", "lastName"], ["id", "lastName", "name", "lastName", "type", "text", "required", "", 3, "ngModelChange", "ngModel"], ["for", "firstName"], ["id", "firstName", "name", "firstName", "type", "text", "required", "", 3, "ngModelChange", "ngModel"], ["for", "address"], ["id", "address", "name", "address", "type", "text", "required", "", 3, "ngModelChange", "ngModel"], [1, "form-actions"], ["type", "submit", 1, "save-btn"], ["type", "button", 1, "cancel-btn", 3, "click"]], template: function ClientProfileComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "h2");
        \u0275\u0275text(2, "Mon Profil");
        \u0275\u0275elementEnd();
        \u0275\u0275template(3, ClientProfileComponent_Conditional_3_Template, 24, 5);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(3);
        \u0275\u0275conditional(3, ctx.client ? 3 : -1);
      }
    }, dependencies: [CommonModule, FormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, NgModel, NgForm], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ClientProfileComponent, { className: "ClientProfileComponent", filePath: "src\\app\\feature\\Dashboard\\DashboardComponent\\client\\profile\\client-profile.component.ts", lineNumber: 99 });
})();

// src/app/components/Product/product-detail.component.ts
function ProductDetailComponent_Conditional_0_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 13);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 14);
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "currency");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 2, ctx_r1.product.price, "EUR"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(5, 5, ctx_r1.product.promotionPrice, "EUR"), " ");
  }
}
function ProductDetailComponent_Conditional_0_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 15);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "currency");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 1, ctx_r1.product.price, "EUR"), " ");
  }
}
function ProductDetailComponent_Conditional_0_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Rupture de stock ");
  }
}
function ProductDetailComponent_Conditional_0_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Ajouter au panier ");
  }
}
function ProductDetailComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "h1");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 3);
    \u0275\u0275element(6, "img", 4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 5)(8, "p", 6);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 7)(11, "p", 8);
    \u0275\u0275template(12, ProductDetailComponent_Conditional_0_Conditional_12_Template, 6, 8)(13, ProductDetailComponent_Conditional_0_Conditional_13_Template, 3, 4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "p", 9);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "div", 10)(17, "button", 11);
    \u0275\u0275listener("click", function ProductDetailComponent_Conditional_0_Template_button_click_17_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.addToCart(ctx_r1.product));
    });
    \u0275\u0275template(18, ProductDetailComponent_Conditional_0_Conditional_18_Template, 1, 0)(19, ProductDetailComponent_Conditional_0_Conditional_19_Template, 1, 0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "button", 12);
    \u0275\u0275text(21, " Retour aux produits ");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.product.name);
    \u0275\u0275advance(2);
    \u0275\u0275property("src", ctx_r1.product.imageUrls[0] || "/assets/placeholder.jpg", \u0275\u0275sanitizeUrl)("alt", ctx_r1.product.name);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.product.description);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("promoted", ctx_r1.product.activePromotion);
    \u0275\u0275advance();
    \u0275\u0275conditional(12, ctx_r1.product.activePromotion ? 12 : 13);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("low-stock", ctx_r1.product.stock < 5);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" Stock disponible: ", ctx_r1.product.stock, " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.product.stock === 0);
    \u0275\u0275advance();
    \u0275\u0275conditional(18, ctx_r1.product.stock === 0 ? 18 : 19);
  }
}
function ProductDetailComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16);
    \u0275\u0275text(1, " Chargement du produit... ");
    \u0275\u0275elementEnd();
  }
}
var ProductDetailComponent = class _ProductDetailComponent {
  constructor(route, productService, notificationService) {
    this.route = route;
    this.productService = productService;
    this.notificationService = notificationService;
  }
  // Vérification de sécurité si nécessaire
  hasActivePromotion() {
    return !!this.product && !!this.product.activePromotion;
  }
  getPromotionalPrice() {
    return this.product?.promotionPrice;
  }
  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get("id"));
    if (id) {
      this.loadProduct(id);
    }
  }
  loadProduct(id) {
    this.productService.getProductById(id).subscribe({
      next: (products) => {
        this.product = products || null;
      },
      error: (error) => {
        console.error("Erreur lors du chargement du produit:", error);
      }
    });
  }
  addToCart(product) {
    this.productService.addToCart(product, 1).subscribe({
      next: () => {
        this.notificationService.success("Produit ajout\xE9 au panier");
      },
      error: (error) => {
        this.notificationService.error("Erreur lors de l'ajout au panier");
        console.error("Error:", error);
      }
    });
  }
  static {
    this.\u0275fac = function ProductDetailComponent_Factory(t) {
      return new (t || _ProductDetailComponent)(\u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(ProductService), \u0275\u0275directiveInject(NotificationService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ProductDetailComponent, selectors: [["app-product-detail"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 2, vars: 1, consts: [[1, "product-detail"], [1, "product-card"], [1, "product-header"], [1, "product-image"], [3, "src", "alt"], [1, "product-content"], [1, "description"], [1, "price-section"], [1, "price"], [1, "stock"], [1, "product-actions"], [1, "add-cart-btn", 3, "click", "disabled"], ["routerLink", "/client/products", 1, "back-btn"], [1, "original-price"], [1, "promotion-price"], [1, "current-price"], [1, "loading-state"]], template: function ProductDetailComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, ProductDetailComponent_Conditional_0_Template, 22, 12, "div", 0)(1, ProductDetailComponent_Conditional_1_Template, 2, 0);
      }
      if (rf & 2) {
        \u0275\u0275conditional(0, ctx.product ? 0 : 1);
      }
    }, dependencies: [CommonModule, CurrencyPipe, RouterLink], styles: ["\n\n.product-detail[_ngcontent-%COMP%] {\n  max-width: 800px;\n  margin: 2rem auto;\n  padding: 0 1rem;\n}\n.product-card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 12px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n  overflow: hidden;\n}\n.product-header[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n  border-bottom: 1px solid #e5e7eb;\n}\n.product-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #1a1a1a;\n  font-size: 1.5rem;\n}\n.product-image[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 400px;\n  overflow: hidden;\n}\n.product-image[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.product-content[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n}\n.product-content[_ngcontent-%COMP%]   .description[_ngcontent-%COMP%] {\n  color: #4b5563;\n  line-height: 1.6;\n  margin-bottom: 1.5rem;\n}\n.price-section[_ngcontent-%COMP%] {\n  margin: 1.5rem 0;\n}\n.price-section[_ngcontent-%COMP%]   .price[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  font-weight: 600;\n}\n.price-section[_ngcontent-%COMP%]   .price.promoted[_ngcontent-%COMP%]   .original-price[_ngcontent-%COMP%] {\n  text-decoration: line-through;\n  color: #9ca3af;\n  font-size: 1.125rem;\n  margin-right: 0.5rem;\n}\n.price-section[_ngcontent-%COMP%]   .price.promoted[_ngcontent-%COMP%]   .promotion-price[_ngcontent-%COMP%] {\n  color: #dc2626;\n}\n.price-section[_ngcontent-%COMP%]   .price[_ngcontent-%COMP%]   .current-price[_ngcontent-%COMP%] {\n  color: #2196F3;\n}\n.stock[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  color: #4b5563;\n}\n.stock.low-stock[_ngcontent-%COMP%] {\n  color: #dc2626;\n}\n.product-actions[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n  display: flex;\n  gap: 1rem;\n  border-top: 1px solid #e5e7eb;\n}\n.product-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  padding: 0.75rem 1.5rem;\n  border-radius: 6px;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.product-actions[_ngcontent-%COMP%]   button.add-cart-btn[_ngcontent-%COMP%] {\n  flex: 1;\n  background: #2196F3;\n  color: white;\n  border: none;\n}\n.product-actions[_ngcontent-%COMP%]   button.add-cart-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #1976D2;\n}\n.product-actions[_ngcontent-%COMP%]   button.add-cart-btn[_ngcontent-%COMP%]:disabled {\n  background: #9ca3af;\n  cursor: not-allowed;\n}\n.product-actions[_ngcontent-%COMP%]   button.back-btn[_ngcontent-%COMP%] {\n  background: white;\n  border: 1px solid #d1d5db;\n  color: #4b5563;\n}\n.product-actions[_ngcontent-%COMP%]   button.back-btn[_ngcontent-%COMP%]:hover {\n  background: #f9fafb;\n}\n.loading-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 3rem;\n  color: #6b7280;\n}\n/*# sourceMappingURL=product-detail.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProductDetailComponent, { className: "ProductDetailComponent", filePath: "src\\app\\components\\Product\\product-detail.component.ts", lineNumber: 204 });
})();

// src/app/components/Cart/cart.component.ts
function CartComponent_div_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 3);
    \u0275\u0275text(1, " Votre panier est vide ");
    \u0275\u0275elementEnd();
  }
}
function CartComponent_div_4_div_1_ng_container_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "span", 19);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 20);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 21);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const item_r3 = \u0275\u0275nextContext().$implicit;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(3, 3, item_r3.product.price, "EUR"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(6, 6, ctx_r3.getItemPrice(item_r3), "EUR"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("(-", item_r3.product.promotion == null ? null : item_r3.product.promotion.discountPercentage, "%)");
  }
}
function CartComponent_div_4_div_1_ng_container_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "span", 22);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const item_r3 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(3, 1, item_r3.product.price, "EUR"));
  }
}
function CartComponent_div_4_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 11)(1, "div", 12)(2, "h3");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 13);
    \u0275\u0275template(5, CartComponent_div_4_div_1_ng_container_5_Template, 9, 9, "ng-container", 14)(6, CartComponent_div_4_div_1_ng_container_6_Template, 4, 4, "ng-container", 14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 15)(8, "button", 16);
    \u0275\u0275listener("click", function CartComponent_div_4_div_1_Template_button_click_8_listener() {
      const item_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.decrementQuantity(item_r3));
    });
    \u0275\u0275text(9, " - ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "span", 17);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "button", 16);
    \u0275\u0275listener("click", function CartComponent_div_4_div_1_Template_button_click_12_listener() {
      const item_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.incrementQuantity(item_r3));
    });
    \u0275\u0275text(13, " + ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "p");
    \u0275\u0275text(15);
    \u0275\u0275pipe(16, "currency");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "button", 18);
    \u0275\u0275listener("click", function CartComponent_div_4_div_1_Template_button_click_17_listener() {
      const item_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.removeItem(item_r3));
    });
    \u0275\u0275text(18, "Supprimer");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r3 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(item_r3.product.name);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r3.hasActivePromotion(item_r3));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r3.hasActivePromotion(item_r3));
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", item_r3.quantity <= 1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(item_r3.quantity);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", item_r3.quantity >= item_r3.product.stock);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("Sous-total: ", \u0275\u0275pipeBind2(16, 7, ctx_r3.getSubTotal(item_r3), "EUR"), "");
  }
}
function CartComponent_div_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 4);
    \u0275\u0275template(1, CartComponent_div_4_div_1_Template, 19, 10, "div", 5);
    \u0275\u0275elementStart(2, "div", 6)(3, "p", 7);
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 8)(7, "button", 9);
    \u0275\u0275listener("click", function CartComponent_div_4_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.clearCart());
    });
    \u0275\u0275text(8, "Vider le panier");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "button", 10);
    \u0275\u0275listener("click", function CartComponent_div_4_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.proceedToCheckout());
    });
    \u0275\u0275text(10, "Commander");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r3.items);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("Total: ", \u0275\u0275pipeBind2(5, 2, ctx_r3.total, "EUR"), "");
  }
}
var CartComponent = class _CartComponent {
  constructor(cartService, promotionService, notificationService, router) {
    this.cartService = cartService;
    this.promotionService = promotionService;
    this.notificationService = notificationService;
    this.router = router;
    this.items = [];
    this.total = 0;
  }
  ngOnInit() {
    this.loadCart();
  }
  loadCart() {
    this.cartService.getCartItems().subscribe({
      next: (items) => {
        this.items = items;
        this.calculateTotal();
      },
      error: () => {
        this.notificationService.error("Erreur lors du chargement du panier");
      }
    });
  }
  hasActivePromotion(item) {
    return !!item.product.promotion && this.isPromotionActive(item.product.promotion);
  }
  incrementQuantity(item) {
    const newQuantity = item.quantity + 1;
    if (newQuantity > item.product.stock) {
      this.notificationService.error("Stock maximum atteint");
      return;
    }
    this.updateCartItemQuantity(item, newQuantity);
  }
  decrementQuantity(item) {
    const newQuantity = item.quantity - 1;
    if (newQuantity < 1) {
      this.notificationService.error("Quantit\xE9 minimum atteinte");
      return;
    }
    this.updateCartItemQuantity(item, newQuantity);
  }
  updateCartItemQuantity(item, newQuantity) {
    this.cartService.updateQuantity(item.id, newQuantity).subscribe({
      next: () => {
        item.quantity = newQuantity;
        this.calculateTotal();
      },
      error: () => {
        this.notificationService.error("Erreur lors de la mise \xE0 jour de la quantit\xE9");
      }
    });
  }
  removeItem(item) {
    this.cartService.removeFromCart(item.id).subscribe({
      next: () => {
        this.items = this.items.filter((i) => i.id !== item.id);
        this.calculateTotal();
      },
      error: () => {
        this.notificationService.error("Erreur lors de la suppression du produit");
      }
    });
  }
  clearCart() {
    this.cartService.clearCart().subscribe({
      next: () => {
        this.items = [];
        this.total = 0;
        this.notificationService.success("Panier vid\xE9");
      },
      error: () => {
        this.notificationService.error("Erreur lors du vidage du panier");
      }
    });
  }
  proceedToCheckout() {
    if (this.items.length === 0) {
      this.notificationService.error("Votre panier est vide");
      return;
    }
    this.router.navigate(["/client/checkout"]).then(
      () => this.notificationService.success("Redirection vers le checkout"),
      // Redirige vers la page de checkout
      () => this.notificationService.error("Erreur lors de l'acc\xE8s au checkout")
      // Affiche une erreur en cas d'échec
    );
  }
  getItemPrice(item) {
    if (this.hasActivePromotion(item)) {
      return item.product.price * (1 - (item.product.promotion?.discountPercentage || 0) / 100);
    }
    return item.product.price;
  }
  getSubTotal(item) {
    return this.getItemPrice(item) * item.quantity;
  }
  calculateTotal() {
    this.total = this.items.reduce((sum, item) => sum + this.getSubTotal(item), 0);
  }
  getDiscountedPrice(product) {
    if (!product.activePromotion || !this.isPromotionActive(product.activePromotion)) {
      return product.price;
    }
    const discount = product.activePromotion.discountPercentage;
    const discountedPrice = product.price * (1 - discount / 100);
    return Number(discountedPrice.toFixed(2));
  }
  isPromotionActive(promotion) {
    if (!promotion)
      return false;
    const now = /* @__PURE__ */ new Date();
    const startDate = new Date(promotion.startDate);
    const endDate = new Date(promotion.endDate);
    return now >= startDate && now <= endDate;
  }
  static {
    this.\u0275fac = function CartComponent_Factory(t) {
      return new (t || _CartComponent)(\u0275\u0275directiveInject(CartService), \u0275\u0275directiveInject(PromotionService), \u0275\u0275directiveInject(NotificationService), \u0275\u0275directiveInject(Router));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CartComponent, selectors: [["app-cart"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 5, vars: 2, consts: [[1, "cart-container"], ["class", "empty-cart", 4, "ngIf"], ["class", "cart-items", 4, "ngIf"], [1, "empty-cart"], [1, "cart-items"], ["class", "cart-item", 4, "ngFor", "ngForOf"], [1, "cart-summary"], [1, "total"], [1, "cart-actions"], [1, "clear-btn", 3, "click"], [1, "checkout-btn", 3, "click"], [1, "cart-item"], [1, "item-info"], [1, "price-container"], [4, "ngIf"], [1, "quantity-controls"], [1, "quantity-btn", 3, "click", "disabled"], [1, "quantity"], [1, "remove-btn", 3, "click"], [1, "original-price"], [1, "promo-price"], [1, "discount"], [1, "price"]], template: function CartComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "h2");
        \u0275\u0275text(2, "Mon Panier");
        \u0275\u0275elementEnd();
        \u0275\u0275template(3, CartComponent_div_3_Template, 2, 0, "div", 1)(4, CartComponent_div_4_Template, 11, 5, "div", 2);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(3);
        \u0275\u0275property("ngIf", ctx.items.length === 0);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.items.length > 0);
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, CurrencyPipe], styles: ["\n\n.cart-container[_ngcontent-%COMP%] {\n  padding: 20px;\n  max-width: 800px;\n  margin: 0 auto;\n}\n.cart-item[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 15px;\n  margin-bottom: 10px;\n  border: 1px solid #ddd;\n  border-radius: 4px;\n}\n.quantity-controls[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  margin: 1rem 0;\n}\n.quantity-btn[_ngcontent-%COMP%] {\n  padding: 0.5rem 1rem;\n  background-color: #4f46e5;\n  color: white;\n  border: none;\n  border-radius: 4px;\n  cursor: pointer;\n  transition: background-color 0.2s;\n}\n.quantity-btn[_ngcontent-%COMP%]:disabled {\n  background-color: #9ca3af;\n  cursor: not-allowed;\n}\n.remove-btn[_ngcontent-%COMP%] {\n  padding: 5px 10px;\n  background: #dc2626;\n  color: white;\n  border: none;\n  border-radius: 4px;\n  cursor: pointer;\n}\n.cart-summary[_ngcontent-%COMP%] {\n  margin-top: 20px;\n  padding: 15px;\n  border-top: 2px solid #ddd;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.total[_ngcontent-%COMP%] {\n  font-size: 1.2em;\n  font-weight: bold;\n}\n.checkout-btn[_ngcontent-%COMP%] {\n  padding: 10px 20px;\n  background: #059669;\n  color: white;\n  border: none;\n  border-radius: 4px;\n  cursor: pointer;\n  font-weight: bold;\n}\n.clear-btn[_ngcontent-%COMP%] {\n  padding: 10px 20px;\n  background: #dc2626;\n  color: white;\n  border: none;\n  border-radius: 4px;\n  cursor: pointer;\n  margin-right: 10px;\n}\n.empty-cart[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 20px;\n  color: #666;\n}\n/*# sourceMappingURL=cart.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CartComponent, { className: "CartComponent", filePath: "src\\app\\components\\Cart\\cart.component.ts", lineNumber: 16 });
})();

// src/app/feature/Dashboard/DashboardComponent/client/Products/client-products.component.ts
var _forTrack0 = ($index, $item) => $item.id_product;
function ClientProductsComponent_option_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 12);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const type_r1 = ctx.$implicit;
    \u0275\u0275property("value", type_r1.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", type_r1.label, " ");
  }
}
function ClientProductsComponent_For_18_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15);
    \u0275\u0275element(1, "app-promotion-timer", 25);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const product_r3 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("endDate", product_r3.activePromotion.endDate);
  }
}
function ClientProductsComponent_For_18_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16);
    \u0275\u0275text(1, "Stock limit\xE9");
    \u0275\u0275elementEnd();
  }
}
function ClientProductsComponent_For_18_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 21)(1, "span", 26);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 27);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "currency");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const product_r3 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(3, 2, product_r3.price, "EUR"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(6, 5, product_r3.promotionPrice, "EUR"));
  }
}
function ClientProductsComponent_For_18_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 28);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "currency");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const product_r3 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(2, 1, product_r3.price, "EUR"));
  }
}
function ClientProductsComponent_For_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 11)(1, "div", 13);
    \u0275\u0275element(2, "img", 14);
    \u0275\u0275template(3, ClientProductsComponent_For_18_Conditional_3_Template, 2, 1, "div", 15)(4, ClientProductsComponent_For_18_Conditional_4_Template, 2, 0, "div", 16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 17)(6, "h3");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p", 18);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 19)(11, "div", 20);
    \u0275\u0275template(12, ClientProductsComponent_For_18_Conditional_12_Template, 7, 8, "div", 21)(13, ClientProductsComponent_For_18_Conditional_13_Template, 3, 4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div", 22)(15, "span", 23);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(17, "button", 24);
    \u0275\u0275listener("click", function ClientProductsComponent_For_18_Template_button_click_17_listener() {
      const product_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.addToCart(product_r3));
    });
    \u0275\u0275text(18);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const product_r3 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("src", "assets/" + ctx_r3.getImageFilename(product_r3.name), \u0275\u0275sanitizeUrl)("alt", product_r3.name);
    \u0275\u0275advance();
    \u0275\u0275conditional(3, product_r3.activePromotion ? 3 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(4, product_r3.stock < 5 && product_r3.stock > 0 ? 4 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(product_r3.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(product_r3.description);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(12, product_r3.activePromotion ? 12 : 13);
    \u0275\u0275advance(3);
    \u0275\u0275classProp("low-stock", product_r3.stock < 5);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" Stock: ", product_r3.stock, " ");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", !ctx_r3.isProductAvailable(product_r3));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", !ctx_r3.isProductAvailable(product_r3) ? "Rupture de stock" : "Ajouter au panier", " ");
  }
}
var ClientProductsComponent = class _ClientProductsComponent {
  // Constructeur du composant avec injection des services nécessaires
  constructor(productService, cartService, notificationService) {
    this.productService = productService;
    this.cartService = cartService;
    this.notificationService = notificationService;
    this.products = [];
    this.allProducts = [];
    this.selectedType = "tous";
    this.sortOrder = "default";
    this.typeOptions = [
      { value: "tous", label: "Tous les produits" },
      // Option pour afficher tous les produits
      { value: "promos", label: "En promotion" },
      // Option pour afficher les produits en promotion
      { value: "1", label: "M\xE9dicaments sans ordonnance" },
      // Option pour filtrer les médicaments sans ordonnance
      { value: "2", label: "M\xE9dicaments sur ordonnance" },
      // Option pour filtrer les médicaments sur ordonnance
      { value: "3", label: "Mat\xE9riel m\xE9dical" },
      // Option pour filtrer le matériel médical
      { value: "4", label: "Compl\xE9ments alimentaires" },
      // Option pour filtrer les compléments alimentaires
      { value: "5", label: "Hygi\xE8ne et soins" },
      // Option pour filtrer les produits d'hygiène et de soins
      { value: "6", label: "Premiers secours" },
      // Option pour filtrer les produits de premiers secours
      { value: "7", label: "Pr\xE9parations magistrales" },
      // Option pour filtrer les préparations magistrales
      { value: "8", label: "Orthop\xE9die" },
      // Option pour filtrer les produits d'orthopédie
      { value: "9", label: "Maternit\xE9 et b\xE9b\xE9" },
      // Option pour filtrer les produits de maternité et bébé
      { value: "10", label: "Maintien \xE0 domicile" }
      // Option pour filtrer les produits pour maintien à domicile
    ];
  }
  // Méthode exécutée au moment de l'initialisation du composant
  ngOnInit() {
    this.loadProducts();
  }
  // Méthode pour filtrer les produits en fonction du type sélectionné
  filterProducts() {
    if (this.selectedType === "tous") {
      this.products = [...this.allProducts];
    } else if (this.selectedType === "promos") {
      this.products = this.allProducts.filter((product) => product.activePromotion);
    } else {
      const selectedTypeId = parseInt(this.selectedType);
      this.products = this.allProducts.filter((product) => product.typeId === selectedTypeId);
    }
    this.sortProducts();
  }
  // Méthode pour trier les produits selon l'ordre sélectionné
  sortProducts() {
    this.products.sort((a, b) => {
      const priceA = a.activePromotion ? this.getDiscountedPrice(a) : a.price;
      const priceB = b.activePromotion ? this.getDiscountedPrice(b) : b.price;
      switch (this.sortOrder) {
        case "prixCroissant":
          return priceA - priceB;
        case "prixDecroissant":
          return priceB - priceA;
        case "promotion":
          return (b.activePromotion ? 1 : 0) - (a.activePromotion ? 1 : 0);
        default:
          return 0;
      }
    });
  }
  // Méthode pour déterminer le nom de fichier de l'image en fonction du nom du produit
  getImageFilename(productName) {
    const name = productName.toLowerCase();
    if (name.includes("parac\xE9tamol"))
      return "paracetamol.jpg";
    if (name.includes("ibuprof\xE8ne"))
      return "ibuprofene.jpg";
    if (name.includes("antibiotique"))
      return "antibiotique.jpg";
    if (name.includes("cr\xE8me main"))
      return "cr\xE8memain.jpg";
    if (name.includes("vitamine"))
      return "vitamine-d.jpg";
    if (name.includes("omega"))
      return "omega.jpg";
    return "default-product.jpg";
  }
  // Vérifie la disponibilité d'un produit (en stock ou non)
  isProductAvailable(product) {
    return product.stock > 0;
  }
  // Méthode pour ajouter un produit au panier
  addToCart(product) {
    const clientId = localStorage.getItem("clientId");
    if (!clientId) {
      this.notificationService.error("Veuillez vous connecter pour ajouter au panier");
      return;
    }
    if (!this.isProductAvailable(product)) {
      this.notificationService.error("Ce produit est en rupture de stock");
      return;
    }
    this.cartService.getCartItems().pipe(take(1)).subscribe((items) => {
      const cartItem = items.find((item) => item.product.id_product === product.id_product);
      if (cartItem && cartItem.quantity >= product.stock) {
        this.notificationService.error("Stock maximum atteint pour ce produit");
        return;
      }
      const finalPrice = product.activePromotion ? this.getDiscountedPrice(product) : product.price;
      this.cartService.addToCart(product.id_product, 1).subscribe({
        next: () => {
          this.notificationService.success("Produit ajout\xE9 au panier");
          this.loadProducts();
        },
        error: (error) => {
          console.error("Erreur lors de l'ajout au panier:", error);
          this.notificationService.error("Erreur lors de l'ajout au panier");
        }
      });
    });
  }
  // Méthode pour charger tous les produits depuis le service
  loadProducts() {
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        console.log("Products received in component:", products);
        this.allProducts = products;
        this.products = [...this.allProducts];
        this.filterProducts();
      },
      error: (error) => {
        console.error("Error loading products:", error);
        this.notificationService.error("Erreur lors du chargement des produits");
      }
    });
  }
  // Méthode pour formater la date de fin d'une promotion
  getEndDateFormatted(promotion) {
    if (!promotion || !promotion.endDate) {
      return "";
    }
    const endDate = new Date(promotion.endDate);
    const options = {
      day: "numeric",
      month: "long",
      year: "numeric"
    };
    return endDate.toLocaleDateString("fr-FR", options);
  }
  // Méthode pour obtenir le statut d'une promotion
  getPromotionStatus(promotion) {
    if (!promotion || !this.isPromotionActive(promotion)) {
      return { type: "normal", message: "" };
    }
    const now = /* @__PURE__ */ new Date();
    const endDate = new Date(promotion.endDate);
    const diffDays = Math.ceil((endDate.getTime() - now.getTime()) / (1e3 * 60 * 60 * 24));
    if (diffDays <= 1) {
      return {
        type: "last-day",
        // Si la promotion se termine dans la journée, retour "Dernier jour"
        message: "Dernier jour !"
      };
    }
    if (diffDays <= 3) {
      return {
        type: "ending-soon",
        // Si la promotion se termine dans 3 jours ou moins, retour "Plus que X jours !"
        message: `Plus que ${diffDays} jours !`
      };
    }
    return {
      type: "normal",
      // Si la promotion dure encore longtemps, affiche la date de fin
      message: `Jusqu'au ${this.getEndDateFormatted(promotion)}`
    };
  }
  // Vérifie si une promotion est encore active
  isPromotionActive(promotion) {
    if (!promotion)
      return false;
    const now = /* @__PURE__ */ new Date();
    const startDate = new Date(promotion.startDate);
    const endDate = new Date(promotion.endDate);
    return now >= startDate && now <= endDate;
  }
  // Calcule le prix après application de la réduction d'une promotion
  getDiscountedPrice(product) {
    if (product.activePromotion && this.isPromotionActive(product.activePromotion)) {
      const discountAmount = product.price * (product.activePromotion.discountPercentage / 100);
      return Number((product.price - discountAmount).toFixed(2));
    }
    return product.price;
  }
  static {
    this.\u0275fac = function ClientProductsComponent_Factory(t) {
      return new (t || _ClientProductsComponent)(\u0275\u0275directiveInject(ProductService), \u0275\u0275directiveInject(CartService), \u0275\u0275directiveInject(NotificationService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ClientProductsComponent, selectors: [["app-client-products"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 19, vars: 3, consts: [[1, "products-container"], [1, "page-header"], [1, "filter-container"], [1, "type-filter", 3, "ngModelChange", "change", "ngModel"], [3, "value", 4, "ngFor", "ngForOf"], [1, "price-filter", 3, "ngModelChange", "change", "ngModel"], ["value", "default"], ["value", "prixCroissant"], ["value", "prixDecroissant"], ["value", "promotion"], [1, "products-grid"], [1, "product-card"], [3, "value"], [1, "product-image"], [3, "src", "alt"], [1, "promo-container"], [1, "stock-badge"], [1, "product-info"], [1, "description"], [1, "product-details"], [1, "price-container"], [1, "prices"], [1, "stock-info"], [1, "stock"], [1, "add-to-cart-btn", 3, "click", "disabled"], [3, "endDate"], [1, "original-price"], [1, "promo-price"], [1, "price"]], template: function ClientProductsComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "header", 1)(2, "h2");
        \u0275\u0275text(3, "Nos Produits");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "div", 2)(5, "select", 3);
        \u0275\u0275twoWayListener("ngModelChange", function ClientProductsComponent_Template_select_ngModelChange_5_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.selectedType, $event) || (ctx.selectedType = $event);
          return $event;
        });
        \u0275\u0275listener("change", function ClientProductsComponent_Template_select_change_5_listener() {
          return ctx.filterProducts();
        });
        \u0275\u0275template(6, ClientProductsComponent_option_6_Template, 2, 2, "option", 4);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(7, "select", 5);
        \u0275\u0275twoWayListener("ngModelChange", function ClientProductsComponent_Template_select_ngModelChange_7_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.sortOrder, $event) || (ctx.sortOrder = $event);
          return $event;
        });
        \u0275\u0275listener("change", function ClientProductsComponent_Template_select_change_7_listener() {
          return ctx.sortProducts();
        });
        \u0275\u0275elementStart(8, "option", 6);
        \u0275\u0275text(9, "Tri par d\xE9faut");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(10, "option", 7);
        \u0275\u0275text(11, "Prix croissant");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(12, "option", 8);
        \u0275\u0275text(13, "Prix d\xE9croissant");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(14, "option", 9);
        \u0275\u0275text(15, "Promotions d'abord");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(16, "div", 10);
        \u0275\u0275repeaterCreate(17, ClientProductsComponent_For_18_Template, 19, 12, "div", 11, _forTrack0);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275advance(5);
        \u0275\u0275twoWayProperty("ngModel", ctx.selectedType);
        \u0275\u0275advance();
        \u0275\u0275property("ngForOf", ctx.typeOptions);
        \u0275\u0275advance();
        \u0275\u0275twoWayProperty("ngModel", ctx.sortOrder);
        \u0275\u0275advance(10);
        \u0275\u0275repeater(ctx.products);
      }
    }, dependencies: [CommonModule, NgForOf, CurrencyPipe, RouterModule, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, SelectControlValueAccessor, NgControlStatus, NgModel, PromotionTimerComponent], styles: ["\n\n.products-container[_ngcontent-%COMP%] {\n  padding: 20px;\n  max-width: 1200px;\n  margin: 0 auto;\n}\n.prices[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.25rem;\n}\n.original-price[_ngcontent-%COMP%] {\n  text-decoration: line-through;\n  color: #6b7280;\n  font-size: 0.9em;\n}\n.promo-price[_ngcontent-%COMP%] {\n  color: #dc2626;\n  font-weight: bold;\n  font-size: 1.25rem;\n}\n.price-container[_ngcontent-%COMP%]   .prices[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n.price-container[_ngcontent-%COMP%]   .prices[_ngcontent-%COMP%]   .original-price[_ngcontent-%COMP%] {\n  text-decoration: line-through;\n  color: #6b7280;\n  font-size: 0.9rem;\n}\n.price-container[_ngcontent-%COMP%]   .prices[_ngcontent-%COMP%]   .promo-price[_ngcontent-%COMP%] {\n  color: #dc2626;\n  font-weight: bold;\n  font-size: 1.25rem;\n}\n.price-container[_ngcontent-%COMP%]   .prices[_ngcontent-%COMP%]   .promo-badge[_ngcontent-%COMP%] {\n  background: #dc2626;\n  color: white;\n  padding: 0.25rem 0.5rem;\n  border-radius: 0.25rem;\n  font-size: 0.875rem;\n  display: inline-block;\n}\n.price-container[_ngcontent-%COMP%]   .price[_ngcontent-%COMP%] {\n  font-size: 1.25rem;\n  font-weight: 600;\n  color: #4f46e5;\n}\n.promo-label[_ngcontent-%COMP%] {\n  background: #dc2626;\n  color: white;\n  padding: 2px 6px;\n  border-radius: 4px;\n  font-size: 0.75rem;\n  font-weight: bold;\n  display: inline-block;\n  margin-top: 0.25rem;\n}\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 2rem;\n}\n.filter-container[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 1rem;\n}\n.promo-container[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 10px;\n  right: 10px;\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  align-items: flex-end;\n}\n.promo-duration[_ngcontent-%COMP%] {\n  background: rgba(0, 0, 0, 0.7);\n  color: white;\n  padding: 4px 8px;\n  border-radius: 4px;\n  font-size: 0.75rem;\n}\n.promo-duration.ending-soon[_ngcontent-%COMP%] {\n  background: #f59e0b;\n  font-weight: bold;\n}\n.promo-duration.last-day[_ngcontent-%COMP%] {\n  background: #dc2626;\n  font-weight: bold;\n  animation: _ngcontent-%COMP%_pulse 2s infinite;\n}\n@keyframes _ngcontent-%COMP%_pulse {\n  0% {\n    opacity: 1;\n  }\n  50% {\n    opacity: 0.6;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n.type-filter[_ngcontent-%COMP%], .price-filter[_ngcontent-%COMP%] {\n  padding: 8px 12px;\n  border-radius: 6px;\n  border: 1px solid #e5e7eb;\n  background-color: white;\n  font-size: 0.95rem;\n  cursor: pointer;\n  min-width: 200px;\n}\n.type-filter[_ngcontent-%COMP%]:focus, .price-filter[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #4f46e5;\n  box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.1);\n}\n.products-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));\n  gap: 2rem;\n}\n.product-card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 8px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n  overflow: hidden;\n  transition: transform 0.2s ease, box-shadow 0.2s ease;\n}\n.product-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\n}\n.product-image[_ngcontent-%COMP%] {\n  position: relative;\n  width: 100%;\n  height: 200px;\n  overflow: hidden;\n  background-color: #f3f4f6;\n}\n.product-image[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  transition: transform 0.3s ease;\n}\n.promo-badge[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 10px;\n  right: 10px;\n  background: #dc2626;\n  color: white;\n  padding: 4px 8px;\n  border-radius: 4px;\n  font-weight: bold;\n}\n.stock-badge[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 10px;\n  left: 10px;\n  background: #fef3c7;\n  color: #92400e;\n  padding: 4px 8px;\n  border-radius: 4px;\n  font-size: 0.875rem;\n}\n.product-info[_ngcontent-%COMP%] {\n  padding: 1rem;\n}\n.product-info[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 1.25rem;\n  font-weight: 600;\n  margin-bottom: 0.5rem;\n}\n.product-info[_ngcontent-%COMP%]   .description[_ngcontent-%COMP%] {\n  color: #6b7280;\n  font-size: 0.875rem;\n  line-height: 1.4;\n}\n.price-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.original-price[_ngcontent-%COMP%] {\n  text-decoration: line-through;\n  color: #6b7280;\n  font-size: 0.9em;\n}\n.promo-price[_ngcontent-%COMP%] {\n  color: #dc2626;\n  font-weight: bold;\n  font-size: 1.25rem;\n}\n.price[_ngcontent-%COMP%] {\n  font-size: 1.25rem;\n  font-weight: 600;\n  color: #4f46e5;\n}\n.stock[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n}\n.stock.low-stock[_ngcontent-%COMP%] {\n  color: #dc2626;\n}\n.add-to-cart-btn[_ngcontent-%COMP%] {\n  width: 100%;\n  background: #4f46e5;\n  color: white;\n  padding: 10px;\n  border: none;\n  border-radius: 4px;\n  margin-top: 10px;\n  cursor: pointer;\n  font-weight: 500;\n  transition: background-color 0.2s;\n}\n.add-to-cart-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #4338ca;\n}\n.add-to-cart-btn[_ngcontent-%COMP%]:disabled {\n  background: #9ca3af;\n  cursor: not-allowed;\n}\n.product-details[_ngcontent-%COMP%] {\n  margin: 1rem 0;\n}\n.prices[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.25rem;\n}\n.original-price[_ngcontent-%COMP%] {\n  text-decoration: line-through;\n  color: #6b7280;\n  font-size: 0.9em;\n}\n.promo-price[_ngcontent-%COMP%] {\n  color: #dc2626;\n  font-weight: bold;\n  font-size: 1.25rem;\n}\n.price-container[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 1rem;\n}\n/*# sourceMappingURL=client-products.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ClientProductsComponent, { className: "ClientProductsComponent", filePath: "src\\app\\feature\\Dashboard\\DashboardComponent\\client\\Products\\client-products.component.ts", lineNumber: 407 });
})();

// src/app/feature/Dashboard/DashboardComponent/client/orders/client-orders.component.ts
var _forTrack02 = ($index, $item) => $item.id_order;
var _forTrack1 = ($index, $item) => $item.id_order_detail;
function ClientOrdersComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 1);
    \u0275\u0275text(1, "Chargement des commandes...");
    \u0275\u0275elementEnd();
  }
}
function ClientOrdersComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.error);
  }
}
function ClientOrdersComponent_Conditional_5_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 3);
    \u0275\u0275text(1, " Vous n'avez pas encore de commande ");
    \u0275\u0275elementEnd();
  }
}
function ClientOrdersComponent_Conditional_5_Conditional_1_For_2_Conditional_10_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16)(1, "span", 17);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 18);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 19)(6, "span", 20);
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span", 21);
    \u0275\u0275text(10);
    \u0275\u0275pipe(11, "currency");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const detail_r3 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(detail_r3.product.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("x", detail_r3.quantity, "");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(8, 4, detail_r3.product.price, "EUR"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(11, 7, detail_r3.unit_price, "EUR"));
  }
}
function ClientOrdersComponent_Conditional_5_Conditional_1_For_2_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11);
    \u0275\u0275repeaterCreate(1, ClientOrdersComponent_Conditional_5_Conditional_1_For_2_Conditional_10_For_2_Template, 12, 10, "div", 16, _forTrack1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const order_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275repeater(order_r4.orderDetails);
  }
}
function ClientOrdersComponent_Conditional_5_Conditional_1_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 5)(1, "div", 6)(2, "span", 7);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 8)(5, "span", 9);
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span", 10);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(10, ClientOrdersComponent_Conditional_5_Conditional_1_For_2_Conditional_10_Template, 3, 0, "div", 11);
    \u0275\u0275elementStart(11, "div", 12)(12, "div", 13)(13, "span", 14);
    \u0275\u0275text(14);
    \u0275\u0275pipe(15, "currency");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "button", 15);
    \u0275\u0275listener("click", function ClientOrdersComponent_Conditional_5_Conditional_1_For_2_Template_button_click_16_listener() {
      const order_r4 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.viewOrderDetails(order_r4.id_order));
    });
    \u0275\u0275text(17, " Voir le d\xE9tail ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const order_r4 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("Commande #", order_r4.id_order, "");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(7, 7, order_r4.date_order, "dd/MM/yyyy"));
    \u0275\u0275advance(2);
    \u0275\u0275classMap(ctx_r0.getStatusClass(order_r4.id_statut));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.getStatusLabel(order_r4.id_statut), " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(10, order_r4.orderDetails && order_r4.orderDetails.length > 0 ? 10 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" Total: ", \u0275\u0275pipeBind2(15, 10, order_r4.montant_total, "EUR"), " ");
  }
}
function ClientOrdersComponent_Conditional_5_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4);
    \u0275\u0275repeaterCreate(1, ClientOrdersComponent_Conditional_5_Conditional_1_For_2_Template, 18, 13, "div", 5, _forTrack02);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.orders);
  }
}
function ClientOrdersComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, ClientOrdersComponent_Conditional_5_Conditional_0_Template, 2, 0, "div", 3)(1, ClientOrdersComponent_Conditional_5_Conditional_1_Template, 3, 0);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275conditional(0, ctx_r0.orders.length === 0 ? 0 : 1);
  }
}
var ClientOrdersComponent = class _ClientOrdersComponent {
  constructor(orderService, notificationService, router, promotionService, authService) {
    this.orderService = orderService;
    this.notificationService = notificationService;
    this.router = router;
    this.promotionService = promotionService;
    this.authService = authService;
    this.orders = [];
    this.loading = false;
    this.error = null;
  }
  ngOnInit() {
    this.loadOrders();
  }
  // Fonction pour charger les commandes du client
  loadOrders() {
    this.loading = true;
    this.error = null;
    const clientId = this.getCurrentClientId();
    if (!clientId) {
      this.error = "Impossible de r\xE9cup\xE9rer l'ID client";
      this.loading = false;
      return;
    }
    this.orderService.getOrdersByClientId(clientId).subscribe({
      next: (orders) => {
        console.log("Orders received:", orders);
        orders.forEach((order) => {
          console.log(`Order #${order.id_order}:`);
          order.orderDetails?.forEach((detail) => {
            console.log(`  Product: ${detail.product.name}`);
            console.log(`  Unit price saved: ${detail.unit_price}`);
            console.log(`  Original price: ${detail.product.price}`);
          });
        });
        this.orders = this.sortOrdersByDate(orders);
        this.loading = false;
      },
      error: (error) => {
        console.error("Erreur:", error);
        this.error = "Erreur lors du chargement des commandes";
        this.loading = false;
      }
    });
  }
  // Fonction pour trier les commandes par date (les plus récentes en premier)
  sortOrdersByDate(orders) {
    return orders.sort((a, b) => new Date(b.date_order).getTime() - new Date(a.date_order).getTime());
  }
  // Fonction pour récupérer l'ID du client courant depuis le localStorage
  getCurrentClientId() {
    const clientIdStr = localStorage.getItem("clientId");
    if (!clientIdStr) {
      this.notificationService.error("Session expir\xE9e");
      this.router.navigate(["/login"]);
      return null;
    }
    const clientId = parseInt(clientIdStr, 10);
    return isNaN(clientId) ? null : clientId;
  }
  // Fonction pour obtenir l'étiquette du statut de la commande
  getStatusLabel(statusId) {
    const statusMap = {
      1: "En attente",
      2: "En cours de traitement",
      3: "Exp\xE9di\xE9",
      4: "Livr\xE9",
      5: "Annul\xE9"
    };
    return statusMap[statusId] || "Statut inconnu";
  }
  // Fonction pour obtenir la classe CSS associée au statut de la commande
  getStatusClass(statusId) {
    return `status status-${statusId}`;
  }
  // Fonction pour naviguer vers les détails d'une commande
  viewOrderDetails(orderId) {
    this.router.navigate(["/client/orders", orderId]);
  }
  // Fonction pour vérifier si le prix unitaire a changé par rapport au prix original
  hasPriceChanged(detail) {
    return detail.unit_price !== detail.product.price;
  }
  static {
    this.\u0275fac = function ClientOrdersComponent_Factory(t) {
      return new (t || _ClientOrdersComponent)(\u0275\u0275directiveInject(OrderService), \u0275\u0275directiveInject(NotificationService), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(PromotionService), \u0275\u0275directiveInject(AuthService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ClientOrdersComponent, selectors: [["app-client-orders"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 6, vars: 3, consts: [[1, "orders-container"], [1, "loading"], [1, "error"], [1, "empty-state"], [1, "orders-list"], [1, "order-card"], [1, "order-header"], [1, "order-number"], [1, "order-info"], [1, "order-date"], [1, "status"], [1, "order-products"], [1, "order-footer"], [1, "order-totals"], [1, "order-total"], [1, "details-btn", 3, "click"], [1, "product-item"], [1, "product-name"], [1, "product-quantity"], [1, "price-info"], [1, "original-price"], [1, "final-price"]], template: function ClientOrdersComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "h2");
        \u0275\u0275text(2, "Mes Commandes");
        \u0275\u0275elementEnd();
        \u0275\u0275template(3, ClientOrdersComponent_Conditional_3_Template, 2, 0, "div", 1)(4, ClientOrdersComponent_Conditional_4_Template, 2, 1, "div", 2)(5, ClientOrdersComponent_Conditional_5_Template, 2, 1);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(3);
        \u0275\u0275conditional(3, ctx.loading ? 3 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(4, ctx.error ? 4 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(5, !ctx.loading && !ctx.error ? 5 : -1);
      }
    }, dependencies: [CommonModule, CurrencyPipe, DatePipe, RouterModule], styles: ["\n\n.orders-container[_ngcontent-%COMP%] {\n  padding: 20px;\n  max-width: 1000px;\n  margin: 0 auto;\n}\n.order-card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 8px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n  margin-bottom: 20px;\n  padding: 20px;\n}\n.order-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 15px;\n  padding-bottom: 10px;\n  border-bottom: 1px solid #eee;\n}\n.status[_ngcontent-%COMP%] {\n  padding: 5px 10px;\n  border-radius: 15px;\n  font-size: 0.9em;\n}\n.order-footer[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding-top: 15px;\n}\n.order-total[_ngcontent-%COMP%] {\n  font-weight: bold;\n  font-size: 1.1em;\n}\n.details-btn[_ngcontent-%COMP%] {\n  background: #4f46e5;\n  color: white;\n  border: none;\n  padding: 8px 16px;\n  border-radius: 6px;\n  cursor: pointer;\n  font-weight: 500;\n  transition: background-color 0.2s;\n}\n.details-btn[_ngcontent-%COMP%]:hover {\n  background: #4338ca;\n}\n.status-1[_ngcontent-%COMP%] {\n  background: #fff3cd;\n  color: #856404;\n}\n.status-2[_ngcontent-%COMP%] {\n  background: #cce5ff;\n  color: #004085;\n}\n.status-3[_ngcontent-%COMP%] {\n  background: #d4edda;\n  color: #155724;\n}\n.status-4[_ngcontent-%COMP%] {\n  background: #d4edda;\n  color: #155724;\n}\n.status-5[_ngcontent-%COMP%] {\n  background: #f8d7da;\n  color: #721c24;\n}\n.status-unknown[_ngcontent-%COMP%] {\n  background: #e9ecef;\n  color: #495057;\n}\n.empty-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 40px;\n  background: #f9fafb;\n  border-radius: 8px;\n  color: #6b7280;\n}\n/*# sourceMappingURL=client-orders.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ClientOrdersComponent, { className: "ClientOrdersComponent", filePath: "src\\app\\feature\\Dashboard\\DashboardComponent\\client\\orders\\client-orders.component.ts", lineNumber: 159 });
})();

// src/app/feature/Dashboard/DashboardComponent/client/orders/client-order-detail.component.ts
var _forTrack03 = ($index, $item) => $item.id_order_detail;
function ClientOrderDetailComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 1);
    \u0275\u0275text(1, "Chargement des d\xE9tails...");
    \u0275\u0275elementEnd();
  }
}
function ClientOrderDetailComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.error);
  }
}
function ClientOrderDetailComponent_Conditional_3_For_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9)(1, "div", 15)(2, "h4");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "div", 16)(5, "div", 17);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 18)(8, "span", 19);
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "span", 20);
    \u0275\u0275text(12);
    \u0275\u0275pipe(13, "currency");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const detail_r3 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(detail_r3.product.name);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" Quantit\xE9: ", detail_r3.quantity, " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(10, 4, detail_r3.unit_price, "EUR"), " / unit\xE9");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(13, 7, detail_r3.quantity * detail_r3.unit_price, "EUR"));
  }
}
function ClientOrderDetailComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 3)(1, "div", 4)(2, "div", 5)(3, "h2");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 6);
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "span", 7);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 8)(11, "h3");
    \u0275\u0275text(12, "Produits command\xE9s");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(13, ClientOrderDetailComponent_Conditional_3_For_14_Template, 14, 10, "div", 9, _forTrack03);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "div", 10)(16, "div", 11)(17, "span");
    \u0275\u0275text(18, "Total de la commande:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "span", 12);
    \u0275\u0275text(20);
    \u0275\u0275pipe(21, "currency");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(22, "div", 13)(23, "button", 14);
    \u0275\u0275listener("click", function ClientOrderDetailComponent_Conditional_3_Template_button_click_23_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.goBack());
    });
    \u0275\u0275text(24, "Retour aux commandes");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("Commande #", ctx_r0.order.id_order, "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(7, 6, ctx_r0.order.date_order, "dd/MM/yyyy"));
    \u0275\u0275advance(2);
    \u0275\u0275classMap(ctx_r0.getStatusClass(ctx_r0.order.id_statut));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.getStatusLabel(ctx_r0.order.id_statut), " ");
    \u0275\u0275advance(4);
    \u0275\u0275repeater(ctx_r0.order.orderDetails);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(21, 9, ctx_r0.order.montant_total, "EUR"));
  }
}
var ClientOrderDetailComponent = class _ClientOrderDetailComponent {
  constructor(route, router, orderService) {
    this.route = route;
    this.router = router;
    this.orderService = orderService;
    this.order = null;
    this.loading = false;
    this.error = null;
  }
  // Initialisation du composant
  ngOnInit() {
    const orderId = this.route.snapshot.paramMap.get("id");
    if (orderId) {
      this.loadOrderDetails(+orderId);
    }
  }
  // Charge les détails d'une commande
  loadOrderDetails(orderId) {
    this.loading = true;
    this.orderService.getOrderById(orderId).subscribe({
      next: (order) => {
        this.order = order;
        this.loading = false;
      },
      error: () => {
        this.error = "Impossible de charger les d\xE9tails de la commande";
        this.loading = false;
      }
    });
  }
  // Retourne la classe CSS pour le statut
  getStatusClass(status) {
    return `status status-${status}`;
  }
  // Retourne le libellé du statut
  getStatusLabel(status) {
    const statusMap = {
      1: "En attente",
      2: "En cours de traitement",
      3: "Exp\xE9di\xE9",
      4: "Livr\xE9",
      5: "Annul\xE9"
    };
    return statusMap[status] || "Statut inconnu";
  }
  // Navigation retour vers la liste des commandes
  goBack() {
    this.router.navigate(["/client/orders"]);
  }
  static {
    this.\u0275fac = function ClientOrderDetailComponent_Factory(t) {
      return new (t || _ClientOrderDetailComponent)(\u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(OrderService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ClientOrderDetailComponent, selectors: [["app-client-order-detail"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 4, vars: 3, consts: [[1, "order-detail-container"], [1, "loading"], [1, "error"], [1, "order-detail-card"], [1, "order-header"], [1, "order-info"], [1, "order-date"], [1, "status"], [1, "products-list"], [1, "product-item"], [1, "order-summary"], [1, "total-section"], [1, "total-amount"], [1, "actions"], [1, "back-btn", 3, "click"], [1, "product-info"], [1, "product-details"], [1, "quantity"], [1, "price-details"], [1, "unit-price"], [1, "line-total"]], template: function ClientOrderDetailComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0);
        \u0275\u0275template(1, ClientOrderDetailComponent_Conditional_1_Template, 2, 0, "div", 1)(2, ClientOrderDetailComponent_Conditional_2_Template, 2, 1, "div", 2)(3, ClientOrderDetailComponent_Conditional_3_Template, 25, 12, "div", 3);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance();
        \u0275\u0275conditional(1, ctx.loading ? 1 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(2, ctx.error ? 2 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(3, !ctx.loading && ctx.order ? 3 : -1);
      }
    }, dependencies: [CommonModule, CurrencyPipe, DatePipe], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ClientOrderDetailComponent, { className: "ClientOrderDetailComponent", filePath: "src\\app\\feature\\Dashboard\\DashboardComponent\\client\\orders\\client-order-detail.component.ts", lineNumber: 82 });
})();

// src/app/feature/Dashboard/DashboardComponent/client/client.routes.ts
var clientRoutes = [
  {
    path: "",
    // La route vide redirige vers le dashboard client
    component: ClientDashboardComponent,
    // Composant principal du dashboard
    children: [
      {
        path: "",
        // Si aucune sous-route n'est définie, redirige vers la route 'products'
        redirectTo: "products",
        // Redirection vers les produits
        pathMatch: "full"
        // La redirection se fait uniquement si le chemin est vide
      },
      {
        path: "products",
        // Route pour afficher la liste des produits
        component: ClientProductsComponent,
        // Composant pour l'affichage des produits
        data: { title: "Nos Produits" }
        // Donnée associée à cette route, utilisée pour définir le titre de la page
      },
      {
        path: "products/:id",
        // Route dynamique pour afficher le détail d'un produit
        component: ProductDetailComponent,
        // Composant pour afficher le détail du produit
        data: { title: "D\xE9tail du produit" }
        // Donnée associée à cette route, utilisée pour définir le titre de la page
      },
      {
        path: "cart",
        // Route pour afficher le panier
        component: CartComponent,
        // Composant pour afficher et gérer le panier
        data: { title: "Mon Panier" }
        // Donnée associée à cette route, utilisée pour définir le titre de la page
      },
      {
        path: "checkout",
        // Route pour la validation de la commande
        component: CheckoutComponent,
        // Composant pour gérer le processus de commande
        canActivate: [AuthGuard],
        // Cette route est protégée par un AuthGuard, il faut être authentifié pour y accéder
        data: {
          title: "Validation de commande",
          // Donnée pour définir le titre de la page
          requiresAuth: true
          // Indication que l'authentification est requise pour cette route
        }
      },
      {
        path: "profile",
        // Route pour afficher/modifier le profil du client
        component: ClientProfileComponent,
        // Composant pour afficher et modifier les informations du profil client
        canActivate: [AuthGuard],
        // Cette route est protégée par un AuthGuard, il faut être authentifié pour y accéder
        data: {
          title: "Mon Profil",
          // Donnée pour définir le titre de la page
          requiresAuth: true
          // Indication que l'authentification est requise pour cette route
        }
      },
      {
        path: "orders/:id",
        // Route dynamique pour afficher le détail d'une commande spécifique
        component: ClientOrderDetailComponent,
        // Composant pour afficher les détails d'une commande
        canActivate: [AuthGuard],
        // Cette route est protégée par un AuthGuard, il faut être authentifié pour y accéder
        data: {
          title: "D\xE9tail de la commande",
          // Donnée pour définir le titre de la page
          requiresAuth: true
          // Indication que l'authentification est requise pour cette route
        }
      },
      {
        path: "orders",
        // Route pour afficher toutes les commandes du client
        component: ClientOrdersComponent,
        // Composant pour afficher la liste des commandes du client
        canActivate: [AuthGuard],
        // Cette route est protégée par un AuthGuard, il faut être authentifié pour y accéder
        data: {
          title: "Mes Commandes",
          // Donnée pour définir le titre de la page
          requiresAuth: true
          // Indication que l'authentification est requise pour cette route
        }
      }
    ]
  }
];
export {
  clientRoutes
};
//# sourceMappingURL=chunk-M23GLRPF.js.map
