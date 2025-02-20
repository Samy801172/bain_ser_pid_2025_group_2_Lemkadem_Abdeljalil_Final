import {
  AuthService,
  CartService,
  CommonModule,
  CurrencyPipe,
  EventEmitter,
  HttpClient,
  HttpHeaders,
  NgZone,
  NotificationService,
  OrderService,
  Router,
  __async,
  catchError,
  environment,
  tap,
  throwError,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵinject,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-3KO5M7KA.js";

// src/app/feature/Dashboard/guard/auth.guard.ts
var AuthGuard = class _AuthGuard {
  constructor(authService, router, notificationService) {
    this.authService = authService;
    this.router = router;
    this.notificationService = notificationService;
  }
  isAuthenticated() {
    const token = localStorage.getItem("token");
    return !!token;
  }
  canActivate(route, state) {
    if (this.authService.isAuthenticated()) {
      return true;
    }
    this.notificationService.error("Veuillez vous connecter pour acc\xE9der \xE0 cette page");
    this.router.navigate(["/login"], {
      queryParams: { returnUrl: state.url }
    });
    return false;
  }
  static {
    this.\u0275fac = function AuthGuard_Factory(t) {
      return new (t || _AuthGuard)(\u0275\u0275inject(AuthService), \u0275\u0275inject(Router), \u0275\u0275inject(NotificationService));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AuthGuard, factory: _AuthGuard.\u0275fac, providedIn: "root" });
  }
};

// src/app/services/payment/payment.service.ts
var PaymentService = class _PaymentService {
  constructor(http, notificationService, orderService) {
    this.http = http;
    this.notificationService = notificationService;
    this.orderService = orderService;
    this.apiUrl = environment.apiUrl;
  }
  // Méthode pour créer un ordre de paiement PayPal
  createPayPalOrder(amount, isDeposit = false, manufacturingId) {
    const clientId = localStorage.getItem("clientId");
    if (!clientId) {
      return throwError(() => new Error("Non autoris\xE9"));
    }
    const payload = {
      amount: Number(amount.toFixed(2)),
      // Formate le montant en nombre à 2 décimales
      clientId: Number(clientId),
      // Convertit clientId en nombre
      manufacturingId,
      // Optionnel: ID de fabrication
      currency: "EUR",
      // Monnaie EUR
      isManufacturing: !!manufacturingId
      // Indique si le paiement est pour un produit de fabrication
    };
    return this.http.post(
      `${this.apiUrl}/payments/paypal/create`,
      // URL de l'API pour créer la commande PayPal
      payload,
      // Données envoyées dans la requête
      { headers: this.getHeaders() }
      // En-têtes HTTP contenant le token d'authentification
    ).pipe(
      tap((response) => console.log("Ordre PayPal cr\xE9\xE9:", response)),
      // Logge la réponse à la requête
      catchError((error) => {
        console.error("Erreur cr\xE9ation commande PayPal:", error);
        return throwError(() => error);
      })
    );
  }
  // Méthode pour capturer un ordre PayPal
  capturePayPalOrder(paypalOrderId, manufacturingId) {
    const clientId = localStorage.getItem("clientId");
    if (!clientId) {
      return throwError(() => new Error("Non autoris\xE9"));
    }
    const payload = {
      paypalOrderId,
      // ID de la commande PayPal
      clientId: Number(clientId),
      // ID client
      manufacturingId,
      // ID de fabrication
      status: "COMPLETED",
      // Statut de la commande
      isManufacturing: !!manufacturingId
      // Indique si c'est un paiement de fabrication
    };
    return this.http.post(
      `${this.apiUrl}/payments/paypal/capture/${paypalOrderId}`,
      // URL de l'API pour capturer la commande PayPal
      payload,
      // Données envoyées dans la requête
      { headers: this.getHeaders() }
      // En-têtes HTTP avec le token d'authentification
    ).pipe(
      tap((response) => console.log("Capture PayPal r\xE9ussie:", response)),
      // Logge la réponse de la capture
      catchError((error) => {
        console.error("Erreur capture PayPal:", error);
        this.notificationService.error("Erreur lors de la capture du paiement");
        return throwError(() => error);
      })
    );
  }
  // Méthode privée pour obtenir les en-têtes HTTP (notamment pour l'authentification)
  getHeaders() {
    const token = localStorage.getItem("token");
    return new HttpHeaders({
      "Authorization": `Bearer ${token}`,
      // Ajoute le token dans l'en-tête Authorization
      "Content-Type": "application/json"
      // Définit le type de contenu en JSON
    });
  }
  static {
    this.\u0275fac = function PaymentService_Factory(t) {
      return new (t || _PaymentService)(\u0275\u0275inject(HttpClient), \u0275\u0275inject(NotificationService), \u0275\u0275inject(OrderService));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
      token: _PaymentService,
      factory: _PaymentService.\u0275fac,
      providedIn: "root"
      // Déclare ce service comme étant disponible globalement dans toute l'application
    });
  }
};

// src/app/components/PayPal/paypal-button.component.ts
var PaypalButtonComponent = class _PaypalButtonComponent {
  constructor(paymentService, cartService, router, notificationService, ngZone) {
    this.paymentService = paymentService;
    this.cartService = cartService;
    this.router = router;
    this.notificationService = notificationService;
    this.ngZone = ngZone;
    this.isDeposit = false;
    this.paymentSuccess = new EventEmitter();
    this.cartItems = [];
    this.loadCartItems();
  }
  ngOnInit() {
    if (!this.amount) {
      console.error("Amount is required");
      return;
    }
    this.initPayPalButton();
  }
  // Récupère les articles du panier depuis le service CartService
  loadCartItems() {
    this.cartService.getCartItems().subscribe((items) => {
      this.cartItems = items;
    });
  }
  // Initialise le bouton PayPal et configure ses fonctionnalités
  initPayPalButton() {
    if (!window.paypal) {
      console.error("PayPal script not loaded");
      return;
    }
    window.paypal.Buttons({
      // Création de la commande PayPal
      createOrder: (data, actions) => __async(this, null, function* () {
        try {
          console.log("Creating PayPal order with:", {
            amount: this.amount,
            isDeposit: this.isDeposit,
            manufacturingRequestId: this.manufacturingRequestId
          });
          const response = yield this.paymentService.createPayPalOrder(this.amount, this.isDeposit, this.manufacturingRequestId).toPromise();
          console.log("PayPal order created:", response);
          return response.paypalOrderId;
        } catch (error) {
          console.error("Erreur cr\xE9ation commande:", error);
          this.notificationService.error("Erreur lors de la cr\xE9ation de la commande");
          throw error;
        }
      }),
      // Validation du paiement après approbation
      onApprove: (data) => __async(this, null, function* () {
        try {
          console.log("Capturing PayPal order:", {
            orderId: data.orderID,
            manufacturingId: this.manufacturingRequestId
          });
          const result = yield this.paymentService.capturePayPalOrder(data.orderID, this.manufacturingRequestId || 0).toPromise();
          console.log("PayPal capture result:", result);
          this.ngZone.run(() => {
            this.notificationService.success("Paiement effectu\xE9 avec succ\xE8s");
            if (this.isDeposit && this.manufacturingRequestId) {
              this.router.navigate(["/manufacturing/confirmation", this.manufacturingRequestId]);
            } else {
              this.router.navigate(["/payment-success"]);
            }
            this.paymentSuccess.emit(result);
          });
        } catch (error) {
          console.error("Erreur capture PayPal:", error);
          this.notificationService.error("Erreur lors de la finalisation du paiement");
        }
      }),
      // Gestion des erreurs de paiement
      onError: (err) => {
        console.error("PayPal Error:", err);
        this.ngZone.run(() => {
          this.notificationService.error("Erreur lors du paiement");
        });
      }
    }).render("#paypal-button");
  }
  static {
    this.\u0275fac = function PaypalButtonComponent_Factory(t) {
      return new (t || _PaypalButtonComponent)(\u0275\u0275directiveInject(PaymentService), \u0275\u0275directiveInject(CartService), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(NotificationService), \u0275\u0275directiveInject(NgZone));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PaypalButtonComponent, selectors: [["app-paypal-button"]], inputs: { amount: "amount", isDeposit: "isDeposit", manufacturingRequestId: "manufacturingRequestId" }, outputs: { paymentSuccess: "paymentSuccess" }, standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 2, vars: 0, consts: [[1, "paypal-button-container"], ["id", "paypal-button"]], template: function PaypalButtonComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0);
        \u0275\u0275element(1, "div", 1);
        \u0275\u0275elementEnd();
      }
    }, dependencies: [CommonModule], styles: ["\n\n.paypal-button-container[_ngcontent-%COMP%] {\n  margin: 20px 0;\n  text-align: center;\n}\n/*# sourceMappingURL=paypal-button.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PaypalButtonComponent, { className: "PaypalButtonComponent", filePath: "src\\app\\components\\PayPal\\paypal-button.component.ts", lineNumber: 34 });
})();

// src/app/components/checkout/checkout.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function CheckoutComponent_For_10_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 11);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 12);
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "currency");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r1 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(2, 2, item_r1.product.price, "EUR"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(5, 5, ctx_r1.calculateDiscountedPrice(item_r1), "EUR"));
  }
}
function CheckoutComponent_For_10_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "currency");
  }
  if (rf & 2) {
    const item_r1 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(1, 1, item_r1.product.price, "EUR"), " ");
  }
}
function CheckoutComponent_For_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275template(4, CheckoutComponent_For_10_Conditional_4_Template, 6, 8)(5, CheckoutComponent_For_10_Conditional_5_Template, 2, 4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r1 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", item_r1.product.name, " x", item_r1.quantity, "");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(4, ctx_r1.hasActivePromotion(item_r1) ? 4 : 5);
  }
}
var CheckoutComponent = class _CheckoutComponent {
  constructor(cartService, router, notificationService) {
    this.cartService = cartService;
    this.router = router;
    this.notificationService = notificationService;
    this.cartItems = [];
    this.total = 0;
    this.amount = 0;
    this.isProcessing = false;
  }
  ngOnInit() {
    this.loadCart();
  }
  loadCart() {
    this.cartService.getCartItems().subscribe({
      next: (items) => {
        this.cartItems = items;
        this.total = this.calculateTotal(items);
        this.amount = this.total;
      },
      error: (error) => {
        console.error("Erreur chargement panier:", error);
        this.notificationService.error("Erreur lors du chargement du panier");
      }
    });
  }
  calculateTotal(items) {
    return items.reduce((sum, item) => sum + (this.hasActivePromotion(item) ? this.calculateDiscountedPrice(item) : Number(item.product.price)) * item.quantity, 0);
  }
  hasActivePromotion(item) {
    if (!item.product.activePromotion) {
      return false;
    }
    const endDate = item.product.activePromotion.endDate;
    if (!endDate) {
      return false;
    }
    return new Date(endDate) > /* @__PURE__ */ new Date();
  }
  calculateDiscountedPrice(item) {
    const activePromotion = item.product.activePromotion;
    if (!activePromotion || !this.hasActivePromotion(item)) {
      return Number(item.product.price);
    }
    const discountPercentage = activePromotion.discountPercentage ?? 0;
    const discount = discountPercentage / 100;
    return Number(item.product.price) * (1 - discount);
  }
  returnToCart() {
    this.router.navigate(["/client/cart"]);
  }
  handlePaymentSuccess(event) {
    console.log("Paiement r\xE9ussi:", event);
    this.notificationService.success("Paiement effectu\xE9 avec succ\xE8s");
  }
  payWithBancontact() {
    this.isProcessing = true;
    this.notificationService.info("Paiement Bancontact bient\xF4t disponible");
  }
  payWithCard() {
    this.isProcessing = true;
    this.notificationService.info("Paiement par carte bient\xF4t disponible");
  }
  static {
    this.\u0275fac = function CheckoutComponent_Factory(t) {
      return new (t || _CheckoutComponent)(\u0275\u0275directiveInject(CartService), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(NotificationService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CheckoutComponent, selectors: [["app-checkout"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 25, vars: 9, consts: [[1, "payment-container"], [1, "title"], [1, "amount"], [1, "cart-summary"], [1, "cart-item-summary"], [1, "total-line"], [1, "payment-methods"], [3, "onPaymentSuccess", "amount"], [1, "btn", "bancontact", 3, "click"], [1, "btn", "card", 3, "click"], ["routerLink", "/client/cart", 1, "btn", "secondary"], [1, "original-price"], [1, "discount-price"]], template: function CheckoutComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "h3", 1);
        \u0275\u0275text(2, "Paiement s\xE9curis\xE9");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(3, "div", 2);
        \u0275\u0275text(4);
        \u0275\u0275pipe(5, "currency");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(6, "div", 3)(7, "h4");
        \u0275\u0275text(8, "R\xE9sum\xE9 de la commande");
        \u0275\u0275elementEnd();
        \u0275\u0275repeaterCreate(9, CheckoutComponent_For_10_Template, 6, 3, "div", 4, _forTrack0);
        \u0275\u0275elementStart(11, "div", 5)(12, "strong");
        \u0275\u0275text(13, "Total:");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(14, "span");
        \u0275\u0275text(15);
        \u0275\u0275pipe(16, "currency");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(17, "div", 6)(18, "app-paypal-button", 7);
        \u0275\u0275listener("onPaymentSuccess", function CheckoutComponent_Template_app_paypal_button_onPaymentSuccess_18_listener($event) {
          return ctx.handlePaymentSuccess($event);
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(19, "button", 8);
        \u0275\u0275listener("click", function CheckoutComponent_Template_button_click_19_listener() {
          return ctx.payWithBancontact();
        });
        \u0275\u0275text(20, " Payer avec Bancontact ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(21, "button", 9);
        \u0275\u0275listener("click", function CheckoutComponent_Template_button_click_21_listener() {
          return ctx.payWithCard();
        });
        \u0275\u0275text(22, " Payer par Carte ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(23, "button", 10);
        \u0275\u0275text(24, " Retour au panier ");
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(4);
        \u0275\u0275textInterpolate1("Total \xE0 payer: ", \u0275\u0275pipeBind2(5, 3, ctx.amount, "EUR"), "");
        \u0275\u0275advance(5);
        \u0275\u0275repeater(ctx.cartItems);
        \u0275\u0275advance(6);
        \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(16, 6, ctx.amount, "EUR"));
        \u0275\u0275advance(3);
        \u0275\u0275property("amount", ctx.amount);
      }
    }, dependencies: [CommonModule, CurrencyPipe, PaypalButtonComponent], styles: ['\n\n.payment-container[_ngcontent-%COMP%] {\n  max-width: 500px;\n  margin: 0 auto;\n  padding: 20px;\n}\n.cart-summary[_ngcontent-%COMP%] {\n  margin: 20px 0;\n  padding: 15px;\n  border: 1px solid #e5e7eb;\n  border-radius: 8px;\n}\n.cart-item-summary[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  margin: 10px 0;\n  padding: 5px 0;\n  border-bottom: 1px solid #f3f4f6;\n}\n.original-price[_ngcontent-%COMP%] {\n  text-decoration: line-through;\n  color: #6b7280;\n  margin-right: 8px;\n}\n.discount-price[_ngcontent-%COMP%] {\n  color: #dc2626;\n  font-weight: bold;\n}\n.btn-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n  margin-top: 20px;\n}\n.btn[_ngcontent-%COMP%] {\n  padding: 1rem;\n  border: none;\n  border-radius: 8px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.primary[_ngcontent-%COMP%] {\n  background: #4f46e5;\n  color: white;\n}\n.secondary[_ngcontent-%COMP%] {\n  background: #6b7280;\n  color: white;\n}\n.payment-methods[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n  margin-top: 2rem;\n}\n.btn[_ngcontent-%COMP%] {\n  padding: 1rem;\n  border: none;\n  border-radius: 8px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.btn.bancontact[_ngcontent-%COMP%] {\n  background: #005498;\n  color: white;\n}\n.btn.bancontact[_ngcontent-%COMP%]:hover {\n  background: #004379;\n}\n.btn.card[_ngcontent-%COMP%] {\n  background: #4f46e5;\n  color: white;\n}\n.btn.card[_ngcontent-%COMP%]:hover {\n  background: #4338ca;\n}\n.btn.secondary[_ngcontent-%COMP%] {\n  background: #6b7280;\n  color: white;\n}\n.btn.secondary[_ngcontent-%COMP%]:hover {\n  background: #4b5563;\n}\n.total-line[_ngcontent-%COMP%] {\n  margin-top: 1rem;\n  padding-top: 1rem;\n  border-top: 2px solid #e5e7eb;\n  display: flex;\n  justify-content: space-between;\n  font-size: 1.2rem;\n}\n.payment-section[_ngcontent-%COMP%] {\n  max-width: 800px;\n  margin: 0 auto;\n  padding: 2rem;\n}\n.payment-section[_ngcontent-%COMP%]   .order-summary[_ngcontent-%COMP%] {\n  margin-bottom: 2rem;\n}\n.payment-section[_ngcontent-%COMP%]   .payment-buttons[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n  margin-top: 2rem;\n}\n.payment-section[_ngcontent-%COMP%]   .payment-buttons[_ngcontent-%COMP%]   .payment-button[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 1rem;\n  border-radius: 8px;\n  border: none;\n  cursor: pointer;\n  transition: all 0.3s ease;\n  font-size: 1rem;\n  font-weight: 500;\n  width: 100%;\n  gap: 0.5rem;\n}\n.payment-section[_ngcontent-%COMP%]   .payment-buttons[_ngcontent-%COMP%]   .payment-button[_ngcontent-%COMP%]:disabled {\n  opacity: 0.7;\n  cursor: not-allowed;\n}\n.payment-section[_ngcontent-%COMP%]   .payment-buttons[_ngcontent-%COMP%]   .payment-button[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  height: 24px;\n  width: auto;\n}\n.payment-section[_ngcontent-%COMP%]   .payment-buttons[_ngcontent-%COMP%]   .payment-button[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 1.2rem;\n}\n.payment-section[_ngcontent-%COMP%]   .payment-buttons[_ngcontent-%COMP%]   .payment-button.paypal[_ngcontent-%COMP%] {\n  background: transparent;\n}\n.payment-section[_ngcontent-%COMP%]   .payment-buttons[_ngcontent-%COMP%]   .payment-button.bancontact[_ngcontent-%COMP%] {\n  background-color: #005ab9;\n  color: white;\n}\n.payment-section[_ngcontent-%COMP%]   .payment-buttons[_ngcontent-%COMP%]   .payment-button.bancontact[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background-color: #004a96;\n}\n.payment-section[_ngcontent-%COMP%]   .payment-buttons[_ngcontent-%COMP%]   .payment-button.card[_ngcontent-%COMP%] {\n  background-color: #2c3e50;\n  color: white;\n}\n.payment-section[_ngcontent-%COMP%]   .payment-buttons[_ngcontent-%COMP%]   .payment-button.card[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background-color: #34495e;\n}\n.payment-section[_ngcontent-%COMP%]   .payment-buttons[_ngcontent-%COMP%]   .payment-button.return[_ngcontent-%COMP%] {\n  background-color: #95a5a6;\n  color: white;\n  margin-top: 1rem;\n}\n.payment-section[_ngcontent-%COMP%]   .payment-buttons[_ngcontent-%COMP%]   .payment-button.return[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background-color: #7f8c8d;\n}\n.separator[_ngcontent-%COMP%] {\n  text-align: center;\n  margin: 1rem 0;\n  position: relative;\n}\n.separator[_ngcontent-%COMP%]::before, .separator[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  top: 50%;\n  width: 45%;\n  height: 1px;\n  background-color: #ddd;\n}\n.separator[_ngcontent-%COMP%]::before {\n  left: 0;\n}\n.separator[_ngcontent-%COMP%]::after {\n  right: 0;\n}\n/*# sourceMappingURL=checkout.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CheckoutComponent, { className: "CheckoutComponent", filePath: "src\\app\\components\\checkout\\checkout.component.ts", lineNumber: 16 });
})();

// src/app/components/Promotion/promotion-timer.component.ts
var PromotionTimerComponent = class _PromotionTimerComponent {
  constructor() {
    this.days = 362;
    this.hours = 4;
    this.minutes = 6;
  }
  static {
    this.\u0275fac = function PromotionTimerComponent_Factory(t) {
      return new (t || _PromotionTimerComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PromotionTimerComponent, selectors: [["app-promotion-timer"]], inputs: { endDate: "endDate" }, standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 23, vars: 3, consts: [[1, "timer-container"], [1, "discount-badge"], [1, "time-units"], [1, "time-unit"], [1, "number"], [1, "label"], [1, "separator"]], template: function PromotionTimerComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1);
        \u0275\u0275text(2, "-20%");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(3, "div", 2)(4, "div", 3)(5, "span", 4);
        \u0275\u0275text(6);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(7, "span", 5);
        \u0275\u0275text(8, "jours");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(9, "div", 6);
        \u0275\u0275text(10, "|");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(11, "div", 3)(12, "span", 4);
        \u0275\u0275text(13);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(14, "span", 5);
        \u0275\u0275text(15, "heures");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(16, "div", 6);
        \u0275\u0275text(17, "|");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(18, "div", 3)(19, "span", 4);
        \u0275\u0275text(20);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(21, "span", 5);
        \u0275\u0275text(22, "min");
        \u0275\u0275elementEnd()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(6);
        \u0275\u0275textInterpolate(ctx.days);
        \u0275\u0275advance(7);
        \u0275\u0275textInterpolate(ctx.hours);
        \u0275\u0275advance(7);
        \u0275\u0275textInterpolate(ctx.minutes);
      }
    }, dependencies: [CommonModule], styles: ['@charset "UTF-8";\n\n\n\n.timer-container[_ngcontent-%COMP%] {\n  display: inline-flex;\n  flex-direction: row;\n  align-items: center;\n  background: #ef4444;\n  color: white;\n  padding: 0.25rem 0.5rem;\n  border-radius: 4px;\n  position: relative;\n  gap: 0.5rem;\n  min-width: 250px;\n}\n.discount-badge[_ngcontent-%COMP%] {\n  background: #fbbf24;\n  color: black;\n  padding: 2px 6px;\n  border-radius: 4px;\n  font-weight: bold;\n  font-size: 0.875rem;\n}\n.time-units[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding-left: 0.5rem;\n}\n.time-unit[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: row;\n  align-items: baseline;\n  gap: 0.25rem;\n}\n.number[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  font-weight: bold;\n}\n.label[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: rgba(255, 255, 255, 0.9);\n}\n.separator[_ngcontent-%COMP%] {\n  color: rgba(255, 255, 255, 0.7);\n  font-weight: 200;\n  margin: 0 -0.25rem;\n}\n/*# sourceMappingURL=promotion-timer.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PromotionTimerComponent, { className: "PromotionTimerComponent", filePath: "src\\app\\components\\Promotion\\promotion-timer.component.ts", lineNumber: 87 });
})();

export {
  AuthGuard,
  PromotionTimerComponent,
  PaypalButtonComponent,
  CheckoutComponent
};
//# sourceMappingURL=chunk-DMRZXG32.js.map
