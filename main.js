import {
  ManufacturingService,
  SocketIoModule
} from "./chunk-QYWNT2UT.js";
import {
  AuthGuard,
  PaypalButtonComponent,
  PromotionTimerComponent
} from "./chunk-DMRZXG32.js";
import {
  ANIMATION_MODULE_TYPE,
  ActivatedRoute,
  AuthService,
  BehaviorSubject,
  BrowserModule,
  CartService,
  ChangeDetectionScheduler,
  CommonModule,
  CurrencyPipe,
  DOCUMENT,
  DatePipe,
  DefaultValueAccessor,
  DomRendererFactory2,
  EMPTY,
  EventEmitter,
  FormBuilder,
  FormControlDirective,
  FormControlName,
  FormGroupDirective,
  FormsModule,
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
  HttpErrorResponse,
  Inject,
  Injectable,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  NgClass,
  NgControlStatus,
  NgControlStatusGroup,
  NgForOf,
  NgForm,
  NgIf,
  NgModel,
  NgModule,
  NgOptimizedImage,
  NgSelectOption,
  NgSwitch,
  NgSwitchCase,
  NgZone,
  NotificationService,
  OrderService,
  ProductService,
  ReactiveFormsModule,
  RendererFactory2,
  RequiredValidator,
  Router,
  RouterLink,
  RouterModule,
  RouterOutlet,
  RuntimeError,
  SelectControlValueAccessor,
  Subject,
  Subscription,
  Title,
  Validators,
  ViewEncapsulation$1,
  __async,
  __objRest,
  __spreadValues,
  bootstrapApplication,
  catchError,
  environment,
  firstValueFrom,
  importProvidersFrom,
  inject,
  interval,
  map,
  of,
  performanceMarkFeature,
  provideHttpClient,
  provideRouter,
  setClassMetadata,
  switchMap,
  throwError,
  withInterceptors,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption,
  ɵsetClassDebugInfo,
  ɵɵProvidersFeature,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinject,
  ɵɵlistener,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-3KO5M7KA.js";

// src/app/components/Login/login.component.ts
function LoginComponent_div_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 23);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.error, " ");
  }
}
function LoginComponent_span_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Se connecter");
    \u0275\u0275elementEnd();
  }
}
function LoginComponent_span_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Connexion en cours...");
    \u0275\u0275elementEnd();
  }
}
function LoginComponent_div_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 24);
    \u0275\u0275element(1, "div", 25);
    \u0275\u0275elementEnd();
  }
}
var LoginComponent = class _LoginComponent {
  constructor(authService, route, router) {
    this.authService = authService;
    this.route = route;
    this.router = router;
    this.credentials = {
      mail: "",
      password: ""
    };
    this.isLoading = false;
    this.error = "";
    this.showPassword = false;
    this.submitted = false;
    this.currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  }
  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const token = params["token"];
      const refreshToken = params["refreshToken"];
      if (token && refreshToken) {
        localStorage.setItem("token", token);
        localStorage.setItem("refreshToken", refreshToken);
        const userRole = localStorage.getItem("userRole");
        this.router.navigate([userRole === "admin" ? "/admin" : "/client/products"]);
      }
    });
  }
  onSubmit() {
    return __async(this, null, function* () {
      try {
        this.isLoading = true;
        this.submitted = true;
        this.error = "";
        if (!this.credentials.mail || !this.credentials.password) {
          this.error = "Veuillez remplir tous les champs";
          return;
        }
        if (!this.authService.validateEmail(this.credentials.mail)) {
          this.error = "Format d'email invalide";
          return;
        }
        const userExists = yield firstValueFrom(this.authService.checkUserExists(this.credentials.mail));
        if (!userExists) {
          this.error = "Cet utilisateur n'existe pas. Veuillez vous inscrire.";
          this.isLoading = false;
          return;
        }
        yield firstValueFrom(this.authService.login(this.credentials));
        const userRole = localStorage.getItem("userRole");
        if (userRole === "admin") {
          this.router.navigate(["/admin"]);
        } else {
          this.router.navigate(["/client"]);
        }
      } catch (error) {
        this.error = error instanceof Error ? error.message : "Une erreur est survenue lors de la connexion";
        console.error("Erreur de connexion:", error);
      } finally {
        this.isLoading = false;
      }
    });
  }
  handleGoogleLogin() {
    this.isLoading = true;
    this.error = "";
    this.authService.initiateGoogleLogin();
  }
  static {
    this.\u0275fac = function LoginComponent_Factory(t) {
      return new (t || _LoginComponent)(\u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(Router));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LoginComponent, selectors: [["app-login"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 39, vars: 18, consts: [["loginForm", "ngForm"], [1, "login-container"], [1, "login-box"], [1, "logo-container"], ["src", "assets/GOHAN-MED.jpg", "alt", "GOHAN-MEDLogo", 1, "logo"], ["class", "error-alert", 4, "ngIf"], [3, "ngSubmit"], [1, "form-group"], ["for", "email"], ["type", "email", "id", "email", "name", "email", "required", "", "placeholder", "Votre adresse email", 3, "ngModelChange", "ngModel", "disabled"], ["for", "password"], [1, "password-input"], ["id", "password", "name", "password", "required", "", "placeholder", "Votre mot de passe", 3, "ngModelChange", "type", "ngModel", "disabled"], ["type", "button", 1, "toggle-password", 3, "click", "disabled"], ["type", "submit", 1, "submit-btn", 3, "disabled"], [4, "ngIf"], [1, "separator"], [1, "google-btn", 3, "click", "disabled"], ["src", "assets/google-logo.svg", "alt", "Google Logo", 1, "google-icon"], [1, "register-link"], ["routerLink", "/register"], [1, "copyright"], ["class", "loader-overlay", 4, "ngIf"], [1, "error-alert"], [1, "loader-overlay"], [1, "loader"]], template: function LoginComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = \u0275\u0275getCurrentView();
        \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "div", 3);
        \u0275\u0275element(3, "img", 4);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "h2");
        \u0275\u0275text(5, "Connexion");
        \u0275\u0275elementEnd();
        \u0275\u0275template(6, LoginComponent_div_6_Template, 2, 1, "div", 5);
        \u0275\u0275elementStart(7, "form", 6, 0);
        \u0275\u0275listener("ngSubmit", function LoginComponent_Template_form_ngSubmit_7_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.onSubmit());
        });
        \u0275\u0275elementStart(9, "div", 7)(10, "label", 8);
        \u0275\u0275text(11, "Email");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(12, "input", 9);
        \u0275\u0275twoWayListener("ngModelChange", function LoginComponent_Template_input_ngModelChange_12_listener($event) {
          \u0275\u0275restoreView(_r1);
          \u0275\u0275twoWayBindingSet(ctx.credentials.mail, $event) || (ctx.credentials.mail = $event);
          return \u0275\u0275resetView($event);
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(13, "div", 7)(14, "label", 10);
        \u0275\u0275text(15, "Mot de passe");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(16, "div", 11)(17, "input", 12);
        \u0275\u0275twoWayListener("ngModelChange", function LoginComponent_Template_input_ngModelChange_17_listener($event) {
          \u0275\u0275restoreView(_r1);
          \u0275\u0275twoWayBindingSet(ctx.credentials.password, $event) || (ctx.credentials.password = $event);
          return \u0275\u0275resetView($event);
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(18, "button", 13);
        \u0275\u0275listener("click", function LoginComponent_Template_button_click_18_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.showPassword = !ctx.showPassword);
        });
        \u0275\u0275text(19);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(20, "button", 14);
        \u0275\u0275template(21, LoginComponent_span_21_Template, 2, 0, "span", 15)(22, LoginComponent_span_22_Template, 2, 0, "span", 15);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(23, "div", 16)(24, "span");
        \u0275\u0275text(25, "ou");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(26, "button", 17);
        \u0275\u0275listener("click", function LoginComponent_Template_button_click_26_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.handleGoogleLogin());
        });
        \u0275\u0275element(27, "img", 18);
        \u0275\u0275elementStart(28, "span");
        \u0275\u0275text(29, "Continuer avec Google");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(30, "div", 19)(31, "p");
        \u0275\u0275text(32, "Pas encore de compte ? ");
        \u0275\u0275elementStart(33, "a", 20);
        \u0275\u0275text(34, "S'inscrire");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(35, "div", 21)(36, "p");
        \u0275\u0275text(37);
        \u0275\u0275elementEnd()();
        \u0275\u0275template(38, LoginComponent_div_38_Template, 2, 0, "div", 22);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        const loginForm_r3 = \u0275\u0275reference(8);
        \u0275\u0275advance(6);
        \u0275\u0275property("ngIf", ctx.error);
        \u0275\u0275advance(6);
        \u0275\u0275classProp("error", ctx.submitted && !ctx.credentials.mail);
        \u0275\u0275twoWayProperty("ngModel", ctx.credentials.mail);
        \u0275\u0275property("disabled", ctx.isLoading);
        \u0275\u0275advance(5);
        \u0275\u0275classProp("error", ctx.submitted && !ctx.credentials.password);
        \u0275\u0275property("type", ctx.showPassword ? "text" : "password");
        \u0275\u0275twoWayProperty("ngModel", ctx.credentials.password);
        \u0275\u0275property("disabled", ctx.isLoading);
        \u0275\u0275advance();
        \u0275\u0275property("disabled", ctx.isLoading);
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1(" ", ctx.showPassword ? "\u{1F441}\uFE0F" : "\u{1F441}\uFE0F\u200D\u{1F5E8}\uFE0F", " ");
        \u0275\u0275advance();
        \u0275\u0275property("disabled", ctx.isLoading || !loginForm_r3.form.valid);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.isLoading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.isLoading);
        \u0275\u0275advance(4);
        \u0275\u0275property("disabled", ctx.isLoading);
        \u0275\u0275advance(11);
        \u0275\u0275textInterpolate1("\xA9 ", ctx.currentYear, " IzzyBeauty. Tous droits r\xE9serv\xE9s.");
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.isLoading);
      }
    }, dependencies: [CommonModule, NgIf, FormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, NgModel, NgForm, RouterModule, RouterLink], styles: ['\n\n.login-container[_ngcontent-%COMP%] {\n  min-height: 10vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: #ffffff;\n  padding: 20px;\n}\n.login-box[_ngcontent-%COMP%] {\n  position: relative;\n  background: white;\n  border-radius: 12px;\n  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);\n  padding: 2.5rem;\n  width: 100%;\n  max-width: 400px;\n}\n.logo-container[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-bottom: 1rem;\n}\n.logo-container[_ngcontent-%COMP%]   .logo[_ngcontent-%COMP%] {\n  height: 100px;\n  width: auto;\n  object-fit: contain;\n}\nh2[_ngcontent-%COMP%] {\n  color: #1a1a1a;\n  text-align: center;\n  margin-bottom: 1.5rem;\n  font-size: 1.75rem;\n  font-weight: 600;\n}\n.error-alert[_ngcontent-%COMP%] {\n  background: #fee2e2;\n  border: 1px solid #fecaca;\n  color: #dc2626;\n  padding: 0.75rem;\n  border-radius: 6px;\n  margin-bottom: 1.5rem;\n  text-align: center;\n  font-size: 0.875rem;\n}\n.form-group[_ngcontent-%COMP%] {\n  margin-bottom: 1.25rem;\n}\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 0.5rem;\n  color: #4b5563;\n  font-weight: 500;\n  font-size: 0.875rem;\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 0.75rem;\n  border: 1px solid #e5e7eb;\n  border-radius: 6px;\n  transition: all 0.2s;\n  font-size: 0.95rem;\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #4f46e5;\n  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);\n}\n.form-group[_ngcontent-%COMP%]   input.error[_ngcontent-%COMP%] {\n  border-color: #dc2626;\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::placeholder {\n  color: #9ca3af;\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:disabled {\n  background-color: #f3f4f6;\n  cursor: not-allowed;\n}\n.password-input[_ngcontent-%COMP%] {\n  position: relative;\n}\n.password-input[_ngcontent-%COMP%]   .toggle-password[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 12px;\n  top: 50%;\n  transform: translateY(-50%);\n  background: none;\n  border: none;\n  cursor: pointer;\n  padding: 0;\n  color: #6b7280;\n  display: flex;\n  align-items: center;\n}\n.password-input[_ngcontent-%COMP%]   .toggle-password[_ngcontent-%COMP%]:disabled {\n  cursor: not-allowed;\n  opacity: 0.5;\n}\n.submit-btn[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 0.875rem;\n  background: #4f46e5;\n  color: white;\n  border: none;\n  border-radius: 6px;\n  font-weight: 500;\n  font-size: 0.95rem;\n  cursor: pointer;\n  transition: background-color 0.2s;\n  margin-top: 0.5rem;\n}\n.submit-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #4338ca;\n}\n.submit-btn[_ngcontent-%COMP%]:disabled {\n  background: #9ca3af;\n  cursor: not-allowed;\n}\n.register-link[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-top: 1.5rem;\n  padding-top: 1.5rem;\n  border-top: 1px solid #e5e7eb;\n}\n.register-link[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #6b7280;\n  font-size: 0.875rem;\n}\n.register-link[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: #4f46e5;\n  text-decoration: none;\n  font-weight: 500;\n}\n.register-link[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n}\n.copyright[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-top: 1.5rem;\n}\n.copyright[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #9ca3af;\n  font-size: 0.75rem;\n}\n.loader-overlay[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(255, 255, 255, 0.8);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  border-radius: 12px;\n  z-index: 1000;\n}\n.loader[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  border: 4px solid #f3f3f3;\n  border-radius: 50%;\n  border-top: 4px solid #4f46e5;\n  animation: _ngcontent-%COMP%_spin 1s linear infinite;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\n@media (max-width: 640px) {\n  .login-box[_ngcontent-%COMP%] {\n    padding: 1.5rem;\n  }\n}\n.separator[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  text-align: center;\n  margin: 1.5rem 0;\n  color: #6b7280;\n}\n.separator[_ngcontent-%COMP%]::before, .separator[_ngcontent-%COMP%]::after {\n  content: "";\n  flex: 1;\n  border-bottom: 1px solid #e5e7eb;\n}\n.separator[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  padding: 0 1rem;\n  font-size: 0.875rem;\n}\n.google-btn[_ngcontent-%COMP%] {\n  width: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.75rem;\n  padding: 0.875rem;\n  border: 1px solid #e5e7eb;\n  border-radius: 6px;\n  background: white;\n  color: #374151;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  margin-top: 1rem;\n}\n.google-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #f9fafb;\n  border-color: #d1d5db;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n}\n.google-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.7;\n  cursor: not-allowed;\n}\n.google-btn[_ngcontent-%COMP%]   .google-icon[_ngcontent-%COMP%] {\n  width: 18px;\n  height: 18px;\n}\n/*# sourceMappingURL=login.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LoginComponent, { className: "LoginComponent", filePath: "src\\app\\components\\Login\\login.component.ts", lineNumber: 365 });
})();

// src/app/components/Register/register.component.ts
function RegisterComponent_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.error, " ");
  }
}
var RegisterComponent = class _RegisterComponent {
  constructor(authService, router) {
    this.authService = authService;
    this.router = router;
    this.user = {
      username: "",
      mail: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      address: ""
    };
    this.error = "";
    this.isLoading = false;
  }
  onSubmit() {
    if (this.user.password !== this.user.confirmPassword) {
      this.error = "Les mots de passe ne correspondent pas";
      return;
    }
    const signupPayload = {
      username: this.user.username,
      mail: this.user.mail,
      password: this.user.password,
      googleHash: "",
      // Champs pour éventuelles connexions via Google/Facebook (non utilisés ici)
      facebookHash: ""
    };
    this.authService.signup(signupPayload).subscribe({
      next: (response) => {
        console.log("Inscription r\xE9ussie:", response);
        this.router.navigate(["/login"]);
      },
      error: (error) => {
        console.error("Erreur inscription:", error);
        this.error = error.status === 409 ? "Cet email est d\xE9j\xE0 utilis\xE9. Veuillez en choisir un autre ou vous connecter." : "Erreur lors de l'inscription";
      }
    });
  }
  static {
    this.\u0275fac = function RegisterComponent_Factory(t) {
      return new (t || _RegisterComponent)(\u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(Router));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _RegisterComponent, selectors: [["app-register"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 31, vars: 5, consts: [[1, "register-container"], [1, "register-box"], [1, "logo-container"], ["ngSrc", "assets/GOHAN-MED.jpg", "alt", "GOHAN-MED Logo", "height", "1024", "width", "1024", 1, "logo"], [1, "register-header"], [1, "register-form", 3, "ngSubmit"], [1, "form-group"], ["for", "username"], ["id", "username", "name", "username", "type", "text", "required", "", "placeholder", "Votre nom d'utilisateur", 3, "ngModelChange", "ngModel"], ["for", "mail"], ["id", "mail", "name", "mail", "type", "email", "required", "", "placeholder", "Votre adresse email", 3, "ngModelChange", "ngModel"], ["for", "password"], ["id", "password", "name", "password", "type", "password", "required", "", "placeholder", "Votre mot de passe", 3, "ngModelChange", "ngModel"], ["for", "confirmPassword"], ["id", "confirmPassword", "name", "confirmPassword", "type", "password", "required", "", "placeholder", "Confirmer votre mot de passe", 3, "ngModelChange", "ngModel"], [1, "error-message"], [1, "form-actions"], ["type", "submit", 1, "register-button"], [1, "login-link"], ["href", "/login"]], template: function RegisterComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2);
        \u0275\u0275element(3, "img", 3);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "div", 4)(5, "h2");
        \u0275\u0275text(6, "Cr\xE9er un compte");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(7, "form", 5);
        \u0275\u0275listener("ngSubmit", function RegisterComponent_Template_form_ngSubmit_7_listener() {
          return ctx.onSubmit();
        });
        \u0275\u0275elementStart(8, "div", 6)(9, "label", 7);
        \u0275\u0275text(10, "Nom d'utilisateur");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(11, "input", 8);
        \u0275\u0275twoWayListener("ngModelChange", function RegisterComponent_Template_input_ngModelChange_11_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.user.username, $event) || (ctx.user.username = $event);
          return $event;
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(12, "div", 6)(13, "label", 9);
        \u0275\u0275text(14, "Email");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(15, "input", 10);
        \u0275\u0275twoWayListener("ngModelChange", function RegisterComponent_Template_input_ngModelChange_15_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.user.mail, $event) || (ctx.user.mail = $event);
          return $event;
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(16, "div", 6)(17, "label", 11);
        \u0275\u0275text(18, "Mot de passe");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(19, "input", 12);
        \u0275\u0275twoWayListener("ngModelChange", function RegisterComponent_Template_input_ngModelChange_19_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.user.password, $event) || (ctx.user.password = $event);
          return $event;
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(20, "div", 6)(21, "label", 13);
        \u0275\u0275text(22, "Confirmer le mot de passe");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(23, "input", 14);
        \u0275\u0275twoWayListener("ngModelChange", function RegisterComponent_Template_input_ngModelChange_23_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.user.confirmPassword, $event) || (ctx.user.confirmPassword = $event);
          return $event;
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275template(24, RegisterComponent_Conditional_24_Template, 2, 1, "div", 15);
        \u0275\u0275elementStart(25, "div", 16)(26, "button", 17);
        \u0275\u0275text(27, " S'inscrire ");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(28, "div", 18)(29, "a", 19);
        \u0275\u0275text(30, "D\xE9j\xE0 un compte ? Se connecter");
        \u0275\u0275elementEnd()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(11);
        \u0275\u0275twoWayProperty("ngModel", ctx.user.username);
        \u0275\u0275advance(4);
        \u0275\u0275twoWayProperty("ngModel", ctx.user.mail);
        \u0275\u0275advance(4);
        \u0275\u0275twoWayProperty("ngModel", ctx.user.password);
        \u0275\u0275advance(4);
        \u0275\u0275twoWayProperty("ngModel", ctx.user.confirmPassword);
        \u0275\u0275advance();
        \u0275\u0275conditional(24, ctx.error ? 24 : -1);
      }
    }, dependencies: [CommonModule, FormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, NgModel, NgForm, RouterModule, NgOptimizedImage], styles: ['@charset "UTF-8";\n\n\n\n.register-container[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 100vh;\n  background-color: #f9f9f9;\n}\n.register-box[_ngcontent-%COMP%] {\n  background-color: white;\n  padding: 2rem;\n  border-radius: 8px;\n  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);\n  max-width: 400px;\n  width: 100%;\n  text-align: center;\n}\n.logo-container[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  margin-bottom: 1rem;\n}\n.logo[_ngcontent-%COMP%] {\n  max-width: 150px;\n  height: auto;\n}\n.register-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  color: #4f46e5;\n  margin-bottom: 1rem;\n}\n.form-group[_ngcontent-%COMP%] {\n  margin-bottom: 1rem;\n}\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  font-weight: bold;\n  margin-bottom: 0.5rem;\n  text-align: left;\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 0.5rem;\n  border-radius: 4px;\n  border: 1px solid #ddd;\n}\n.error-message[_ngcontent-%COMP%] {\n  color: red;\n  margin-bottom: 1rem;\n}\n.form-actions[_ngcontent-%COMP%] {\n  margin-top: 1rem;\n}\n.register-button[_ngcontent-%COMP%] {\n  background-color: #4f46e5;\n  color: white;\n  border: none;\n  padding: 0.75rem;\n  width: 100%;\n  border-radius: 4px;\n  cursor: pointer;\n  font-size: 1rem;\n}\n.register-button[_ngcontent-%COMP%]:hover {\n  background-color: #3e3ba0;\n}\n.login-link[_ngcontent-%COMP%] {\n  margin-top: 1rem;\n}\n.login-link[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: #4f46e5;\n  text-decoration: none;\n}\n.login-link[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n}\n/*# sourceMappingURL=register.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(RegisterComponent, { className: "RegisterComponent", filePath: "src\\app\\components\\Register\\register.component.ts", lineNumber: 16 });
})();

// src/app/feature/Dashboard/guard/no-auth.guard.ts
var NoAuthGuard = class _NoAuthGuard {
  constructor(authService, router) {
    this.authService = authService;
    this.router = router;
  }
  canActivate() {
    if (this.authService.isAuthenticated()) {
      if (this.authService.isAdmin()) {
        this.router.navigate(["/admin/dashboard"]);
      } else {
        this.router.navigate(["/client/products"]);
      }
      return false;
    }
    return true;
  }
  static {
    this.\u0275fac = function NoAuthGuard_Factory(t) {
      return new (t || _NoAuthGuard)(\u0275\u0275inject(AuthService), \u0275\u0275inject(Router));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _NoAuthGuard, factory: _NoAuthGuard.\u0275fac, providedIn: "root" });
  }
};

// src/app/feature/Dashboard/guard/admin.guard.ts
var AdminGuard = class _AdminGuard {
  constructor(authService, router) {
    this.authService = authService;
    this.router = router;
  }
  // Implémentation de la méthode canActivate pour vérifier l'accès avant d'autoriser la navigation
  canActivate() {
    console.log("AdminGuard - Checking admin rights");
    console.log("Is Admin?", this.authService.isAdmin());
    console.log("Current User:", this.authService.currentUser$);
    if (!this.authService.isAdmin()) {
      console.log("Access denied - redirecting to unauthorized");
      this.router.navigate(["/unauthorized"]);
      return false;
    }
    console.log("Admin access granted");
    return true;
  }
  static {
    this.\u0275fac = function AdminGuard_Factory(t) {
      return new (t || _AdminGuard)(\u0275\u0275inject(AuthService), \u0275\u0275inject(Router));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
      token: _AdminGuard,
      factory: _AdminGuard.\u0275fac,
      providedIn: "root"
      // Ce service est disponible globalement, il est injecté automatiquement dans toute l'application
    });
  }
};

// src/app/services/timer/timer.service.ts
var TimerService = class _TimerService {
  constructor() {
    this.timer$ = new BehaviorSubject(this.calculateTimeRemaining(/* @__PURE__ */ new Date()));
    const defaultEndDate = /* @__PURE__ */ new Date("2025-12-31T23:59:59");
    interval(6e4).subscribe(() => {
      this.timer$.next(this.calculateTimeRemaining(defaultEndDate));
    });
  }
  calculateTimeRemaining(endDate) {
    const now = (/* @__PURE__ */ new Date()).getTime();
    const distance = new Date(endDate).getTime() - now;
    return {
      days: Math.floor(distance / (1e3 * 60 * 60 * 24)),
      hours: Math.floor(distance % (1e3 * 60 * 60 * 24) / (1e3 * 60 * 60)),
      minutes: Math.floor(distance % (1e3 * 60 * 60) / (1e3 * 60))
    };
  }
  getTimer(endDate) {
    const timer$ = new BehaviorSubject(this.calculateTimeRemaining(endDate));
    interval(6e4).subscribe(() => {
      timer$.next(this.calculateTimeRemaining(endDate));
    });
    return timer$.asObservable();
  }
  static {
    this.\u0275fac = function TimerService_Factory(t) {
      return new (t || _TimerService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _TimerService, factory: _TimerService.\u0275fac, providedIn: "root" });
  }
};

// src/app/services/home/home.service.ts
var HomeService = class _HomeService {
  // Injection des services nécessaires
  constructor(http, timerService) {
    this.http = http;
    this.timerService = timerService;
    this.mockPromotions = [
      {
        id_product: 1,
        name: "Ibuprof\xE8ne 400mg",
        description: "Anti-inflammatoire non st\xE9ro\xEFdien utilis\xE9 pour r\xE9duire la douleur, la fi\xE8vre et l'inflammation",
        price: 7.99,
        stock: 94,
        typeId: 1,
        active: true,
        imageUrls: ["ibuprofene.jpg"],
        activePromotion: {
          id_promotion: 1,
          description: "Promotion de printemps sur les anti-inflammatoires",
          discountPercentage: 20,
          startDate: /* @__PURE__ */ new Date(),
          // Début de la promotion
          endDate: new Date((/* @__PURE__ */ new Date()).setDate((/* @__PURE__ */ new Date()).getDate() + 15))
          // Fin de la promotion dans 15 jours
        },
        promotionPrice: 6.39
        // Prix après promotion
      },
      {
        id_product: 2,
        name: "Parac\xE9tamol 500mg",
        description: "Antalgique et antipyr\xE9tique pour le soulagement des douleurs l\xE9g\xE8res \xE0 mod\xE9r\xE9es",
        price: 4.99,
        stock: 150,
        typeId: 1,
        active: true,
        imageUrls: ["paracetamol.jpg"],
        activePromotion: {
          id_promotion: 2,
          description: "Offre sp\xE9ciale antidouleurs",
          discountPercentage: 20,
          startDate: /* @__PURE__ */ new Date(),
          endDate: new Date((/* @__PURE__ */ new Date()).setDate((/* @__PURE__ */ new Date()).getDate() + 15))
        },
        promotionPrice: 3.99
      },
      {
        id_product: 3,
        name: "Amoxicilline 500mg",
        description: "Antibiotique utilis\xE9 pour traiter diverses infections bact\xE9riennes",
        price: 15.99,
        stock: 89,
        typeId: 2,
        active: true,
        imageUrls: ["antibiotique.jpg"],
        activePromotion: {
          id_promotion: 3,
          description: "R\xE9duction sur les antibiotiques",
          discountPercentage: 20,
          startDate: /* @__PURE__ */ new Date(),
          endDate: new Date((/* @__PURE__ */ new Date()).setDate((/* @__PURE__ */ new Date()).getDate() + 15))
        },
        promotionPrice: 12.79
      }
    ];
  }
  // Méthode pour obtenir les promotions actives sur les produits
  getActiveProductPromotions() {
    return of(this.mockPromotions).pipe(map((promotions) => {
      console.log("Promotions avec dates:", promotions);
      return promotions;
    }));
  }
  // Méthode pour obtenir les nouveaux produits
  getNewProducts() {
    const mockNewProducts = [
      {
        id_product: 4,
        name: "Vitamine D3",
        description: "Compl\xE9ment alimentaire essentiel pour la sant\xE9 des os",
        price: 12.99,
        stock: 200,
        typeId: 4,
        active: true,
        imageUrls: ["vitamine-d.jpg"]
      },
      {
        id_product: 5,
        name: "Omega 3",
        description: "Acides gras essentiels pour la sant\xE9 cardiovasculaire",
        price: 15.99,
        stock: 150,
        typeId: 4,
        active: true,
        imageUrls: ["omega3.jpg"]
      }
    ];
    return of(mockNewProducts).pipe(map((products) => {
      console.log("Nouveaux produits:", products);
      return products;
    }));
  }
  static {
    this.\u0275fac = function HomeService_Factory(t) {
      return new (t || _HomeService)(\u0275\u0275inject(HttpClient), \u0275\u0275inject(TimerService));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
      token: _HomeService,
      factory: _HomeService.\u0275fac,
      providedIn: "root"
      // Permet à ce service d'être injecté dans toute l'application
    });
  }
};

// src/app/components/Home/home.component.ts
var _forTrack0 = ($index, $item) => $item.id_product;
var _forTrack1 = ($index, $item) => $item.title;
function HomeComponent_For_26_span_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 44);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const promo_r1 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", promo_r1.promotionPrice, "\u20AC ");
  }
}
function HomeComponent_For_26_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-promotion-timer", 43);
  }
  if (rf & 2) {
    const promo_r1 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("endDate", promo_r1.activePromotion.endDate);
  }
}
function HomeComponent_For_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16)(1, "div", 37);
    \u0275\u0275element(2, "img", 38);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 39)(4, "h3");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 40)(9, "span", 41);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275template(11, HomeComponent_For_26_span_11_Template, 2, 1, "span", 42);
    \u0275\u0275elementEnd();
    \u0275\u0275template(12, HomeComponent_For_26_Conditional_12_Template, 1, 1, "app-promotion-timer", 43);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const promo_r1 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275property("src", "assets/" + (promo_r1.imageUrls[0] || "default-product.jpg"), \u0275\u0275sanitizeUrl)("alt", promo_r1.name);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(promo_r1.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(promo_r1.description);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", promo_r1.price, "\u20AC");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", promo_r1.promotionPrice);
    \u0275\u0275advance();
    \u0275\u0275conditional(12, promo_r1.activePromotion && promo_r1.activePromotion.endDate ? 12 : -1);
  }
}
function HomeComponent_For_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 19)(1, "div", 37);
    \u0275\u0275element(2, "img", 38);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 39)(4, "h3");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span", 45);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const product_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("src", "assets/" + ctx_r2.getImageFilename(product_r2.name), \u0275\u0275sanitizeUrl)("alt", product_r2.name);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(product_r2.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(product_r2.description);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", product_r2.price, "\u20AC");
  }
}
function HomeComponent_For_61_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 26);
    \u0275\u0275element(1, "img", 38);
    \u0275\u0275elementStart(2, "h3");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const service_r4 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("src", service_r4.image, \u0275\u0275sanitizeUrl)("alt", service_r4.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(service_r4.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(service_r4.description);
  }
}
var HomeComponent = class _HomeComponent {
  constructor(homeService, router) {
    this.homeService = homeService;
    this.router = router;
    this.currentYear = (/* @__PURE__ */ new Date()).getFullYear();
    this.activePromotions = [];
    this.newProducts = [];
    this.services = [
      {
        title: "M\xE9dicaments sur Ordonnance",
        description: "Service s\xE9curis\xE9 de traitement des prescriptions",
        image: "assets/prescription.jpg"
      },
      {
        title: "Pr\xE9parations Magistrales",
        description: "M\xE9dicaments personnalis\xE9s selon vos besoins",
        image: "assets/custom-med.jpg"
      },
      {
        title: "Parapharmacie",
        description: "Large gamme de produits de sant\xE9 et bien-\xEAtre",
        image: "assets/parapharmacie.jpg"
      },
      {
        title: "Conseil Pharmaceutique",
        description: "Consultations en ligne avec nos pharmaciens",
        image: "assets/conseil.jpg"
      },
      {
        title: "Service d'Urgence",
        description: "Disponibilit\xE9 24/7 pour vos besoins urgents",
        image: "assets/urgence.jpg"
      },
      {
        title: "Suivi de Traitement",
        description: "Accompagnement personnalis\xE9 de votre sant\xE9",
        image: "assets/suivi.jpg"
      }
    ];
  }
  ngOnInit() {
    this.loadPromotions();
    this.loadNewProducts();
  }
  loadPromotions() {
    this.homeService.getActiveProductPromotions().subscribe({
      next: (promotions) => {
        console.log("Promotions re\xE7ues:", promotions);
        this.activePromotions = promotions;
      },
      error: (error) => {
        console.error("Erreur chargement promotions:", error);
      }
    });
  }
  loadNewProducts() {
    this.homeService.getNewProducts().subscribe({
      next: (products) => {
        this.newProducts = products;
      },
      error: (error) => {
        console.error("Erreur chargement nouveaux produits:", error);
      }
    });
  }
  getTimeRemaining(endDate) {
    const end = new Date(endDate).getTime();
    const now = (/* @__PURE__ */ new Date()).getTime();
    const distance = end - now;
    const days = Math.floor(distance / (1e3 * 60 * 60 * 24));
    const hours = Math.floor(distance % (1e3 * 60 * 60 * 24) / (1e3 * 60 * 60));
    return {
      days,
      hours,
      expired: distance < 0
    };
  }
  navigateToLogin() {
    this.router.navigate(["/login"]);
  }
  navigateToRegister() {
    this.router.navigate(["/register"]);
  }
  // Dans la classe HomeComponent, ajoutez cette méthode
  getImageFilename(productName) {
    const name = productName.toLowerCase();
    if (name.includes("parac\xE9tamol"))
      return "paracetamol.jpg";
    if (name.includes("ibuprof\xE8ne"))
      return "ibuprofene.jpg";
    if (name.includes("amoxicilline"))
      return "antibiotique.jpg";
    if (name.includes("vitamine"))
      return "vitamine-d.jpg";
    if (name.includes("omega"))
      return "omega.jpg";
    return "default-product.jpg";
  }
  getDefaultEndDate() {
    const date = /* @__PURE__ */ new Date();
    date.setDate(date.getDate() + 15);
    return date;
  }
  static {
    this.\u0275fac = function HomeComponent_Factory(t) {
      return new (t || _HomeComponent)(\u0275\u0275directiveInject(HomeService), \u0275\u0275directiveInject(Router));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _HomeComponent, selectors: [["app-home"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 94, vars: 1, consts: [[1, "home-container"], [1, "hero"], [1, "hero-content"], ["xmlns", "http://www.w3.org/2000/svg", "viewBox", "0 0 500 200", 1, "logo"], ["cx", "80", "cy", "100", "r", "60", "fill", "#e8f4ff"], ["d", "M60 80 h40 v-40 h40 v40 h40 v40 h-40 v40 h-40 v-40 h-40 z", "fill", "#4A90E2"], ["x", "200", "y", "115", "font-family", "Arial", "font-size", "48", "font-weight", "bold", "fill", "#2C3E50"], ["x", "200", "y", "145", "font-family", "Arial", "font-size", "18", "fill", "#7F8C8D"], ["d", "M180 70 q10 -10 20 0 t20 0 t20 0", "stroke", "#4A90E2", "fill", "none", "stroke-width", "3"], ["d", "M180 80 q10 10 20 0 t20 0 t20 0", "stroke", "#2980B9", "fill", "none", "stroke-width", "3"], [1, "tagline"], [1, "cta-buttons"], ["routerLink", "/login", 1, "btn-primary"], ["routerLink", "/register", 1, "btn-secondary"], [1, "promotions"], [1, "promo-grid"], [1, "promo-card"], [1, "new-products"], [1, "products-grid"], [1, "product-card"], [1, "features"], [1, "features-grid"], [1, "feature-card"], [1, "icon"], [1, "services"], [1, "service-grid"], [1, "service-card"], [1, "custom-manufacturing"], [1, "content"], [1, "feature"], [1, "fas", "fa-flask"], [1, "fas", "fa-shield-alt"], [1, "fas", "fa-clock"], [1, "cta"], ["routerLink", "/manufacturing/request", 1, "cta-button"], [1, "fas", "fa-arrow-right"], [1, "footer"], [1, "product-image"], [3, "src", "alt"], [1, "product-details"], [1, "price-container"], [1, "original-price"], ["class", "discounted-price", 4, "ngIf"], [3, "endDate"], [1, "discounted-price"], [1, "price"]], template: function HomeComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "section", 1)(2, "div", 2);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(3, "svg", 3);
        \u0275\u0275element(4, "circle", 4)(5, "path", 5);
        \u0275\u0275elementStart(6, "text", 6);
        \u0275\u0275text(7, " GOHAN-MEDIC ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(8, "text", 7);
        \u0275\u0275text(9, " Votre pharmacie en ligne ");
        \u0275\u0275elementEnd();
        \u0275\u0275element(10, "path", 8)(11, "path", 9);
        \u0275\u0275elementEnd();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(12, "h1");
        \u0275\u0275text(13, "Gohan-Medic");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(14, "p", 10);
        \u0275\u0275text(15, "Votre pharmacie en ligne de confiance");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(16, "div", 11)(17, "a", 12);
        \u0275\u0275text(18, "Se connecter");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(19, "a", 13);
        \u0275\u0275text(20, "S'inscrire");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(21, "section", 14)(22, "h2");
        \u0275\u0275text(23, "Promotions du Mois");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(24, "div", 15);
        \u0275\u0275repeaterCreate(25, HomeComponent_For_26_Template, 13, 7, "div", 16, _forTrack0);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(27, "section", 17)(28, "h2");
        \u0275\u0275text(29, "Nouveaux M\xE9dicaments");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(30, "div", 18);
        \u0275\u0275repeaterCreate(31, HomeComponent_For_32_Template, 10, 5, "div", 19, _forTrack0);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(33, "section", 20)(34, "div", 21)(35, "div", 22)(36, "div", 23);
        \u0275\u0275text(37, "\u{1F48A}");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(38, "h3");
        \u0275\u0275text(39, "M\xE9dicaments sur Mesure");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(40, "p");
        \u0275\u0275text(41, "Service de pr\xE9paration magistrale personnalis\xE9e");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(42, "div", 22)(43, "div", 23);
        \u0275\u0275text(44, "\u{1F69A}");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(45, "h3");
        \u0275\u0275text(46, "Livraison Rapide");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(47, "p");
        \u0275\u0275text(48, "Recevez vos m\xE9dicaments en toute s\xE9curit\xE9");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(49, "div", 22)(50, "div", 23);
        \u0275\u0275text(51, "\u{1F468}\u200D\u2695\uFE0F");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(52, "h3");
        \u0275\u0275text(53, "Conseils d'Experts");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(54, "p");
        \u0275\u0275text(55, "Une \xE9quipe de pharmaciens \xE0 votre \xE9coute");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(56, "section", 24)(57, "h2");
        \u0275\u0275text(58, "Nos Services");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(59, "div", 25);
        \u0275\u0275repeaterCreate(60, HomeComponent_For_61_Template, 6, 4, "div", 26, _forTrack1);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(62, "section", 27)(63, "div", 28)(64, "h2");
        \u0275\u0275text(65, "Fabrication sur Mesure");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(66, "p");
        \u0275\u0275text(67, "Besoin d'un m\xE9dicament personnalis\xE9 ? Notre service de fabrication sur mesure est l\xE0 pour vous.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(68, "div", 20)(69, "div", 29);
        \u0275\u0275element(70, "i", 30);
        \u0275\u0275elementStart(71, "h3");
        \u0275\u0275text(72, "Pr\xE9parations Magistrales");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(73, "p");
        \u0275\u0275text(74, "M\xE9dicaments adapt\xE9s \xE0 vos besoins sp\xE9cifiques");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(75, "div", 29);
        \u0275\u0275element(76, "i", 31);
        \u0275\u0275elementStart(77, "h3");
        \u0275\u0275text(78, "Qualit\xE9 Garantie");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(79, "p");
        \u0275\u0275text(80, "Processus rigoureux et contr\xF4les stricts");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(81, "div", 29);
        \u0275\u0275element(82, "i", 32);
        \u0275\u0275elementStart(83, "h3");
        \u0275\u0275text(84, "D\xE9lais Optimis\xE9s");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(85, "p");
        \u0275\u0275text(86, "Production et livraison rapides");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(87, "div", 33)(88, "a", 34);
        \u0275\u0275text(89, " Faire une demande ");
        \u0275\u0275element(90, "i", 35);
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(91, "footer", 36)(92, "p");
        \u0275\u0275text(93);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275advance(25);
        \u0275\u0275repeater(ctx.activePromotions);
        \u0275\u0275advance(6);
        \u0275\u0275repeater(ctx.newProducts);
        \u0275\u0275advance(29);
        \u0275\u0275repeater(ctx.services);
        \u0275\u0275advance(33);
        \u0275\u0275textInterpolate1("\xA9 ", ctx.currentYear, " Gohan-Medic. Tous droits r\xE9serv\xE9s.");
      }
    }, dependencies: [CommonModule, NgIf, RouterModule, RouterLink, PromotionTimerComponent], styles: ["\n\n.new-products[_ngcontent-%COMP%]   .product-image[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 200px;\n  overflow: hidden;\n  border-radius: 8px;\n  margin-bottom: 1rem;\n  background-color: #f3f4f6;\n}\n.new-products[_ngcontent-%COMP%]   .product-image[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 90%;\n  height: 100%;\n  object-fit: cover;\n  transition: transform 0.3s ease;\n}\n.new-products[_ngcontent-%COMP%]   .product-card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 8px;\n  padding: 1rem;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n  transition: transform 0.2s ease;\n}\n.new-products[_ngcontent-%COMP%]   .product-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-4px);\n  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\n}\n.new-products[_ngcontent-%COMP%]   .product-card[_ngcontent-%COMP%]:hover   img[_ngcontent-%COMP%] {\n  transform: scale(1.05);\n}\n.new-products[_ngcontent-%COMP%]   .product-details[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 1.25rem;\n  font-weight: 600;\n  color: #1f2937;\n  margin-bottom: 0.5rem;\n}\n.new-products[_ngcontent-%COMP%]   .product-details[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #6b7280;\n  font-size: 0.875rem;\n  line-height: 1.4;\n  margin-bottom: 1rem;\n}\n.new-products[_ngcontent-%COMP%]   .product-details[_ngcontent-%COMP%]   .price[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 1.25rem;\n  font-weight: 600;\n  color: #4f46e5;\n}\n.home-container[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  background:\n    linear-gradient(\n      to bottom,\n      #f3f4f6,\n      #ffffff);\n}\n.countdown-container[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  background: #ef4444;\n  color: white;\n  padding: 8px 15px;\n  border-radius: 4px;\n  position: relative;\n  margin-top: 1rem;\n  width: fit-content;\n}\n.time-unit[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 0 8px;\n  min-width: 40px;\n}\n.time-number[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  font-weight: bold;\n  margin-bottom: 2px;\n}\n.time-label[_ngcontent-%COMP%] {\n  font-size: 0.7rem;\n  opacity: 0.9;\n}\n.time-separator[_ngcontent-%COMP%] {\n  opacity: 0.7;\n  font-weight: 200;\n  margin-top: -8px;\n}\n.promo-badge[_ngcontent-%COMP%] {\n  position: absolute;\n  top: -10px;\n  right: -10px;\n  background: #fbbf24;\n  color: #000;\n  padding: 2px 6px;\n  border-radius: 12px;\n  font-size: 0.75rem;\n  font-weight: bold;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n}\n.hero[_ngcontent-%COMP%] {\n  height: 80vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  text-align: center;\n  background:\n    linear-gradient(\n      to bottom,\n      #ffffff,\n      #f8f9fa);\n  padding: 2rem;\n}\n.promo-card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 1rem;\n  padding: 2rem;\n  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\n  position: relative;\n  transition: all 0.3s ease;\n  border: 1px solid #e5e7eb;\n}\n.promo-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-4px);\n  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);\n}\n.promo-card[_ngcontent-%COMP%]   .product-details[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  color: #1f2937;\n  margin-bottom: 1rem;\n}\n.promo-card[_ngcontent-%COMP%]   .product-details[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #6b7280;\n  line-height: 1.5;\n  margin-bottom: 1.5rem;\n}\n.promo-card[_ngcontent-%COMP%]   .price-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n  margin-bottom: 1rem;\n}\n.promo-card[_ngcontent-%COMP%]   .price-container[_ngcontent-%COMP%]   .original-price[_ngcontent-%COMP%] {\n  text-decoration: line-through;\n  color: #9ca3af;\n  font-size: 1rem;\n}\n.promo-card[_ngcontent-%COMP%]   .price-container[_ngcontent-%COMP%]   .discounted-price[_ngcontent-%COMP%] {\n  color: #dc2626;\n  font-size: 1.75rem;\n  font-weight: bold;\n}\n.promo-card[_ngcontent-%COMP%]   .discount-badge[_ngcontent-%COMP%] {\n  position: absolute;\n  top: -12px;\n  right: -12px;\n  background: #dc2626;\n  color: white;\n  padding: 0.75rem;\n  border-radius: 9999px;\n  font-weight: bold;\n  font-size: 1.25rem;\n  box-shadow: 0 2px 4px rgba(220, 38, 38, 0.3);\n}\n.promotions[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      to bottom,\n      #f3f4f6,\n      white);\n  padding: 4rem 2rem;\n}\n.promotions[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  text-align: center;\n  font-size: 2.5rem;\n  color: #1f2937;\n  margin-bottom: 3rem;\n  font-weight: bold;\n}\n.promo-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));\n  gap: 2rem;\n  max-width: 1400px;\n  margin: 0 auto;\n  padding: 0 1rem;\n}\n.promotions[_ngcontent-%COMP%], .new-products[_ngcontent-%COMP%] {\n  padding: 4rem;\n  background: #f9fafb;\n}\n.promo-grid[_ngcontent-%COMP%], .products-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));\n  gap: 2rem;\n  margin: 2rem auto;\n  max-width: 1200px;\n}\n.countdown[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  color: #4f46e5;\n  font-weight: bold;\n  margin-top: 0.5rem;\n  padding: 0.5rem;\n  background: #f3f4f6;\n  border-radius: 0.25rem;\n}\n.expired[_ngcontent-%COMP%] {\n  color: #ef4444;\n  font-weight: bold;\n}\n.promo-card[_ngcontent-%COMP%], .product-card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 0.5rem;\n  padding: 1.5rem;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n  position: relative;\n  transition: transform 0.2s;\n}\n.promo-card[_ngcontent-%COMP%]:hover, .product-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-4px);\n}\n.discount-badge[_ngcontent-%COMP%] {\n  position: absolute;\n  top: -10px;\n  right: -10px;\n  background: #ef4444;\n  color: white;\n  padding: 0.5rem;\n  border-radius: 9999px;\n  font-weight: bold;\n}\n.price-container[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 1rem;\n  align-items: center;\n  margin: 1rem 0;\n}\n.original-price[_ngcontent-%COMP%] {\n  text-decoration: line-through;\n  color: #6b7280;\n}\n.discounted-price[_ngcontent-%COMP%] {\n  color: #ef4444;\n  font-weight: bold;\n  font-size: 1.25rem;\n}\n.promo-dates[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  color: #6b7280;\n}\n.hero-content[_ngcontent-%COMP%] {\n  max-width: 800px;\n}\n.logo[_ngcontent-%COMP%] {\n  width: auto;\n  height: 200px;\n  margin-bottom: 2rem;\n}\nh1[_ngcontent-%COMP%] {\n  font-size: 3.5rem;\n  color: #1f2937;\n  margin-bottom: 1rem;\n  font-weight: bold;\n}\n.tagline[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  color: #4b5563;\n  margin-bottom: 2.5rem;\n}\n.cta-buttons[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 1.5rem;\n  justify-content: center;\n}\n.cta-buttons[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  padding: 1rem 2.5rem;\n  border-radius: 8px;\n  font-weight: 500;\n  text-decoration: none;\n  transition: all 0.3s ease;\n}\n.cta-buttons[_ngcontent-%COMP%]   .btn-primary[_ngcontent-%COMP%] {\n  background: #4f46e5;\n  color: white;\n}\n.cta-buttons[_ngcontent-%COMP%]   .btn-primary[_ngcontent-%COMP%]:hover {\n  background: #4338ca;\n}\n.cta-buttons[_ngcontent-%COMP%]   .btn-secondary[_ngcontent-%COMP%] {\n  border: 2px solid #4f46e5;\n  color: #4f46e5;\n}\n.cta-buttons[_ngcontent-%COMP%]   .btn-secondary[_ngcontent-%COMP%]:hover {\n  background: #4f46e5;\n  color: white;\n}\n.features[_ngcontent-%COMP%] {\n  padding: 4rem 2rem;\n  background: white;\n}\n.features-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n  gap: 2rem;\n  max-width: 1200px;\n  margin: 0 auto;\n}\n.feature-card[_ngcontent-%COMP%] {\n  padding: 2rem;\n  text-align: center;\n  background: white;\n  border-radius: 12px;\n  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);\n  transition: transform 0.3s ease;\n}\n.feature-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-5px);\n}\n.feature-card[_ngcontent-%COMP%]   .icon[_ngcontent-%COMP%] {\n  font-size: 2.5rem;\n  margin-bottom: 1rem;\n}\n.feature-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 1.25rem;\n  color: #1f2937;\n  margin-bottom: 0.75rem;\n}\n.feature-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #6b7280;\n}\n.services[_ngcontent-%COMP%] {\n  padding: 4rem 2rem;\n  background: #f3f4f6;\n}\n.services[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  text-align: center;\n  font-size: 2.5rem;\n  color: #1f2937;\n  margin-bottom: 3rem;\n}\n.services[_ngcontent-%COMP%]   .service-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));\n  gap: 2rem;\n  max-width: 1200px;\n  margin: 0 auto;\n}\n.services[_ngcontent-%COMP%]   .service-card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 12px;\n  overflow: hidden;\n  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);\n  transition: transform 0.3s ease;\n}\n.services[_ngcontent-%COMP%]   .service-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-5px);\n}\n.services[_ngcontent-%COMP%]   .service-card[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 200px;\n  object-fit: cover;\n}\n.services[_ngcontent-%COMP%]   .service-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 1.25rem;\n  color: #1f2937;\n  margin: 1rem;\n}\n.services[_ngcontent-%COMP%]   .service-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #6b7280;\n  margin: 0 1rem 1rem;\n}\n.footer[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 2rem;\n  background: #f9fafb;\n  color: #6b7280;\n}\n@media (max-width: 768px) {\n  .hero[_ngcontent-%COMP%] {\n    height: auto;\n    padding: 4rem 1rem;\n  }\n  .logo[_ngcontent-%COMP%] {\n    height: 150px;\n  }\n  h1[_ngcontent-%COMP%] {\n    font-size: 2.5rem;\n  }\n  .tagline[_ngcontent-%COMP%] {\n    font-size: 1.25rem;\n  }\n  .cta-buttons[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 1rem;\n  }\n  .features-grid[_ngcontent-%COMP%], .service-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.custom-manufacturing[_ngcontent-%COMP%] {\n  padding: 4rem 2rem;\n  background:\n    linear-gradient(\n      135deg,\n      #f5f7fa 0%,\n      #e4e7eb 100%);\n}\n.custom-manufacturing[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%] {\n  max-width: 1200px;\n  margin: 0 auto;\n  text-align: center;\n}\n.custom-manufacturing[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  color: #2c3e50;\n  font-size: 2.5rem;\n  margin-bottom: 1.5rem;\n}\n.custom-manufacturing[_ngcontent-%COMP%]   .features[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  gap: 2rem;\n  margin: 3rem 0;\n}\n.custom-manufacturing[_ngcontent-%COMP%]   .feature[_ngcontent-%COMP%] {\n  padding: 2rem;\n  background: white;\n  border-radius: 10px;\n  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\n  transition: transform 0.3s ease;\n}\n.custom-manufacturing[_ngcontent-%COMP%]   .feature[_ngcontent-%COMP%]:hover {\n  transform: translateY(-5px);\n}\n.custom-manufacturing[_ngcontent-%COMP%]   .feature[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 2.5rem;\n  color: #4CAF50;\n  margin-bottom: 1rem;\n}\n.custom-manufacturing[_ngcontent-%COMP%]   .feature[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  color: #2c3e50;\n  margin-bottom: 1rem;\n}\n.custom-manufacturing[_ngcontent-%COMP%]   .cta-button[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  background: #4CAF50;\n  color: white;\n  padding: 1rem 2rem;\n  border-radius: 25px;\n  font-size: 1.1rem;\n  text-decoration: none;\n  transition: all 0.3s ease;\n}\n.custom-manufacturing[_ngcontent-%COMP%]   .cta-button[_ngcontent-%COMP%]:hover {\n  background: #45a049;\n  transform: translateY(-2px);\n}\n.custom-manufacturing[_ngcontent-%COMP%]   .cta-button[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  transition: transform 0.3s ease;\n}\n.custom-manufacturing[_ngcontent-%COMP%]   .cta-button[_ngcontent-%COMP%]:hover   i[_ngcontent-%COMP%] {\n  transform: translateX(5px);\n}\n/*# sourceMappingURL=home.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(HomeComponent, { className: "HomeComponent", filePath: "src\\app\\components\\Home\\home.component.ts", lineNumber: 706 });
})();

// src/app/components/order-confirmation/order-confirmation.component.ts
var _forTrack02 = ($index, $item) => $item.id_order_detail;
function OrderConfirmationComponent_Conditional_6_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4)(1, "span", 8);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 9);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 10);
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "currency");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const detail_r1 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(detail_r1.product.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("x", detail_r1.quantity, "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(7, 3, detail_r1.unit_price, "EUR"));
  }
}
function OrderConfirmationComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2)(1, "h3");
    \u0275\u0275text(2, "R\xE9capitulatif de votre commande");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 3);
    \u0275\u0275repeaterCreate(4, OrderConfirmationComponent_Conditional_6_For_5_Template, 8, 6, "div", 4, _forTrack02);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 5)(7, "strong");
    \u0275\u0275text(8, "Total:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span");
    \u0275\u0275text(10);
    \u0275\u0275pipe(11, "currency");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(12, "div", 6)(13, "button", 7);
    \u0275\u0275text(14, " Continuer mes achats ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275repeater(ctx_r1.order.orderDetails);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(11, 1, ctx_r1.order.montant_total, "EUR"));
  }
}
var OrderConfirmationComponent = class _OrderConfirmationComponent {
  constructor(route, orderService, notificationService) {
    this.route = route;
    this.orderService = orderService;
    this.notificationService = notificationService;
    this.orderId = null;
    this.order = null;
  }
  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.orderId = params.get("id");
      if (this.orderId) {
        const orderIdNumber = parseInt(this.orderId, 10);
        if (!isNaN(orderIdNumber)) {
          this.loadOrderDetails(orderIdNumber);
        } else {
          this.notificationService.error("ID de commande invalide");
        }
      }
    });
  }
  loadOrderDetails(orderId) {
    this.orderService.getOrderById(orderId).subscribe({
      next: (order) => {
        this.order = order;
      },
      error: (error) => {
        console.error("Erreur chargement commande:", error);
        this.notificationService.error("Erreur lors du chargement des d\xE9tails de la commande");
      }
    });
  }
  static {
    this.\u0275fac = function OrderConfirmationComponent_Factory(t) {
      return new (t || _OrderConfirmationComponent)(\u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(OrderService), \u0275\u0275directiveInject(NotificationService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _OrderConfirmationComponent, selectors: [["app-order-confirmation"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 7, vars: 2, consts: [[1, "confirmation-container"], [1, "success-message"], [1, "order-details"], [1, "items-list"], [1, "order-item"], [1, "total"], [1, "actions"], ["routerLink", "/client/products", 1, "continue-shopping"], [1, "product-name"], [1, "quantity"], [1, "price"]], template: function OrderConfirmationComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2");
        \u0275\u0275text(3, "Commande confirm\xE9e!");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "p");
        \u0275\u0275text(5);
        \u0275\u0275elementEnd()();
        \u0275\u0275template(6, OrderConfirmationComponent_Conditional_6_Template, 15, 4);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(5);
        \u0275\u0275textInterpolate1("Votre commande #", ctx.orderId, " a \xE9t\xE9 valid\xE9e avec succ\xE8s");
        \u0275\u0275advance();
        \u0275\u0275conditional(6, ctx.order ? 6 : -1);
      }
    }, dependencies: [CommonModule, CurrencyPipe, RouterModule, RouterLink], styles: ["\n\n.confirmation-container[_ngcontent-%COMP%] {\n  max-width: 800px;\n  margin: 2rem auto;\n  padding: 2rem;\n}\n.success-message[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-bottom: 2rem;\n  padding: 2rem;\n  background: #d4edda;\n  border-radius: 8px;\n  color: #155724;\n}\n.order-details[_ngcontent-%COMP%] {\n  background: white;\n  padding: 2rem;\n  border-radius: 8px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n}\n.items-list[_ngcontent-%COMP%] {\n  margin: 1.5rem 0;\n}\n.order-item[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  padding: 0.75rem 0;\n  border-bottom: 1px solid #eee;\n}\n.total[_ngcontent-%COMP%] {\n  margin-top: 1.5rem;\n  padding-top: 1rem;\n  border-top: 2px solid #eee;\n  text-align: right;\n  font-size: 1.2rem;\n}\n.actions[_ngcontent-%COMP%] {\n  margin-top: 2rem;\n  text-align: center;\n}\n.continue-shopping[_ngcontent-%COMP%] {\n  padding: 0.75rem 1.5rem;\n  background: #4f46e5;\n  color: white;\n  border: none;\n  border-radius: 4px;\n  cursor: pointer;\n}\n.continue-shopping[_ngcontent-%COMP%]:hover {\n  background: #4338ca;\n}\n/*# sourceMappingURL=order-confirmation.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(OrderConfirmationComponent, { className: "OrderConfirmationComponent", filePath: "src\\app\\components\\order-confirmation\\order-confirmation.component.ts", lineNumber: 108 });
})();

// src/app/services/stock/stock.service.ts
var StockService = class _StockService {
  constructor(http, notificationService) {
    this.http = http;
    this.notificationService = notificationService;
    this.apiUrl = environment.apiUrl;
  }
  getProducts() {
    return this.http.get(`${this.apiUrl}/products`);
  }
  getStockAlerts() {
    return this.http.get(`${this.apiUrl}/stock/alerts`);
  }
  downloadStockCsv() {
    return this.http.get(`${this.apiUrl}/stock/export`, {
      responseType: "blob"
    });
  }
  static {
    this.\u0275fac = function StockService_Factory(t) {
      return new (t || _StockService)(\u0275\u0275inject(HttpClient), \u0275\u0275inject(NotificationService));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _StockService, factory: _StockService.\u0275fac, providedIn: "root" });
  }
};

// src/app/feature/Dashboard/DashboardComponent/admin/stock/stock-management.component.ts
var _forTrack03 = ($index, $item) => $item.id_product;
function StockManagementComponent_For_10_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 7);
    \u0275\u0275text(1, "Stock Faible");
    \u0275\u0275elementEnd();
  }
}
function StockManagementComponent_For_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5)(1, "div", 6)(2, "h4");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275template(4, StockManagementComponent_For_10_Conditional_4_Template, 2, 0, "span", 7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 8)(6, "div", 9);
    \u0275\u0275text(7, " Stock : ");
    \u0275\u0275elementStart(8, "strong");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 10);
    \u0275\u0275text(11);
    \u0275\u0275pipe(12, "currency");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const product_r1 = ctx.$implicit;
    \u0275\u0275classProp("low-stock", product_r1.stock < 5);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(product_r1.name);
    \u0275\u0275advance();
    \u0275\u0275conditional(4, product_r1.stock < 5 ? 4 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(product_r1.stock);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(12, 6, product_r1.price, "EUR"));
  }
}
var StockManagementComponent = class _StockManagementComponent {
  // Injection du service StockService dans le constructeur.
  constructor(stockService) {
    this.stockService = stockService;
    this.products = [];
    this.stockAlerts = [];
  }
  // Méthode du cycle de vie Angular appelée à l'initialisation du composant.
  ngOnInit() {
    this.loadProducts();
    this.loadStockAlerts();
  }
  // Récupère la liste des produits depuis l'API.
  loadProducts() {
    this.stockService.getProducts().subscribe({
      next: (data) => this.products = data,
      // Met à jour le tableau de produits.
      error: (err) => console.error("Erreur chargement produits:", err)
      // Gère les erreurs.
    });
  }
  // Récupère les alertes de stock depuis l'API.
  loadStockAlerts() {
    this.stockService.getStockAlerts().subscribe({
      next: (data) => this.stockAlerts = data,
      // Met à jour les alertes de stock.
      error: (err) => console.error("Erreur chargement alertes:", err)
      // Gère les erreurs.
    });
  }
  // Exporte les données de stock sous forme de fichier CSV.
  exportStock() {
    this.stockService.downloadStockCsv().subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "stock.csv";
        link.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err) => console.error("Erreur export:", err)
      // Gère les erreurs.
    });
  }
  static {
    this.\u0275fac = function StockManagementComponent_Factory(t) {
      return new (t || _StockManagementComponent)(\u0275\u0275directiveInject(StockService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _StockManagementComponent, selectors: [["app-stock-management"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 11, vars: 0, consts: [[1, "container"], [1, "export-btn", 3, "click"], [1, "fas", "fa-download"], [1, "stock-grid"], [1, "stock-card", 3, "low-stock"], [1, "stock-card"], [1, "product-header"], [1, "stock-badge", "warning"], [1, "stock-info"], [1, "stock-count"], [1, "price"]], template: function StockManagementComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "h2");
        \u0275\u0275text(2, "Gestion des Stocks");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(3, "button", 1);
        \u0275\u0275listener("click", function StockManagementComponent_Template_button_click_3_listener() {
          return ctx.exportStock();
        });
        \u0275\u0275element(4, "i", 2);
        \u0275\u0275text(5, " Exporter le Stock (CSV) ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(6, "h3");
        \u0275\u0275text(7, "\xC9tat du Stock");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(8, "div", 3);
        \u0275\u0275repeaterCreate(9, StockManagementComponent_For_10_Template, 13, 9, "div", 4, _forTrack03);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275advance(9);
        \u0275\u0275repeater(ctx.products);
      }
    }, dependencies: [CommonModule, CurrencyPipe], styles: ['@charset "UTF-8";\n\n\n\n.container[_ngcontent-%COMP%] {\n  padding: 2rem;\n  max-width: 1200px;\n  margin: 0 auto;\n}\n.export-btn[_ngcontent-%COMP%] {\n  background: #4f46e5;\n  color: white;\n  padding: 0.75rem 1.5rem;\n  border: none;\n  border-radius: 0.5rem;\n  cursor: pointer;\n  margin-bottom: 2rem;\n  transition: background-color 0.2s;\n}\n.stock-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));\n  gap: 1.5rem;\n}\n.stock-card[_ngcontent-%COMP%] {\n  background: white;\n  padding: 1.5rem;\n  border-radius: 0.5rem;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n}\n.stock-card.low-stock[_ngcontent-%COMP%] {\n  border-left: 4px solid #dc2626;\n}\n.product-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 1rem;\n}\n.product-header[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1.1rem;\n}\n.stock-badge[_ngcontent-%COMP%] {\n  padding: 0.25rem 0.75rem;\n  border-radius: 9999px;\n  font-size: 0.875rem;\n  font-weight: 500;\n}\n.stock-badge.warning[_ngcontent-%COMP%] {\n  background: #fef2f2;\n  color: #dc2626;\n}\n.stock-info[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-top: 1rem;\n}\n.price[_ngcontent-%COMP%] {\n  font-size: 1.25rem;\n  font-weight: 600;\n  color: #4f46e5;\n}\n/*# sourceMappingURL=stock-management.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(StockManagementComponent, { className: "StockManagementComponent", filePath: "src\\app\\feature\\Dashboard\\DashboardComponent\\admin\\stock\\stock-management.component.ts", lineNumber: 127 });
})();

// src/app/components/payment/payment-success.component.ts
function PaymentSuccessComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 3)(1, "p");
    \u0275\u0275text(2, "L'acompte a \xE9t\xE9 pay\xE9 avec succ\xE8s !");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "Votre demande de fabrication est maintenant en cours de traitement.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 4)(6, "a", 5);
    \u0275\u0275text(7, " Voir mes fabrications ");
    \u0275\u0275elementEnd()()();
  }
}
function PaymentSuccessComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6)(1, "p");
    \u0275\u0275text(2, "Votre commande a \xE9t\xE9 confirm\xE9e avec succ\xE8s !");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "Vous recevrez bient\xF4t un email de confirmation.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 4)(6, "a", 7);
    \u0275\u0275text(7, " Voir mes commandes ");
    \u0275\u0275elementEnd()()();
  }
}
var PaymentSuccessComponent = class _PaymentSuccessComponent {
  constructor(route, cartService) {
    this.route = route;
    this.cartService = cartService;
    this.isDeposit = false;
  }
  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.isDeposit = params["type"] === "deposit";
      this.manufacturingId = params["manufacturingId"];
    });
    if (!this.isDeposit) {
      this.cartService.clearCart().subscribe({
        next: () => console.log("Panier vid\xE9 avec succ\xE8s"),
        error: (err) => console.error("Erreur vidage panier:", err)
      });
    }
  }
  static {
    this.\u0275fac = function PaymentSuccessComponent_Factory(t) {
      return new (t || _PaymentSuccessComponent)(\u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(CartService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PaymentSuccessComponent, selectors: [["app-payment-success"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 8, vars: 1, consts: [[1, "success-container"], [1, "success-icon"], [1, "success-content"], [1, "deposit-success"], [1, "actions"], ["routerLink", "/manufacturing/list", 1, "btn", "primary"], [1, "order-success"], ["routerLink", "/client/orders", 1, "btn", "primary"]], template: function PaymentSuccessComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1);
        \u0275\u0275text(2, "\u2713");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(3, "h2");
        \u0275\u0275text(4, "Paiement R\xE9ussi");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "div", 2);
        \u0275\u0275template(6, PaymentSuccessComponent_Conditional_6_Template, 8, 0, "div", 3)(7, PaymentSuccessComponent_Conditional_7_Template, 8, 0);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275advance(6);
        \u0275\u0275conditional(6, ctx.isDeposit ? 6 : 7);
      }
    }, dependencies: [CommonModule, RouterModule, RouterLink], styles: ["\n\n.success-container[_ngcontent-%COMP%] {\n  max-width: 600px;\n  margin: 2rem auto;\n  padding: 2rem;\n  background: white;\n  border-radius: 8px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n  text-align: center;\n}\n.success-icon[_ngcontent-%COMP%] {\n  font-size: 3rem;\n  color: #22c55e;\n  background: #dcfce7;\n  width: 80px;\n  height: 80px;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin: 0 auto 1rem;\n}\n.success-content[_ngcontent-%COMP%] {\n  margin-top: 2rem;\n}\n.actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 1rem;\n  justify-content: center;\n  margin-top: 2rem;\n}\n.btn[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 0.8rem 1.5rem;\n  text-decoration: none;\n  border-radius: 4px;\n  font-weight: 500;\n}\n.primary[_ngcontent-%COMP%] {\n  background: #2c3e50;\n  color: white;\n}\n.secondary[_ngcontent-%COMP%] {\n  border: 1px solid #2c3e50;\n  color: #2c3e50;\n}\n/*# sourceMappingURL=payment-success.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PaymentSuccessComponent, { className: "PaymentSuccessComponent", filePath: "src\\app\\components\\payment\\payment-success.component.ts", lineNumber: 89 });
})();

// src/app/components/manufacturing/manufacturing-request/manufacturing-request.component.ts
function ManufacturingRequestComponent_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small", 8);
    \u0275\u0275text(1, "Ce champ est requis");
    \u0275\u0275elementEnd();
  }
}
function ManufacturingRequestComponent_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small", 8);
    \u0275\u0275text(1, "Ce champ est requis");
    \u0275\u0275elementEnd();
  }
}
function ManufacturingRequestComponent_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small", 8);
    \u0275\u0275text(1, "Une ordonnance est requise");
    \u0275\u0275elementEnd();
  }
}
function ManufacturingRequestComponent_Conditional_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17);
    \u0275\u0275text(1, "Traitement en cours...");
    \u0275\u0275elementEnd();
  }
}
var ManufacturingRequestComponent = class _ManufacturingRequestComponent {
  constructor(fb, manufacturingService, notificationService, router) {
    this.fb = fb;
    this.manufacturingService = manufacturingService;
    this.notificationService = notificationService;
    this.router = router;
    this.selectedFile = null;
    this.loading = false;
    this.requestForm = this.fb.group({
      type: ["", Validators.required],
      // Champ requis pour le type de médicament
      description: ["", Validators.required],
      // Champ requis pour la description
      instructions: [""],
      // Champ optionnel pour les instructions
      prescription: [null, Validators.required]
      // Champ requis pour l'ordonnance
    });
  }
  ngOnInit() {
  }
  // Méthode pour gérer la sélection de fichiers
  onFileSelected(event) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.requestForm.patchValue({
        prescription: file
      });
    }
  }
  // Méthode pour valider le formulaire
  validateForm() {
    if (!this.requestForm.valid) {
      this.notificationService.error("Veuillez remplir tous les champs requis");
      return false;
    }
    if (!this.selectedFile) {
      this.notificationService.error("Une ordonnance est requise");
      return false;
    }
    const fileType = this.selectedFile.type;
    if (!["application/pdf", "image/jpeg", "image/png"].includes(fileType)) {
      this.notificationService.error("Format de fichier non support\xE9");
      return false;
    }
    return true;
  }
  // Méthode pour soumettre le formulaire
  onSubmit() {
    if (this.requestForm.valid && this.selectedFile) {
      this.loading = true;
      const formData = new FormData();
      formData.append("type", this.requestForm.get("type")?.value);
      formData.append("description", this.requestForm.get("description")?.value);
      formData.append("instructions", this.requestForm.get("instructions")?.value || "");
      formData.append("prescription", this.selectedFile);
      console.log("Envoi de la demande...", {
        type: this.requestForm.get("type")?.value,
        description: this.requestForm.get("description")?.value,
        instructions: this.requestForm.get("instructions")?.value,
        prescriptionFile: this.selectedFile.name
      });
      this.manufacturingService.createManufacturingRequest(formData).subscribe({
        next: (response) => {
          console.log("R\xE9ponse re\xE7ue:", response);
          this.notificationService.success("Demande envoy\xE9e avec succ\xE8s");
          this.router.navigate(["/manufacturing/payment", response.id]);
        },
        error: (error) => {
          console.error("Erreur lors de l'envoi:", error);
          this.notificationService.error("Erreur lors de l'envoi de la demande");
          this.loading = false;
        }
      });
    }
  }
  static {
    this.\u0275fac = function ManufacturingRequestComponent_Factory(t) {
      return new (t || _ManufacturingRequestComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(ManufacturingService), \u0275\u0275directiveInject(NotificationService), \u0275\u0275directiveInject(Router));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ManufacturingRequestComponent, selectors: [["app-manufacturing-request"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 35, vars: 6, consts: [[1, "request-container"], [3, "ngSubmit", "formGroup"], [1, "form-group"], ["for", "medicationType"], ["id", "medicationType", "formControlName", "type"], ["value", ""], ["value", "cream"], ["value", "capsules"], [1, "error"], ["for", "description"], ["id", "description", "formControlName", "description", "placeholder", "D\xE9crivez votre besoin..."], ["for", "instructions"], ["id", "instructions", "formControlName", "instructions", "placeholder", "Instructions sp\xE9cifiques (optionnel)..."], ["for", "prescription"], ["type", "file", "id", "prescription", "accept", ".pdf,.jpg,.jpeg,.png", 3, "change"], [1, "form-actions"], ["type", "submit", 3, "disabled"], [1, "loading"]], template: function ManufacturingRequestComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "h2");
        \u0275\u0275text(2, "Demande de Fabrication sur Mesure");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(3, "form", 1);
        \u0275\u0275listener("ngSubmit", function ManufacturingRequestComponent_Template_form_ngSubmit_3_listener() {
          return ctx.onSubmit();
        });
        \u0275\u0275elementStart(4, "div", 2)(5, "label", 3);
        \u0275\u0275text(6, "Type de m\xE9dicament*");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(7, "select", 4)(8, "option", 5);
        \u0275\u0275text(9, "S\xE9lectionnez un type");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(10, "option", 6);
        \u0275\u0275text(11, "Cr\xE8me");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(12, "option", 7);
        \u0275\u0275text(13, "G\xE9lules");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(14, ManufacturingRequestComponent_Conditional_14_Template, 2, 0, "small", 8);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(15, "div", 2)(16, "label", 9);
        \u0275\u0275text(17, "Description*");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(18, "textarea", 10);
        \u0275\u0275text(19, "          ");
        \u0275\u0275elementEnd();
        \u0275\u0275template(20, ManufacturingRequestComponent_Conditional_20_Template, 2, 0, "small", 8);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(21, "div", 2)(22, "label", 11);
        \u0275\u0275text(23, "Instructions suppl\xE9mentaires");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(24, "textarea", 12);
        \u0275\u0275text(25, "          ");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(26, "div", 2)(27, "label", 13);
        \u0275\u0275text(28, "Ordonnance* (PDF ou Image)");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(29, "input", 14);
        \u0275\u0275listener("change", function ManufacturingRequestComponent_Template_input_change_29_listener($event) {
          return ctx.onFileSelected($event);
        });
        \u0275\u0275elementEnd();
        \u0275\u0275template(30, ManufacturingRequestComponent_Conditional_30_Template, 2, 0, "small", 8);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(31, "div", 15)(32, "button", 16);
        \u0275\u0275text(33, " Soumettre la demande ");
        \u0275\u0275elementEnd()()();
        \u0275\u0275template(34, ManufacturingRequestComponent_Conditional_34_Template, 2, 0, "div", 17);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        let tmp_1_0;
        let tmp_2_0;
        \u0275\u0275advance(3);
        \u0275\u0275property("formGroup", ctx.requestForm);
        \u0275\u0275advance(11);
        \u0275\u0275conditional(14, ((tmp_1_0 = ctx.requestForm.get("type")) == null ? null : tmp_1_0.errors == null ? null : tmp_1_0.errors["required"]) && ((tmp_1_0 = ctx.requestForm.get("type")) == null ? null : tmp_1_0.touched) ? 14 : -1);
        \u0275\u0275advance(6);
        \u0275\u0275conditional(20, ((tmp_2_0 = ctx.requestForm.get("description")) == null ? null : tmp_2_0.errors == null ? null : tmp_2_0.errors["required"]) && ((tmp_2_0 = ctx.requestForm.get("description")) == null ? null : tmp_2_0.touched) ? 20 : -1);
        \u0275\u0275advance(10);
        \u0275\u0275conditional(30, !ctx.selectedFile ? 30 : -1);
        \u0275\u0275advance(2);
        \u0275\u0275property("disabled", !ctx.requestForm.valid || !ctx.selectedFile);
        \u0275\u0275advance(2);
        \u0275\u0275conditional(34, ctx.loading ? 34 : -1);
      }
    }, dependencies: [CommonModule, ReactiveFormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName], styles: ["\n\n.request-container[_ngcontent-%COMP%] {\n  max-width: 500px;\n  margin: 20px auto;\n  padding: 20px;\n  background: white;\n  border-radius: 8px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n}\n.form-group[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\nlabel[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 5px;\n  font-weight: 500;\n}\nselect[_ngcontent-%COMP%], textarea[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 8px;\n  border: 1px solid #ddd;\n  border-radius: 4px;\n}\ntextarea[_ngcontent-%COMP%] {\n  height: 100px;\n}\n.error[_ngcontent-%COMP%] {\n  color: red;\n  font-size: 12px;\n  margin-top: 5px;\n  display: block;\n}\nbutton[_ngcontent-%COMP%] {\n  background: #0066cc;\n  color: white;\n  padding: 10px 20px;\n  border: none;\n  border-radius: 4px;\n  cursor: pointer;\n}\nbutton[_ngcontent-%COMP%]:disabled {\n  background: #cccccc;\n}\n.loading[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-top: 20px;\n  color: #666;\n}\n/*# sourceMappingURL=manufacturing-request.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ManufacturingRequestComponent, { className: "ManufacturingRequestComponent", filePath: "src\\app\\components\\manufacturing\\manufacturing-request\\manufacturing-request.component.ts", lineNumber: 143 });
})();

// src/app/components/manufacturing/manufacturing-payment/manufacturing-payment.component.ts
function ManufacturingPaymentComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275text(0, " // V\xE9rifie si les d\xE9tails de la commande sont disponibles ");
    \u0275\u0275elementStart(1, "div", 2)(2, "div", 3)(3, "span");
    \u0275\u0275text(4, "Type:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 3)(8, "span");
    \u0275\u0275text(9, "Prix Total:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "span");
    \u0275\u0275text(11);
    \u0275\u0275pipe(12, "currency");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "div", 4)(14, "strong");
    \u0275\u0275text(15, "Acompte (30%):");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "strong");
    \u0275\u0275text(17);
    \u0275\u0275pipe(18, "currency");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(19, "div", 5)(20, "h3");
    \u0275\u0275text(21, "Paiement S\xE9curis\xE9");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "div", 6);
    \u0275\u0275element(23, "app-paypal-button", 7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "button", 8);
    \u0275\u0275listener("click", function ManufacturingPaymentComponent_Conditional_6_Template_button_click_24_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.payByCard());
    });
    \u0275\u0275element(25, "i", 9);
    \u0275\u0275text(26, " Payer par Carte ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.orderDetails.type);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(12, 6, ctx_r1.orderDetails.totalPrice, "EUR"));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(18, 9, ctx_r1.orderDetails.deposit, "EUR"));
    \u0275\u0275advance(6);
    \u0275\u0275property("amount", ctx_r1.orderDetails.deposit || 0)("isDeposit", true)("manufacturingRequestId", ctx_r1.orderId);
  }
}
function ManufacturingPaymentComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " // Si les d\xE9tails de la commande ne sont pas encore charg\xE9s ");
    \u0275\u0275elementStart(1, "div", 10);
    \u0275\u0275text(2, " Chargement des d\xE9tails... ");
    \u0275\u0275elementEnd();
  }
}
var ManufacturingPaymentComponent = class _ManufacturingPaymentComponent {
  constructor(route, router, manufacturingService, notificationService, orderService) {
    this.route = route;
    this.router = router;
    this.manufacturingService = manufacturingService;
    this.notificationService = notificationService;
    this.orderService = orderService;
    this.orderDetails = null;
    this.orderId = 0;
  }
  ngOnInit() {
    console.log("Component initialized");
    this.orderId = parseInt(this.route.snapshot.params["id"]);
    this.loadOrderDetails();
  }
  loadOrderDetails() {
    return __async(this, null, function* () {
      try {
        console.log("Loading order details for ID:", this.orderId);
        const response = yield this.manufacturingService.getManufacturingDetails(this.orderId).toPromise();
        if (response) {
          this.orderDetails = response;
          console.log("Order details loaded:", this.orderDetails);
        }
      } catch (error) {
        console.error("Error loading details:", error);
        this.notificationService.error("Erreur lors du chargement des d\xE9tails");
      }
    });
  }
  handlePaymentSuccess(paymentInfo) {
    const clientId = localStorage.getItem("clientId");
    if (!clientId) {
      this.notificationService.error("Session expir\xE9e");
      this.router.navigate(["/login"]);
      return;
    }
    const orderData = {
      clientId: Number(clientId),
      // ID du client
      orderLines: [{
        productId: this.orderDetails?.id || 0,
        // ID du produit
        quantity: 1
        // Quantité
      }],
      payment: {
        method: "PAYPAL",
        // Méthode de paiement
        transactionId: paymentInfo.orderId || paymentInfo.id,
        // ID de la transaction
        status: "COMPLETED",
        // Statut du paiement
        amount: this.orderDetails?.deposit || 0
        // Montant de l'acompte
      }
    };
    this.orderService.createManufacturingOrder(orderData).subscribe({
      next: (response) => {
        this.notificationService.success("Acompte pay\xE9 avec succ\xE8s !");
        this.router.navigate(["/manufacturing-confirmation", response.id_order]);
      },
      error: (error) => {
        console.error("Erreur paiement acompte:", error);
        this.notificationService.error("Erreur lors du paiement de l'acompte");
      }
    });
  }
  payByCard() {
    this.notificationService.info("Paiement par carte bient\xF4t disponible");
  }
  static {
    this.\u0275fac = function ManufacturingPaymentComponent_Factory(t) {
      return new (t || _ManufacturingPaymentComponent)(\u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(ManufacturingService), \u0275\u0275directiveInject(NotificationService), \u0275\u0275directiveInject(OrderService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ManufacturingPaymentComponent, selectors: [["app-manufacturing-payment"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 8, vars: 2, consts: [[1, "payment-container"], [1, "order-details"], [1, "details"], [1, "detail-line"], [1, "detail-line", "total"], [1, "payment-methods"], [1, "paypal-container"], [3, "amount", "isDeposit", "manufacturingRequestId"], [1, "btn", "card", 3, "click"], [1, "fas", "fa-credit-card"], [1, "loading"]], template: function ManufacturingPaymentComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "h2");
        \u0275\u0275text(2, "Paiement de l'Acompte");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(3, "div", 1)(4, "h3");
        \u0275\u0275text(5);
        \u0275\u0275elementEnd();
        \u0275\u0275template(6, ManufacturingPaymentComponent_Conditional_6_Template, 27, 12)(7, ManufacturingPaymentComponent_Conditional_7_Template, 3, 0);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275advance(5);
        \u0275\u0275textInterpolate1("D\xE9tails de la Commande #", ctx.orderId, "");
        \u0275\u0275advance();
        \u0275\u0275conditional(6, ctx.orderDetails ? 6 : 7);
      }
    }, dependencies: [CommonModule, CurrencyPipe, PaypalButtonComponent], styles: ["\n\n.payment-container[_ngcontent-%COMP%] {\n  max-width: 600px;\n  margin: 2rem auto;\n  padding: 2rem;\n  background: white;\n  border-radius: 8px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n}\n.detail-line[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  padding: 0.75rem 0;\n  border-bottom: 1px solid #eee;\n}\n.total[_ngcontent-%COMP%] {\n  margin-top: 1rem;\n  border-top: 2px solid #ddd;\n  border-bottom: none;\n  font-size: 1.2em;\n}\n.payment-methods[_ngcontent-%COMP%] {\n  margin-top: 2rem;\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n  align-items: center;\n}\n.paypal-container[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 300px;\n  margin: 1rem 0;\n}\n.btn[_ngcontent-%COMP%] {\n  padding: 0.75rem 1.5rem;\n  border: none;\n  border-radius: 4px;\n  cursor: pointer;\n  font-weight: bold;\n  width: 100%;\n  max-width: 300px;\n}\n.card[_ngcontent-%COMP%] {\n  background: #2c3e50;\n  color: white;\n}\n.loading[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 2rem;\n  color: #666;\n}\n/*# sourceMappingURL=manufacturing-payment.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ManufacturingPaymentComponent, { className: "ManufacturingPaymentComponent", filePath: "src\\app\\components\\manufacturing\\manufacturing-payment\\manufacturing-payment.component.ts", lineNumber: 120 });
})();

// src/app/services/notification.service.ts
var NotificationService2 = class _NotificationService {
  constructor() {
  }
  // Méthode pour afficher un message d'erreur dans la console
  error(message) {
    console.error(message);
  }
  // Méthode pour afficher un message de succès dans la console
  success(message) {
    console.log(message);
  }
  static {
    this.\u0275fac = function NotificationService_Factory(t) {
      return new (t || _NotificationService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
      token: _NotificationService,
      factory: _NotificationService.\u0275fac,
      providedIn: "root"
      // Service injectable dans toute l'application
    });
  }
};

// src/app/components/manufacturing/manufacturing-list/manufacturing-list.component.ts
var _forTrack04 = ($index, $item) => $item.id;
var _c0 = (a0) => ["/manufacturing/payment", a0];
function ManufacturingListComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 1);
    \u0275\u0275text(1, "Chargement...");
    \u0275\u0275elementEnd();
  }
}
function ManufacturingListComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2)(1, "p");
    \u0275\u0275text(2, "Aucune fabrication en cours");
    \u0275\u0275elementEnd()();
  }
}
function ManufacturingListComponent_Conditional_5_For_2_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 14);
    \u0275\u0275text(1, " Payer l'acompte ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r1 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(1, _c0, item_r1.id));
  }
}
function ManufacturingListComponent_Conditional_5_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4)(1, "div", 5)(2, "div", 6);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 7)(5, "div", 8);
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 9);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 10);
    \u0275\u0275text(11, "2");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 11)(13, "div");
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "div", 12)(16, "div");
    \u0275\u0275text(17);
    \u0275\u0275pipe(18, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "div");
    \u0275\u0275text(20);
    \u0275\u0275pipe(21, "currency");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(22, "div", 13)(23, "div");
    \u0275\u0275text(24);
    \u0275\u0275pipe(25, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275template(26, ManufacturingListComponent_Conditional_5_For_2_Conditional_26_Template, 2, 3, "a", 14);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r1 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("Fabrication #", item_r1.id, "");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(7, 9, item_r1.createdAt, "dd/MM/yyyy"));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", item_r1.statusClass);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r1.statusText, " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(item_r1.type);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("Prix Total: ", \u0275\u0275pipeBind2(18, 12, item_r1.totalPrice || 40, "EUR"), "");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("Acompte (30%): ", \u0275\u0275pipeBind2(21, 15, item_r1.totalPrice * 0.3 || 12, "EUR"), "");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("Total: ", \u0275\u0275pipeBind2(25, 18, item_r1.totalPrice || 40, "EUR"), "");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(26, item_r1.status === "EN_ATTENTE_ACOMPTE" ? 26 : -1);
  }
}
function ManufacturingListComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 3);
    \u0275\u0275repeaterCreate(1, ManufacturingListComponent_Conditional_5_For_2_Template, 27, 21, "div", 4, _forTrack04);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.manufacturingItems);
  }
}
var ManufacturingListComponent = class _ManufacturingListComponent {
  // Injection des dépendances dans le constructeur
  constructor(manufacturingService, notificationService) {
    this.manufacturingService = manufacturingService;
    this.notificationService = notificationService;
    this.destroy$ = new Subject();
    this.manufacturingItems = [];
    this.totalPrice = 40;
    this.deposit = 12;
    this.loading = true;
  }
  // Méthode du cycle de vie Angular appelée après la création du composant
  ngOnInit() {
    this.loadManufacturingItems();
  }
  // Méthode du cycle de vie Angular appelée avant la destruction du composant
  ngOnDestroy() {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
    this.destroy$.next();
    this.destroy$.complete();
  }
  // Méthode pour charger les fabrications
  loadManufacturingItems() {
    this.loading = true;
    this.manufacturingService.getClientManufacturingItems().subscribe({
      next: (items) => {
        console.log("Items re\xE7us:", items);
        this.manufacturingItems = items;
        this.loading = false;
      },
      error: (error) => {
        console.error("Erreur chargement fabrications:", error);
        this.notificationService.error("Erreur lors du chargement des fabrications");
        this.loading = false;
      }
    });
  }
  static {
    this.\u0275fac = function ManufacturingListComponent_Factory(t) {
      return new (t || _ManufacturingListComponent)(\u0275\u0275directiveInject(ManufacturingService), \u0275\u0275directiveInject(NotificationService2));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ManufacturingListComponent, selectors: [["app-manufacturing-list"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 6, vars: 3, consts: [[1, "manufacturing-list"], [1, "loading"], [1, "empty-state"], [1, "items-grid"], [1, "fabrication-item"], [1, "header"], [1, "title"], [1, "meta"], [1, "date"], [1, "status", 3, "ngClass"], [1, "quantity"], [1, "content"], [1, "price-details"], [1, "footer"], [1, "btn-primary", 3, "routerLink"]], template: function ManufacturingListComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "h2");
        \u0275\u0275text(2, "Mes Fabrications");
        \u0275\u0275elementEnd();
        \u0275\u0275template(3, ManufacturingListComponent_Conditional_3_Template, 2, 0, "div", 1)(4, ManufacturingListComponent_Conditional_4_Template, 3, 0, "div", 2)(5, ManufacturingListComponent_Conditional_5_Template, 3, 0, "div", 3);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(3);
        \u0275\u0275conditional(3, ctx.loading ? 3 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(4, !ctx.loading && ctx.manufacturingItems.length === 0 ? 4 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(5, !ctx.loading && ctx.manufacturingItems.length > 0 ? 5 : -1);
      }
    }, dependencies: [CommonModule, NgClass, CurrencyPipe, DatePipe, RouterModule, RouterLink], styles: ["\n\n.manufacturing-list[_ngcontent-%COMP%] {\n  padding: 20px;\n  max-width: 1200px;\n  margin: 0 auto;\n}\n.fabrication-item[_ngcontent-%COMP%] {\n  background: white;\n  margin-bottom: 20px;\n  border-radius: 4px;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n}\n.header[_ngcontent-%COMP%] {\n  padding: 15px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.title[_ngcontent-%COMP%] {\n  font-weight: 500;\n}\n.meta[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 15px;\n  align-items: center;\n}\n.date[_ngcontent-%COMP%] {\n  color: #666;\n}\n.status[_ngcontent-%COMP%] {\n  padding: 4px 12px;\n  border-radius: 4px;\n  font-size: 0.9em;\n  font-weight: 500;\n}\n.status-pending[_ngcontent-%COMP%] {\n  background-color: #ffc107;\n  color: #000;\n}\n.status-deposit[_ngcontent-%COMP%] {\n  background-color: #17a2b8;\n  color: #fff;\n}\n.status-progress[_ngcontent-%COMP%] {\n  background-color: #007bff;\n  color: #fff;\n}\n.status-ready[_ngcontent-%COMP%] {\n  background-color: #28a745;\n  color: #fff;\n}\n.status-completed[_ngcontent-%COMP%] {\n  background-color: #198754;\n  color: #fff;\n}\n.quantity[_ngcontent-%COMP%] {\n  background: #1976d2;\n  color: white;\n  padding: 2px 8px;\n  border-radius: 4px;\n}\n.content[_ngcontent-%COMP%] {\n  padding: 15px;\n  border-top: 1px solid #eee;\n}\n.price-details[_ngcontent-%COMP%] {\n  margin-top: 10px;\n  color: #666;\n}\n.footer[_ngcontent-%COMP%] {\n  padding: 15px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  border-top: 1px solid #eee;\n}\n.btn-primary[_ngcontent-%COMP%] {\n  background: #007bff;\n  color: white;\n  padding: 6px 12px;\n  border-radius: 4px;\n  text-decoration: none;\n}\n.items-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));\n  gap: 20px;\n  margin-top: 20px;\n}\n.loading[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 20px;\n}\n.empty-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 20px;\n}\n/*# sourceMappingURL=manufacturing-list.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ManufacturingListComponent, { className: "ManufacturingListComponent", filePath: "src\\app\\components\\manufacturing\\manufacturing-list\\manufacturing-list.component.ts", lineNumber: 167 });
})();

// src/app/components/manufacturing/manufacturing-confirmation/manufacturing-confirmation.component.ts
var ManufacturingConfirmationComponent = class _ManufacturingConfirmationComponent {
  // Injection des dépendances dans le constructeur
  constructor(route, notificationService) {
    this.route = route;
    this.notificationService = notificationService;
    this.manufacturingId = "";
  }
  // Méthode du cycle de vie Angular appelée après la création du composant
  ngOnInit() {
    this.manufacturingId = this.route.snapshot.params["id"];
  }
  static {
    this.\u0275fac = function ManufacturingConfirmationComponent_Factory(t) {
      return new (t || _ManufacturingConfirmationComponent)(\u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(NotificationService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ManufacturingConfirmationComponent, selectors: [["app-manufacturing-confirmation"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 12, vars: 1, consts: [[1, "confirmation-container"], [1, "confirmation-content"]], template: function ManufacturingConfirmationComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "h2");
        \u0275\u0275text(2, "Confirmation de Paiement");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(3, "div", 1)(4, "p");
        \u0275\u0275text(5, "Votre acompte a \xE9t\xE9 pay\xE9 avec succ\xE8s !");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(6, "p");
        \u0275\u0275text(7);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(8, "p");
        \u0275\u0275text(9, "Nous allons commencer la fabrication de votre produit.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(10, "p");
        \u0275\u0275text(11, `Vous pouvez suivre l'avancement dans la section "Mes Fabrications".`);
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(7);
        \u0275\u0275textInterpolate1("Num\xE9ro de commande: #", ctx.manufacturingId, "");
      }
    }, dependencies: [CommonModule], styles: ['@charset "UTF-8";\n\n\n\n.confirmation-container[_ngcontent-%COMP%] {\n  max-width: 600px;\n  margin: 2rem auto;\n  padding: 2rem;\n  background: white;\n  border-radius: 8px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n}\n.confirmation-content[_ngcontent-%COMP%] {\n  margin-top: 2rem;\n  text-align: center;\n}\nh2[_ngcontent-%COMP%] {\n  color: #2c3e50;\n  text-align: center;\n}\np[_ngcontent-%COMP%] {\n  margin: 1rem 0;\n  line-height: 1.5;\n}\n/*# sourceMappingURL=manufacturing-confirmation.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ManufacturingConfirmationComponent, { className: "ManufacturingConfirmationComponent", filePath: "src\\app\\components\\manufacturing\\manufacturing-confirmation\\manufacturing-confirmation.component.ts", lineNumber: 46 });
})();

// src/app/components/auth-callback/auth-callback.component.ts
var AuthCallbackComponent = class _AuthCallbackComponent {
  constructor(route, router, authService) {
    this.route = route;
    this.router = router;
    this.authService = authService;
  }
  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const token = params["token"];
      const refreshToken = params["refreshToken"];
      if (token && refreshToken) {
        const isAdmin = params["email"] === "abdel@hotmail.be";
        const clientId = params["clientId"];
        this.authService.saveAuthData({
          token,
          refreshToken,
          credential: {
            credential_id: params["credentialId"],
            username: params["email"],
            mail: params["email"],
            isAdmin,
            googleId: params["googleId"],
            googleEmail: params["email"],
            isGoogleAccount: true
          },
          clientId: !isAdmin ? parseInt(clientId) : void 0
        });
        if (!isAdmin) {
          localStorage.setItem("clientId", clientId);
          localStorage.setItem("isClient", "true");
        }
        const userRole = isAdmin ? "admin" : "client";
        this.router.navigate([`/${userRole}/products`]);
      } else {
        this.router.navigate(["/login"]);
      }
    });
  }
  static {
    this.\u0275fac = function AuthCallbackComponent_Factory(t) {
      return new (t || _AuthCallbackComponent)(\u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(AuthService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AuthCallbackComponent, selectors: [["app-auth-callback"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 2, vars: 0, template: function AuthCallbackComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div");
        \u0275\u0275text(1, "Authentification en cours...");
        \u0275\u0275elementEnd();
      }
    }, dependencies: [CommonModule], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AuthCallbackComponent, { className: "AuthCallbackComponent", filePath: "src\\app\\components\\auth-callback\\auth-callback.component.ts", lineNumber: 13 });
})();

// src/app/newRoot/app.routes.ts
var routes = [
  {
    path: "",
    // La route principale de l'application, affichant la page d'accueil
    component: HomeComponent,
    canActivate: [NoAuthGuard]
    // Vérifie si l'utilisateur n'est pas authentifié avant d'accéder à la page d'accueil
  },
  {
    path: "login",
    // Route pour la page de connexion
    component: LoginComponent,
    canActivate: [NoAuthGuard]
    // L'utilisateur ne doit pas être connecté pour accéder à cette page
  },
  {
    path: "register",
    // Route pour la page d'inscription
    component: RegisterComponent,
    canActivate: [NoAuthGuard]
    // L'utilisateur ne doit pas être connecté pour accéder à cette page
  },
  {
    path: "payment-success",
    // Route pour la page de succès de paiement
    component: PaymentSuccessComponent,
    canActivate: [AuthGuard]
    // L'utilisateur doit être authentifié pour accéder à cette page
  },
  {
    path: "order-confirmation/:id",
    // Route pour la confirmation de commande avec un paramètre dynamique 'id'
    component: OrderConfirmationComponent,
    canActivate: [AuthGuard]
    // L'utilisateur doit être authentifié pour accéder à cette page
  },
  {
    path: "admin/stock",
    // Route pour la gestion des stocks côté administrateur
    component: StockManagementComponent,
    canActivate: [AuthGuard, AdminGuard]
    // L'utilisateur doit être authentifié et avoir les droits administratifs
  },
  {
    path: "admin",
    // Route pour le dashboard administrateur avec une importation paresseuse des sous-routes
    loadChildren: () => import("./chunk-FKD4W3RM.js").then((m) => m.adminRoutes),
    canActivate: [AuthGuard, AdminGuard]
    // L'utilisateur doit être authentifié et administrateur
  },
  {
    path: "client",
    // Route pour le dashboard client avec une importation paresseuse des sous-routes
    loadChildren: () => import("./chunk-M23GLRPF.js").then((m) => m.clientRoutes),
    canActivate: [AuthGuard]
    // L'utilisateur doit être authentifié pour accéder au dashboard client
  },
  // Routes spécifiques à la fabrication
  {
    path: "manufacturing/request",
    // Route pour la demande de fabrication
    component: ManufacturingRequestComponent,
    canActivate: [AuthGuard]
    // L'utilisateur doit être authentifié pour accéder à cette page
  },
  {
    path: "manufacturing/payment/:id",
    // Route pour le paiement de fabrication avec un paramètre dynamique 'id'
    component: ManufacturingPaymentComponent,
    canActivate: [AuthGuard]
    // L'utilisateur doit être authentifié pour accéder à cette page
  },
  {
    path: "manufacturing/list",
    // Route pour la liste des demandes de fabrication
    component: ManufacturingListComponent,
    canActivate: [AuthGuard]
    // L'utilisateur doit être authentifié pour accéder à cette page
  },
  {
    path: "manufacturing/confirmation/:id",
    // Route pour la confirmation de fabrication avec un paramètre dynamique 'id'
    component: ManufacturingConfirmationComponent,
    canActivate: [AuthGuard]
    // L'utilisateur doit être authentifié pour accéder à cette page
  },
  {
    path: "payment/success",
    // Route pour la page de succès de paiement (doublon de la route précédente)
    component: PaymentSuccessComponent,
    canActivate: [AuthGuard]
    // L'utilisateur doit être authentifié pour accéder à cette page
  },
  {
    path: "auth/callback",
    component: AuthCallbackComponent,
    canActivate: [NoAuthGuard]
    // Optionnel: empêche l'accès si déjà connecté
  }
];

// src/app/shared/navbar/navbar.component.ts
function NavbarComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 6);
    \u0275\u0275text(1, "Connexion");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "a", 7);
    \u0275\u0275text(3, "Inscription");
    \u0275\u0275elementEnd();
  }
}
function NavbarComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 8);
    \u0275\u0275text(1, "Accueil");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "a", 9);
    \u0275\u0275text(3, "M\xE9dicaments");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "a", 10);
    \u0275\u0275text(5, "Services");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "a", 11);
    \u0275\u0275text(7, "Mes Ordonnances");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "a", 12);
    \u0275\u0275element(9, "i", 13);
    \u0275\u0275text(10, " Fabrication sur Mesure ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "a", 14);
    \u0275\u0275text(12, "Rendez-vous");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "a", 15);
    \u0275\u0275element(14, "i", 16);
    \u0275\u0275text(15, " Panier ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "a", 17);
    \u0275\u0275element(17, "i", 18);
    \u0275\u0275text(18, " Mes Fabrications ");
    \u0275\u0275elementEnd();
  }
}
function NavbarComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "a", 19);
    \u0275\u0275text(1, "Dashboard Admin");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "button", 20);
    \u0275\u0275listener("click", function NavbarComponent_Conditional_9_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onLogout());
    });
    \u0275\u0275text(3, " D\xE9connexion ");
    \u0275\u0275elementEnd();
  }
}
var NavbarComponent = class _NavbarComponent {
  constructor(authService) {
    this.authService = authService;
  }
  onLogout() {
    if (confirm("\xCAtes-vous s\xFBr de vouloir vous d\xE9connecter ?")) {
      this.authService.logout();
    }
  }
  static {
    this.\u0275fac = function NavbarComponent_Factory(t) {
      return new (t || _NavbarComponent)(\u0275\u0275directiveInject(AuthService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _NavbarComponent, selectors: [["app-navbar"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 10, vars: 3, consts: [[1, "navbar"], [1, "nav-content"], [1, "nav-brand"], ["routerLink", "/", 1, "brand-link"], ["src", "assets/GOHAN-MED.jpg", "alt", "GOHAN-MED", 1, "nav-logo"], [1, "nav-links"], ["routerLink", "/login", 1, "nav-link"], ["routerLink", "/register", 1, "nav-link"], ["routerLink", "/", 1, "nav-link"], ["routerLink", "/client/products", 1, "nav-link"], ["routerLink", "/client/services", 1, "nav-link"], ["routerLink", "/client/prescriptions", 1, "nav-link"], ["routerLink", "/manufacturing/request", 1, "nav-link", "special"], [1, "fas", "fa-mortar-pestle"], ["routerLink", "/client/appointments", 1, "nav-link"], ["routerLink", "/client/cart", 1, "nav-link", "cart"], [1, "fas", "fa-shopping-cart"], ["routerLink", "/manufacturing/list", 1, "nav-link"], [1, "fas", "fa-flask"], ["routerLink", "/admin", 1, "nav-link"], [1, "nav-link", "logout", 3, "click"]], template: function NavbarComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "nav", 0)(1, "div", 1)(2, "div", 2)(3, "a", 3);
        \u0275\u0275element(4, "img", 4);
        \u0275\u0275text(5, " GOHAN-MED ");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(6, "div", 5);
        \u0275\u0275template(7, NavbarComponent_Conditional_7_Template, 4, 0)(8, NavbarComponent_Conditional_8_Template, 19, 0)(9, NavbarComponent_Conditional_9_Template, 4, 0);
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(7);
        \u0275\u0275conditional(7, !ctx.authService.isAuthenticated() ? 7 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(8, ctx.authService.isAuthenticated() && !ctx.authService.isAdmin() ? 8 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(9, ctx.authService.isAuthenticated() && ctx.authService.isAdmin() ? 9 : -1);
      }
    }, dependencies: [CommonModule, RouterModule, RouterLink], styles: ["\n\n.navbar[_ngcontent-%COMP%] {\n  background: transparent;\n  padding: 0.75rem;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.1);\n}\n.nav-content[_ngcontent-%COMP%] {\n  max-width: 1400px;\n  margin: 0 auto;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 0 1rem;\n}\n.nav-brand[_ngcontent-%COMP%]   .brand-link[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  text-decoration: none;\n  color: #1a1a1a;\n  font-weight: 600;\n  font-size: 1.2rem;\n}\n.nav-brand[_ngcontent-%COMP%]   .nav-logo[_ngcontent-%COMP%] {\n  height: 35px;\n  width: auto;\n}\n.nav-links[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 1rem;\n  align-items: center;\n  flex-wrap: wrap;\n}\n.nav-link[_ngcontent-%COMP%] {\n  color: #1a1a1a;\n  text-decoration: none;\n  font-weight: 500;\n  padding: 0.5rem 1rem;\n  border-radius: 6px;\n  transition: all 0.2s ease;\n  white-space: nowrap;\n  letter-spacing: 0.3px;\n}\n.nav-link[_ngcontent-%COMP%]:hover {\n  background: rgba(0, 0, 0, 0.05);\n}\n.nav-link[_ngcontent-%COMP%]:active {\n  transform: translateY(0);\n}\n.nav-link.logout[_ngcontent-%COMP%] {\n  background: #4CAF50;\n  color: white;\n  border: none;\n  cursor: pointer;\n  font: inherit;\n  padding: 0.5rem 1rem;\n  border-radius: 6px;\n}\n.nav-link.logout[_ngcontent-%COMP%]:hover {\n  background: #45a049;\n}\n.nav-link.special[_ngcontent-%COMP%] {\n  background: #4CAF50;\n  color: white;\n  padding: 0.5rem 1rem;\n  border-radius: 20px;\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  transition: all 0.3s ease;\n}\n.nav-link.special[_ngcontent-%COMP%]:hover {\n  background: #45a049;\n  transform: translateY(-2px);\n}\n.nav-link.special[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n}\n@media (max-width: 1024px) {\n  .nav-content[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 1rem;\n    padding: 0.5rem;\n  }\n  .nav-links[_ngcontent-%COMP%] {\n    justify-content: center;\n    gap: 0.5rem;\n  }\n  .nav-link[_ngcontent-%COMP%] {\n    font-size: 0.9rem;\n    padding: 0.5rem 0.8rem;\n  }\n}\n@media (max-width: 768px) {\n  .navbar[_ngcontent-%COMP%] {\n    padding: 0.5rem;\n  }\n  .nav-content[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .nav-links[_ngcontent-%COMP%] {\n    width: 100%;\n    flex-direction: column;\n    align-items: stretch;\n  }\n  .nav-links[_ngcontent-%COMP%]   .nav-link[_ngcontent-%COMP%] {\n    text-align: center;\n    padding: 0.8rem;\n    border-radius: 4px;\n  }\n  .nav-links[_ngcontent-%COMP%]   .nav-link[_ngcontent-%COMP%]:not(:last-child) {\n    border-bottom: 1px solid rgba(255, 255, 255, 0.1);\n  }\n}\n/*# sourceMappingURL=navbar.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(NavbarComponent, { className: "NavbarComponent", filePath: "src\\app\\shared\\navbar\\navbar.component.ts", lineNumber: 195 });
})();

// src/app/services/appointment/appointment.service.ts
var AppointmentsService = class _AppointmentsService {
  constructor(http, notificationService) {
    this.http = http;
    this.notificationService = notificationService;
    this.apiUrl = "http://localhost:2024/api/appointments";
  }
  getAll() {
    return this.http.get(this.apiUrl);
  }
  // Une seule méthode create avec gestion des erreurs
  create(appointment) {
    return this.http.post(this.apiUrl, appointment).pipe(catchError((error) => {
      if (error.status === 409) {
        this.notificationService.error("Ce cr\xE9neau n'est plus disponible");
      } else {
        this.notificationService.error("Erreur lors de la cr\xE9ation du rendez-vous");
      }
      return throwError(() => error);
    }));
  }
  update(id, appointment) {
    return this.http.put(`${this.apiUrl}/${id}`, appointment);
  }
  delete(id) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  // Méthode pour vérifier la disponibilité d'un créneau
  checkAvailability(date, time) {
    return this.http.get(`${this.apiUrl}/check-availability`, {
      params: { date, time }
    });
  }
  // Méthode pour obtenir les créneaux disponibles
  getAvailableSlots(date) {
    return this.http.get(`${this.apiUrl}/available-slots`, {
      params: { date }
    });
  }
  static {
    this.\u0275fac = function AppointmentsService_Factory(t) {
      return new (t || _AppointmentsService)(\u0275\u0275inject(HttpClient), \u0275\u0275inject(NotificationService));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AppointmentsService, factory: _AppointmentsService.\u0275fac, providedIn: "root" });
  }
};

// src/app/components/appointment/appointment.component.ts
var _forTrack05 = ($index, $item) => $item.appointmentId;
function AppointmentComponent_Conditional_0_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li", 1)(1, "div", 2);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 3);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const appointment_r1 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2(" ", \u0275\u0275pipeBind2(3, 3, appointment_r1.appointmentDate, "dd/MM/yyyy"), " \xE0 ", appointment_r1.time, " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", appointment_r1.status, " ");
  }
}
function AppointmentComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0)(1, "h2");
    \u0275\u0275text(2, "Mes Rendez-vous");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "ul");
    \u0275\u0275repeaterCreate(4, AppointmentComponent_Conditional_0_For_5_Template, 6, 6, "li", 1, _forTrack05);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275repeater(ctx_r1.appointments);
  }
}
function AppointmentComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4)(1, "p");
    \u0275\u0275text(2, "Aucun rendez-vous programm\xE9");
    \u0275\u0275elementEnd()();
  }
}
var AppointmentComponent = class _AppointmentComponent {
  constructor(appointmentService) {
    this.appointmentService = appointmentService;
    this.appointments = [];
  }
  // pour initialiser le composant on utilse la methode ngOnInit()
  ngOnInit() {
    this.loadAppointments();
  }
  loadAppointments() {
    this.appointmentService.getAll().subscribe({
      next: (data) => {
        this.appointments = data;
      },
      error: (error) => {
        console.error("Erreur chargement rendez-vous:", error);
      }
    });
  }
  static {
    this.\u0275fac = function AppointmentComponent_Factory(t) {
      return new (t || _AppointmentComponent)(\u0275\u0275directiveInject(AppointmentsService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AppointmentComponent, selectors: [["app-appointment"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 2, vars: 1, consts: [[1, "appointments-list"], [1, "appointment-item"], [1, "appointment-time"], [1, "appointment-status"], [1, "no-appointments"]], template: function AppointmentComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, AppointmentComponent_Conditional_0_Template, 6, 0, "div", 0)(1, AppointmentComponent_Conditional_1_Template, 3, 0);
      }
      if (rf & 2) {
        \u0275\u0275conditional(0, ctx.appointments.length > 0 ? 0 : 1);
      }
    }, dependencies: [CommonModule, DatePipe], styles: ["\n\n.appointments-list[_ngcontent-%COMP%] {\n  padding: 20px;\n}\n.appointment-item[_ngcontent-%COMP%] {\n  background: white;\n  padding: 15px;\n  margin-bottom: 10px;\n  border-radius: 8px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n}\n/*# sourceMappingURL=appointment.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AppointmentComponent, { className: "AppointmentComponent", filePath: "src\\app\\components\\appointment\\appointment.component.ts", lineNumber: 48 });
})();

// src/app/components/Product/product.component.ts
var _forTrack06 = ($index, $item) => $item.id_product;
function ProductComponent_For_2_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6)(1, "span", 9);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 10);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 11);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const product_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(3, 3, product_r2.price, "EUR"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(6, 6, product_r2.promotionPrice, "EUR"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" -", product_r2.activePromotion.discountPercentage, "% ");
  }
}
function ProductComponent_For_2_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 12);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "currency");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const product_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(2, 1, product_r2 == null ? null : product_r2.price, "EUR"));
  }
}
function ProductComponent_For_2_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Rupture de stock ");
  }
}
function ProductComponent_For_2_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Ajouter au panier ");
  }
}
function ProductComponent_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 1)(1, "div", 3)(2, "h3");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 4);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 5);
    \u0275\u0275template(7, ProductComponent_For_2_Conditional_7_Template, 9, 9, "div", 6)(8, ProductComponent_For_2_Conditional_8_Template, 3, 4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 7)(10, "span");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "button", 8);
    \u0275\u0275listener("click", function ProductComponent_For_2_Template_button_click_12_listener() {
      const product_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.addToCart(product_r2));
    });
    \u0275\u0275template(13, ProductComponent_For_2_Conditional_13_Template, 1, 0)(14, ProductComponent_For_2_Conditional_14_Template, 1, 0);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const product_r2 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(product_r2 == null ? null : product_r2.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(product_r2 == null ? null : product_r2.description);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(7, product_r2 && product_r2.activePromotion ? 7 : 8);
    \u0275\u0275advance(3);
    \u0275\u0275classProp("low-stock", product_r2.stock < 5);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" Stock: ", (product_r2 == null ? null : product_r2.stock) || 0, " ");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", !(product_r2 == null ? null : product_r2.stock) || product_r2.stock <= 0);
    \u0275\u0275advance();
    \u0275\u0275conditional(13, !(product_r2 == null ? null : product_r2.stock) || product_r2.stock <= 0 ? 13 : 14);
  }
}
function ProductComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2)(1, "p");
    \u0275\u0275text(2, "Aucun produit disponible");
    \u0275\u0275elementEnd()();
  }
}
var ProductComponent = class _ProductComponent {
  constructor(productService, notificationService) {
    this.productService = productService;
    this.notificationService = notificationService;
    this.filteredProducts = [];
    this.products = [];
  }
  // Add a product to the cart
  addToCart(product) {
    if (!product?.stock || product.stock <= 0) {
      this.notificationService.error("Produit en rupture de stock");
      return;
    }
    this.productService.addToCart(product, 1).subscribe({
      next: () => {
        this.notificationService.success("Produit ajout\xE9 au panier");
      },
      error: () => {
        this.notificationService.error("Erreur lors de l'ajout au panier");
      }
    });
  }
  static {
    this.\u0275fac = function ProductComponent_Factory(t) {
      return new (t || _ProductComponent)(\u0275\u0275directiveInject(ProductService), \u0275\u0275directiveInject(NotificationService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ProductComponent, selectors: [["app-product"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 4, vars: 1, consts: [[1, "products-grid"], [1, "product-card"], [1, "no-products"], [1, "product-content"], [1, "description"], [1, "price-container"], [1, "promo-info"], [1, "stock-info"], [1, "add-to-cart-btn", 3, "click", "disabled"], [1, "original-price"], [1, "promo-price"], [1, "discount-tag"], [1, "regular-price"]], template: function ProductComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0);
        \u0275\u0275repeaterCreate(1, ProductComponent_For_2_Template, 15, 8, "div", 1, _forTrack06);
        \u0275\u0275template(3, ProductComponent_Conditional_3_Template, 3, 0, "div", 2);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance();
        \u0275\u0275repeater(ctx.filteredProducts);
        \u0275\u0275advance(2);
        \u0275\u0275conditional(3, ctx.filteredProducts.length === 0 ? 3 : -1);
      }
    }, dependencies: [CurrencyPipe], styles: ["\n\n.price-container[_ngcontent-%COMP%] {\n  margin: 1rem 0;\n}\n.promo-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.25rem;\n}\n.original-price[_ngcontent-%COMP%] {\n  text-decoration: line-through;\n  color: #6b7280;\n  font-size: 0.9rem;\n}\n.promo-price[_ngcontent-%COMP%] {\n  color: #dc2626;\n  font-weight: bold;\n  font-size: 1.25rem;\n}\n.regular-price[_ngcontent-%COMP%] {\n  font-size: 1.25rem;\n  font-weight: 600;\n  color: #4f46e5;\n}\n.discount-tag[_ngcontent-%COMP%] {\n  background: #dc2626;\n  color: white;\n  padding: 0.25rem 0.5rem;\n  border-radius: 0.25rem;\n  font-size: 0.75rem;\n  display: inline-block;\n  font-weight: bold;\n}\n.stock-info[_ngcontent-%COMP%] {\n  margin-top: 0.5rem;\n  font-size: 0.875rem;\n}\n.low-stock[_ngcontent-%COMP%] {\n  color: #dc2626;\n}\n.add-to-cart-btn[_ngcontent-%COMP%] {\n  width: 100%;\n  margin-top: 1rem;\n  padding: 0.75rem;\n  border: none;\n  border-radius: 0.375rem;\n  background: #4f46e5;\n  color: white;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.add-to-cart-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #4338ca;\n}\n.add-to-cart-btn[_ngcontent-%COMP%]:disabled {\n  background: #d1d5db;\n  cursor: not-allowed;\n}\n/*# sourceMappingURL=product.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProductComponent, { className: "ProductComponent", filePath: "src\\app\\components\\Product\\product.component.ts", lineNumber: 145 });
})();

// src/app/components/Client/client.component.ts
function ClientComponent_div_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.successMessage);
  }
}
var ClientComponent = class _ClientComponent {
  constructor(fb) {
    this.fb = fb;
    this.successMessage = "";
    this.signupForm = this.fb.group({
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]]
    });
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required]
    });
  }
  onSignup() {
    if (this.signupForm.valid) {
      const clientData = this.signupForm.value;
      console.log("Inscription r\xE9ussie", clientData);
      this.successMessage = "Inscription r\xE9ussie !";
      this.signupForm.reset();
    }
  }
  onLogin() {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
      console.log("Connexion r\xE9ussie", loginData);
      this.successMessage = "Connexion r\xE9ussie !";
      this.loginForm.reset();
    }
  }
  static {
    this.\u0275fac = function ClientComponent_Factory(t) {
      return new (t || _ClientComponent)(\u0275\u0275directiveInject(FormBuilder));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ClientComponent, selectors: [["app-client"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 17, vars: 3, consts: [[1, "client-container"], [3, "ngSubmit", "formGroup"], ["formControlName", "name", "placeholder", "Nom", "required", ""], ["formControlName", "email", "placeholder", "Email", "required", ""], ["type", "password", "formControlName", "password", "placeholder", "Mot de passe", "required", ""], ["type", "submit"], ["class", "success-message", 4, "ngIf"], [1, "success-message"]], template: function ClientComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "h2");
        \u0275\u0275text(2, "Inscription");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(3, "form", 1);
        \u0275\u0275listener("ngSubmit", function ClientComponent_Template_form_ngSubmit_3_listener() {
          return ctx.onSignup();
        });
        \u0275\u0275element(4, "input", 2)(5, "input", 3)(6, "input", 4);
        \u0275\u0275elementStart(7, "button", 5);
        \u0275\u0275text(8, "S'inscrire");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(9, "h2");
        \u0275\u0275text(10, "Connexion");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(11, "form", 1);
        \u0275\u0275listener("ngSubmit", function ClientComponent_Template_form_ngSubmit_11_listener() {
          return ctx.onLogin();
        });
        \u0275\u0275element(12, "input", 3)(13, "input", 4);
        \u0275\u0275elementStart(14, "button", 5);
        \u0275\u0275text(15, "Se connecter");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(16, ClientComponent_div_16_Template, 2, 1, "div", 6);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(3);
        \u0275\u0275property("formGroup", ctx.signupForm);
        \u0275\u0275advance(8);
        \u0275\u0275property("formGroup", ctx.loginForm);
        \u0275\u0275advance(5);
        \u0275\u0275property("ngIf", ctx.successMessage);
      }
    }, dependencies: [ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, FormGroupDirective, FormControlName, NgIf], styles: ["\n\n.client-container[_ngcontent-%COMP%] {\n  max-width: 400px;\n  margin: auto;\n}\nform[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  margin-bottom: 20px;\n}\ninput[_ngcontent-%COMP%] {\n  margin-bottom: 10px;\n  padding: 10px;\n  font-size: 16px;\n}\nbutton[_ngcontent-%COMP%] {\n  padding: 10px;\n  font-size: 16px;\n  cursor: pointer;\n}\n/*# sourceMappingURL=client.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ClientComponent, { className: "ClientComponent", filePath: "src\\app\\components\\Client\\client.component.ts", lineNumber: 18 });
})();

// src/app/components/Notifications/notification.component.ts
function NotificationComponent_div_1_i_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 12);
  }
}
function NotificationComponent_div_1_i_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 13);
  }
}
function NotificationComponent_div_1_i_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 14);
  }
}
function NotificationComponent_div_1_i_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 15);
  }
}
function NotificationComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 2)(1, "span", 3);
    \u0275\u0275elementContainerStart(2, 4);
    \u0275\u0275template(3, NotificationComponent_div_1_i_3_Template, 1, 0, "i", 5)(4, NotificationComponent_div_1_i_4_Template, 1, 0, "i", 6)(5, NotificationComponent_div_1_i_5_Template, 1, 0, "i", 7)(6, NotificationComponent_div_1_i_6_Template, 1, 0, "i", 8);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 9);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "button", 10);
    \u0275\u0275listener("click", function NotificationComponent_div_1_Template_button_click_9_listener() {
      const notification_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.removeNotification(notification_r2));
    });
    \u0275\u0275element(10, "i", 11);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const notification_r2 = ctx.$implicit;
    \u0275\u0275classMap(notification_r2.type);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngSwitch", notification_r2.type);
    \u0275\u0275advance();
    \u0275\u0275property("ngSwitchCase", "success");
    \u0275\u0275advance();
    \u0275\u0275property("ngSwitchCase", "error");
    \u0275\u0275advance();
    \u0275\u0275property("ngSwitchCase", "warning");
    \u0275\u0275advance();
    \u0275\u0275property("ngSwitchCase", "info");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(notification_r2.message);
  }
}
var NotificationComponent = class _NotificationComponent {
  constructor(notificationService) {
    this.notificationService = notificationService;
    this.notifications = [];
    this.subscription = new Subscription();
  }
  ngOnInit() {
    this.subscription = this.notificationService.getNotifications().subscribe((notification) => {
      this.addNotification(notification);
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  addNotification(notification) {
    this.notifications.push(notification);
    if (notification.duration !== void 0) {
      setTimeout(() => {
        this.removeNotification(notification);
      }, notification.duration);
    } else {
      setTimeout(() => {
        this.removeNotification(notification);
      }, 3e3);
    }
  }
  removeNotification(notification) {
    const index = this.notifications.indexOf(notification);
    if (index > -1) {
      this.notifications.splice(index, 1);
    }
  }
  trackById(index, item) {
    return item.message;
  }
  static {
    this.\u0275fac = function NotificationComponent_Factory(t) {
      return new (t || _NotificationComponent)(\u0275\u0275directiveInject(NotificationService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _NotificationComponent, selectors: [["app-notification"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 2, vars: 2, consts: [[1, "notifications-container"], ["class", "notification", 3, "class", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "notification"], [1, "icon"], [3, "ngSwitch"], ["class", "fas fa-check-circle", 4, "ngSwitchCase"], ["class", "fas fa-exclamation-circle", 4, "ngSwitchCase"], ["class", "fas fa-exclamation-triangle", 4, "ngSwitchCase"], ["class", "fas fa-info-circle", 4, "ngSwitchCase"], [1, "message"], [1, "close-btn", 3, "click"], [1, "fas", "fa-times"], [1, "fas", "fa-check-circle"], [1, "fas", "fa-exclamation-circle"], [1, "fas", "fa-exclamation-triangle"], [1, "fas", "fa-info-circle"]], template: function NotificationComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0);
        \u0275\u0275template(1, NotificationComponent_div_1_Template, 11, 8, "div", 1);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance();
        \u0275\u0275property("ngForOf", ctx.notifications)("ngForTrackBy", ctx.trackById);
      }
    }, dependencies: [CommonModule, NgForOf, NgSwitch, NgSwitchCase], styles: ["\n\n.notifications-container[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 20px;\n  right: 20px;\n  z-index: 1000;\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n  max-width: 400px;\n}\n.notification[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  padding: 12px 20px;\n  border-radius: 6px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n  animation: _ngcontent-%COMP%_slideIn 0.3s ease-out;\n}\n.notification.success[_ngcontent-%COMP%] {\n  background: #d1fae5;\n  color: #065f46;\n}\n.notification.error[_ngcontent-%COMP%] {\n  background: #fee2e2;\n  color: #991b1b;\n}\n.notification.warning[_ngcontent-%COMP%] {\n  background: #fff7ed;\n  color: #9a3412;\n}\n.notification.info[_ngcontent-%COMP%] {\n  background: #eff6ff;\n  color: #1e40af;\n}\n.notification[_ngcontent-%COMP%]   .icon[_ngcontent-%COMP%] {\n  margin-right: 12px;\n  font-size: 1.25rem;\n}\n.notification[_ngcontent-%COMP%]   .message[_ngcontent-%COMP%] {\n  flex: 1;\n  font-size: 0.95rem;\n}\n.notification[_ngcontent-%COMP%]   .close-btn[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  padding: 4px;\n  cursor: pointer;\n  opacity: 0.6;\n  transition: opacity 0.2s;\n}\n.notification[_ngcontent-%COMP%]   .close-btn[_ngcontent-%COMP%]:hover {\n  opacity: 1;\n}\n@keyframes _ngcontent-%COMP%_slideIn {\n  from {\n    transform: translateX(100%);\n    opacity: 0;\n  }\n  to {\n    transform: translateX(0);\n    opacity: 1;\n  }\n}\n/*# sourceMappingURL=notification.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(NotificationComponent, { className: "NotificationComponent", filePath: "src\\app\\components\\Notifications\\notification.component.ts", lineNumber: 116 });
})();

// src/app/shared/ui/form/component/input/input.component.ts
var InputComponent = class _InputComponent {
  constructor() {
    this.titleChange = new EventEmitter();
    this.cpt = 0;
  }
  setValue() {
    this.cpt++;
    this.titleChange.emit(this.cpt.toString());
  }
  static {
    this.\u0275fac = function InputComponent_Factory(t) {
      return new (t || _InputComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _InputComponent, selectors: [["app-input"]], inputs: { title: "title" }, outputs: { titleChange: "titleChange" }, standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 2, vars: 0, template: function InputComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "p");
        \u0275\u0275text(1, "Remplissez les champs, SVP.");
        \u0275\u0275elementEnd();
      }
    } });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(InputComponent, { className: "InputComponent", filePath: "src\\app\\shared\\ui\\form\\component\\input\\input.component.ts", lineNumber: 11 });
})();

// src/app/shared/ui/form/component/float-label-input/float-label-input.component.ts
var FloatLabelInputComponent = class _FloatLabelInputComponent {
  constructor() {
    this.inputFocus = false;
  }
  static {
    this.\u0275fac = function FloatLabelInputComponent_Factory(t) {
      return new (t || _FloatLabelInputComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _FloatLabelInputComponent, selectors: [["app-float-label-input"]], inputs: { config: "config" }, standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 4, vars: 6, consts: [[1, "input"], ["autocomplete", "new-password", 1, "floating-input", 3, "focus", "blur", "type", "placeholder", "formControl"], [1, "floating-label"]], template: function FloatLabelInputComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "input", 1);
        \u0275\u0275listener("focus", function FloatLabelInputComponent_Template_input_focus_1_listener() {
          return ctx.inputFocus = true;
        })("blur", function FloatLabelInputComponent_Template_input_blur_1_listener() {
          return ctx.inputFocus = false;
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(2, "label", 2);
        \u0275\u0275text(3);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275advance();
        \u0275\u0275property("type", ctx.config.inputType)("placeholder", ctx.config.placeholder)("formControl", ctx.config.formControl);
        \u0275\u0275advance();
        \u0275\u0275classProp("fixed-label", ctx.inputFocus || ctx.config.formControl.value.length > 0);
        \u0275\u0275advance();
        \u0275\u0275textInterpolate(ctx.config.label);
      }
    }, dependencies: [ReactiveFormsModule, DefaultValueAccessor, NgControlStatus, FormControlDirective], styles: ["\n\n.input[_ngcontent-%COMP%] {\n  position: relative;\n}\n.input[_ngcontent-%COMP%]   .floating-label[_ngcontent-%COMP%] {\n  position: absolute;\n  pointer-events: none;\n  left: 10px;\n  top: 10px;\n  transition: all ease 0.2s;\n  height: 10px;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  font-size: 16px;\n  color: var(--theme-label-text);\n}\n.input[_ngcontent-%COMP%]   .fixed-label[_ngcontent-%COMP%] {\n  font-size: 12px;\n  height: 14px;\n}\n.input[_ngcontent-%COMP%]   .floating-input[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 24px 10px 10px;\n  height: var(--var-security-input-heigt);\n  background: transparent !important;\n  color: var(--theme--input-text);\n  border: 1px solid var(--theme-standard-bg);\n}\n/*# sourceMappingURL=float-label-input.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(FloatLabelInputComponent, { className: "FloatLabelInputComponent", filePath: "src\\app\\shared\\ui\\form\\component\\float-label-input\\float-label-input.component.ts", lineNumber: 14 });
})();

// src/app/shared/ui/card/component/card/card.component.ts
var CardComponent = class _CardComponent {
  constructor() {
    this.Title = Title;
  }
  static {
    this.\u0275fac = function CardComponent_Factory(t) {
      return new (t || _CardComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CardComponent, selectors: [["app-card"]], inputs: { config: "config" }, standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 0, vars: 0, template: function CardComponent_Template(rf, ctx) {
    }, styles: ["\n\n[_nghost-%COMP%] {\n  width: 100%;\n}\n.card[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 1000px;\n  margin: auto;\n  background: var(--theme-white);\n  border: 1px solid var(--theme-eee);\n  padding: 1rem;\n}\n.max-width-1000[_ngcontent-%COMP%] {\n  max-width: 1000px;\n}\n/*# sourceMappingURL=card.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CardComponent, { className: "CardComponent", filePath: "src\\app\\shared\\ui\\card\\component\\card\\card.component.ts", lineNumber: 15 });
})();

// src/app/components/payment/payment.component.ts
var PaymentComponent = class _PaymentComponent {
  constructor() {
    this.paymentSuccess = new EventEmitter();
  }
  // Simulate a payment process
  simulatePayment(method) {
    setTimeout(() => {
      this.paymentSuccess.emit({
        method,
        transactionId: "SIMU_" + Math.random().toString(36).substr(2, 9),
        status: "COMPLETED"
      });
    }, 2e3);
  }
  static {
    this.\u0275fac = function PaymentComponent_Factory(t) {
      return new (t || _PaymentComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PaymentComponent, selectors: [["app-payment"]], inputs: { amount: "amount" }, outputs: { paymentSuccess: "paymentSuccess" }, standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 14, vars: 5, consts: [[1, "payment-container"], [1, "amount"], [3, "amount"], [1, "payment-buttons"], [1, "payment-btn", "primary"], ["routerLink", "/client/cart", 1, "payment-btn", "secondary"]], template: function PaymentComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "h3");
        \u0275\u0275text(2, "Paiement s\xE9curis\xE9");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(3, "div", 1);
        \u0275\u0275text(4);
        \u0275\u0275pipe(5, "currency");
        \u0275\u0275elementEnd();
        \u0275\u0275element(6, "app-paypal-button", 2);
        \u0275\u0275elementStart(7, "div", 3)(8, "button", 4);
        \u0275\u0275text(9, "Payer par Carte");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(10, "button", 4);
        \u0275\u0275text(11, "Virement Bancaire");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(12, "button", 5);
        \u0275\u0275text(13, " Retour au panier ");
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(4);
        \u0275\u0275textInterpolate1("Total \xE0 payer: ", \u0275\u0275pipeBind2(5, 2, ctx.amount, "EUR"), "");
        \u0275\u0275advance(2);
        \u0275\u0275property("amount", ctx.amount);
      }
    }, dependencies: [CurrencyPipe, PaypalButtonComponent, RouterLink], styles: ["\n\n.payment-buttons[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n  margin-top: 20px;\n}\n.payment-btn[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 12px;\n  border-radius: 6px;\n  border: none;\n  font-weight: 500;\n  cursor: pointer;\n  transition: background-color 0.2s;\n}\n.primary[_ngcontent-%COMP%] {\n  background: #4f46e5;\n  color: white;\n}\n.secondary[_ngcontent-%COMP%] {\n  background: #6b7280;\n  color: white;\n}\n/*# sourceMappingURL=payment.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PaymentComponent, { className: "PaymentComponent", filePath: "src\\app\\components\\payment\\payment.component.ts", lineNumber: 67 });
})();

// src/app/services/Logging/Logging.service.ts
var LoggingService = class _LoggingService {
  constructor(router) {
    this.router = router;
  }
  logNavigationEvents() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        console.log("Navigation d\xE9marr\xE9e vers:", event.url);
      }
      if (event instanceof NavigationEnd) {
        console.log("Navigation termin\xE9e \xE0:", event.url);
      }
      if (event instanceof NavigationError) {
        console.error("Erreur de navigation:", {
          url: event.url,
          error: event.error
        });
      }
      if (event instanceof NavigationCancel) {
        console.warn("Navigation annul\xE9e:", {
          url: event.url,
          reason: event.reason
        });
      }
    });
  }
  logRouteConfig() {
    console.log("Configuration des routes:", JSON.stringify(this.router.config, null, 2));
  }
  logAuthState(authData) {
    console.log("\xC9tat d'authentification:", {
      isAuthenticated: !!authData,
      userData: authData,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    });
  }
  logError(context, error) {
    console.error(`Erreur dans ${context}:`, {
      message: error.message || error,
      stack: error.stack,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    });
  }
  static {
    this.\u0275fac = function LoggingService_Factory(t) {
      return new (t || _LoggingService)(\u0275\u0275inject(Router));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _LoggingService, factory: _LoggingService.\u0275fac, providedIn: "root" });
  }
};

// src/app/newRoot/app.component.ts
var AppComponent = class _AppComponent {
  // Constructeur injectant le service de journalisation et le routeur.
  constructor(loggingService, router) {
    this.loggingService = loggingService;
    this.router = router;
  }
  // Hook du cycle de vie Angular appelé lors de l'initialisation du composant.
  ngOnInit() {
    this.loggingService.logNavigationEvents();
    console.log("Routes configur\xE9es:", this.router.config);
  }
  static {
    this.\u0275fac = function AppComponent_Factory(t) {
      return new (t || _AppComponent)(\u0275\u0275directiveInject(LoggingService), \u0275\u0275directiveInject(Router));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AppComponent, selectors: [["app-root"]], standalone: true, features: [\u0275\u0275ProvidersFeature([CartService, OrderService]), \u0275\u0275StandaloneFeature], decls: 5, vars: 0, consts: [[1, "app-container"], [1, "main-content"]], template: function AppComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0);
        \u0275\u0275element(1, "app-navbar")(2, "app-notification");
        \u0275\u0275elementStart(3, "main", 1);
        \u0275\u0275element(4, "router-outlet");
        \u0275\u0275elementEnd()();
      }
    }, dependencies: [
      // Liste des modules et composants nécessaires pour ce composant.
      FormsModule,
      CommonModule,
      RouterOutlet,
      // Directive utilisée pour gérer les routes enfants via un espace réservé.
      NavbarComponent,
      // Composant pour la barre de navigation.
      HttpClientModule,
      // Module HTTP pour les appels API.
      RouterModule,
      // Composant pour gérer les clients.
      NotificationComponent
    ], styles: ['@charset "UTF-8";\n\n\n\n.app-container[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  display: flex;\n  flex-direction: column;\n}\n.main-content[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 20px;\n  background-color: #f5f6fa;\n}\n[_nghost-%COMP%] {\n  font-family:\n    -apple-system,\n    BlinkMacSystemFont,\n    "Segoe UI",\n    Roboto,\n    Helvetica,\n    Arial,\n    sans-serif;\n  color: #333;\n  box-sizing: border-box;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n/*# sourceMappingURL=app.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AppComponent, { className: "AppComponent", filePath: "src\\app\\newRoot\\app.component.ts", lineNumber: 85 });
})();

// src/app/services/auth/auth.interceptor.ts
var authInterceptor = (req, next) => {
  const token = localStorage.getItem("token");
  const router = inject(Router);
  const authService = inject(AuthService);
  if (token) {
    const clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(clonedReq).pipe(catchError((error) => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        return authService.refreshToken().pipe(switchMap((response) => {
          const newReq = req.clone({
            setHeaders: {
              Authorization: `Bearer ${response.token}`
            }
          });
          return next(newReq);
        }), catchError((refreshError) => {
          console.error("Erreur rafra\xEEchissement token:", refreshError);
          authService.logout();
          router.navigate(["/login"]);
          return throwError(() => refreshError);
        }));
      }
      return throwError(() => error);
    }));
  }
  return next(req);
};

// src/app/newRoot/app.config.ts
var appConfig = {
  providers: [
    TimerService,
    // Le service TimerService est ajouté pour être injecté dans les composants ou services qui en ont besoin
    provideRouter(routes),
    // Fournit la configuration des routes à l'application
    provideHttpClient(),
    // Fournit le client HTTP de base à l'application
    provideHttpClient(withInterceptors([authInterceptor]))
    // Fournit le client HTTP avec l'intercepteur d'authentification
  ]
};

// node_modules/@angular/animations/fesm2022/animations.mjs
var AnimationMetadataType;
(function(AnimationMetadataType2) {
  AnimationMetadataType2[AnimationMetadataType2["State"] = 0] = "State";
  AnimationMetadataType2[AnimationMetadataType2["Transition"] = 1] = "Transition";
  AnimationMetadataType2[AnimationMetadataType2["Sequence"] = 2] = "Sequence";
  AnimationMetadataType2[AnimationMetadataType2["Group"] = 3] = "Group";
  AnimationMetadataType2[AnimationMetadataType2["Animate"] = 4] = "Animate";
  AnimationMetadataType2[AnimationMetadataType2["Keyframes"] = 5] = "Keyframes";
  AnimationMetadataType2[AnimationMetadataType2["Style"] = 6] = "Style";
  AnimationMetadataType2[AnimationMetadataType2["Trigger"] = 7] = "Trigger";
  AnimationMetadataType2[AnimationMetadataType2["Reference"] = 8] = "Reference";
  AnimationMetadataType2[AnimationMetadataType2["AnimateChild"] = 9] = "AnimateChild";
  AnimationMetadataType2[AnimationMetadataType2["AnimateRef"] = 10] = "AnimateRef";
  AnimationMetadataType2[AnimationMetadataType2["Query"] = 11] = "Query";
  AnimationMetadataType2[AnimationMetadataType2["Stagger"] = 12] = "Stagger";
})(AnimationMetadataType || (AnimationMetadataType = {}));
var AUTO_STYLE = "*";
function sequence(steps, options = null) {
  return {
    type: AnimationMetadataType.Sequence,
    steps,
    options
  };
}
function style(tokens) {
  return {
    type: AnimationMetadataType.Style,
    styles: tokens,
    offset: null
  };
}
var AnimationBuilder = class _AnimationBuilder {
  static {
    this.\u0275fac = function AnimationBuilder_Factory(t) {
      return new (t || _AnimationBuilder)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
      token: _AnimationBuilder,
      factory: () => (() => inject(BrowserAnimationBuilder))(),
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AnimationBuilder, [{
    type: Injectable,
    args: [{
      providedIn: "root",
      useFactory: () => inject(BrowserAnimationBuilder)
    }]
  }], null, null);
})();
var AnimationFactory = class {
};
var BrowserAnimationBuilder = class _BrowserAnimationBuilder extends AnimationBuilder {
  constructor(rootRenderer, doc) {
    super();
    this.animationModuleType = inject(ANIMATION_MODULE_TYPE, {
      optional: true
    });
    this._nextAnimationId = 0;
    const typeData = {
      id: "0",
      encapsulation: ViewEncapsulation$1.None,
      styles: [],
      data: {
        animation: []
      }
    };
    this._renderer = rootRenderer.createRenderer(doc.body, typeData);
    if (this.animationModuleType === null && !isAnimationRenderer(this._renderer)) {
      throw new RuntimeError(3600, (typeof ngDevMode === "undefined" || ngDevMode) && "Angular detected that the `AnimationBuilder` was injected, but animation support was not enabled. Please make sure that you enable animations in your application by calling `provideAnimations()` or `provideAnimationsAsync()` function.");
    }
  }
  build(animation) {
    const id = this._nextAnimationId;
    this._nextAnimationId++;
    const entry = Array.isArray(animation) ? sequence(animation) : animation;
    issueAnimationCommand(this._renderer, null, id, "register", [entry]);
    return new BrowserAnimationFactory(id, this._renderer);
  }
  static {
    this.\u0275fac = function BrowserAnimationBuilder_Factory(t) {
      return new (t || _BrowserAnimationBuilder)(\u0275\u0275inject(RendererFactory2), \u0275\u0275inject(DOCUMENT));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
      token: _BrowserAnimationBuilder,
      factory: _BrowserAnimationBuilder.\u0275fac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BrowserAnimationBuilder, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{
    type: RendererFactory2
  }, {
    type: Document,
    decorators: [{
      type: Inject,
      args: [DOCUMENT]
    }]
  }], null);
})();
var BrowserAnimationFactory = class extends AnimationFactory {
  constructor(_id, _renderer) {
    super();
    this._id = _id;
    this._renderer = _renderer;
  }
  create(element, options) {
    return new RendererAnimationPlayer(this._id, element, options || {}, this._renderer);
  }
};
var RendererAnimationPlayer = class {
  constructor(id, element, options, _renderer) {
    this.id = id;
    this.element = element;
    this._renderer = _renderer;
    this.parentPlayer = null;
    this._started = false;
    this.totalTime = 0;
    this._command("create", options);
  }
  _listen(eventName, callback) {
    return this._renderer.listen(this.element, `@@${this.id}:${eventName}`, callback);
  }
  _command(command, ...args) {
    issueAnimationCommand(this._renderer, this.element, this.id, command, args);
  }
  onDone(fn) {
    this._listen("done", fn);
  }
  onStart(fn) {
    this._listen("start", fn);
  }
  onDestroy(fn) {
    this._listen("destroy", fn);
  }
  init() {
    this._command("init");
  }
  hasStarted() {
    return this._started;
  }
  play() {
    this._command("play");
    this._started = true;
  }
  pause() {
    this._command("pause");
  }
  restart() {
    this._command("restart");
  }
  finish() {
    this._command("finish");
  }
  destroy() {
    this._command("destroy");
  }
  reset() {
    this._command("reset");
    this._started = false;
  }
  setPosition(p) {
    this._command("setPosition", p);
  }
  getPosition() {
    return unwrapAnimationRenderer(this._renderer)?.engine?.players[this.id]?.getPosition() ?? 0;
  }
};
function issueAnimationCommand(renderer, element, id, command, args) {
  renderer.setProperty(element, `@@${id}:${command}`, args);
}
function unwrapAnimationRenderer(renderer) {
  const type = renderer.\u0275type;
  if (type === 0) {
    return renderer;
  } else if (type === 1) {
    return renderer.animationRenderer;
  }
  return null;
}
function isAnimationRenderer(renderer) {
  const type = renderer.\u0275type;
  return type === 0 || type === 1;
}
var NoopAnimationPlayer = class {
  constructor(duration = 0, delay = 0) {
    this._onDoneFns = [];
    this._onStartFns = [];
    this._onDestroyFns = [];
    this._originalOnDoneFns = [];
    this._originalOnStartFns = [];
    this._started = false;
    this._destroyed = false;
    this._finished = false;
    this._position = 0;
    this.parentPlayer = null;
    this.totalTime = duration + delay;
  }
  _onFinish() {
    if (!this._finished) {
      this._finished = true;
      this._onDoneFns.forEach((fn) => fn());
      this._onDoneFns = [];
    }
  }
  onStart(fn) {
    this._originalOnStartFns.push(fn);
    this._onStartFns.push(fn);
  }
  onDone(fn) {
    this._originalOnDoneFns.push(fn);
    this._onDoneFns.push(fn);
  }
  onDestroy(fn) {
    this._onDestroyFns.push(fn);
  }
  hasStarted() {
    return this._started;
  }
  init() {
  }
  play() {
    if (!this.hasStarted()) {
      this._onStart();
      this.triggerMicrotask();
    }
    this._started = true;
  }
  /** @internal */
  triggerMicrotask() {
    queueMicrotask(() => this._onFinish());
  }
  _onStart() {
    this._onStartFns.forEach((fn) => fn());
    this._onStartFns = [];
  }
  pause() {
  }
  restart() {
  }
  finish() {
    this._onFinish();
  }
  destroy() {
    if (!this._destroyed) {
      this._destroyed = true;
      if (!this.hasStarted()) {
        this._onStart();
      }
      this.finish();
      this._onDestroyFns.forEach((fn) => fn());
      this._onDestroyFns = [];
    }
  }
  reset() {
    this._started = false;
    this._finished = false;
    this._onStartFns = this._originalOnStartFns;
    this._onDoneFns = this._originalOnDoneFns;
  }
  setPosition(position) {
    this._position = this.totalTime ? position * this.totalTime : 1;
  }
  getPosition() {
    return this.totalTime ? this._position / this.totalTime : 1;
  }
  /** @internal */
  triggerCallback(phaseName) {
    const methods = phaseName == "start" ? this._onStartFns : this._onDoneFns;
    methods.forEach((fn) => fn());
    methods.length = 0;
  }
};
var AnimationGroupPlayer = class {
  constructor(_players) {
    this._onDoneFns = [];
    this._onStartFns = [];
    this._finished = false;
    this._started = false;
    this._destroyed = false;
    this._onDestroyFns = [];
    this.parentPlayer = null;
    this.totalTime = 0;
    this.players = _players;
    let doneCount = 0;
    let destroyCount = 0;
    let startCount = 0;
    const total = this.players.length;
    if (total == 0) {
      queueMicrotask(() => this._onFinish());
    } else {
      this.players.forEach((player) => {
        player.onDone(() => {
          if (++doneCount == total) {
            this._onFinish();
          }
        });
        player.onDestroy(() => {
          if (++destroyCount == total) {
            this._onDestroy();
          }
        });
        player.onStart(() => {
          if (++startCount == total) {
            this._onStart();
          }
        });
      });
    }
    this.totalTime = this.players.reduce((time, player) => Math.max(time, player.totalTime), 0);
  }
  _onFinish() {
    if (!this._finished) {
      this._finished = true;
      this._onDoneFns.forEach((fn) => fn());
      this._onDoneFns = [];
    }
  }
  init() {
    this.players.forEach((player) => player.init());
  }
  onStart(fn) {
    this._onStartFns.push(fn);
  }
  _onStart() {
    if (!this.hasStarted()) {
      this._started = true;
      this._onStartFns.forEach((fn) => fn());
      this._onStartFns = [];
    }
  }
  onDone(fn) {
    this._onDoneFns.push(fn);
  }
  onDestroy(fn) {
    this._onDestroyFns.push(fn);
  }
  hasStarted() {
    return this._started;
  }
  play() {
    if (!this.parentPlayer) {
      this.init();
    }
    this._onStart();
    this.players.forEach((player) => player.play());
  }
  pause() {
    this.players.forEach((player) => player.pause());
  }
  restart() {
    this.players.forEach((player) => player.restart());
  }
  finish() {
    this._onFinish();
    this.players.forEach((player) => player.finish());
  }
  destroy() {
    this._onDestroy();
  }
  _onDestroy() {
    if (!this._destroyed) {
      this._destroyed = true;
      this._onFinish();
      this.players.forEach((player) => player.destroy());
      this._onDestroyFns.forEach((fn) => fn());
      this._onDestroyFns = [];
    }
  }
  reset() {
    this.players.forEach((player) => player.reset());
    this._destroyed = false;
    this._finished = false;
    this._started = false;
  }
  setPosition(p) {
    const timeAtPosition = p * this.totalTime;
    this.players.forEach((player) => {
      const position = player.totalTime ? Math.min(1, timeAtPosition / player.totalTime) : 1;
      player.setPosition(position);
    });
  }
  getPosition() {
    const longestPlayer = this.players.reduce((longestSoFar, player) => {
      const newPlayerIsLongest = longestSoFar === null || player.totalTime > longestSoFar.totalTime;
      return newPlayerIsLongest ? player : longestSoFar;
    }, null);
    return longestPlayer != null ? longestPlayer.getPosition() : 0;
  }
  beforeDestroy() {
    this.players.forEach((player) => {
      if (player.beforeDestroy) {
        player.beforeDestroy();
      }
    });
  }
  /** @internal */
  triggerCallback(phaseName) {
    const methods = phaseName == "start" ? this._onStartFns : this._onDoneFns;
    methods.forEach((fn) => fn());
    methods.length = 0;
  }
};
var \u0275PRE_STYLE = "!";

// node_modules/@angular/animations/fesm2022/browser.mjs
var LINE_START = "\n - ";
function invalidTimingValue(exp) {
  return new RuntimeError(3e3, ngDevMode && `The provided timing value "${exp}" is invalid.`);
}
function negativeStepValue() {
  return new RuntimeError(3100, ngDevMode && "Duration values below 0 are not allowed for this animation step.");
}
function negativeDelayValue() {
  return new RuntimeError(3101, ngDevMode && "Delay values below 0 are not allowed for this animation step.");
}
function invalidStyleParams(varName) {
  return new RuntimeError(3001, ngDevMode && `Unable to resolve the local animation param ${varName} in the given list of values`);
}
function invalidParamValue(varName) {
  return new RuntimeError(3003, ngDevMode && `Please provide a value for the animation param ${varName}`);
}
function invalidNodeType(nodeType) {
  return new RuntimeError(3004, ngDevMode && `Unable to resolve animation metadata node #${nodeType}`);
}
function invalidCssUnitValue(userProvidedProperty, value) {
  return new RuntimeError(3005, ngDevMode && `Please provide a CSS unit value for ${userProvidedProperty}:${value}`);
}
function invalidTrigger() {
  return new RuntimeError(3006, ngDevMode && "animation triggers cannot be prefixed with an `@` sign (e.g. trigger('@foo', [...]))");
}
function invalidDefinition() {
  return new RuntimeError(3007, ngDevMode && "only state() and transition() definitions can sit inside of a trigger()");
}
function invalidState(metadataName, missingSubs) {
  return new RuntimeError(3008, ngDevMode && `state("${metadataName}", ...) must define default values for all the following style substitutions: ${missingSubs.join(", ")}`);
}
function invalidStyleValue(value) {
  return new RuntimeError(3002, ngDevMode && `The provided style string value ${value} is not allowed.`);
}
function invalidParallelAnimation(prop, firstStart, firstEnd, secondStart, secondEnd) {
  return new RuntimeError(3010, ngDevMode && `The CSS property "${prop}" that exists between the times of "${firstStart}ms" and "${firstEnd}ms" is also being animated in a parallel animation between the times of "${secondStart}ms" and "${secondEnd}ms"`);
}
function invalidKeyframes() {
  return new RuntimeError(3011, ngDevMode && `keyframes() must be placed inside of a call to animate()`);
}
function invalidOffset() {
  return new RuntimeError(3012, ngDevMode && `Please ensure that all keyframe offsets are between 0 and 1`);
}
function keyframeOffsetsOutOfOrder() {
  return new RuntimeError(3200, ngDevMode && `Please ensure that all keyframe offsets are in order`);
}
function keyframesMissingOffsets() {
  return new RuntimeError(3202, ngDevMode && `Not all style() steps within the declared keyframes() contain offsets`);
}
function invalidStagger() {
  return new RuntimeError(3013, ngDevMode && `stagger() can only be used inside of query()`);
}
function invalidQuery(selector) {
  return new RuntimeError(3014, ngDevMode && `\`query("${selector}")\` returned zero elements. (Use \`query("${selector}", { optional: true })\` if you wish to allow this.)`);
}
function invalidExpression(expr) {
  return new RuntimeError(3015, ngDevMode && `The provided transition expression "${expr}" is not supported`);
}
function invalidTransitionAlias(alias) {
  return new RuntimeError(3016, ngDevMode && `The transition alias value "${alias}" is not supported`);
}
function triggerBuildFailed(name, errors) {
  return new RuntimeError(3404, ngDevMode && `The animation trigger "${name}" has failed to build due to the following errors:
 - ${errors.map((err) => err.message).join("\n - ")}`);
}
function animationFailed(errors) {
  return new RuntimeError(3502, ngDevMode && `Unable to animate due to the following errors:${LINE_START}${errors.map((err) => err.message).join(LINE_START)}`);
}
function registerFailed(errors) {
  return new RuntimeError(3503, ngDevMode && `Unable to build the animation due to the following errors: ${errors.map((err) => err.message).join("\n")}`);
}
function missingOrDestroyedAnimation() {
  return new RuntimeError(3300, ngDevMode && "The requested animation doesn't exist or has already been destroyed");
}
function createAnimationFailed(errors) {
  return new RuntimeError(3504, ngDevMode && `Unable to create the animation due to the following errors:${errors.map((err) => err.message).join("\n")}`);
}
function missingPlayer(id) {
  return new RuntimeError(3301, ngDevMode && `Unable to find the timeline player referenced by ${id}`);
}
function missingTrigger(phase, name) {
  return new RuntimeError(3302, ngDevMode && `Unable to listen on the animation trigger event "${phase}" because the animation trigger "${name}" doesn't exist!`);
}
function missingEvent(name) {
  return new RuntimeError(3303, ngDevMode && `Unable to listen on the animation trigger "${name}" because the provided event is undefined!`);
}
function unsupportedTriggerEvent(phase, name) {
  return new RuntimeError(3400, ngDevMode && `The provided animation trigger event "${phase}" for the animation trigger "${name}" is not supported!`);
}
function unregisteredTrigger(name) {
  return new RuntimeError(3401, ngDevMode && `The provided animation trigger "${name}" has not been registered!`);
}
function triggerTransitionsFailed(errors) {
  return new RuntimeError(3402, ngDevMode && `Unable to process animations due to the following failed trigger transitions
 ${errors.map((err) => err.message).join("\n")}`);
}
function transitionFailed(name, errors) {
  return new RuntimeError(3505, ngDevMode && `@${name} has failed due to:
 ${errors.map((err) => err.message).join("\n- ")}`);
}
var ANIMATABLE_PROP_SET = /* @__PURE__ */ new Set(["-moz-outline-radius", "-moz-outline-radius-bottomleft", "-moz-outline-radius-bottomright", "-moz-outline-radius-topleft", "-moz-outline-radius-topright", "-ms-grid-columns", "-ms-grid-rows", "-webkit-line-clamp", "-webkit-text-fill-color", "-webkit-text-stroke", "-webkit-text-stroke-color", "accent-color", "all", "backdrop-filter", "background", "background-color", "background-position", "background-size", "block-size", "border", "border-block-end", "border-block-end-color", "border-block-end-width", "border-block-start", "border-block-start-color", "border-block-start-width", "border-bottom", "border-bottom-color", "border-bottom-left-radius", "border-bottom-right-radius", "border-bottom-width", "border-color", "border-end-end-radius", "border-end-start-radius", "border-image-outset", "border-image-slice", "border-image-width", "border-inline-end", "border-inline-end-color", "border-inline-end-width", "border-inline-start", "border-inline-start-color", "border-inline-start-width", "border-left", "border-left-color", "border-left-width", "border-radius", "border-right", "border-right-color", "border-right-width", "border-start-end-radius", "border-start-start-radius", "border-top", "border-top-color", "border-top-left-radius", "border-top-right-radius", "border-top-width", "border-width", "bottom", "box-shadow", "caret-color", "clip", "clip-path", "color", "column-count", "column-gap", "column-rule", "column-rule-color", "column-rule-width", "column-width", "columns", "filter", "flex", "flex-basis", "flex-grow", "flex-shrink", "font", "font-size", "font-size-adjust", "font-stretch", "font-variation-settings", "font-weight", "gap", "grid-column-gap", "grid-gap", "grid-row-gap", "grid-template-columns", "grid-template-rows", "height", "inline-size", "input-security", "inset", "inset-block", "inset-block-end", "inset-block-start", "inset-inline", "inset-inline-end", "inset-inline-start", "left", "letter-spacing", "line-clamp", "line-height", "margin", "margin-block-end", "margin-block-start", "margin-bottom", "margin-inline-end", "margin-inline-start", "margin-left", "margin-right", "margin-top", "mask", "mask-border", "mask-position", "mask-size", "max-block-size", "max-height", "max-inline-size", "max-lines", "max-width", "min-block-size", "min-height", "min-inline-size", "min-width", "object-position", "offset", "offset-anchor", "offset-distance", "offset-path", "offset-position", "offset-rotate", "opacity", "order", "outline", "outline-color", "outline-offset", "outline-width", "padding", "padding-block-end", "padding-block-start", "padding-bottom", "padding-inline-end", "padding-inline-start", "padding-left", "padding-right", "padding-top", "perspective", "perspective-origin", "right", "rotate", "row-gap", "scale", "scroll-margin", "scroll-margin-block", "scroll-margin-block-end", "scroll-margin-block-start", "scroll-margin-bottom", "scroll-margin-inline", "scroll-margin-inline-end", "scroll-margin-inline-start", "scroll-margin-left", "scroll-margin-right", "scroll-margin-top", "scroll-padding", "scroll-padding-block", "scroll-padding-block-end", "scroll-padding-block-start", "scroll-padding-bottom", "scroll-padding-inline", "scroll-padding-inline-end", "scroll-padding-inline-start", "scroll-padding-left", "scroll-padding-right", "scroll-padding-top", "scroll-snap-coordinate", "scroll-snap-destination", "scrollbar-color", "shape-image-threshold", "shape-margin", "shape-outside", "tab-size", "text-decoration", "text-decoration-color", "text-decoration-thickness", "text-emphasis", "text-emphasis-color", "text-indent", "text-shadow", "text-underline-offset", "top", "transform", "transform-origin", "translate", "vertical-align", "visibility", "width", "word-spacing", "z-index", "zoom"]);
function optimizeGroupPlayer(players) {
  switch (players.length) {
    case 0:
      return new NoopAnimationPlayer();
    case 1:
      return players[0];
    default:
      return new AnimationGroupPlayer(players);
  }
}
function normalizeKeyframes$1(normalizer, keyframes, preStyles = /* @__PURE__ */ new Map(), postStyles = /* @__PURE__ */ new Map()) {
  const errors = [];
  const normalizedKeyframes = [];
  let previousOffset = -1;
  let previousKeyframe = null;
  keyframes.forEach((kf) => {
    const offset = kf.get("offset");
    const isSameOffset = offset == previousOffset;
    const normalizedKeyframe = isSameOffset && previousKeyframe || /* @__PURE__ */ new Map();
    kf.forEach((val, prop) => {
      let normalizedProp = prop;
      let normalizedValue = val;
      if (prop !== "offset") {
        normalizedProp = normalizer.normalizePropertyName(normalizedProp, errors);
        switch (normalizedValue) {
          case \u0275PRE_STYLE:
            normalizedValue = preStyles.get(prop);
            break;
          case AUTO_STYLE:
            normalizedValue = postStyles.get(prop);
            break;
          default:
            normalizedValue = normalizer.normalizeStyleValue(prop, normalizedProp, normalizedValue, errors);
            break;
        }
      }
      normalizedKeyframe.set(normalizedProp, normalizedValue);
    });
    if (!isSameOffset) {
      normalizedKeyframes.push(normalizedKeyframe);
    }
    previousKeyframe = normalizedKeyframe;
    previousOffset = offset;
  });
  if (errors.length) {
    throw animationFailed(errors);
  }
  return normalizedKeyframes;
}
function listenOnPlayer(player, eventName, event, callback) {
  switch (eventName) {
    case "start":
      player.onStart(() => callback(event && copyAnimationEvent(event, "start", player)));
      break;
    case "done":
      player.onDone(() => callback(event && copyAnimationEvent(event, "done", player)));
      break;
    case "destroy":
      player.onDestroy(() => callback(event && copyAnimationEvent(event, "destroy", player)));
      break;
  }
}
function copyAnimationEvent(e, phaseName, player) {
  const totalTime = player.totalTime;
  const disabled = player.disabled ? true : false;
  const event = makeAnimationEvent(e.element, e.triggerName, e.fromState, e.toState, phaseName || e.phaseName, totalTime == void 0 ? e.totalTime : totalTime, disabled);
  const data = e["_data"];
  if (data != null) {
    event["_data"] = data;
  }
  return event;
}
function makeAnimationEvent(element, triggerName, fromState, toState, phaseName = "", totalTime = 0, disabled) {
  return {
    element,
    triggerName,
    fromState,
    toState,
    phaseName,
    totalTime,
    disabled: !!disabled
  };
}
function getOrSetDefaultValue(map2, key, defaultValue) {
  let value = map2.get(key);
  if (!value) {
    map2.set(key, value = defaultValue);
  }
  return value;
}
function parseTimelineCommand(command) {
  const separatorPos = command.indexOf(":");
  const id = command.substring(1, separatorPos);
  const action = command.slice(separatorPos + 1);
  return [id, action];
}
var documentElement = /* @__PURE__ */ (() => typeof document === "undefined" ? null : document.documentElement)();
function getParentElement(element) {
  const parent = element.parentNode || element.host || null;
  if (parent === documentElement) {
    return null;
  }
  return parent;
}
function containsVendorPrefix(prop) {
  return prop.substring(1, 6) == "ebkit";
}
var _CACHED_BODY = null;
var _IS_WEBKIT = false;
function validateStyleProperty(prop) {
  if (!_CACHED_BODY) {
    _CACHED_BODY = getBodyNode() || {};
    _IS_WEBKIT = _CACHED_BODY.style ? "WebkitAppearance" in _CACHED_BODY.style : false;
  }
  let result = true;
  if (_CACHED_BODY.style && !containsVendorPrefix(prop)) {
    result = prop in _CACHED_BODY.style;
    if (!result && _IS_WEBKIT) {
      const camelProp = "Webkit" + prop.charAt(0).toUpperCase() + prop.slice(1);
      result = camelProp in _CACHED_BODY.style;
    }
  }
  return result;
}
function validateWebAnimatableStyleProperty(prop) {
  return ANIMATABLE_PROP_SET.has(prop);
}
function getBodyNode() {
  if (typeof document != "undefined") {
    return document.body;
  }
  return null;
}
function containsElement(elm1, elm2) {
  while (elm2) {
    if (elm2 === elm1) {
      return true;
    }
    elm2 = getParentElement(elm2);
  }
  return false;
}
function invokeQuery(element, selector, multi) {
  if (multi) {
    return Array.from(element.querySelectorAll(selector));
  }
  const elem = element.querySelector(selector);
  return elem ? [elem] : [];
}
var NoopAnimationDriver = class _NoopAnimationDriver {
  /**
   * @returns Whether `prop` is a valid CSS property
   */
  validateStyleProperty(prop) {
    return validateStyleProperty(prop);
  }
  /**
   * @deprecated unused
   */
  matchesElement(_element, _selector) {
    return false;
  }
  /**
   *
   * @returns Whether elm1 contains elm2.
   */
  containsElement(elm1, elm2) {
    return containsElement(elm1, elm2);
  }
  /**
   * @returns Rhe parent of the given element or `null` if the element is the `document`
   */
  getParentElement(element) {
    return getParentElement(element);
  }
  /**
   * @returns The result of the query selector on the element. The array will contain up to 1 item
   *     if `multi` is  `false`.
   */
  query(element, selector, multi) {
    return invokeQuery(element, selector, multi);
  }
  /**
   * @returns The `defaultValue` or empty string
   */
  computeStyle(element, prop, defaultValue) {
    return defaultValue || "";
  }
  /**
   * @returns An `NoopAnimationPlayer`
   */
  animate(element, keyframes, duration, delay, easing, previousPlayers = [], scrubberAccessRequested) {
    return new NoopAnimationPlayer(duration, delay);
  }
  static {
    this.\u0275fac = function NoopAnimationDriver_Factory(t) {
      return new (t || _NoopAnimationDriver)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
      token: _NoopAnimationDriver,
      factory: _NoopAnimationDriver.\u0275fac
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NoopAnimationDriver, [{
    type: Injectable
  }], null, null);
})();
var AnimationDriver = class {
  static {
    this.NOOP = new NoopAnimationDriver();
  }
};
var AnimationStyleNormalizer = class {
};
var ONE_SECOND = 1e3;
var SUBSTITUTION_EXPR_START = "{{";
var SUBSTITUTION_EXPR_END = "}}";
var ENTER_CLASSNAME = "ng-enter";
var LEAVE_CLASSNAME = "ng-leave";
var NG_TRIGGER_CLASSNAME = "ng-trigger";
var NG_TRIGGER_SELECTOR = ".ng-trigger";
var NG_ANIMATING_CLASSNAME = "ng-animating";
var NG_ANIMATING_SELECTOR = ".ng-animating";
function resolveTimingValue(value) {
  if (typeof value == "number")
    return value;
  const matches = value.match(/^(-?[\.\d]+)(m?s)/);
  if (!matches || matches.length < 2)
    return 0;
  return _convertTimeValueToMS(parseFloat(matches[1]), matches[2]);
}
function _convertTimeValueToMS(value, unit) {
  switch (unit) {
    case "s":
      return value * ONE_SECOND;
    default:
      return value;
  }
}
function resolveTiming(timings, errors, allowNegativeValues) {
  return timings.hasOwnProperty("duration") ? timings : parseTimeExpression(timings, errors, allowNegativeValues);
}
function parseTimeExpression(exp, errors, allowNegativeValues) {
  const regex = /^(-?[\.\d]+)(m?s)(?:\s+(-?[\.\d]+)(m?s))?(?:\s+([-a-z]+(?:\(.+?\))?))?$/i;
  let duration;
  let delay = 0;
  let easing = "";
  if (typeof exp === "string") {
    const matches = exp.match(regex);
    if (matches === null) {
      errors.push(invalidTimingValue(exp));
      return {
        duration: 0,
        delay: 0,
        easing: ""
      };
    }
    duration = _convertTimeValueToMS(parseFloat(matches[1]), matches[2]);
    const delayMatch = matches[3];
    if (delayMatch != null) {
      delay = _convertTimeValueToMS(parseFloat(delayMatch), matches[4]);
    }
    const easingVal = matches[5];
    if (easingVal) {
      easing = easingVal;
    }
  } else {
    duration = exp;
  }
  if (!allowNegativeValues) {
    let containsErrors = false;
    let startIndex = errors.length;
    if (duration < 0) {
      errors.push(negativeStepValue());
      containsErrors = true;
    }
    if (delay < 0) {
      errors.push(negativeDelayValue());
      containsErrors = true;
    }
    if (containsErrors) {
      errors.splice(startIndex, 0, invalidTimingValue(exp));
    }
  }
  return {
    duration,
    delay,
    easing
  };
}
function normalizeKeyframes(keyframes) {
  if (!keyframes.length) {
    return [];
  }
  if (keyframes[0] instanceof Map) {
    return keyframes;
  }
  return keyframes.map((kf) => new Map(Object.entries(kf)));
}
function setStyles(element, styles, formerStyles) {
  styles.forEach((val, prop) => {
    const camelProp = dashCaseToCamelCase(prop);
    if (formerStyles && !formerStyles.has(prop)) {
      formerStyles.set(prop, element.style[camelProp]);
    }
    element.style[camelProp] = val;
  });
}
function eraseStyles(element, styles) {
  styles.forEach((_, prop) => {
    const camelProp = dashCaseToCamelCase(prop);
    element.style[camelProp] = "";
  });
}
function normalizeAnimationEntry(steps) {
  if (Array.isArray(steps)) {
    if (steps.length == 1)
      return steps[0];
    return sequence(steps);
  }
  return steps;
}
function validateStyleParams(value, options, errors) {
  const params = options.params || {};
  const matches = extractStyleParams(value);
  if (matches.length) {
    matches.forEach((varName) => {
      if (!params.hasOwnProperty(varName)) {
        errors.push(invalidStyleParams(varName));
      }
    });
  }
}
var PARAM_REGEX = new RegExp(`${SUBSTITUTION_EXPR_START}\\s*(.+?)\\s*${SUBSTITUTION_EXPR_END}`, "g");
function extractStyleParams(value) {
  let params = [];
  if (typeof value === "string") {
    let match;
    while (match = PARAM_REGEX.exec(value)) {
      params.push(match[1]);
    }
    PARAM_REGEX.lastIndex = 0;
  }
  return params;
}
function interpolateParams(value, params, errors) {
  const original = `${value}`;
  const str = original.replace(PARAM_REGEX, (_, varName) => {
    let localVal = params[varName];
    if (localVal == null) {
      errors.push(invalidParamValue(varName));
      localVal = "";
    }
    return localVal.toString();
  });
  return str == original ? value : str;
}
var DASH_CASE_REGEXP = /-+([a-z0-9])/g;
function dashCaseToCamelCase(input) {
  return input.replace(DASH_CASE_REGEXP, (...m) => m[1].toUpperCase());
}
function camelCaseToDashCase(input) {
  return input.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}
function allowPreviousPlayerStylesMerge(duration, delay) {
  return duration === 0 || delay === 0;
}
function balancePreviousStylesIntoKeyframes(element, keyframes, previousStyles) {
  if (previousStyles.size && keyframes.length) {
    let startingKeyframe = keyframes[0];
    let missingStyleProps = [];
    previousStyles.forEach((val, prop) => {
      if (!startingKeyframe.has(prop)) {
        missingStyleProps.push(prop);
      }
      startingKeyframe.set(prop, val);
    });
    if (missingStyleProps.length) {
      for (let i = 1; i < keyframes.length; i++) {
        let kf = keyframes[i];
        missingStyleProps.forEach((prop) => kf.set(prop, computeStyle(element, prop)));
      }
    }
  }
  return keyframes;
}
function visitDslNode(visitor, node, context) {
  switch (node.type) {
    case AnimationMetadataType.Trigger:
      return visitor.visitTrigger(node, context);
    case AnimationMetadataType.State:
      return visitor.visitState(node, context);
    case AnimationMetadataType.Transition:
      return visitor.visitTransition(node, context);
    case AnimationMetadataType.Sequence:
      return visitor.visitSequence(node, context);
    case AnimationMetadataType.Group:
      return visitor.visitGroup(node, context);
    case AnimationMetadataType.Animate:
      return visitor.visitAnimate(node, context);
    case AnimationMetadataType.Keyframes:
      return visitor.visitKeyframes(node, context);
    case AnimationMetadataType.Style:
      return visitor.visitStyle(node, context);
    case AnimationMetadataType.Reference:
      return visitor.visitReference(node, context);
    case AnimationMetadataType.AnimateChild:
      return visitor.visitAnimateChild(node, context);
    case AnimationMetadataType.AnimateRef:
      return visitor.visitAnimateRef(node, context);
    case AnimationMetadataType.Query:
      return visitor.visitQuery(node, context);
    case AnimationMetadataType.Stagger:
      return visitor.visitStagger(node, context);
    default:
      throw invalidNodeType(node.type);
  }
}
function computeStyle(element, prop) {
  return window.getComputedStyle(element)[prop];
}
var DIMENSIONAL_PROP_SET = /* @__PURE__ */ new Set(["width", "height", "minWidth", "minHeight", "maxWidth", "maxHeight", "left", "top", "bottom", "right", "fontSize", "outlineWidth", "outlineOffset", "paddingTop", "paddingLeft", "paddingBottom", "paddingRight", "marginTop", "marginLeft", "marginBottom", "marginRight", "borderRadius", "borderWidth", "borderTopWidth", "borderLeftWidth", "borderRightWidth", "borderBottomWidth", "textIndent", "perspective"]);
var WebAnimationsStyleNormalizer = class extends AnimationStyleNormalizer {
  normalizePropertyName(propertyName, errors) {
    return dashCaseToCamelCase(propertyName);
  }
  normalizeStyleValue(userProvidedProperty, normalizedProperty, value, errors) {
    let unit = "";
    const strVal = value.toString().trim();
    if (DIMENSIONAL_PROP_SET.has(normalizedProperty) && value !== 0 && value !== "0") {
      if (typeof value === "number") {
        unit = "px";
      } else {
        const valAndSuffixMatch = value.match(/^[+-]?[\d\.]+([a-z]*)$/);
        if (valAndSuffixMatch && valAndSuffixMatch[1].length == 0) {
          errors.push(invalidCssUnitValue(userProvidedProperty, value));
        }
      }
    }
    return strVal + unit;
  }
};
function createListOfWarnings(warnings) {
  const LINE_START2 = "\n - ";
  return `${LINE_START2}${warnings.filter(Boolean).map((warning) => warning).join(LINE_START2)}`;
}
function warnTriggerBuild(name, warnings) {
  (typeof ngDevMode === "undefined" || ngDevMode) && console.warn(`The animation trigger "${name}" has built with the following warnings:${createListOfWarnings(warnings)}`);
}
function warnRegister(warnings) {
  (typeof ngDevMode === "undefined" || ngDevMode) && console.warn(`Animation built with the following warnings:${createListOfWarnings(warnings)}`);
}
function pushUnrecognizedPropertiesWarning(warnings, props) {
  if (props.length) {
    warnings.push(`The following provided properties are not recognized: ${props.join(", ")}`);
  }
}
var ANY_STATE = "*";
function parseTransitionExpr(transitionValue, errors) {
  const expressions = [];
  if (typeof transitionValue == "string") {
    transitionValue.split(/\s*,\s*/).forEach((str) => parseInnerTransitionStr(str, expressions, errors));
  } else {
    expressions.push(transitionValue);
  }
  return expressions;
}
function parseInnerTransitionStr(eventStr, expressions, errors) {
  if (eventStr[0] == ":") {
    const result = parseAnimationAlias(eventStr, errors);
    if (typeof result == "function") {
      expressions.push(result);
      return;
    }
    eventStr = result;
  }
  const match = eventStr.match(/^(\*|[-\w]+)\s*(<?[=-]>)\s*(\*|[-\w]+)$/);
  if (match == null || match.length < 4) {
    errors.push(invalidExpression(eventStr));
    return expressions;
  }
  const fromState = match[1];
  const separator = match[2];
  const toState = match[3];
  expressions.push(makeLambdaFromStates(fromState, toState));
  const isFullAnyStateExpr = fromState == ANY_STATE && toState == ANY_STATE;
  if (separator[0] == "<" && !isFullAnyStateExpr) {
    expressions.push(makeLambdaFromStates(toState, fromState));
  }
  return;
}
function parseAnimationAlias(alias, errors) {
  switch (alias) {
    case ":enter":
      return "void => *";
    case ":leave":
      return "* => void";
    case ":increment":
      return (fromState, toState) => parseFloat(toState) > parseFloat(fromState);
    case ":decrement":
      return (fromState, toState) => parseFloat(toState) < parseFloat(fromState);
    default:
      errors.push(invalidTransitionAlias(alias));
      return "* => *";
  }
}
var TRUE_BOOLEAN_VALUES = /* @__PURE__ */ new Set(["true", "1"]);
var FALSE_BOOLEAN_VALUES = /* @__PURE__ */ new Set(["false", "0"]);
function makeLambdaFromStates(lhs, rhs) {
  const LHS_MATCH_BOOLEAN = TRUE_BOOLEAN_VALUES.has(lhs) || FALSE_BOOLEAN_VALUES.has(lhs);
  const RHS_MATCH_BOOLEAN = TRUE_BOOLEAN_VALUES.has(rhs) || FALSE_BOOLEAN_VALUES.has(rhs);
  return (fromState, toState) => {
    let lhsMatch = lhs == ANY_STATE || lhs == fromState;
    let rhsMatch = rhs == ANY_STATE || rhs == toState;
    if (!lhsMatch && LHS_MATCH_BOOLEAN && typeof fromState === "boolean") {
      lhsMatch = fromState ? TRUE_BOOLEAN_VALUES.has(lhs) : FALSE_BOOLEAN_VALUES.has(lhs);
    }
    if (!rhsMatch && RHS_MATCH_BOOLEAN && typeof toState === "boolean") {
      rhsMatch = toState ? TRUE_BOOLEAN_VALUES.has(rhs) : FALSE_BOOLEAN_VALUES.has(rhs);
    }
    return lhsMatch && rhsMatch;
  };
}
var SELF_TOKEN = ":self";
var SELF_TOKEN_REGEX = new RegExp(`s*${SELF_TOKEN}s*,?`, "g");
function buildAnimationAst(driver, metadata, errors, warnings) {
  return new AnimationAstBuilderVisitor(driver).build(metadata, errors, warnings);
}
var ROOT_SELECTOR = "";
var AnimationAstBuilderVisitor = class {
  constructor(_driver) {
    this._driver = _driver;
  }
  build(metadata, errors, warnings) {
    const context = new AnimationAstBuilderContext(errors);
    this._resetContextStyleTimingState(context);
    const ast = visitDslNode(this, normalizeAnimationEntry(metadata), context);
    if (typeof ngDevMode === "undefined" || ngDevMode) {
      if (context.unsupportedCSSPropertiesFound.size) {
        pushUnrecognizedPropertiesWarning(warnings, [...context.unsupportedCSSPropertiesFound.keys()]);
      }
    }
    return ast;
  }
  _resetContextStyleTimingState(context) {
    context.currentQuerySelector = ROOT_SELECTOR;
    context.collectedStyles = /* @__PURE__ */ new Map();
    context.collectedStyles.set(ROOT_SELECTOR, /* @__PURE__ */ new Map());
    context.currentTime = 0;
  }
  visitTrigger(metadata, context) {
    let queryCount = context.queryCount = 0;
    let depCount = context.depCount = 0;
    const states = [];
    const transitions = [];
    if (metadata.name.charAt(0) == "@") {
      context.errors.push(invalidTrigger());
    }
    metadata.definitions.forEach((def) => {
      this._resetContextStyleTimingState(context);
      if (def.type == AnimationMetadataType.State) {
        const stateDef = def;
        const name = stateDef.name;
        name.toString().split(/\s*,\s*/).forEach((n) => {
          stateDef.name = n;
          states.push(this.visitState(stateDef, context));
        });
        stateDef.name = name;
      } else if (def.type == AnimationMetadataType.Transition) {
        const transition = this.visitTransition(def, context);
        queryCount += transition.queryCount;
        depCount += transition.depCount;
        transitions.push(transition);
      } else {
        context.errors.push(invalidDefinition());
      }
    });
    return {
      type: AnimationMetadataType.Trigger,
      name: metadata.name,
      states,
      transitions,
      queryCount,
      depCount,
      options: null
    };
  }
  visitState(metadata, context) {
    const styleAst = this.visitStyle(metadata.styles, context);
    const astParams = metadata.options && metadata.options.params || null;
    if (styleAst.containsDynamicStyles) {
      const missingSubs = /* @__PURE__ */ new Set();
      const params = astParams || {};
      styleAst.styles.forEach((style2) => {
        if (style2 instanceof Map) {
          style2.forEach((value) => {
            extractStyleParams(value).forEach((sub) => {
              if (!params.hasOwnProperty(sub)) {
                missingSubs.add(sub);
              }
            });
          });
        }
      });
      if (missingSubs.size) {
        context.errors.push(invalidState(metadata.name, [...missingSubs.values()]));
      }
    }
    return {
      type: AnimationMetadataType.State,
      name: metadata.name,
      style: styleAst,
      options: astParams ? {
        params: astParams
      } : null
    };
  }
  visitTransition(metadata, context) {
    context.queryCount = 0;
    context.depCount = 0;
    const animation = visitDslNode(this, normalizeAnimationEntry(metadata.animation), context);
    const matchers = parseTransitionExpr(metadata.expr, context.errors);
    return {
      type: AnimationMetadataType.Transition,
      matchers,
      animation,
      queryCount: context.queryCount,
      depCount: context.depCount,
      options: normalizeAnimationOptions(metadata.options)
    };
  }
  visitSequence(metadata, context) {
    return {
      type: AnimationMetadataType.Sequence,
      steps: metadata.steps.map((s) => visitDslNode(this, s, context)),
      options: normalizeAnimationOptions(metadata.options)
    };
  }
  visitGroup(metadata, context) {
    const currentTime = context.currentTime;
    let furthestTime = 0;
    const steps = metadata.steps.map((step) => {
      context.currentTime = currentTime;
      const innerAst = visitDslNode(this, step, context);
      furthestTime = Math.max(furthestTime, context.currentTime);
      return innerAst;
    });
    context.currentTime = furthestTime;
    return {
      type: AnimationMetadataType.Group,
      steps,
      options: normalizeAnimationOptions(metadata.options)
    };
  }
  visitAnimate(metadata, context) {
    const timingAst = constructTimingAst(metadata.timings, context.errors);
    context.currentAnimateTimings = timingAst;
    let styleAst;
    let styleMetadata = metadata.styles ? metadata.styles : style({});
    if (styleMetadata.type == AnimationMetadataType.Keyframes) {
      styleAst = this.visitKeyframes(styleMetadata, context);
    } else {
      let styleMetadata2 = metadata.styles;
      let isEmpty = false;
      if (!styleMetadata2) {
        isEmpty = true;
        const newStyleData = {};
        if (timingAst.easing) {
          newStyleData["easing"] = timingAst.easing;
        }
        styleMetadata2 = style(newStyleData);
      }
      context.currentTime += timingAst.duration + timingAst.delay;
      const _styleAst = this.visitStyle(styleMetadata2, context);
      _styleAst.isEmptyStep = isEmpty;
      styleAst = _styleAst;
    }
    context.currentAnimateTimings = null;
    return {
      type: AnimationMetadataType.Animate,
      timings: timingAst,
      style: styleAst,
      options: null
    };
  }
  visitStyle(metadata, context) {
    const ast = this._makeStyleAst(metadata, context);
    this._validateStyleAst(ast, context);
    return ast;
  }
  _makeStyleAst(metadata, context) {
    const styles = [];
    const metadataStyles = Array.isArray(metadata.styles) ? metadata.styles : [metadata.styles];
    for (let styleTuple of metadataStyles) {
      if (typeof styleTuple === "string") {
        if (styleTuple === AUTO_STYLE) {
          styles.push(styleTuple);
        } else {
          context.errors.push(invalidStyleValue(styleTuple));
        }
      } else {
        styles.push(new Map(Object.entries(styleTuple)));
      }
    }
    let containsDynamicStyles = false;
    let collectedEasing = null;
    styles.forEach((styleData) => {
      if (styleData instanceof Map) {
        if (styleData.has("easing")) {
          collectedEasing = styleData.get("easing");
          styleData.delete("easing");
        }
        if (!containsDynamicStyles) {
          for (let value of styleData.values()) {
            if (value.toString().indexOf(SUBSTITUTION_EXPR_START) >= 0) {
              containsDynamicStyles = true;
              break;
            }
          }
        }
      }
    });
    return {
      type: AnimationMetadataType.Style,
      styles,
      easing: collectedEasing,
      offset: metadata.offset,
      containsDynamicStyles,
      options: null
    };
  }
  _validateStyleAst(ast, context) {
    const timings = context.currentAnimateTimings;
    let endTime = context.currentTime;
    let startTime = context.currentTime;
    if (timings && startTime > 0) {
      startTime -= timings.duration + timings.delay;
    }
    ast.styles.forEach((tuple) => {
      if (typeof tuple === "string")
        return;
      tuple.forEach((value, prop) => {
        if (typeof ngDevMode === "undefined" || ngDevMode) {
          if (!this._driver.validateStyleProperty(prop)) {
            tuple.delete(prop);
            context.unsupportedCSSPropertiesFound.add(prop);
            return;
          }
        }
        const collectedStyles = context.collectedStyles.get(context.currentQuerySelector);
        const collectedEntry = collectedStyles.get(prop);
        let updateCollectedStyle = true;
        if (collectedEntry) {
          if (startTime != endTime && startTime >= collectedEntry.startTime && endTime <= collectedEntry.endTime) {
            context.errors.push(invalidParallelAnimation(prop, collectedEntry.startTime, collectedEntry.endTime, startTime, endTime));
            updateCollectedStyle = false;
          }
          startTime = collectedEntry.startTime;
        }
        if (updateCollectedStyle) {
          collectedStyles.set(prop, {
            startTime,
            endTime
          });
        }
        if (context.options) {
          validateStyleParams(value, context.options, context.errors);
        }
      });
    });
  }
  visitKeyframes(metadata, context) {
    const ast = {
      type: AnimationMetadataType.Keyframes,
      styles: [],
      options: null
    };
    if (!context.currentAnimateTimings) {
      context.errors.push(invalidKeyframes());
      return ast;
    }
    const MAX_KEYFRAME_OFFSET = 1;
    let totalKeyframesWithOffsets = 0;
    const offsets = [];
    let offsetsOutOfOrder = false;
    let keyframesOutOfRange = false;
    let previousOffset = 0;
    const keyframes = metadata.steps.map((styles) => {
      const style2 = this._makeStyleAst(styles, context);
      let offsetVal = style2.offset != null ? style2.offset : consumeOffset(style2.styles);
      let offset = 0;
      if (offsetVal != null) {
        totalKeyframesWithOffsets++;
        offset = style2.offset = offsetVal;
      }
      keyframesOutOfRange = keyframesOutOfRange || offset < 0 || offset > 1;
      offsetsOutOfOrder = offsetsOutOfOrder || offset < previousOffset;
      previousOffset = offset;
      offsets.push(offset);
      return style2;
    });
    if (keyframesOutOfRange) {
      context.errors.push(invalidOffset());
    }
    if (offsetsOutOfOrder) {
      context.errors.push(keyframeOffsetsOutOfOrder());
    }
    const length = metadata.steps.length;
    let generatedOffset = 0;
    if (totalKeyframesWithOffsets > 0 && totalKeyframesWithOffsets < length) {
      context.errors.push(keyframesMissingOffsets());
    } else if (totalKeyframesWithOffsets == 0) {
      generatedOffset = MAX_KEYFRAME_OFFSET / (length - 1);
    }
    const limit = length - 1;
    const currentTime = context.currentTime;
    const currentAnimateTimings = context.currentAnimateTimings;
    const animateDuration = currentAnimateTimings.duration;
    keyframes.forEach((kf, i) => {
      const offset = generatedOffset > 0 ? i == limit ? 1 : generatedOffset * i : offsets[i];
      const durationUpToThisFrame = offset * animateDuration;
      context.currentTime = currentTime + currentAnimateTimings.delay + durationUpToThisFrame;
      currentAnimateTimings.duration = durationUpToThisFrame;
      this._validateStyleAst(kf, context);
      kf.offset = offset;
      ast.styles.push(kf);
    });
    return ast;
  }
  visitReference(metadata, context) {
    return {
      type: AnimationMetadataType.Reference,
      animation: visitDslNode(this, normalizeAnimationEntry(metadata.animation), context),
      options: normalizeAnimationOptions(metadata.options)
    };
  }
  visitAnimateChild(metadata, context) {
    context.depCount++;
    return {
      type: AnimationMetadataType.AnimateChild,
      options: normalizeAnimationOptions(metadata.options)
    };
  }
  visitAnimateRef(metadata, context) {
    return {
      type: AnimationMetadataType.AnimateRef,
      animation: this.visitReference(metadata.animation, context),
      options: normalizeAnimationOptions(metadata.options)
    };
  }
  visitQuery(metadata, context) {
    const parentSelector = context.currentQuerySelector;
    const options = metadata.options || {};
    context.queryCount++;
    context.currentQuery = metadata;
    const [selector, includeSelf] = normalizeSelector(metadata.selector);
    context.currentQuerySelector = parentSelector.length ? parentSelector + " " + selector : selector;
    getOrSetDefaultValue(context.collectedStyles, context.currentQuerySelector, /* @__PURE__ */ new Map());
    const animation = visitDslNode(this, normalizeAnimationEntry(metadata.animation), context);
    context.currentQuery = null;
    context.currentQuerySelector = parentSelector;
    return {
      type: AnimationMetadataType.Query,
      selector,
      limit: options.limit || 0,
      optional: !!options.optional,
      includeSelf,
      animation,
      originalSelector: metadata.selector,
      options: normalizeAnimationOptions(metadata.options)
    };
  }
  visitStagger(metadata, context) {
    if (!context.currentQuery) {
      context.errors.push(invalidStagger());
    }
    const timings = metadata.timings === "full" ? {
      duration: 0,
      delay: 0,
      easing: "full"
    } : resolveTiming(metadata.timings, context.errors, true);
    return {
      type: AnimationMetadataType.Stagger,
      animation: visitDslNode(this, normalizeAnimationEntry(metadata.animation), context),
      timings,
      options: null
    };
  }
};
function normalizeSelector(selector) {
  const hasAmpersand = selector.split(/\s*,\s*/).find((token) => token == SELF_TOKEN) ? true : false;
  if (hasAmpersand) {
    selector = selector.replace(SELF_TOKEN_REGEX, "");
  }
  selector = selector.replace(/@\*/g, NG_TRIGGER_SELECTOR).replace(/@\w+/g, (match) => NG_TRIGGER_SELECTOR + "-" + match.slice(1)).replace(/:animating/g, NG_ANIMATING_SELECTOR);
  return [selector, hasAmpersand];
}
function normalizeParams(obj) {
  return obj ? __spreadValues({}, obj) : null;
}
var AnimationAstBuilderContext = class {
  constructor(errors) {
    this.errors = errors;
    this.queryCount = 0;
    this.depCount = 0;
    this.currentTransition = null;
    this.currentQuery = null;
    this.currentQuerySelector = null;
    this.currentAnimateTimings = null;
    this.currentTime = 0;
    this.collectedStyles = /* @__PURE__ */ new Map();
    this.options = null;
    this.unsupportedCSSPropertiesFound = /* @__PURE__ */ new Set();
  }
};
function consumeOffset(styles) {
  if (typeof styles == "string")
    return null;
  let offset = null;
  if (Array.isArray(styles)) {
    styles.forEach((styleTuple) => {
      if (styleTuple instanceof Map && styleTuple.has("offset")) {
        const obj = styleTuple;
        offset = parseFloat(obj.get("offset"));
        obj.delete("offset");
      }
    });
  } else if (styles instanceof Map && styles.has("offset")) {
    const obj = styles;
    offset = parseFloat(obj.get("offset"));
    obj.delete("offset");
  }
  return offset;
}
function constructTimingAst(value, errors) {
  if (value.hasOwnProperty("duration")) {
    return value;
  }
  if (typeof value == "number") {
    const duration = resolveTiming(value, errors).duration;
    return makeTimingAst(duration, 0, "");
  }
  const strValue = value;
  const isDynamic = strValue.split(/\s+/).some((v) => v.charAt(0) == "{" && v.charAt(1) == "{");
  if (isDynamic) {
    const ast = makeTimingAst(0, 0, "");
    ast.dynamic = true;
    ast.strValue = strValue;
    return ast;
  }
  const timings = resolveTiming(strValue, errors);
  return makeTimingAst(timings.duration, timings.delay, timings.easing);
}
function normalizeAnimationOptions(options) {
  if (options) {
    options = __spreadValues({}, options);
    if (options["params"]) {
      options["params"] = normalizeParams(options["params"]);
    }
  } else {
    options = {};
  }
  return options;
}
function makeTimingAst(duration, delay, easing) {
  return {
    duration,
    delay,
    easing
  };
}
function createTimelineInstruction(element, keyframes, preStyleProps, postStyleProps, duration, delay, easing = null, subTimeline = false) {
  return {
    type: 1,
    element,
    keyframes,
    preStyleProps,
    postStyleProps,
    duration,
    delay,
    totalTime: duration + delay,
    easing,
    subTimeline
  };
}
var ElementInstructionMap = class {
  constructor() {
    this._map = /* @__PURE__ */ new Map();
  }
  get(element) {
    return this._map.get(element) || [];
  }
  append(element, instructions) {
    let existingInstructions = this._map.get(element);
    if (!existingInstructions) {
      this._map.set(element, existingInstructions = []);
    }
    existingInstructions.push(...instructions);
  }
  has(element) {
    return this._map.has(element);
  }
  clear() {
    this._map.clear();
  }
};
var ONE_FRAME_IN_MILLISECONDS = 1;
var ENTER_TOKEN = ":enter";
var ENTER_TOKEN_REGEX = new RegExp(ENTER_TOKEN, "g");
var LEAVE_TOKEN = ":leave";
var LEAVE_TOKEN_REGEX = new RegExp(LEAVE_TOKEN, "g");
function buildAnimationTimelines(driver, rootElement, ast, enterClassName, leaveClassName, startingStyles = /* @__PURE__ */ new Map(), finalStyles = /* @__PURE__ */ new Map(), options, subInstructions, errors = []) {
  return new AnimationTimelineBuilderVisitor().buildKeyframes(driver, rootElement, ast, enterClassName, leaveClassName, startingStyles, finalStyles, options, subInstructions, errors);
}
var AnimationTimelineBuilderVisitor = class {
  buildKeyframes(driver, rootElement, ast, enterClassName, leaveClassName, startingStyles, finalStyles, options, subInstructions, errors = []) {
    subInstructions = subInstructions || new ElementInstructionMap();
    const context = new AnimationTimelineContext(driver, rootElement, subInstructions, enterClassName, leaveClassName, errors, []);
    context.options = options;
    const delay = options.delay ? resolveTimingValue(options.delay) : 0;
    context.currentTimeline.delayNextStep(delay);
    context.currentTimeline.setStyles([startingStyles], null, context.errors, options);
    visitDslNode(this, ast, context);
    const timelines = context.timelines.filter((timeline) => timeline.containsAnimation());
    if (timelines.length && finalStyles.size) {
      let lastRootTimeline;
      for (let i = timelines.length - 1; i >= 0; i--) {
        const timeline = timelines[i];
        if (timeline.element === rootElement) {
          lastRootTimeline = timeline;
          break;
        }
      }
      if (lastRootTimeline && !lastRootTimeline.allowOnlyTimelineStyles()) {
        lastRootTimeline.setStyles([finalStyles], null, context.errors, options);
      }
    }
    return timelines.length ? timelines.map((timeline) => timeline.buildKeyframes()) : [createTimelineInstruction(rootElement, [], [], [], 0, delay, "", false)];
  }
  visitTrigger(ast, context) {
  }
  visitState(ast, context) {
  }
  visitTransition(ast, context) {
  }
  visitAnimateChild(ast, context) {
    const elementInstructions = context.subInstructions.get(context.element);
    if (elementInstructions) {
      const innerContext = context.createSubContext(ast.options);
      const startTime = context.currentTimeline.currentTime;
      const endTime = this._visitSubInstructions(elementInstructions, innerContext, innerContext.options);
      if (startTime != endTime) {
        context.transformIntoNewTimeline(endTime);
      }
    }
    context.previousNode = ast;
  }
  visitAnimateRef(ast, context) {
    const innerContext = context.createSubContext(ast.options);
    innerContext.transformIntoNewTimeline();
    this._applyAnimationRefDelays([ast.options, ast.animation.options], context, innerContext);
    this.visitReference(ast.animation, innerContext);
    context.transformIntoNewTimeline(innerContext.currentTimeline.currentTime);
    context.previousNode = ast;
  }
  _applyAnimationRefDelays(animationsRefsOptions, context, innerContext) {
    for (const animationRefOptions of animationsRefsOptions) {
      const animationDelay = animationRefOptions?.delay;
      if (animationDelay) {
        const animationDelayValue = typeof animationDelay === "number" ? animationDelay : resolveTimingValue(interpolateParams(animationDelay, animationRefOptions?.params ?? {}, context.errors));
        innerContext.delayNextStep(animationDelayValue);
      }
    }
  }
  _visitSubInstructions(instructions, context, options) {
    const startTime = context.currentTimeline.currentTime;
    let furthestTime = startTime;
    const duration = options.duration != null ? resolveTimingValue(options.duration) : null;
    const delay = options.delay != null ? resolveTimingValue(options.delay) : null;
    if (duration !== 0) {
      instructions.forEach((instruction) => {
        const instructionTimings = context.appendInstructionToTimeline(instruction, duration, delay);
        furthestTime = Math.max(furthestTime, instructionTimings.duration + instructionTimings.delay);
      });
    }
    return furthestTime;
  }
  visitReference(ast, context) {
    context.updateOptions(ast.options, true);
    visitDslNode(this, ast.animation, context);
    context.previousNode = ast;
  }
  visitSequence(ast, context) {
    const subContextCount = context.subContextCount;
    let ctx = context;
    const options = ast.options;
    if (options && (options.params || options.delay)) {
      ctx = context.createSubContext(options);
      ctx.transformIntoNewTimeline();
      if (options.delay != null) {
        if (ctx.previousNode.type == AnimationMetadataType.Style) {
          ctx.currentTimeline.snapshotCurrentStyles();
          ctx.previousNode = DEFAULT_NOOP_PREVIOUS_NODE;
        }
        const delay = resolveTimingValue(options.delay);
        ctx.delayNextStep(delay);
      }
    }
    if (ast.steps.length) {
      ast.steps.forEach((s) => visitDslNode(this, s, ctx));
      ctx.currentTimeline.applyStylesToKeyframe();
      if (ctx.subContextCount > subContextCount) {
        ctx.transformIntoNewTimeline();
      }
    }
    context.previousNode = ast;
  }
  visitGroup(ast, context) {
    const innerTimelines = [];
    let furthestTime = context.currentTimeline.currentTime;
    const delay = ast.options && ast.options.delay ? resolveTimingValue(ast.options.delay) : 0;
    ast.steps.forEach((s) => {
      const innerContext = context.createSubContext(ast.options);
      if (delay) {
        innerContext.delayNextStep(delay);
      }
      visitDslNode(this, s, innerContext);
      furthestTime = Math.max(furthestTime, innerContext.currentTimeline.currentTime);
      innerTimelines.push(innerContext.currentTimeline);
    });
    innerTimelines.forEach((timeline) => context.currentTimeline.mergeTimelineCollectedStyles(timeline));
    context.transformIntoNewTimeline(furthestTime);
    context.previousNode = ast;
  }
  _visitTiming(ast, context) {
    if (ast.dynamic) {
      const strValue = ast.strValue;
      const timingValue = context.params ? interpolateParams(strValue, context.params, context.errors) : strValue;
      return resolveTiming(timingValue, context.errors);
    } else {
      return {
        duration: ast.duration,
        delay: ast.delay,
        easing: ast.easing
      };
    }
  }
  visitAnimate(ast, context) {
    const timings = context.currentAnimateTimings = this._visitTiming(ast.timings, context);
    const timeline = context.currentTimeline;
    if (timings.delay) {
      context.incrementTime(timings.delay);
      timeline.snapshotCurrentStyles();
    }
    const style2 = ast.style;
    if (style2.type == AnimationMetadataType.Keyframes) {
      this.visitKeyframes(style2, context);
    } else {
      context.incrementTime(timings.duration);
      this.visitStyle(style2, context);
      timeline.applyStylesToKeyframe();
    }
    context.currentAnimateTimings = null;
    context.previousNode = ast;
  }
  visitStyle(ast, context) {
    const timeline = context.currentTimeline;
    const timings = context.currentAnimateTimings;
    if (!timings && timeline.hasCurrentStyleProperties()) {
      timeline.forwardFrame();
    }
    const easing = timings && timings.easing || ast.easing;
    if (ast.isEmptyStep) {
      timeline.applyEmptyStep(easing);
    } else {
      timeline.setStyles(ast.styles, easing, context.errors, context.options);
    }
    context.previousNode = ast;
  }
  visitKeyframes(ast, context) {
    const currentAnimateTimings = context.currentAnimateTimings;
    const startTime = context.currentTimeline.duration;
    const duration = currentAnimateTimings.duration;
    const innerContext = context.createSubContext();
    const innerTimeline = innerContext.currentTimeline;
    innerTimeline.easing = currentAnimateTimings.easing;
    ast.styles.forEach((step) => {
      const offset = step.offset || 0;
      innerTimeline.forwardTime(offset * duration);
      innerTimeline.setStyles(step.styles, step.easing, context.errors, context.options);
      innerTimeline.applyStylesToKeyframe();
    });
    context.currentTimeline.mergeTimelineCollectedStyles(innerTimeline);
    context.transformIntoNewTimeline(startTime + duration);
    context.previousNode = ast;
  }
  visitQuery(ast, context) {
    const startTime = context.currentTimeline.currentTime;
    const options = ast.options || {};
    const delay = options.delay ? resolveTimingValue(options.delay) : 0;
    if (delay && (context.previousNode.type === AnimationMetadataType.Style || startTime == 0 && context.currentTimeline.hasCurrentStyleProperties())) {
      context.currentTimeline.snapshotCurrentStyles();
      context.previousNode = DEFAULT_NOOP_PREVIOUS_NODE;
    }
    let furthestTime = startTime;
    const elms = context.invokeQuery(ast.selector, ast.originalSelector, ast.limit, ast.includeSelf, options.optional ? true : false, context.errors);
    context.currentQueryTotal = elms.length;
    let sameElementTimeline = null;
    elms.forEach((element, i) => {
      context.currentQueryIndex = i;
      const innerContext = context.createSubContext(ast.options, element);
      if (delay) {
        innerContext.delayNextStep(delay);
      }
      if (element === context.element) {
        sameElementTimeline = innerContext.currentTimeline;
      }
      visitDslNode(this, ast.animation, innerContext);
      innerContext.currentTimeline.applyStylesToKeyframe();
      const endTime = innerContext.currentTimeline.currentTime;
      furthestTime = Math.max(furthestTime, endTime);
    });
    context.currentQueryIndex = 0;
    context.currentQueryTotal = 0;
    context.transformIntoNewTimeline(furthestTime);
    if (sameElementTimeline) {
      context.currentTimeline.mergeTimelineCollectedStyles(sameElementTimeline);
      context.currentTimeline.snapshotCurrentStyles();
    }
    context.previousNode = ast;
  }
  visitStagger(ast, context) {
    const parentContext = context.parentContext;
    const tl = context.currentTimeline;
    const timings = ast.timings;
    const duration = Math.abs(timings.duration);
    const maxTime = duration * (context.currentQueryTotal - 1);
    let delay = duration * context.currentQueryIndex;
    let staggerTransformer = timings.duration < 0 ? "reverse" : timings.easing;
    switch (staggerTransformer) {
      case "reverse":
        delay = maxTime - delay;
        break;
      case "full":
        delay = parentContext.currentStaggerTime;
        break;
    }
    const timeline = context.currentTimeline;
    if (delay) {
      timeline.delayNextStep(delay);
    }
    const startingTime = timeline.currentTime;
    visitDslNode(this, ast.animation, context);
    context.previousNode = ast;
    parentContext.currentStaggerTime = tl.currentTime - startingTime + (tl.startTime - parentContext.currentTimeline.startTime);
  }
};
var DEFAULT_NOOP_PREVIOUS_NODE = {};
var AnimationTimelineContext = class _AnimationTimelineContext {
  constructor(_driver, element, subInstructions, _enterClassName, _leaveClassName, errors, timelines, initialTimeline) {
    this._driver = _driver;
    this.element = element;
    this.subInstructions = subInstructions;
    this._enterClassName = _enterClassName;
    this._leaveClassName = _leaveClassName;
    this.errors = errors;
    this.timelines = timelines;
    this.parentContext = null;
    this.currentAnimateTimings = null;
    this.previousNode = DEFAULT_NOOP_PREVIOUS_NODE;
    this.subContextCount = 0;
    this.options = {};
    this.currentQueryIndex = 0;
    this.currentQueryTotal = 0;
    this.currentStaggerTime = 0;
    this.currentTimeline = initialTimeline || new TimelineBuilder(this._driver, element, 0);
    timelines.push(this.currentTimeline);
  }
  get params() {
    return this.options.params;
  }
  updateOptions(options, skipIfExists) {
    if (!options)
      return;
    const newOptions = options;
    let optionsToUpdate = this.options;
    if (newOptions.duration != null) {
      optionsToUpdate.duration = resolveTimingValue(newOptions.duration);
    }
    if (newOptions.delay != null) {
      optionsToUpdate.delay = resolveTimingValue(newOptions.delay);
    }
    const newParams = newOptions.params;
    if (newParams) {
      let paramsToUpdate = optionsToUpdate.params;
      if (!paramsToUpdate) {
        paramsToUpdate = this.options.params = {};
      }
      Object.keys(newParams).forEach((name) => {
        if (!skipIfExists || !paramsToUpdate.hasOwnProperty(name)) {
          paramsToUpdate[name] = interpolateParams(newParams[name], paramsToUpdate, this.errors);
        }
      });
    }
  }
  _copyOptions() {
    const options = {};
    if (this.options) {
      const oldParams = this.options.params;
      if (oldParams) {
        const params = options["params"] = {};
        Object.keys(oldParams).forEach((name) => {
          params[name] = oldParams[name];
        });
      }
    }
    return options;
  }
  createSubContext(options = null, element, newTime) {
    const target = element || this.element;
    const context = new _AnimationTimelineContext(this._driver, target, this.subInstructions, this._enterClassName, this._leaveClassName, this.errors, this.timelines, this.currentTimeline.fork(target, newTime || 0));
    context.previousNode = this.previousNode;
    context.currentAnimateTimings = this.currentAnimateTimings;
    context.options = this._copyOptions();
    context.updateOptions(options);
    context.currentQueryIndex = this.currentQueryIndex;
    context.currentQueryTotal = this.currentQueryTotal;
    context.parentContext = this;
    this.subContextCount++;
    return context;
  }
  transformIntoNewTimeline(newTime) {
    this.previousNode = DEFAULT_NOOP_PREVIOUS_NODE;
    this.currentTimeline = this.currentTimeline.fork(this.element, newTime);
    this.timelines.push(this.currentTimeline);
    return this.currentTimeline;
  }
  appendInstructionToTimeline(instruction, duration, delay) {
    const updatedTimings = {
      duration: duration != null ? duration : instruction.duration,
      delay: this.currentTimeline.currentTime + (delay != null ? delay : 0) + instruction.delay,
      easing: ""
    };
    const builder = new SubTimelineBuilder(this._driver, instruction.element, instruction.keyframes, instruction.preStyleProps, instruction.postStyleProps, updatedTimings, instruction.stretchStartingKeyframe);
    this.timelines.push(builder);
    return updatedTimings;
  }
  incrementTime(time) {
    this.currentTimeline.forwardTime(this.currentTimeline.duration + time);
  }
  delayNextStep(delay) {
    if (delay > 0) {
      this.currentTimeline.delayNextStep(delay);
    }
  }
  invokeQuery(selector, originalSelector, limit, includeSelf, optional, errors) {
    let results = [];
    if (includeSelf) {
      results.push(this.element);
    }
    if (selector.length > 0) {
      selector = selector.replace(ENTER_TOKEN_REGEX, "." + this._enterClassName);
      selector = selector.replace(LEAVE_TOKEN_REGEX, "." + this._leaveClassName);
      const multi = limit != 1;
      let elements = this._driver.query(this.element, selector, multi);
      if (limit !== 0) {
        elements = limit < 0 ? elements.slice(elements.length + limit, elements.length) : elements.slice(0, limit);
      }
      results.push(...elements);
    }
    if (!optional && results.length == 0) {
      errors.push(invalidQuery(originalSelector));
    }
    return results;
  }
};
var TimelineBuilder = class _TimelineBuilder {
  constructor(_driver, element, startTime, _elementTimelineStylesLookup) {
    this._driver = _driver;
    this.element = element;
    this.startTime = startTime;
    this._elementTimelineStylesLookup = _elementTimelineStylesLookup;
    this.duration = 0;
    this.easing = null;
    this._previousKeyframe = /* @__PURE__ */ new Map();
    this._currentKeyframe = /* @__PURE__ */ new Map();
    this._keyframes = /* @__PURE__ */ new Map();
    this._styleSummary = /* @__PURE__ */ new Map();
    this._localTimelineStyles = /* @__PURE__ */ new Map();
    this._pendingStyles = /* @__PURE__ */ new Map();
    this._backFill = /* @__PURE__ */ new Map();
    this._currentEmptyStepKeyframe = null;
    if (!this._elementTimelineStylesLookup) {
      this._elementTimelineStylesLookup = /* @__PURE__ */ new Map();
    }
    this._globalTimelineStyles = this._elementTimelineStylesLookup.get(element);
    if (!this._globalTimelineStyles) {
      this._globalTimelineStyles = this._localTimelineStyles;
      this._elementTimelineStylesLookup.set(element, this._localTimelineStyles);
    }
    this._loadKeyframe();
  }
  containsAnimation() {
    switch (this._keyframes.size) {
      case 0:
        return false;
      case 1:
        return this.hasCurrentStyleProperties();
      default:
        return true;
    }
  }
  hasCurrentStyleProperties() {
    return this._currentKeyframe.size > 0;
  }
  get currentTime() {
    return this.startTime + this.duration;
  }
  delayNextStep(delay) {
    const hasPreStyleStep = this._keyframes.size === 1 && this._pendingStyles.size;
    if (this.duration || hasPreStyleStep) {
      this.forwardTime(this.currentTime + delay);
      if (hasPreStyleStep) {
        this.snapshotCurrentStyles();
      }
    } else {
      this.startTime += delay;
    }
  }
  fork(element, currentTime) {
    this.applyStylesToKeyframe();
    return new _TimelineBuilder(this._driver, element, currentTime || this.currentTime, this._elementTimelineStylesLookup);
  }
  _loadKeyframe() {
    if (this._currentKeyframe) {
      this._previousKeyframe = this._currentKeyframe;
    }
    this._currentKeyframe = this._keyframes.get(this.duration);
    if (!this._currentKeyframe) {
      this._currentKeyframe = /* @__PURE__ */ new Map();
      this._keyframes.set(this.duration, this._currentKeyframe);
    }
  }
  forwardFrame() {
    this.duration += ONE_FRAME_IN_MILLISECONDS;
    this._loadKeyframe();
  }
  forwardTime(time) {
    this.applyStylesToKeyframe();
    this.duration = time;
    this._loadKeyframe();
  }
  _updateStyle(prop, value) {
    this._localTimelineStyles.set(prop, value);
    this._globalTimelineStyles.set(prop, value);
    this._styleSummary.set(prop, {
      time: this.currentTime,
      value
    });
  }
  allowOnlyTimelineStyles() {
    return this._currentEmptyStepKeyframe !== this._currentKeyframe;
  }
  applyEmptyStep(easing) {
    if (easing) {
      this._previousKeyframe.set("easing", easing);
    }
    for (let [prop, value] of this._globalTimelineStyles) {
      this._backFill.set(prop, value || AUTO_STYLE);
      this._currentKeyframe.set(prop, AUTO_STYLE);
    }
    this._currentEmptyStepKeyframe = this._currentKeyframe;
  }
  setStyles(input, easing, errors, options) {
    if (easing) {
      this._previousKeyframe.set("easing", easing);
    }
    const params = options && options.params || {};
    const styles = flattenStyles(input, this._globalTimelineStyles);
    for (let [prop, value] of styles) {
      const val = interpolateParams(value, params, errors);
      this._pendingStyles.set(prop, val);
      if (!this._localTimelineStyles.has(prop)) {
        this._backFill.set(prop, this._globalTimelineStyles.get(prop) ?? AUTO_STYLE);
      }
      this._updateStyle(prop, val);
    }
  }
  applyStylesToKeyframe() {
    if (this._pendingStyles.size == 0)
      return;
    this._pendingStyles.forEach((val, prop) => {
      this._currentKeyframe.set(prop, val);
    });
    this._pendingStyles.clear();
    this._localTimelineStyles.forEach((val, prop) => {
      if (!this._currentKeyframe.has(prop)) {
        this._currentKeyframe.set(prop, val);
      }
    });
  }
  snapshotCurrentStyles() {
    for (let [prop, val] of this._localTimelineStyles) {
      this._pendingStyles.set(prop, val);
      this._updateStyle(prop, val);
    }
  }
  getFinalKeyframe() {
    return this._keyframes.get(this.duration);
  }
  get properties() {
    const properties = [];
    for (let prop in this._currentKeyframe) {
      properties.push(prop);
    }
    return properties;
  }
  mergeTimelineCollectedStyles(timeline) {
    timeline._styleSummary.forEach((details1, prop) => {
      const details0 = this._styleSummary.get(prop);
      if (!details0 || details1.time > details0.time) {
        this._updateStyle(prop, details1.value);
      }
    });
  }
  buildKeyframes() {
    this.applyStylesToKeyframe();
    const preStyleProps = /* @__PURE__ */ new Set();
    const postStyleProps = /* @__PURE__ */ new Set();
    const isEmpty = this._keyframes.size === 1 && this.duration === 0;
    let finalKeyframes = [];
    this._keyframes.forEach((keyframe, time) => {
      const finalKeyframe = new Map([...this._backFill, ...keyframe]);
      finalKeyframe.forEach((value, prop) => {
        if (value === \u0275PRE_STYLE) {
          preStyleProps.add(prop);
        } else if (value === AUTO_STYLE) {
          postStyleProps.add(prop);
        }
      });
      if (!isEmpty) {
        finalKeyframe.set("offset", time / this.duration);
      }
      finalKeyframes.push(finalKeyframe);
    });
    const preProps = [...preStyleProps.values()];
    const postProps = [...postStyleProps.values()];
    if (isEmpty) {
      const kf0 = finalKeyframes[0];
      const kf1 = new Map(kf0);
      kf0.set("offset", 0);
      kf1.set("offset", 1);
      finalKeyframes = [kf0, kf1];
    }
    return createTimelineInstruction(this.element, finalKeyframes, preProps, postProps, this.duration, this.startTime, this.easing, false);
  }
};
var SubTimelineBuilder = class extends TimelineBuilder {
  constructor(driver, element, keyframes, preStyleProps, postStyleProps, timings, _stretchStartingKeyframe = false) {
    super(driver, element, timings.delay);
    this.keyframes = keyframes;
    this.preStyleProps = preStyleProps;
    this.postStyleProps = postStyleProps;
    this._stretchStartingKeyframe = _stretchStartingKeyframe;
    this.timings = {
      duration: timings.duration,
      delay: timings.delay,
      easing: timings.easing
    };
  }
  containsAnimation() {
    return this.keyframes.length > 1;
  }
  buildKeyframes() {
    let keyframes = this.keyframes;
    let {
      delay,
      duration,
      easing
    } = this.timings;
    if (this._stretchStartingKeyframe && delay) {
      const newKeyframes = [];
      const totalTime = duration + delay;
      const startingGap = delay / totalTime;
      const newFirstKeyframe = new Map(keyframes[0]);
      newFirstKeyframe.set("offset", 0);
      newKeyframes.push(newFirstKeyframe);
      const oldFirstKeyframe = new Map(keyframes[0]);
      oldFirstKeyframe.set("offset", roundOffset(startingGap));
      newKeyframes.push(oldFirstKeyframe);
      const limit = keyframes.length - 1;
      for (let i = 1; i <= limit; i++) {
        let kf = new Map(keyframes[i]);
        const oldOffset = kf.get("offset");
        const timeAtKeyframe = delay + oldOffset * duration;
        kf.set("offset", roundOffset(timeAtKeyframe / totalTime));
        newKeyframes.push(kf);
      }
      duration = totalTime;
      delay = 0;
      easing = "";
      keyframes = newKeyframes;
    }
    return createTimelineInstruction(this.element, keyframes, this.preStyleProps, this.postStyleProps, duration, delay, easing, true);
  }
};
function roundOffset(offset, decimalPoints = 3) {
  const mult = Math.pow(10, decimalPoints - 1);
  return Math.round(offset * mult) / mult;
}
function flattenStyles(input, allStyles) {
  const styles = /* @__PURE__ */ new Map();
  let allProperties;
  input.forEach((token) => {
    if (token === "*") {
      allProperties ??= allStyles.keys();
      for (let prop of allProperties) {
        styles.set(prop, AUTO_STYLE);
      }
    } else {
      for (let [prop, val] of token) {
        styles.set(prop, val);
      }
    }
  });
  return styles;
}
function createTransitionInstruction(element, triggerName, fromState, toState, isRemovalTransition, fromStyles, toStyles, timelines, queriedElements, preStyleProps, postStyleProps, totalTime, errors) {
  return {
    type: 0,
    element,
    triggerName,
    isRemovalTransition,
    fromState,
    fromStyles,
    toState,
    toStyles,
    timelines,
    queriedElements,
    preStyleProps,
    postStyleProps,
    totalTime,
    errors
  };
}
var EMPTY_OBJECT = {};
var AnimationTransitionFactory = class {
  constructor(_triggerName, ast, _stateStyles) {
    this._triggerName = _triggerName;
    this.ast = ast;
    this._stateStyles = _stateStyles;
  }
  match(currentState, nextState, element, params) {
    return oneOrMoreTransitionsMatch(this.ast.matchers, currentState, nextState, element, params);
  }
  buildStyles(stateName, params, errors) {
    let styler = this._stateStyles.get("*");
    if (stateName !== void 0) {
      styler = this._stateStyles.get(stateName?.toString()) || styler;
    }
    return styler ? styler.buildStyles(params, errors) : /* @__PURE__ */ new Map();
  }
  build(driver, element, currentState, nextState, enterClassName, leaveClassName, currentOptions, nextOptions, subInstructions, skipAstBuild) {
    const errors = [];
    const transitionAnimationParams = this.ast.options && this.ast.options.params || EMPTY_OBJECT;
    const currentAnimationParams = currentOptions && currentOptions.params || EMPTY_OBJECT;
    const currentStateStyles = this.buildStyles(currentState, currentAnimationParams, errors);
    const nextAnimationParams = nextOptions && nextOptions.params || EMPTY_OBJECT;
    const nextStateStyles = this.buildStyles(nextState, nextAnimationParams, errors);
    const queriedElements = /* @__PURE__ */ new Set();
    const preStyleMap = /* @__PURE__ */ new Map();
    const postStyleMap = /* @__PURE__ */ new Map();
    const isRemoval = nextState === "void";
    const animationOptions = {
      params: applyParamDefaults(nextAnimationParams, transitionAnimationParams),
      delay: this.ast.options?.delay
    };
    const timelines = skipAstBuild ? [] : buildAnimationTimelines(driver, element, this.ast.animation, enterClassName, leaveClassName, currentStateStyles, nextStateStyles, animationOptions, subInstructions, errors);
    let totalTime = 0;
    timelines.forEach((tl) => {
      totalTime = Math.max(tl.duration + tl.delay, totalTime);
    });
    if (errors.length) {
      return createTransitionInstruction(element, this._triggerName, currentState, nextState, isRemoval, currentStateStyles, nextStateStyles, [], [], preStyleMap, postStyleMap, totalTime, errors);
    }
    timelines.forEach((tl) => {
      const elm = tl.element;
      const preProps = getOrSetDefaultValue(preStyleMap, elm, /* @__PURE__ */ new Set());
      tl.preStyleProps.forEach((prop) => preProps.add(prop));
      const postProps = getOrSetDefaultValue(postStyleMap, elm, /* @__PURE__ */ new Set());
      tl.postStyleProps.forEach((prop) => postProps.add(prop));
      if (elm !== element) {
        queriedElements.add(elm);
      }
    });
    if (typeof ngDevMode === "undefined" || ngDevMode) {
      checkNonAnimatableInTimelines(timelines, this._triggerName, driver);
    }
    return createTransitionInstruction(element, this._triggerName, currentState, nextState, isRemoval, currentStateStyles, nextStateStyles, timelines, [...queriedElements.values()], preStyleMap, postStyleMap, totalTime);
  }
};
function checkNonAnimatableInTimelines(timelines, triggerName, driver) {
  if (!driver.validateAnimatableStyleProperty) {
    return;
  }
  const allowedNonAnimatableProps = /* @__PURE__ */ new Set([
    // 'easing' is a utility/synthetic prop we use to represent
    // easing functions, it represents a property of the animation
    // which is not animatable but different values can be used
    // in different steps
    "easing"
  ]);
  const invalidNonAnimatableProps = /* @__PURE__ */ new Set();
  timelines.forEach(({
    keyframes
  }) => {
    const nonAnimatablePropsInitialValues = /* @__PURE__ */ new Map();
    keyframes.forEach((keyframe) => {
      const entriesToCheck = Array.from(keyframe.entries()).filter(([prop]) => !allowedNonAnimatableProps.has(prop));
      for (const [prop, value] of entriesToCheck) {
        if (!driver.validateAnimatableStyleProperty(prop)) {
          if (nonAnimatablePropsInitialValues.has(prop) && !invalidNonAnimatableProps.has(prop)) {
            const propInitialValue = nonAnimatablePropsInitialValues.get(prop);
            if (propInitialValue !== value) {
              invalidNonAnimatableProps.add(prop);
            }
          } else {
            nonAnimatablePropsInitialValues.set(prop, value);
          }
        }
      }
    });
  });
  if (invalidNonAnimatableProps.size > 0) {
    console.warn(`Warning: The animation trigger "${triggerName}" is attempting to animate the following not animatable properties: ` + Array.from(invalidNonAnimatableProps).join(", ") + "\n(to check the list of all animatable properties visit https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animated_properties)");
  }
}
function oneOrMoreTransitionsMatch(matchFns, currentState, nextState, element, params) {
  return matchFns.some((fn) => fn(currentState, nextState, element, params));
}
function applyParamDefaults(userParams, defaults) {
  const result = __spreadValues({}, defaults);
  Object.entries(userParams).forEach(([key, value]) => {
    if (value != null) {
      result[key] = value;
    }
  });
  return result;
}
var AnimationStateStyles = class {
  constructor(styles, defaultParams, normalizer) {
    this.styles = styles;
    this.defaultParams = defaultParams;
    this.normalizer = normalizer;
  }
  buildStyles(params, errors) {
    const finalStyles = /* @__PURE__ */ new Map();
    const combinedParams = applyParamDefaults(params, this.defaultParams);
    this.styles.styles.forEach((value) => {
      if (typeof value !== "string") {
        value.forEach((val, prop) => {
          if (val) {
            val = interpolateParams(val, combinedParams, errors);
          }
          const normalizedProp = this.normalizer.normalizePropertyName(prop, errors);
          val = this.normalizer.normalizeStyleValue(prop, normalizedProp, val, errors);
          finalStyles.set(prop, val);
        });
      }
    });
    return finalStyles;
  }
};
function buildTrigger(name, ast, normalizer) {
  return new AnimationTrigger(name, ast, normalizer);
}
var AnimationTrigger = class {
  constructor(name, ast, _normalizer) {
    this.name = name;
    this.ast = ast;
    this._normalizer = _normalizer;
    this.transitionFactories = [];
    this.states = /* @__PURE__ */ new Map();
    ast.states.forEach((ast2) => {
      const defaultParams = ast2.options && ast2.options.params || {};
      this.states.set(ast2.name, new AnimationStateStyles(ast2.style, defaultParams, _normalizer));
    });
    balanceProperties(this.states, "true", "1");
    balanceProperties(this.states, "false", "0");
    ast.transitions.forEach((ast2) => {
      this.transitionFactories.push(new AnimationTransitionFactory(name, ast2, this.states));
    });
    this.fallbackTransition = createFallbackTransition(name, this.states, this._normalizer);
  }
  get containsQueries() {
    return this.ast.queryCount > 0;
  }
  matchTransition(currentState, nextState, element, params) {
    const entry = this.transitionFactories.find((f) => f.match(currentState, nextState, element, params));
    return entry || null;
  }
  matchStyles(currentState, params, errors) {
    return this.fallbackTransition.buildStyles(currentState, params, errors);
  }
};
function createFallbackTransition(triggerName, states, normalizer) {
  const matchers = [(fromState, toState) => true];
  const animation = {
    type: AnimationMetadataType.Sequence,
    steps: [],
    options: null
  };
  const transition = {
    type: AnimationMetadataType.Transition,
    animation,
    matchers,
    options: null,
    queryCount: 0,
    depCount: 0
  };
  return new AnimationTransitionFactory(triggerName, transition, states);
}
function balanceProperties(stateMap, key1, key2) {
  if (stateMap.has(key1)) {
    if (!stateMap.has(key2)) {
      stateMap.set(key2, stateMap.get(key1));
    }
  } else if (stateMap.has(key2)) {
    stateMap.set(key1, stateMap.get(key2));
  }
}
var EMPTY_INSTRUCTION_MAP = new ElementInstructionMap();
var TimelineAnimationEngine = class {
  constructor(bodyNode, _driver, _normalizer) {
    this.bodyNode = bodyNode;
    this._driver = _driver;
    this._normalizer = _normalizer;
    this._animations = /* @__PURE__ */ new Map();
    this._playersById = /* @__PURE__ */ new Map();
    this.players = [];
  }
  register(id, metadata) {
    const errors = [];
    const warnings = [];
    const ast = buildAnimationAst(this._driver, metadata, errors, warnings);
    if (errors.length) {
      throw registerFailed(errors);
    } else {
      if (warnings.length) {
        warnRegister(warnings);
      }
      this._animations.set(id, ast);
    }
  }
  _buildPlayer(i, preStyles, postStyles) {
    const element = i.element;
    const keyframes = normalizeKeyframes$1(this._normalizer, i.keyframes, preStyles, postStyles);
    return this._driver.animate(element, keyframes, i.duration, i.delay, i.easing, [], true);
  }
  create(id, element, options = {}) {
    const errors = [];
    const ast = this._animations.get(id);
    let instructions;
    const autoStylesMap = /* @__PURE__ */ new Map();
    if (ast) {
      instructions = buildAnimationTimelines(this._driver, element, ast, ENTER_CLASSNAME, LEAVE_CLASSNAME, /* @__PURE__ */ new Map(), /* @__PURE__ */ new Map(), options, EMPTY_INSTRUCTION_MAP, errors);
      instructions.forEach((inst) => {
        const styles = getOrSetDefaultValue(autoStylesMap, inst.element, /* @__PURE__ */ new Map());
        inst.postStyleProps.forEach((prop) => styles.set(prop, null));
      });
    } else {
      errors.push(missingOrDestroyedAnimation());
      instructions = [];
    }
    if (errors.length) {
      throw createAnimationFailed(errors);
    }
    autoStylesMap.forEach((styles, element2) => {
      styles.forEach((_, prop) => {
        styles.set(prop, this._driver.computeStyle(element2, prop, AUTO_STYLE));
      });
    });
    const players = instructions.map((i) => {
      const styles = autoStylesMap.get(i.element);
      return this._buildPlayer(i, /* @__PURE__ */ new Map(), styles);
    });
    const player = optimizeGroupPlayer(players);
    this._playersById.set(id, player);
    player.onDestroy(() => this.destroy(id));
    this.players.push(player);
    return player;
  }
  destroy(id) {
    const player = this._getPlayer(id);
    player.destroy();
    this._playersById.delete(id);
    const index = this.players.indexOf(player);
    if (index >= 0) {
      this.players.splice(index, 1);
    }
  }
  _getPlayer(id) {
    const player = this._playersById.get(id);
    if (!player) {
      throw missingPlayer(id);
    }
    return player;
  }
  listen(id, element, eventName, callback) {
    const baseEvent = makeAnimationEvent(element, "", "", "");
    listenOnPlayer(this._getPlayer(id), eventName, baseEvent, callback);
    return () => {
    };
  }
  command(id, element, command, args) {
    if (command == "register") {
      this.register(id, args[0]);
      return;
    }
    if (command == "create") {
      const options = args[0] || {};
      this.create(id, element, options);
      return;
    }
    const player = this._getPlayer(id);
    switch (command) {
      case "play":
        player.play();
        break;
      case "pause":
        player.pause();
        break;
      case "reset":
        player.reset();
        break;
      case "restart":
        player.restart();
        break;
      case "finish":
        player.finish();
        break;
      case "init":
        player.init();
        break;
      case "setPosition":
        player.setPosition(parseFloat(args[0]));
        break;
      case "destroy":
        this.destroy(id);
        break;
    }
  }
};
var QUEUED_CLASSNAME = "ng-animate-queued";
var QUEUED_SELECTOR = ".ng-animate-queued";
var DISABLED_CLASSNAME = "ng-animate-disabled";
var DISABLED_SELECTOR = ".ng-animate-disabled";
var STAR_CLASSNAME = "ng-star-inserted";
var STAR_SELECTOR = ".ng-star-inserted";
var EMPTY_PLAYER_ARRAY = [];
var NULL_REMOVAL_STATE = {
  namespaceId: "",
  setForRemoval: false,
  setForMove: false,
  hasAnimation: false,
  removedBeforeQueried: false
};
var NULL_REMOVED_QUERIED_STATE = {
  namespaceId: "",
  setForMove: false,
  setForRemoval: false,
  hasAnimation: false,
  removedBeforeQueried: true
};
var REMOVAL_FLAG = "__ng_removed";
var StateValue = class {
  get params() {
    return this.options.params;
  }
  constructor(input, namespaceId = "") {
    this.namespaceId = namespaceId;
    const isObj = input && input.hasOwnProperty("value");
    const value = isObj ? input["value"] : input;
    this.value = normalizeTriggerValue(value);
    if (isObj) {
      const _a = input, {
        value: value2
      } = _a, options = __objRest(_a, [
        "value"
      ]);
      this.options = options;
    } else {
      this.options = {};
    }
    if (!this.options.params) {
      this.options.params = {};
    }
  }
  absorbOptions(options) {
    const newParams = options.params;
    if (newParams) {
      const oldParams = this.options.params;
      Object.keys(newParams).forEach((prop) => {
        if (oldParams[prop] == null) {
          oldParams[prop] = newParams[prop];
        }
      });
    }
  }
};
var VOID_VALUE = "void";
var DEFAULT_STATE_VALUE = new StateValue(VOID_VALUE);
var AnimationTransitionNamespace = class {
  constructor(id, hostElement, _engine) {
    this.id = id;
    this.hostElement = hostElement;
    this._engine = _engine;
    this.players = [];
    this._triggers = /* @__PURE__ */ new Map();
    this._queue = [];
    this._elementListeners = /* @__PURE__ */ new Map();
    this._hostClassName = "ng-tns-" + id;
    addClass(hostElement, this._hostClassName);
  }
  listen(element, name, phase, callback) {
    if (!this._triggers.has(name)) {
      throw missingTrigger(phase, name);
    }
    if (phase == null || phase.length == 0) {
      throw missingEvent(name);
    }
    if (!isTriggerEventValid(phase)) {
      throw unsupportedTriggerEvent(phase, name);
    }
    const listeners = getOrSetDefaultValue(this._elementListeners, element, []);
    const data = {
      name,
      phase,
      callback
    };
    listeners.push(data);
    const triggersWithStates = getOrSetDefaultValue(this._engine.statesByElement, element, /* @__PURE__ */ new Map());
    if (!triggersWithStates.has(name)) {
      addClass(element, NG_TRIGGER_CLASSNAME);
      addClass(element, NG_TRIGGER_CLASSNAME + "-" + name);
      triggersWithStates.set(name, DEFAULT_STATE_VALUE);
    }
    return () => {
      this._engine.afterFlush(() => {
        const index = listeners.indexOf(data);
        if (index >= 0) {
          listeners.splice(index, 1);
        }
        if (!this._triggers.has(name)) {
          triggersWithStates.delete(name);
        }
      });
    };
  }
  register(name, ast) {
    if (this._triggers.has(name)) {
      return false;
    } else {
      this._triggers.set(name, ast);
      return true;
    }
  }
  _getTrigger(name) {
    const trigger = this._triggers.get(name);
    if (!trigger) {
      throw unregisteredTrigger(name);
    }
    return trigger;
  }
  trigger(element, triggerName, value, defaultToFallback = true) {
    const trigger = this._getTrigger(triggerName);
    const player = new TransitionAnimationPlayer(this.id, triggerName, element);
    let triggersWithStates = this._engine.statesByElement.get(element);
    if (!triggersWithStates) {
      addClass(element, NG_TRIGGER_CLASSNAME);
      addClass(element, NG_TRIGGER_CLASSNAME + "-" + triggerName);
      this._engine.statesByElement.set(element, triggersWithStates = /* @__PURE__ */ new Map());
    }
    let fromState = triggersWithStates.get(triggerName);
    const toState = new StateValue(value, this.id);
    const isObj = value && value.hasOwnProperty("value");
    if (!isObj && fromState) {
      toState.absorbOptions(fromState.options);
    }
    triggersWithStates.set(triggerName, toState);
    if (!fromState) {
      fromState = DEFAULT_STATE_VALUE;
    }
    const isRemoval = toState.value === VOID_VALUE;
    if (!isRemoval && fromState.value === toState.value) {
      if (!objEquals(fromState.params, toState.params)) {
        const errors = [];
        const fromStyles = trigger.matchStyles(fromState.value, fromState.params, errors);
        const toStyles = trigger.matchStyles(toState.value, toState.params, errors);
        if (errors.length) {
          this._engine.reportError(errors);
        } else {
          this._engine.afterFlush(() => {
            eraseStyles(element, fromStyles);
            setStyles(element, toStyles);
          });
        }
      }
      return;
    }
    const playersOnElement = getOrSetDefaultValue(this._engine.playersByElement, element, []);
    playersOnElement.forEach((player2) => {
      if (player2.namespaceId == this.id && player2.triggerName == triggerName && player2.queued) {
        player2.destroy();
      }
    });
    let transition = trigger.matchTransition(fromState.value, toState.value, element, toState.params);
    let isFallbackTransition = false;
    if (!transition) {
      if (!defaultToFallback)
        return;
      transition = trigger.fallbackTransition;
      isFallbackTransition = true;
    }
    this._engine.totalQueuedPlayers++;
    this._queue.push({
      element,
      triggerName,
      transition,
      fromState,
      toState,
      player,
      isFallbackTransition
    });
    if (!isFallbackTransition) {
      addClass(element, QUEUED_CLASSNAME);
      player.onStart(() => {
        removeClass(element, QUEUED_CLASSNAME);
      });
    }
    player.onDone(() => {
      let index = this.players.indexOf(player);
      if (index >= 0) {
        this.players.splice(index, 1);
      }
      const players = this._engine.playersByElement.get(element);
      if (players) {
        let index2 = players.indexOf(player);
        if (index2 >= 0) {
          players.splice(index2, 1);
        }
      }
    });
    this.players.push(player);
    playersOnElement.push(player);
    return player;
  }
  deregister(name) {
    this._triggers.delete(name);
    this._engine.statesByElement.forEach((stateMap) => stateMap.delete(name));
    this._elementListeners.forEach((listeners, element) => {
      this._elementListeners.set(element, listeners.filter((entry) => {
        return entry.name != name;
      }));
    });
  }
  clearElementCache(element) {
    this._engine.statesByElement.delete(element);
    this._elementListeners.delete(element);
    const elementPlayers = this._engine.playersByElement.get(element);
    if (elementPlayers) {
      elementPlayers.forEach((player) => player.destroy());
      this._engine.playersByElement.delete(element);
    }
  }
  _signalRemovalForInnerTriggers(rootElement, context) {
    const elements = this._engine.driver.query(rootElement, NG_TRIGGER_SELECTOR, true);
    elements.forEach((elm) => {
      if (elm[REMOVAL_FLAG])
        return;
      const namespaces = this._engine.fetchNamespacesByElement(elm);
      if (namespaces.size) {
        namespaces.forEach((ns) => ns.triggerLeaveAnimation(elm, context, false, true));
      } else {
        this.clearElementCache(elm);
      }
    });
    this._engine.afterFlushAnimationsDone(() => elements.forEach((elm) => this.clearElementCache(elm)));
  }
  triggerLeaveAnimation(element, context, destroyAfterComplete, defaultToFallback) {
    const triggerStates = this._engine.statesByElement.get(element);
    const previousTriggersValues = /* @__PURE__ */ new Map();
    if (triggerStates) {
      const players = [];
      triggerStates.forEach((state, triggerName) => {
        previousTriggersValues.set(triggerName, state.value);
        if (this._triggers.has(triggerName)) {
          const player = this.trigger(element, triggerName, VOID_VALUE, defaultToFallback);
          if (player) {
            players.push(player);
          }
        }
      });
      if (players.length) {
        this._engine.markElementAsRemoved(this.id, element, true, context, previousTriggersValues);
        if (destroyAfterComplete) {
          optimizeGroupPlayer(players).onDone(() => this._engine.processLeaveNode(element));
        }
        return true;
      }
    }
    return false;
  }
  prepareLeaveAnimationListeners(element) {
    const listeners = this._elementListeners.get(element);
    const elementStates = this._engine.statesByElement.get(element);
    if (listeners && elementStates) {
      const visitedTriggers = /* @__PURE__ */ new Set();
      listeners.forEach((listener) => {
        const triggerName = listener.name;
        if (visitedTriggers.has(triggerName))
          return;
        visitedTriggers.add(triggerName);
        const trigger = this._triggers.get(triggerName);
        const transition = trigger.fallbackTransition;
        const fromState = elementStates.get(triggerName) || DEFAULT_STATE_VALUE;
        const toState = new StateValue(VOID_VALUE);
        const player = new TransitionAnimationPlayer(this.id, triggerName, element);
        this._engine.totalQueuedPlayers++;
        this._queue.push({
          element,
          triggerName,
          transition,
          fromState,
          toState,
          player,
          isFallbackTransition: true
        });
      });
    }
  }
  removeNode(element, context) {
    const engine = this._engine;
    if (element.childElementCount) {
      this._signalRemovalForInnerTriggers(element, context);
    }
    if (this.triggerLeaveAnimation(element, context, true))
      return;
    let containsPotentialParentTransition = false;
    if (engine.totalAnimations) {
      const currentPlayers = engine.players.length ? engine.playersByQueriedElement.get(element) : [];
      if (currentPlayers && currentPlayers.length) {
        containsPotentialParentTransition = true;
      } else {
        let parent = element;
        while (parent = parent.parentNode) {
          const triggers = engine.statesByElement.get(parent);
          if (triggers) {
            containsPotentialParentTransition = true;
            break;
          }
        }
      }
    }
    this.prepareLeaveAnimationListeners(element);
    if (containsPotentialParentTransition) {
      engine.markElementAsRemoved(this.id, element, false, context);
    } else {
      const removalFlag = element[REMOVAL_FLAG];
      if (!removalFlag || removalFlag === NULL_REMOVAL_STATE) {
        engine.afterFlush(() => this.clearElementCache(element));
        engine.destroyInnerAnimations(element);
        engine._onRemovalComplete(element, context);
      }
    }
  }
  insertNode(element, parent) {
    addClass(element, this._hostClassName);
  }
  drainQueuedTransitions(microtaskId) {
    const instructions = [];
    this._queue.forEach((entry) => {
      const player = entry.player;
      if (player.destroyed)
        return;
      const element = entry.element;
      const listeners = this._elementListeners.get(element);
      if (listeners) {
        listeners.forEach((listener) => {
          if (listener.name == entry.triggerName) {
            const baseEvent = makeAnimationEvent(element, entry.triggerName, entry.fromState.value, entry.toState.value);
            baseEvent["_data"] = microtaskId;
            listenOnPlayer(entry.player, listener.phase, baseEvent, listener.callback);
          }
        });
      }
      if (player.markedForDestroy) {
        this._engine.afterFlush(() => {
          player.destroy();
        });
      } else {
        instructions.push(entry);
      }
    });
    this._queue = [];
    return instructions.sort((a, b) => {
      const d0 = a.transition.ast.depCount;
      const d1 = b.transition.ast.depCount;
      if (d0 == 0 || d1 == 0) {
        return d0 - d1;
      }
      return this._engine.driver.containsElement(a.element, b.element) ? 1 : -1;
    });
  }
  destroy(context) {
    this.players.forEach((p) => p.destroy());
    this._signalRemovalForInnerTriggers(this.hostElement, context);
  }
};
var TransitionAnimationEngine = class {
  /** @internal */
  _onRemovalComplete(element, context) {
    this.onRemovalComplete(element, context);
  }
  constructor(bodyNode, driver, _normalizer, scheduler) {
    this.bodyNode = bodyNode;
    this.driver = driver;
    this._normalizer = _normalizer;
    this.scheduler = scheduler;
    this.players = [];
    this.newHostElements = /* @__PURE__ */ new Map();
    this.playersByElement = /* @__PURE__ */ new Map();
    this.playersByQueriedElement = /* @__PURE__ */ new Map();
    this.statesByElement = /* @__PURE__ */ new Map();
    this.disabledNodes = /* @__PURE__ */ new Set();
    this.totalAnimations = 0;
    this.totalQueuedPlayers = 0;
    this._namespaceLookup = {};
    this._namespaceList = [];
    this._flushFns = [];
    this._whenQuietFns = [];
    this.namespacesByHostElement = /* @__PURE__ */ new Map();
    this.collectedEnterElements = [];
    this.collectedLeaveElements = [];
    this.onRemovalComplete = (element, context) => {
    };
  }
  get queuedPlayers() {
    const players = [];
    this._namespaceList.forEach((ns) => {
      ns.players.forEach((player) => {
        if (player.queued) {
          players.push(player);
        }
      });
    });
    return players;
  }
  createNamespace(namespaceId, hostElement) {
    const ns = new AnimationTransitionNamespace(namespaceId, hostElement, this);
    if (this.bodyNode && this.driver.containsElement(this.bodyNode, hostElement)) {
      this._balanceNamespaceList(ns, hostElement);
    } else {
      this.newHostElements.set(hostElement, ns);
      this.collectEnterElement(hostElement);
    }
    return this._namespaceLookup[namespaceId] = ns;
  }
  _balanceNamespaceList(ns, hostElement) {
    const namespaceList = this._namespaceList;
    const namespacesByHostElement = this.namespacesByHostElement;
    const limit = namespaceList.length - 1;
    if (limit >= 0) {
      let found = false;
      let ancestor = this.driver.getParentElement(hostElement);
      while (ancestor) {
        const ancestorNs = namespacesByHostElement.get(ancestor);
        if (ancestorNs) {
          const index = namespaceList.indexOf(ancestorNs);
          namespaceList.splice(index + 1, 0, ns);
          found = true;
          break;
        }
        ancestor = this.driver.getParentElement(ancestor);
      }
      if (!found) {
        namespaceList.unshift(ns);
      }
    } else {
      namespaceList.push(ns);
    }
    namespacesByHostElement.set(hostElement, ns);
    return ns;
  }
  register(namespaceId, hostElement) {
    let ns = this._namespaceLookup[namespaceId];
    if (!ns) {
      ns = this.createNamespace(namespaceId, hostElement);
    }
    return ns;
  }
  registerTrigger(namespaceId, name, trigger) {
    let ns = this._namespaceLookup[namespaceId];
    if (ns && ns.register(name, trigger)) {
      this.totalAnimations++;
    }
  }
  destroy(namespaceId, context) {
    if (!namespaceId)
      return;
    this.afterFlush(() => {
    });
    this.afterFlushAnimationsDone(() => {
      const ns = this._fetchNamespace(namespaceId);
      this.namespacesByHostElement.delete(ns.hostElement);
      const index = this._namespaceList.indexOf(ns);
      if (index >= 0) {
        this._namespaceList.splice(index, 1);
      }
      ns.destroy(context);
      delete this._namespaceLookup[namespaceId];
    });
  }
  _fetchNamespace(id) {
    return this._namespaceLookup[id];
  }
  fetchNamespacesByElement(element) {
    const namespaces = /* @__PURE__ */ new Set();
    const elementStates = this.statesByElement.get(element);
    if (elementStates) {
      for (let stateValue of elementStates.values()) {
        if (stateValue.namespaceId) {
          const ns = this._fetchNamespace(stateValue.namespaceId);
          if (ns) {
            namespaces.add(ns);
          }
        }
      }
    }
    return namespaces;
  }
  trigger(namespaceId, element, name, value) {
    if (isElementNode(element)) {
      const ns = this._fetchNamespace(namespaceId);
      if (ns) {
        ns.trigger(element, name, value);
        return true;
      }
    }
    return false;
  }
  insertNode(namespaceId, element, parent, insertBefore) {
    if (!isElementNode(element))
      return;
    const details = element[REMOVAL_FLAG];
    if (details && details.setForRemoval) {
      details.setForRemoval = false;
      details.setForMove = true;
      const index = this.collectedLeaveElements.indexOf(element);
      if (index >= 0) {
        this.collectedLeaveElements.splice(index, 1);
      }
    }
    if (namespaceId) {
      const ns = this._fetchNamespace(namespaceId);
      if (ns) {
        ns.insertNode(element, parent);
      }
    }
    if (insertBefore) {
      this.collectEnterElement(element);
    }
  }
  collectEnterElement(element) {
    this.collectedEnterElements.push(element);
  }
  markElementAsDisabled(element, value) {
    if (value) {
      if (!this.disabledNodes.has(element)) {
        this.disabledNodes.add(element);
        addClass(element, DISABLED_CLASSNAME);
      }
    } else if (this.disabledNodes.has(element)) {
      this.disabledNodes.delete(element);
      removeClass(element, DISABLED_CLASSNAME);
    }
  }
  removeNode(namespaceId, element, context) {
    if (isElementNode(element)) {
      this.scheduler?.notify();
      const ns = namespaceId ? this._fetchNamespace(namespaceId) : null;
      if (ns) {
        ns.removeNode(element, context);
      } else {
        this.markElementAsRemoved(namespaceId, element, false, context);
      }
      const hostNS = this.namespacesByHostElement.get(element);
      if (hostNS && hostNS.id !== namespaceId) {
        hostNS.removeNode(element, context);
      }
    } else {
      this._onRemovalComplete(element, context);
    }
  }
  markElementAsRemoved(namespaceId, element, hasAnimation, context, previousTriggersValues) {
    this.collectedLeaveElements.push(element);
    element[REMOVAL_FLAG] = {
      namespaceId,
      setForRemoval: context,
      hasAnimation,
      removedBeforeQueried: false,
      previousTriggersValues
    };
  }
  listen(namespaceId, element, name, phase, callback) {
    if (isElementNode(element)) {
      return this._fetchNamespace(namespaceId).listen(element, name, phase, callback);
    }
    return () => {
    };
  }
  _buildInstruction(entry, subTimelines, enterClassName, leaveClassName, skipBuildAst) {
    return entry.transition.build(this.driver, entry.element, entry.fromState.value, entry.toState.value, enterClassName, leaveClassName, entry.fromState.options, entry.toState.options, subTimelines, skipBuildAst);
  }
  destroyInnerAnimations(containerElement) {
    let elements = this.driver.query(containerElement, NG_TRIGGER_SELECTOR, true);
    elements.forEach((element) => this.destroyActiveAnimationsForElement(element));
    if (this.playersByQueriedElement.size == 0)
      return;
    elements = this.driver.query(containerElement, NG_ANIMATING_SELECTOR, true);
    elements.forEach((element) => this.finishActiveQueriedAnimationOnElement(element));
  }
  destroyActiveAnimationsForElement(element) {
    const players = this.playersByElement.get(element);
    if (players) {
      players.forEach((player) => {
        if (player.queued) {
          player.markedForDestroy = true;
        } else {
          player.destroy();
        }
      });
    }
  }
  finishActiveQueriedAnimationOnElement(element) {
    const players = this.playersByQueriedElement.get(element);
    if (players) {
      players.forEach((player) => player.finish());
    }
  }
  whenRenderingDone() {
    return new Promise((resolve) => {
      if (this.players.length) {
        return optimizeGroupPlayer(this.players).onDone(() => resolve());
      } else {
        resolve();
      }
    });
  }
  processLeaveNode(element) {
    const details = element[REMOVAL_FLAG];
    if (details && details.setForRemoval) {
      element[REMOVAL_FLAG] = NULL_REMOVAL_STATE;
      if (details.namespaceId) {
        this.destroyInnerAnimations(element);
        const ns = this._fetchNamespace(details.namespaceId);
        if (ns) {
          ns.clearElementCache(element);
        }
      }
      this._onRemovalComplete(element, details.setForRemoval);
    }
    if (element.classList?.contains(DISABLED_CLASSNAME)) {
      this.markElementAsDisabled(element, false);
    }
    this.driver.query(element, DISABLED_SELECTOR, true).forEach((node) => {
      this.markElementAsDisabled(node, false);
    });
  }
  flush(microtaskId = -1) {
    let players = [];
    if (this.newHostElements.size) {
      this.newHostElements.forEach((ns, element) => this._balanceNamespaceList(ns, element));
      this.newHostElements.clear();
    }
    if (this.totalAnimations && this.collectedEnterElements.length) {
      for (let i = 0; i < this.collectedEnterElements.length; i++) {
        const elm = this.collectedEnterElements[i];
        addClass(elm, STAR_CLASSNAME);
      }
    }
    if (this._namespaceList.length && (this.totalQueuedPlayers || this.collectedLeaveElements.length)) {
      const cleanupFns = [];
      try {
        players = this._flushAnimations(cleanupFns, microtaskId);
      } finally {
        for (let i = 0; i < cleanupFns.length; i++) {
          cleanupFns[i]();
        }
      }
    } else {
      for (let i = 0; i < this.collectedLeaveElements.length; i++) {
        const element = this.collectedLeaveElements[i];
        this.processLeaveNode(element);
      }
    }
    this.totalQueuedPlayers = 0;
    this.collectedEnterElements.length = 0;
    this.collectedLeaveElements.length = 0;
    this._flushFns.forEach((fn) => fn());
    this._flushFns = [];
    if (this._whenQuietFns.length) {
      const quietFns = this._whenQuietFns;
      this._whenQuietFns = [];
      if (players.length) {
        optimizeGroupPlayer(players).onDone(() => {
          quietFns.forEach((fn) => fn());
        });
      } else {
        quietFns.forEach((fn) => fn());
      }
    }
  }
  reportError(errors) {
    throw triggerTransitionsFailed(errors);
  }
  _flushAnimations(cleanupFns, microtaskId) {
    const subTimelines = new ElementInstructionMap();
    const skippedPlayers = [];
    const skippedPlayersMap = /* @__PURE__ */ new Map();
    const queuedInstructions = [];
    const queriedElements = /* @__PURE__ */ new Map();
    const allPreStyleElements = /* @__PURE__ */ new Map();
    const allPostStyleElements = /* @__PURE__ */ new Map();
    const disabledElementsSet = /* @__PURE__ */ new Set();
    this.disabledNodes.forEach((node) => {
      disabledElementsSet.add(node);
      const nodesThatAreDisabled = this.driver.query(node, QUEUED_SELECTOR, true);
      for (let i2 = 0; i2 < nodesThatAreDisabled.length; i2++) {
        disabledElementsSet.add(nodesThatAreDisabled[i2]);
      }
    });
    const bodyNode = this.bodyNode;
    const allTriggerElements = Array.from(this.statesByElement.keys());
    const enterNodeMap = buildRootMap(allTriggerElements, this.collectedEnterElements);
    const enterNodeMapIds = /* @__PURE__ */ new Map();
    let i = 0;
    enterNodeMap.forEach((nodes, root) => {
      const className = ENTER_CLASSNAME + i++;
      enterNodeMapIds.set(root, className);
      nodes.forEach((node) => addClass(node, className));
    });
    const allLeaveNodes = [];
    const mergedLeaveNodes = /* @__PURE__ */ new Set();
    const leaveNodesWithoutAnimations = /* @__PURE__ */ new Set();
    for (let i2 = 0; i2 < this.collectedLeaveElements.length; i2++) {
      const element = this.collectedLeaveElements[i2];
      const details = element[REMOVAL_FLAG];
      if (details && details.setForRemoval) {
        allLeaveNodes.push(element);
        mergedLeaveNodes.add(element);
        if (details.hasAnimation) {
          this.driver.query(element, STAR_SELECTOR, true).forEach((elm) => mergedLeaveNodes.add(elm));
        } else {
          leaveNodesWithoutAnimations.add(element);
        }
      }
    }
    const leaveNodeMapIds = /* @__PURE__ */ new Map();
    const leaveNodeMap = buildRootMap(allTriggerElements, Array.from(mergedLeaveNodes));
    leaveNodeMap.forEach((nodes, root) => {
      const className = LEAVE_CLASSNAME + i++;
      leaveNodeMapIds.set(root, className);
      nodes.forEach((node) => addClass(node, className));
    });
    cleanupFns.push(() => {
      enterNodeMap.forEach((nodes, root) => {
        const className = enterNodeMapIds.get(root);
        nodes.forEach((node) => removeClass(node, className));
      });
      leaveNodeMap.forEach((nodes, root) => {
        const className = leaveNodeMapIds.get(root);
        nodes.forEach((node) => removeClass(node, className));
      });
      allLeaveNodes.forEach((element) => {
        this.processLeaveNode(element);
      });
    });
    const allPlayers = [];
    const erroneousTransitions = [];
    for (let i2 = this._namespaceList.length - 1; i2 >= 0; i2--) {
      const ns = this._namespaceList[i2];
      ns.drainQueuedTransitions(microtaskId).forEach((entry) => {
        const player = entry.player;
        const element = entry.element;
        allPlayers.push(player);
        if (this.collectedEnterElements.length) {
          const details = element[REMOVAL_FLAG];
          if (details && details.setForMove) {
            if (details.previousTriggersValues && details.previousTriggersValues.has(entry.triggerName)) {
              const previousValue = details.previousTriggersValues.get(entry.triggerName);
              const triggersWithStates = this.statesByElement.get(entry.element);
              if (triggersWithStates && triggersWithStates.has(entry.triggerName)) {
                const state = triggersWithStates.get(entry.triggerName);
                state.value = previousValue;
                triggersWithStates.set(entry.triggerName, state);
              }
            }
            player.destroy();
            return;
          }
        }
        const nodeIsOrphaned = !bodyNode || !this.driver.containsElement(bodyNode, element);
        const leaveClassName = leaveNodeMapIds.get(element);
        const enterClassName = enterNodeMapIds.get(element);
        const instruction = this._buildInstruction(entry, subTimelines, enterClassName, leaveClassName, nodeIsOrphaned);
        if (instruction.errors && instruction.errors.length) {
          erroneousTransitions.push(instruction);
          return;
        }
        if (nodeIsOrphaned) {
          player.onStart(() => eraseStyles(element, instruction.fromStyles));
          player.onDestroy(() => setStyles(element, instruction.toStyles));
          skippedPlayers.push(player);
          return;
        }
        if (entry.isFallbackTransition) {
          player.onStart(() => eraseStyles(element, instruction.fromStyles));
          player.onDestroy(() => setStyles(element, instruction.toStyles));
          skippedPlayers.push(player);
          return;
        }
        const timelines = [];
        instruction.timelines.forEach((tl) => {
          tl.stretchStartingKeyframe = true;
          if (!this.disabledNodes.has(tl.element)) {
            timelines.push(tl);
          }
        });
        instruction.timelines = timelines;
        subTimelines.append(element, instruction.timelines);
        const tuple = {
          instruction,
          player,
          element
        };
        queuedInstructions.push(tuple);
        instruction.queriedElements.forEach((element2) => getOrSetDefaultValue(queriedElements, element2, []).push(player));
        instruction.preStyleProps.forEach((stringMap, element2) => {
          if (stringMap.size) {
            let setVal = allPreStyleElements.get(element2);
            if (!setVal) {
              allPreStyleElements.set(element2, setVal = /* @__PURE__ */ new Set());
            }
            stringMap.forEach((_, prop) => setVal.add(prop));
          }
        });
        instruction.postStyleProps.forEach((stringMap, element2) => {
          let setVal = allPostStyleElements.get(element2);
          if (!setVal) {
            allPostStyleElements.set(element2, setVal = /* @__PURE__ */ new Set());
          }
          stringMap.forEach((_, prop) => setVal.add(prop));
        });
      });
    }
    if (erroneousTransitions.length) {
      const errors = [];
      erroneousTransitions.forEach((instruction) => {
        errors.push(transitionFailed(instruction.triggerName, instruction.errors));
      });
      allPlayers.forEach((player) => player.destroy());
      this.reportError(errors);
    }
    const allPreviousPlayersMap = /* @__PURE__ */ new Map();
    const animationElementMap = /* @__PURE__ */ new Map();
    queuedInstructions.forEach((entry) => {
      const element = entry.element;
      if (subTimelines.has(element)) {
        animationElementMap.set(element, element);
        this._beforeAnimationBuild(entry.player.namespaceId, entry.instruction, allPreviousPlayersMap);
      }
    });
    skippedPlayers.forEach((player) => {
      const element = player.element;
      const previousPlayers = this._getPreviousPlayers(element, false, player.namespaceId, player.triggerName, null);
      previousPlayers.forEach((prevPlayer) => {
        getOrSetDefaultValue(allPreviousPlayersMap, element, []).push(prevPlayer);
        prevPlayer.destroy();
      });
    });
    const replaceNodes = allLeaveNodes.filter((node) => {
      return replacePostStylesAsPre(node, allPreStyleElements, allPostStyleElements);
    });
    const postStylesMap = /* @__PURE__ */ new Map();
    const allLeaveQueriedNodes = cloakAndComputeStyles(postStylesMap, this.driver, leaveNodesWithoutAnimations, allPostStyleElements, AUTO_STYLE);
    allLeaveQueriedNodes.forEach((node) => {
      if (replacePostStylesAsPre(node, allPreStyleElements, allPostStyleElements)) {
        replaceNodes.push(node);
      }
    });
    const preStylesMap = /* @__PURE__ */ new Map();
    enterNodeMap.forEach((nodes, root) => {
      cloakAndComputeStyles(preStylesMap, this.driver, new Set(nodes), allPreStyleElements, \u0275PRE_STYLE);
    });
    replaceNodes.forEach((node) => {
      const post = postStylesMap.get(node);
      const pre = preStylesMap.get(node);
      postStylesMap.set(node, new Map([...post?.entries() ?? [], ...pre?.entries() ?? []]));
    });
    const rootPlayers = [];
    const subPlayers = [];
    const NO_PARENT_ANIMATION_ELEMENT_DETECTED = {};
    queuedInstructions.forEach((entry) => {
      const {
        element,
        player,
        instruction
      } = entry;
      if (subTimelines.has(element)) {
        if (disabledElementsSet.has(element)) {
          player.onDestroy(() => setStyles(element, instruction.toStyles));
          player.disabled = true;
          player.overrideTotalTime(instruction.totalTime);
          skippedPlayers.push(player);
          return;
        }
        let parentWithAnimation = NO_PARENT_ANIMATION_ELEMENT_DETECTED;
        if (animationElementMap.size > 1) {
          let elm = element;
          const parentsToAdd = [];
          while (elm = elm.parentNode) {
            const detectedParent = animationElementMap.get(elm);
            if (detectedParent) {
              parentWithAnimation = detectedParent;
              break;
            }
            parentsToAdd.push(elm);
          }
          parentsToAdd.forEach((parent) => animationElementMap.set(parent, parentWithAnimation));
        }
        const innerPlayer = this._buildAnimation(player.namespaceId, instruction, allPreviousPlayersMap, skippedPlayersMap, preStylesMap, postStylesMap);
        player.setRealPlayer(innerPlayer);
        if (parentWithAnimation === NO_PARENT_ANIMATION_ELEMENT_DETECTED) {
          rootPlayers.push(player);
        } else {
          const parentPlayers = this.playersByElement.get(parentWithAnimation);
          if (parentPlayers && parentPlayers.length) {
            player.parentPlayer = optimizeGroupPlayer(parentPlayers);
          }
          skippedPlayers.push(player);
        }
      } else {
        eraseStyles(element, instruction.fromStyles);
        player.onDestroy(() => setStyles(element, instruction.toStyles));
        subPlayers.push(player);
        if (disabledElementsSet.has(element)) {
          skippedPlayers.push(player);
        }
      }
    });
    subPlayers.forEach((player) => {
      const playersForElement = skippedPlayersMap.get(player.element);
      if (playersForElement && playersForElement.length) {
        const innerPlayer = optimizeGroupPlayer(playersForElement);
        player.setRealPlayer(innerPlayer);
      }
    });
    skippedPlayers.forEach((player) => {
      if (player.parentPlayer) {
        player.syncPlayerEvents(player.parentPlayer);
      } else {
        player.destroy();
      }
    });
    for (let i2 = 0; i2 < allLeaveNodes.length; i2++) {
      const element = allLeaveNodes[i2];
      const details = element[REMOVAL_FLAG];
      removeClass(element, LEAVE_CLASSNAME);
      if (details && details.hasAnimation)
        continue;
      let players = [];
      if (queriedElements.size) {
        let queriedPlayerResults = queriedElements.get(element);
        if (queriedPlayerResults && queriedPlayerResults.length) {
          players.push(...queriedPlayerResults);
        }
        let queriedInnerElements = this.driver.query(element, NG_ANIMATING_SELECTOR, true);
        for (let j = 0; j < queriedInnerElements.length; j++) {
          let queriedPlayers = queriedElements.get(queriedInnerElements[j]);
          if (queriedPlayers && queriedPlayers.length) {
            players.push(...queriedPlayers);
          }
        }
      }
      const activePlayers = players.filter((p) => !p.destroyed);
      if (activePlayers.length) {
        removeNodesAfterAnimationDone(this, element, activePlayers);
      } else {
        this.processLeaveNode(element);
      }
    }
    allLeaveNodes.length = 0;
    rootPlayers.forEach((player) => {
      this.players.push(player);
      player.onDone(() => {
        player.destroy();
        const index = this.players.indexOf(player);
        this.players.splice(index, 1);
      });
      player.play();
    });
    return rootPlayers;
  }
  afterFlush(callback) {
    this._flushFns.push(callback);
  }
  afterFlushAnimationsDone(callback) {
    this._whenQuietFns.push(callback);
  }
  _getPreviousPlayers(element, isQueriedElement, namespaceId, triggerName, toStateValue) {
    let players = [];
    if (isQueriedElement) {
      const queriedElementPlayers = this.playersByQueriedElement.get(element);
      if (queriedElementPlayers) {
        players = queriedElementPlayers;
      }
    } else {
      const elementPlayers = this.playersByElement.get(element);
      if (elementPlayers) {
        const isRemovalAnimation = !toStateValue || toStateValue == VOID_VALUE;
        elementPlayers.forEach((player) => {
          if (player.queued)
            return;
          if (!isRemovalAnimation && player.triggerName != triggerName)
            return;
          players.push(player);
        });
      }
    }
    if (namespaceId || triggerName) {
      players = players.filter((player) => {
        if (namespaceId && namespaceId != player.namespaceId)
          return false;
        if (triggerName && triggerName != player.triggerName)
          return false;
        return true;
      });
    }
    return players;
  }
  _beforeAnimationBuild(namespaceId, instruction, allPreviousPlayersMap) {
    const triggerName = instruction.triggerName;
    const rootElement = instruction.element;
    const targetNameSpaceId = instruction.isRemovalTransition ? void 0 : namespaceId;
    const targetTriggerName = instruction.isRemovalTransition ? void 0 : triggerName;
    for (const timelineInstruction of instruction.timelines) {
      const element = timelineInstruction.element;
      const isQueriedElement = element !== rootElement;
      const players = getOrSetDefaultValue(allPreviousPlayersMap, element, []);
      const previousPlayers = this._getPreviousPlayers(element, isQueriedElement, targetNameSpaceId, targetTriggerName, instruction.toState);
      previousPlayers.forEach((player) => {
        const realPlayer = player.getRealPlayer();
        if (realPlayer.beforeDestroy) {
          realPlayer.beforeDestroy();
        }
        player.destroy();
        players.push(player);
      });
    }
    eraseStyles(rootElement, instruction.fromStyles);
  }
  _buildAnimation(namespaceId, instruction, allPreviousPlayersMap, skippedPlayersMap, preStylesMap, postStylesMap) {
    const triggerName = instruction.triggerName;
    const rootElement = instruction.element;
    const allQueriedPlayers = [];
    const allConsumedElements = /* @__PURE__ */ new Set();
    const allSubElements = /* @__PURE__ */ new Set();
    const allNewPlayers = instruction.timelines.map((timelineInstruction) => {
      const element = timelineInstruction.element;
      allConsumedElements.add(element);
      const details = element[REMOVAL_FLAG];
      if (details && details.removedBeforeQueried)
        return new NoopAnimationPlayer(timelineInstruction.duration, timelineInstruction.delay);
      const isQueriedElement = element !== rootElement;
      const previousPlayers = flattenGroupPlayers((allPreviousPlayersMap.get(element) || EMPTY_PLAYER_ARRAY).map((p) => p.getRealPlayer())).filter((p) => {
        const pp = p;
        return pp.element ? pp.element === element : false;
      });
      const preStyles = preStylesMap.get(element);
      const postStyles = postStylesMap.get(element);
      const keyframes = normalizeKeyframes$1(this._normalizer, timelineInstruction.keyframes, preStyles, postStyles);
      const player2 = this._buildPlayer(timelineInstruction, keyframes, previousPlayers);
      if (timelineInstruction.subTimeline && skippedPlayersMap) {
        allSubElements.add(element);
      }
      if (isQueriedElement) {
        const wrappedPlayer = new TransitionAnimationPlayer(namespaceId, triggerName, element);
        wrappedPlayer.setRealPlayer(player2);
        allQueriedPlayers.push(wrappedPlayer);
      }
      return player2;
    });
    allQueriedPlayers.forEach((player2) => {
      getOrSetDefaultValue(this.playersByQueriedElement, player2.element, []).push(player2);
      player2.onDone(() => deleteOrUnsetInMap(this.playersByQueriedElement, player2.element, player2));
    });
    allConsumedElements.forEach((element) => addClass(element, NG_ANIMATING_CLASSNAME));
    const player = optimizeGroupPlayer(allNewPlayers);
    player.onDestroy(() => {
      allConsumedElements.forEach((element) => removeClass(element, NG_ANIMATING_CLASSNAME));
      setStyles(rootElement, instruction.toStyles);
    });
    allSubElements.forEach((element) => {
      getOrSetDefaultValue(skippedPlayersMap, element, []).push(player);
    });
    return player;
  }
  _buildPlayer(instruction, keyframes, previousPlayers) {
    if (keyframes.length > 0) {
      return this.driver.animate(instruction.element, keyframes, instruction.duration, instruction.delay, instruction.easing, previousPlayers);
    }
    return new NoopAnimationPlayer(instruction.duration, instruction.delay);
  }
};
var TransitionAnimationPlayer = class {
  constructor(namespaceId, triggerName, element) {
    this.namespaceId = namespaceId;
    this.triggerName = triggerName;
    this.element = element;
    this._player = new NoopAnimationPlayer();
    this._containsRealPlayer = false;
    this._queuedCallbacks = /* @__PURE__ */ new Map();
    this.destroyed = false;
    this.parentPlayer = null;
    this.markedForDestroy = false;
    this.disabled = false;
    this.queued = true;
    this.totalTime = 0;
  }
  setRealPlayer(player) {
    if (this._containsRealPlayer)
      return;
    this._player = player;
    this._queuedCallbacks.forEach((callbacks, phase) => {
      callbacks.forEach((callback) => listenOnPlayer(player, phase, void 0, callback));
    });
    this._queuedCallbacks.clear();
    this._containsRealPlayer = true;
    this.overrideTotalTime(player.totalTime);
    this.queued = false;
  }
  getRealPlayer() {
    return this._player;
  }
  overrideTotalTime(totalTime) {
    this.totalTime = totalTime;
  }
  syncPlayerEvents(player) {
    const p = this._player;
    if (p.triggerCallback) {
      player.onStart(() => p.triggerCallback("start"));
    }
    player.onDone(() => this.finish());
    player.onDestroy(() => this.destroy());
  }
  _queueEvent(name, callback) {
    getOrSetDefaultValue(this._queuedCallbacks, name, []).push(callback);
  }
  onDone(fn) {
    if (this.queued) {
      this._queueEvent("done", fn);
    }
    this._player.onDone(fn);
  }
  onStart(fn) {
    if (this.queued) {
      this._queueEvent("start", fn);
    }
    this._player.onStart(fn);
  }
  onDestroy(fn) {
    if (this.queued) {
      this._queueEvent("destroy", fn);
    }
    this._player.onDestroy(fn);
  }
  init() {
    this._player.init();
  }
  hasStarted() {
    return this.queued ? false : this._player.hasStarted();
  }
  play() {
    !this.queued && this._player.play();
  }
  pause() {
    !this.queued && this._player.pause();
  }
  restart() {
    !this.queued && this._player.restart();
  }
  finish() {
    this._player.finish();
  }
  destroy() {
    this.destroyed = true;
    this._player.destroy();
  }
  reset() {
    !this.queued && this._player.reset();
  }
  setPosition(p) {
    if (!this.queued) {
      this._player.setPosition(p);
    }
  }
  getPosition() {
    return this.queued ? 0 : this._player.getPosition();
  }
  /** @internal */
  triggerCallback(phaseName) {
    const p = this._player;
    if (p.triggerCallback) {
      p.triggerCallback(phaseName);
    }
  }
};
function deleteOrUnsetInMap(map2, key, value) {
  let currentValues = map2.get(key);
  if (currentValues) {
    if (currentValues.length) {
      const index = currentValues.indexOf(value);
      currentValues.splice(index, 1);
    }
    if (currentValues.length == 0) {
      map2.delete(key);
    }
  }
  return currentValues;
}
function normalizeTriggerValue(value) {
  return value != null ? value : null;
}
function isElementNode(node) {
  return node && node["nodeType"] === 1;
}
function isTriggerEventValid(eventName) {
  return eventName == "start" || eventName == "done";
}
function cloakElement(element, value) {
  const oldValue = element.style.display;
  element.style.display = value != null ? value : "none";
  return oldValue;
}
function cloakAndComputeStyles(valuesMap, driver, elements, elementPropsMap, defaultStyle) {
  const cloakVals = [];
  elements.forEach((element) => cloakVals.push(cloakElement(element)));
  const failedElements = [];
  elementPropsMap.forEach((props, element) => {
    const styles = /* @__PURE__ */ new Map();
    props.forEach((prop) => {
      const value = driver.computeStyle(element, prop, defaultStyle);
      styles.set(prop, value);
      if (!value || value.length == 0) {
        element[REMOVAL_FLAG] = NULL_REMOVED_QUERIED_STATE;
        failedElements.push(element);
      }
    });
    valuesMap.set(element, styles);
  });
  let i = 0;
  elements.forEach((element) => cloakElement(element, cloakVals[i++]));
  return failedElements;
}
function buildRootMap(roots, nodes) {
  const rootMap = /* @__PURE__ */ new Map();
  roots.forEach((root) => rootMap.set(root, []));
  if (nodes.length == 0)
    return rootMap;
  const NULL_NODE = 1;
  const nodeSet = new Set(nodes);
  const localRootMap = /* @__PURE__ */ new Map();
  function getRoot(node) {
    if (!node)
      return NULL_NODE;
    let root = localRootMap.get(node);
    if (root)
      return root;
    const parent = node.parentNode;
    if (rootMap.has(parent)) {
      root = parent;
    } else if (nodeSet.has(parent)) {
      root = NULL_NODE;
    } else {
      root = getRoot(parent);
    }
    localRootMap.set(node, root);
    return root;
  }
  nodes.forEach((node) => {
    const root = getRoot(node);
    if (root !== NULL_NODE) {
      rootMap.get(root).push(node);
    }
  });
  return rootMap;
}
function addClass(element, className) {
  element.classList?.add(className);
}
function removeClass(element, className) {
  element.classList?.remove(className);
}
function removeNodesAfterAnimationDone(engine, element, players) {
  optimizeGroupPlayer(players).onDone(() => engine.processLeaveNode(element));
}
function flattenGroupPlayers(players) {
  const finalPlayers = [];
  _flattenGroupPlayersRecur(players, finalPlayers);
  return finalPlayers;
}
function _flattenGroupPlayersRecur(players, finalPlayers) {
  for (let i = 0; i < players.length; i++) {
    const player = players[i];
    if (player instanceof AnimationGroupPlayer) {
      _flattenGroupPlayersRecur(player.players, finalPlayers);
    } else {
      finalPlayers.push(player);
    }
  }
}
function objEquals(a, b) {
  const k1 = Object.keys(a);
  const k2 = Object.keys(b);
  if (k1.length != k2.length)
    return false;
  for (let i = 0; i < k1.length; i++) {
    const prop = k1[i];
    if (!b.hasOwnProperty(prop) || a[prop] !== b[prop])
      return false;
  }
  return true;
}
function replacePostStylesAsPre(element, allPreStyleElements, allPostStyleElements) {
  const postEntry = allPostStyleElements.get(element);
  if (!postEntry)
    return false;
  let preEntry = allPreStyleElements.get(element);
  if (preEntry) {
    postEntry.forEach((data) => preEntry.add(data));
  } else {
    allPreStyleElements.set(element, postEntry);
  }
  allPostStyleElements.delete(element);
  return true;
}
var AnimationEngine = class {
  constructor(doc, _driver, _normalizer, scheduler) {
    this._driver = _driver;
    this._normalizer = _normalizer;
    this._triggerCache = {};
    this.onRemovalComplete = (element, context) => {
    };
    this._transitionEngine = new TransitionAnimationEngine(doc.body, _driver, _normalizer, scheduler);
    this._timelineEngine = new TimelineAnimationEngine(doc.body, _driver, _normalizer);
    this._transitionEngine.onRemovalComplete = (element, context) => this.onRemovalComplete(element, context);
  }
  registerTrigger(componentId, namespaceId, hostElement, name, metadata) {
    const cacheKey = componentId + "-" + name;
    let trigger = this._triggerCache[cacheKey];
    if (!trigger) {
      const errors = [];
      const warnings = [];
      const ast = buildAnimationAst(this._driver, metadata, errors, warnings);
      if (errors.length) {
        throw triggerBuildFailed(name, errors);
      }
      if (warnings.length) {
        warnTriggerBuild(name, warnings);
      }
      trigger = buildTrigger(name, ast, this._normalizer);
      this._triggerCache[cacheKey] = trigger;
    }
    this._transitionEngine.registerTrigger(namespaceId, name, trigger);
  }
  register(namespaceId, hostElement) {
    this._transitionEngine.register(namespaceId, hostElement);
  }
  destroy(namespaceId, context) {
    this._transitionEngine.destroy(namespaceId, context);
  }
  onInsert(namespaceId, element, parent, insertBefore) {
    this._transitionEngine.insertNode(namespaceId, element, parent, insertBefore);
  }
  onRemove(namespaceId, element, context) {
    this._transitionEngine.removeNode(namespaceId, element, context);
  }
  disableAnimations(element, disable) {
    this._transitionEngine.markElementAsDisabled(element, disable);
  }
  process(namespaceId, element, property, value) {
    if (property.charAt(0) == "@") {
      const [id, action] = parseTimelineCommand(property);
      const args = value;
      this._timelineEngine.command(id, element, action, args);
    } else {
      this._transitionEngine.trigger(namespaceId, element, property, value);
    }
  }
  listen(namespaceId, element, eventName, eventPhase, callback) {
    if (eventName.charAt(0) == "@") {
      const [id, action] = parseTimelineCommand(eventName);
      return this._timelineEngine.listen(id, element, action, callback);
    }
    return this._transitionEngine.listen(namespaceId, element, eventName, eventPhase, callback);
  }
  flush(microtaskId = -1) {
    this._transitionEngine.flush(microtaskId);
  }
  get players() {
    return [...this._transitionEngine.players, ...this._timelineEngine.players];
  }
  whenRenderingDone() {
    return this._transitionEngine.whenRenderingDone();
  }
  afterFlushAnimationsDone(cb) {
    this._transitionEngine.afterFlushAnimationsDone(cb);
  }
};
function packageNonAnimatableStyles(element, styles) {
  let startStyles = null;
  let endStyles = null;
  if (Array.isArray(styles) && styles.length) {
    startStyles = filterNonAnimatableStyles(styles[0]);
    if (styles.length > 1) {
      endStyles = filterNonAnimatableStyles(styles[styles.length - 1]);
    }
  } else if (styles instanceof Map) {
    startStyles = filterNonAnimatableStyles(styles);
  }
  return startStyles || endStyles ? new SpecialCasedStyles(element, startStyles, endStyles) : null;
}
var SpecialCasedStyles = class _SpecialCasedStyles {
  static {
    this.initialStylesByElement = /* @__PURE__ */ new WeakMap();
  }
  constructor(_element, _startStyles, _endStyles) {
    this._element = _element;
    this._startStyles = _startStyles;
    this._endStyles = _endStyles;
    this._state = 0;
    let initialStyles = _SpecialCasedStyles.initialStylesByElement.get(_element);
    if (!initialStyles) {
      _SpecialCasedStyles.initialStylesByElement.set(_element, initialStyles = /* @__PURE__ */ new Map());
    }
    this._initialStyles = initialStyles;
  }
  start() {
    if (this._state < 1) {
      if (this._startStyles) {
        setStyles(this._element, this._startStyles, this._initialStyles);
      }
      this._state = 1;
    }
  }
  finish() {
    this.start();
    if (this._state < 2) {
      setStyles(this._element, this._initialStyles);
      if (this._endStyles) {
        setStyles(this._element, this._endStyles);
        this._endStyles = null;
      }
      this._state = 1;
    }
  }
  destroy() {
    this.finish();
    if (this._state < 3) {
      _SpecialCasedStyles.initialStylesByElement.delete(this._element);
      if (this._startStyles) {
        eraseStyles(this._element, this._startStyles);
        this._endStyles = null;
      }
      if (this._endStyles) {
        eraseStyles(this._element, this._endStyles);
        this._endStyles = null;
      }
      setStyles(this._element, this._initialStyles);
      this._state = 3;
    }
  }
};
function filterNonAnimatableStyles(styles) {
  let result = null;
  styles.forEach((val, prop) => {
    if (isNonAnimatableStyle(prop)) {
      result = result || /* @__PURE__ */ new Map();
      result.set(prop, val);
    }
  });
  return result;
}
function isNonAnimatableStyle(prop) {
  return prop === "display" || prop === "position";
}
var WebAnimationsPlayer = class {
  constructor(element, keyframes, options, _specialStyles) {
    this.element = element;
    this.keyframes = keyframes;
    this.options = options;
    this._specialStyles = _specialStyles;
    this._onDoneFns = [];
    this._onStartFns = [];
    this._onDestroyFns = [];
    this._initialized = false;
    this._finished = false;
    this._started = false;
    this._destroyed = false;
    this._originalOnDoneFns = [];
    this._originalOnStartFns = [];
    this.time = 0;
    this.parentPlayer = null;
    this.currentSnapshot = /* @__PURE__ */ new Map();
    this._duration = options["duration"];
    this._delay = options["delay"] || 0;
    this.time = this._duration + this._delay;
  }
  _onFinish() {
    if (!this._finished) {
      this._finished = true;
      this._onDoneFns.forEach((fn) => fn());
      this._onDoneFns = [];
    }
  }
  init() {
    this._buildPlayer();
    this._preparePlayerBeforeStart();
  }
  _buildPlayer() {
    if (this._initialized)
      return;
    this._initialized = true;
    const keyframes = this.keyframes;
    this.domPlayer = this._triggerWebAnimation(this.element, keyframes, this.options);
    this._finalKeyframe = keyframes.length ? keyframes[keyframes.length - 1] : /* @__PURE__ */ new Map();
    const onFinish = () => this._onFinish();
    this.domPlayer.addEventListener("finish", onFinish);
    this.onDestroy(() => {
      this.domPlayer.removeEventListener("finish", onFinish);
    });
  }
  _preparePlayerBeforeStart() {
    if (this._delay) {
      this._resetDomPlayerState();
    } else {
      this.domPlayer.pause();
    }
  }
  _convertKeyframesToObject(keyframes) {
    const kfs = [];
    keyframes.forEach((frame) => {
      kfs.push(Object.fromEntries(frame));
    });
    return kfs;
  }
  /** @internal */
  _triggerWebAnimation(element, keyframes, options) {
    return element.animate(this._convertKeyframesToObject(keyframes), options);
  }
  onStart(fn) {
    this._originalOnStartFns.push(fn);
    this._onStartFns.push(fn);
  }
  onDone(fn) {
    this._originalOnDoneFns.push(fn);
    this._onDoneFns.push(fn);
  }
  onDestroy(fn) {
    this._onDestroyFns.push(fn);
  }
  play() {
    this._buildPlayer();
    if (!this.hasStarted()) {
      this._onStartFns.forEach((fn) => fn());
      this._onStartFns = [];
      this._started = true;
      if (this._specialStyles) {
        this._specialStyles.start();
      }
    }
    this.domPlayer.play();
  }
  pause() {
    this.init();
    this.domPlayer.pause();
  }
  finish() {
    this.init();
    if (this._specialStyles) {
      this._specialStyles.finish();
    }
    this._onFinish();
    this.domPlayer.finish();
  }
  reset() {
    this._resetDomPlayerState();
    this._destroyed = false;
    this._finished = false;
    this._started = false;
    this._onStartFns = this._originalOnStartFns;
    this._onDoneFns = this._originalOnDoneFns;
  }
  _resetDomPlayerState() {
    if (this.domPlayer) {
      this.domPlayer.cancel();
    }
  }
  restart() {
    this.reset();
    this.play();
  }
  hasStarted() {
    return this._started;
  }
  destroy() {
    if (!this._destroyed) {
      this._destroyed = true;
      this._resetDomPlayerState();
      this._onFinish();
      if (this._specialStyles) {
        this._specialStyles.destroy();
      }
      this._onDestroyFns.forEach((fn) => fn());
      this._onDestroyFns = [];
    }
  }
  setPosition(p) {
    if (this.domPlayer === void 0) {
      this.init();
    }
    this.domPlayer.currentTime = p * this.time;
  }
  getPosition() {
    return +(this.domPlayer.currentTime ?? 0) / this.time;
  }
  get totalTime() {
    return this._delay + this._duration;
  }
  beforeDestroy() {
    const styles = /* @__PURE__ */ new Map();
    if (this.hasStarted()) {
      const finalKeyframe = this._finalKeyframe;
      finalKeyframe.forEach((val, prop) => {
        if (prop !== "offset") {
          styles.set(prop, this._finished ? val : computeStyle(this.element, prop));
        }
      });
    }
    this.currentSnapshot = styles;
  }
  /** @internal */
  triggerCallback(phaseName) {
    const methods = phaseName === "start" ? this._onStartFns : this._onDoneFns;
    methods.forEach((fn) => fn());
    methods.length = 0;
  }
};
var WebAnimationsDriver = class {
  validateStyleProperty(prop) {
    if (typeof ngDevMode === "undefined" || ngDevMode) {
      return validateStyleProperty(prop);
    }
    return true;
  }
  validateAnimatableStyleProperty(prop) {
    if (typeof ngDevMode === "undefined" || ngDevMode) {
      const cssProp = camelCaseToDashCase(prop);
      return validateWebAnimatableStyleProperty(cssProp);
    }
    return true;
  }
  matchesElement(_element, _selector) {
    return false;
  }
  containsElement(elm1, elm2) {
    return containsElement(elm1, elm2);
  }
  getParentElement(element) {
    return getParentElement(element);
  }
  query(element, selector, multi) {
    return invokeQuery(element, selector, multi);
  }
  computeStyle(element, prop, defaultValue) {
    return computeStyle(element, prop);
  }
  animate(element, keyframes, duration, delay, easing, previousPlayers = []) {
    const fill = delay == 0 ? "both" : "forwards";
    const playerOptions = {
      duration,
      delay,
      fill
    };
    if (easing) {
      playerOptions["easing"] = easing;
    }
    const previousStyles = /* @__PURE__ */ new Map();
    const previousWebAnimationPlayers = previousPlayers.filter((player) => player instanceof WebAnimationsPlayer);
    if (allowPreviousPlayerStylesMerge(duration, delay)) {
      previousWebAnimationPlayers.forEach((player) => {
        player.currentSnapshot.forEach((val, prop) => previousStyles.set(prop, val));
      });
    }
    let _keyframes = normalizeKeyframes(keyframes).map((styles) => new Map(styles));
    _keyframes = balancePreviousStylesIntoKeyframes(element, _keyframes, previousStyles);
    const specialStyles = packageNonAnimatableStyles(element, _keyframes);
    return new WebAnimationsPlayer(element, _keyframes, playerOptions, specialStyles);
  }
};
var ANIMATION_PREFIX = "@";
var DISABLE_ANIMATIONS_FLAG = "@.disabled";
var BaseAnimationRenderer = class {
  constructor(namespaceId, delegate, engine, _onDestroy) {
    this.namespaceId = namespaceId;
    this.delegate = delegate;
    this.engine = engine;
    this._onDestroy = _onDestroy;
    this.\u0275type = 0;
  }
  get data() {
    return this.delegate.data;
  }
  destroyNode(node) {
    this.delegate.destroyNode?.(node);
  }
  destroy() {
    this.engine.destroy(this.namespaceId, this.delegate);
    this.engine.afterFlushAnimationsDone(() => {
      queueMicrotask(() => {
        this.delegate.destroy();
      });
    });
    this._onDestroy?.();
  }
  createElement(name, namespace) {
    return this.delegate.createElement(name, namespace);
  }
  createComment(value) {
    return this.delegate.createComment(value);
  }
  createText(value) {
    return this.delegate.createText(value);
  }
  appendChild(parent, newChild) {
    this.delegate.appendChild(parent, newChild);
    this.engine.onInsert(this.namespaceId, newChild, parent, false);
  }
  insertBefore(parent, newChild, refChild, isMove = true) {
    this.delegate.insertBefore(parent, newChild, refChild);
    this.engine.onInsert(this.namespaceId, newChild, parent, isMove);
  }
  removeChild(parent, oldChild, isHostElement) {
    this.engine.onRemove(this.namespaceId, oldChild, this.delegate);
  }
  selectRootElement(selectorOrNode, preserveContent) {
    return this.delegate.selectRootElement(selectorOrNode, preserveContent);
  }
  parentNode(node) {
    return this.delegate.parentNode(node);
  }
  nextSibling(node) {
    return this.delegate.nextSibling(node);
  }
  setAttribute(el, name, value, namespace) {
    this.delegate.setAttribute(el, name, value, namespace);
  }
  removeAttribute(el, name, namespace) {
    this.delegate.removeAttribute(el, name, namespace);
  }
  addClass(el, name) {
    this.delegate.addClass(el, name);
  }
  removeClass(el, name) {
    this.delegate.removeClass(el, name);
  }
  setStyle(el, style2, value, flags) {
    this.delegate.setStyle(el, style2, value, flags);
  }
  removeStyle(el, style2, flags) {
    this.delegate.removeStyle(el, style2, flags);
  }
  setProperty(el, name, value) {
    if (name.charAt(0) == ANIMATION_PREFIX && name == DISABLE_ANIMATIONS_FLAG) {
      this.disableAnimations(el, !!value);
    } else {
      this.delegate.setProperty(el, name, value);
    }
  }
  setValue(node, value) {
    this.delegate.setValue(node, value);
  }
  listen(target, eventName, callback) {
    return this.delegate.listen(target, eventName, callback);
  }
  disableAnimations(element, value) {
    this.engine.disableAnimations(element, value);
  }
};
var AnimationRenderer = class extends BaseAnimationRenderer {
  constructor(factory, namespaceId, delegate, engine, onDestroy) {
    super(namespaceId, delegate, engine, onDestroy);
    this.factory = factory;
    this.namespaceId = namespaceId;
  }
  setProperty(el, name, value) {
    if (name.charAt(0) == ANIMATION_PREFIX) {
      if (name.charAt(1) == "." && name == DISABLE_ANIMATIONS_FLAG) {
        value = value === void 0 ? true : !!value;
        this.disableAnimations(el, value);
      } else {
        this.engine.process(this.namespaceId, el, name.slice(1), value);
      }
    } else {
      this.delegate.setProperty(el, name, value);
    }
  }
  listen(target, eventName, callback) {
    if (eventName.charAt(0) == ANIMATION_PREFIX) {
      const element = resolveElementFromTarget(target);
      let name = eventName.slice(1);
      let phase = "";
      if (name.charAt(0) != ANIMATION_PREFIX) {
        [name, phase] = parseTriggerCallbackName(name);
      }
      return this.engine.listen(this.namespaceId, element, name, phase, (event) => {
        const countId = event["_data"] || -1;
        this.factory.scheduleListenerCallback(countId, callback, event);
      });
    }
    return this.delegate.listen(target, eventName, callback);
  }
};
function resolveElementFromTarget(target) {
  switch (target) {
    case "body":
      return document.body;
    case "document":
      return document;
    case "window":
      return window;
    default:
      return target;
  }
}
function parseTriggerCallbackName(triggerName) {
  const dotIndex = triggerName.indexOf(".");
  const trigger = triggerName.substring(0, dotIndex);
  const phase = triggerName.slice(dotIndex + 1);
  return [trigger, phase];
}
var AnimationRendererFactory = class {
  constructor(delegate, engine, _zone) {
    this.delegate = delegate;
    this.engine = engine;
    this._zone = _zone;
    this._currentId = 0;
    this._microtaskId = 1;
    this._animationCallbacksBuffer = [];
    this._rendererCache = /* @__PURE__ */ new Map();
    this._cdRecurDepth = 0;
    engine.onRemovalComplete = (element, delegate2) => {
      const parentNode = delegate2?.parentNode(element);
      if (parentNode) {
        delegate2.removeChild(parentNode, element);
      }
    };
  }
  createRenderer(hostElement, type) {
    const EMPTY_NAMESPACE_ID = "";
    const delegate = this.delegate.createRenderer(hostElement, type);
    if (!hostElement || !type?.data?.["animation"]) {
      const cache = this._rendererCache;
      let renderer = cache.get(delegate);
      if (!renderer) {
        const onRendererDestroy = () => cache.delete(delegate);
        renderer = new BaseAnimationRenderer(EMPTY_NAMESPACE_ID, delegate, this.engine, onRendererDestroy);
        cache.set(delegate, renderer);
      }
      return renderer;
    }
    const componentId = type.id;
    const namespaceId = type.id + "-" + this._currentId;
    this._currentId++;
    this.engine.register(namespaceId, hostElement);
    const registerTrigger = (trigger) => {
      if (Array.isArray(trigger)) {
        trigger.forEach(registerTrigger);
      } else {
        this.engine.registerTrigger(componentId, namespaceId, hostElement, trigger.name, trigger);
      }
    };
    const animationTriggers = type.data["animation"];
    animationTriggers.forEach(registerTrigger);
    return new AnimationRenderer(this, namespaceId, delegate, this.engine);
  }
  begin() {
    this._cdRecurDepth++;
    if (this.delegate.begin) {
      this.delegate.begin();
    }
  }
  _scheduleCountTask() {
    queueMicrotask(() => {
      this._microtaskId++;
    });
  }
  /** @internal */
  scheduleListenerCallback(count, fn, data) {
    if (count >= 0 && count < this._microtaskId) {
      this._zone.run(() => fn(data));
      return;
    }
    const animationCallbacksBuffer = this._animationCallbacksBuffer;
    if (animationCallbacksBuffer.length == 0) {
      queueMicrotask(() => {
        this._zone.run(() => {
          animationCallbacksBuffer.forEach((tuple) => {
            const [fn2, data2] = tuple;
            fn2(data2);
          });
          this._animationCallbacksBuffer = [];
        });
      });
    }
    animationCallbacksBuffer.push([fn, data]);
  }
  end() {
    this._cdRecurDepth--;
    if (this._cdRecurDepth == 0) {
      this._zone.runOutsideAngular(() => {
        this._scheduleCountTask();
        this.engine.flush(this._microtaskId);
      });
    }
    if (this.delegate.end) {
      this.delegate.end();
    }
  }
  whenRenderingDone() {
    return this.engine.whenRenderingDone();
  }
};

// node_modules/@angular/platform-browser/fesm2022/animations.mjs
var InjectableAnimationEngine = class _InjectableAnimationEngine extends AnimationEngine {
  // The `ApplicationRef` is injected here explicitly to force the dependency ordering.
  // Since the `ApplicationRef` should be created earlier before the `AnimationEngine`, they
  // both have `ngOnDestroy` hooks and `flush()` must be called after all views are destroyed.
  constructor(doc, driver, normalizer) {
    super(doc, driver, normalizer, inject(ChangeDetectionScheduler, {
      optional: true
    }));
  }
  ngOnDestroy() {
    this.flush();
  }
  static {
    this.\u0275fac = function InjectableAnimationEngine_Factory(t) {
      return new (t || _InjectableAnimationEngine)(\u0275\u0275inject(DOCUMENT), \u0275\u0275inject(AnimationDriver), \u0275\u0275inject(AnimationStyleNormalizer));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
      token: _InjectableAnimationEngine,
      factory: _InjectableAnimationEngine.\u0275fac
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InjectableAnimationEngine, [{
    type: Injectable
  }], () => [{
    type: Document,
    decorators: [{
      type: Inject,
      args: [DOCUMENT]
    }]
  }, {
    type: AnimationDriver
  }, {
    type: AnimationStyleNormalizer
  }], null);
})();
function instantiateDefaultStyleNormalizer() {
  return new WebAnimationsStyleNormalizer();
}
function instantiateRendererFactory(renderer, engine, zone) {
  return new AnimationRendererFactory(renderer, engine, zone);
}
var SHARED_ANIMATION_PROVIDERS = [{
  provide: AnimationStyleNormalizer,
  useFactory: instantiateDefaultStyleNormalizer
}, {
  provide: AnimationEngine,
  useClass: InjectableAnimationEngine
}, {
  provide: RendererFactory2,
  useFactory: instantiateRendererFactory,
  deps: [DomRendererFactory2, AnimationEngine, NgZone]
}];
var BROWSER_ANIMATIONS_PROVIDERS = [{
  provide: AnimationDriver,
  useFactory: () => new WebAnimationsDriver()
}, {
  provide: ANIMATION_MODULE_TYPE,
  useValue: "BrowserAnimations"
}, ...SHARED_ANIMATION_PROVIDERS];
var BROWSER_NOOP_ANIMATIONS_PROVIDERS = [{
  provide: AnimationDriver,
  useClass: NoopAnimationDriver
}, {
  provide: ANIMATION_MODULE_TYPE,
  useValue: "NoopAnimations"
}, ...SHARED_ANIMATION_PROVIDERS];
var BrowserAnimationsModule = class _BrowserAnimationsModule {
  /**
   * Configures the module based on the specified object.
   *
   * @param config Object used to configure the behavior of the `BrowserAnimationsModule`.
   * @see {@link BrowserAnimationsModuleConfig}
   *
   * @usageNotes
   * When registering the `BrowserAnimationsModule`, you can use the `withConfig`
   * function as follows:
   * ```
   * @NgModule({
   *   imports: [BrowserAnimationsModule.withConfig(config)]
   * })
   * class MyNgModule {}
   * ```
   */
  static withConfig(config2) {
    return {
      ngModule: _BrowserAnimationsModule,
      providers: config2.disableAnimations ? BROWSER_NOOP_ANIMATIONS_PROVIDERS : BROWSER_ANIMATIONS_PROVIDERS
    };
  }
  static {
    this.\u0275fac = function BrowserAnimationsModule_Factory(t) {
      return new (t || _BrowserAnimationsModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
      type: _BrowserAnimationsModule
    });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
      providers: BROWSER_ANIMATIONS_PROVIDERS,
      imports: [BrowserModule]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BrowserAnimationsModule, [{
    type: NgModule,
    args: [{
      exports: [BrowserModule],
      providers: BROWSER_ANIMATIONS_PROVIDERS
    }]
  }], null, null);
})();
function provideAnimations() {
  performanceMarkFeature("NgEagerAnimations");
  return [...BROWSER_ANIMATIONS_PROVIDERS];
}
var NoopAnimationsModule = class _NoopAnimationsModule {
  static {
    this.\u0275fac = function NoopAnimationsModule_Factory(t) {
      return new (t || _NoopAnimationsModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
      type: _NoopAnimationsModule
    });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
      providers: BROWSER_NOOP_ANIMATIONS_PROVIDERS,
      imports: [BrowserModule]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NoopAnimationsModule, [{
    type: NgModule,
    args: [{
      exports: [BrowserModule],
      providers: BROWSER_NOOP_ANIMATIONS_PROVIDERS
    }]
  }], null, null);
})();

// src/app/interceptors/auth.interceptor.ts
var AuthInterceptor = class _AuthInterceptor {
  constructor(authService, router) {
    this.authService = authService;
    this.router = router;
  }
  intercept(request, next) {
    const token = localStorage.getItem("token");
    if (request.url.includes("/account/signin") || request.url.includes("/account/google")) {
      return next.handle(request);
    }
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    } else {
      if (!this.isPublicRoute(request.url)) {
        this.router.navigate(["/login"]);
        return EMPTY;
      }
    }
    return next.handle(request).pipe(catchError((error) => {
      if (error.status === 401) {
        this.authService.logout();
        this.router.navigate(["/login"]);
      }
      return throwError(() => error);
    }));
  }
  isPublicRoute(url) {
    const publicRoutes = [
      "/login",
      "/register",
      "/products",
      // Route publique pour voir les produits
      "/home"
    ];
    return publicRoutes.some((route) => url.includes(route));
  }
  static {
    this.\u0275fac = function AuthInterceptor_Factory(t) {
      return new (t || _AuthInterceptor)(\u0275\u0275inject(AuthService), \u0275\u0275inject(Router));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AuthInterceptor, factory: _AuthInterceptor.\u0275fac });
  }
};

// src/main.ts
var config = {
  url: "http://localhost:2024",
  // URL du backend
  options: {
    transports: ["websocket"],
    path: "/socket.io"
  }
};
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    importProvidersFrom(SocketIoModule.forRoot(config))
  ]
}).catch((err) => console.error(err));
/*! Bundled license information:

@angular/animations/fesm2022/animations.mjs:
  (**
   * @license Angular v17.3.12
   * (c) 2010-2024 Google LLC. https://angular.io/
   * License: MIT
   *)

@angular/animations/fesm2022/browser.mjs:
  (**
   * @license Angular v17.3.12
   * (c) 2010-2024 Google LLC. https://angular.io/
   * License: MIT
   *)

@angular/platform-browser/fesm2022/animations.mjs:
  (**
   * @license Angular v17.3.12
   * (c) 2010-2024 Google LLC. https://angular.io/
   * License: MIT
   *)
*/
//# sourceMappingURL=main.js.map
