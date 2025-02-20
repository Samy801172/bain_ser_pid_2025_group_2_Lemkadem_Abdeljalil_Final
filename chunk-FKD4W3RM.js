import {
  ManufacturingService
} from "./chunk-QYWNT2UT.js";
import {
  PromotionService
} from "./chunk-YUHDZK45.js";
import {
  ActivatedRoute,
  AdminService,
  AuthService,
  CheckboxControlValueAccessor,
  CommonModule,
  CurrencyPipe,
  DatePipe,
  DefaultValueAccessor,
  EventEmitter,
  FormBuilder,
  FormControlName,
  FormGroup,
  FormGroupDirective,
  FormsModule,
  HttpClient,
  MaxLengthValidator,
  MinValidator,
  NgClass,
  NgControlStatus,
  NgControlStatusGroup,
  NgForOf,
  NgForm,
  NgIf,
  NgModel,
  NgSelectOption,
  NotificationService,
  NumberValueAccessor,
  OrderService,
  ProductService,
  ReactiveFormsModule,
  RequiredValidator,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterModule,
  RouterOutlet,
  SelectControlValueAccessor,
  Validators,
  __async,
  __spreadProps,
  __spreadValues,
  catchError,
  firstValueFrom,
  map,
  throwError,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinject,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
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

// src/app/feature/Dashboard/DashboardComponent/admin/orders/admin-orders.component.ts
function AdminOrdersComponent_option_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 15);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const status_r1 = ctx.$implicit;
    \u0275\u0275property("value", status_r1.id_statut);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", status_r1.label, " ");
  }
}
function AdminOrdersComponent_div_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16);
    \u0275\u0275text(1, "Chargement des commandes...");
    \u0275\u0275elementEnd();
  }
}
function AdminOrdersComponent_div_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.error);
  }
}
function AdminOrdersComponent_div_28_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 20);
    \u0275\u0275text(1, " Aucune commande trouv\xE9e. ");
    \u0275\u0275elementEnd();
  }
}
function AdminOrdersComponent_div_28_div_2_div_1_div_10_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 34)(1, "span", 35);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 36);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 37);
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "currency");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const detail_r4 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(detail_r4.product.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("x", detail_r4.quantity, "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(7, 3, detail_r4.unit_price, "EUR"));
  }
}
function AdminOrdersComponent_div_28_div_2_div_1_div_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 32);
    \u0275\u0275template(1, AdminOrdersComponent_div_28_div_2_div_1_div_10_div_1_Template, 8, 6, "div", 33);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const order_r5 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", order_r5.orderDetails)("ngForTrackBy", ctx_r1.trackByOrderDetailId);
  }
}
function AdminOrdersComponent_div_28_div_2_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 23)(1, "div", 24)(2, "h3");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 25)(5, "span", 26);
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(10, AdminOrdersComponent_div_28_div_2_div_1_div_10_Template, 2, 2, "div", 27);
    \u0275\u0275elementStart(11, "div", 28)(12, "div", 29)(13, "span", 30);
    \u0275\u0275text(14);
    \u0275\u0275pipe(15, "currency");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "button", 31);
    \u0275\u0275listener("click", function AdminOrdersComponent_div_28_div_2_div_1_Template_button_click_16_listener() {
      const order_r5 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.openOrderDetails(order_r5));
    });
    \u0275\u0275text(17, " Modifier ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const order_r5 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("Commande #", order_r5.id_order, "");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(7, 7, order_r5.date_order, "dd/MM/yyyy"));
    \u0275\u0275advance(2);
    \u0275\u0275classMap(ctx_r1.getStatusClass(order_r5.id_statut));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getStatusLabel(order_r5.id_statut), " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", order_r5.orderDetails && order_r5.orderDetails.length > 0);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("Total: ", \u0275\u0275pipeBind2(15, 10, order_r5.montant_total, "EUR"), "");
  }
}
function AdminOrdersComponent_div_28_div_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 21);
    \u0275\u0275template(1, AdminOrdersComponent_div_28_div_2_div_1_Template, 18, 13, "div", 22);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.filteredOrders)("ngForTrackBy", ctx_r1.trackByOrderId);
  }
}
function AdminOrdersComponent_div_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275template(1, AdminOrdersComponent_div_28_div_1_Template, 2, 0, "div", 18)(2, AdminOrdersComponent_div_28_div_2_Template, 2, 2, "div", 19);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.filteredOrders.length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.orders.length > 0);
  }
}
function AdminOrdersComponent_div_29_tr_44_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td")(4, "div", 62)(5, "button", 63);
    \u0275\u0275listener("click", function AdminOrdersComponent_div_29_tr_44_Template_button_click_5_listener() {
      const detail_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.updateQuantity(detail_r8, -1));
    });
    \u0275\u0275text(6, "-");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "input", 64);
    \u0275\u0275twoWayListener("ngModelChange", function AdminOrdersComponent_div_29_tr_44_Template_input_ngModelChange_7_listener($event) {
      const detail_r8 = \u0275\u0275restoreView(_r7).$implicit;
      \u0275\u0275twoWayBindingSet(detail_r8.quantity, $event) || (detail_r8.quantity = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("change", function AdminOrdersComponent_div_29_tr_44_Template_input_change_7_listener() {
      const detail_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.validateAndUpdateQuantity(detail_r8));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "button", 65);
    \u0275\u0275listener("click", function AdminOrdersComponent_div_29_tr_44_Template_button_click_8_listener() {
      const detail_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.updateQuantity(detail_r8, 1));
    });
    \u0275\u0275text(9, "+");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(10, "td");
    \u0275\u0275text(11);
    \u0275\u0275pipe(12, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "td");
    \u0275\u0275text(14);
    \u0275\u0275pipe(15, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "td")(17, "button", 66);
    \u0275\u0275listener("click", function AdminOrdersComponent_div_29_tr_44_Template_button_click_17_listener() {
      const detail_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.removeProduct(detail_r8));
    });
    \u0275\u0275text(18, " Supprimer ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const detail_r8 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(detail_r8.product.name);
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", detail_r8.quantity <= 1);
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", detail_r8.quantity);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(12, 5, detail_r8.unit_price, "EUR"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(15, 8, detail_r8.quantity * detail_r8.unit_price, "EUR"));
  }
}
function AdminOrdersComponent_div_29_option_59_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 56);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const status_r9 = ctx.$implicit;
    \u0275\u0275property("ngValue", status_r9.id_statut);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", status_r9.label, " ");
  }
}
function AdminOrdersComponent_div_29_div_62_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 67);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.statusError);
  }
}
function AdminOrdersComponent_div_29_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 38)(1, "div", 39)(2, "div", 40)(3, "div", 41)(4, "h3");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 42);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "button", 43);
    \u0275\u0275listener("click", function AdminOrdersComponent_div_29_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeModal());
    });
    \u0275\u0275text(9, "\xD7");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 44)(11, "div", 45)(12, "h4");
    \u0275\u0275text(13, "Informations client");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div", 46)(15, "div", 47)(16, "span", 4);
    \u0275\u0275text(17, "Client:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "span", 5);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "div", 47)(21, "span", 4);
    \u0275\u0275text(22, "Date:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "span", 5);
    \u0275\u0275text(24);
    \u0275\u0275pipe(25, "date");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(26, "div", 48)(27, "h4");
    \u0275\u0275text(28, "Produits command\xE9s");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "div", 49)(30, "table")(31, "thead")(32, "tr")(33, "th");
    \u0275\u0275text(34, "Produit");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "th");
    \u0275\u0275text(36, "Quantit\xE9");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "th");
    \u0275\u0275text(38, "Prix unitaire");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "th");
    \u0275\u0275text(40, "Total");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "th");
    \u0275\u0275text(42, "Actions");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(43, "tbody");
    \u0275\u0275template(44, AdminOrdersComponent_div_29_tr_44_Template, 19, 11, "tr", 50);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(45, "tfoot")(46, "tr")(47, "td", 51);
    \u0275\u0275text(48, "Total");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(49, "td", 52);
    \u0275\u0275text(50);
    \u0275\u0275pipe(51, "currency");
    \u0275\u0275elementEnd()()()()()();
    \u0275\u0275elementStart(52, "div", 53)(53, "h4");
    \u0275\u0275text(54, "Gestion du statut");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(55, "div", 54)(56, "select", 55);
    \u0275\u0275twoWayListener("ngModelChange", function AdminOrdersComponent_div_29_Template_select_ngModelChange_56_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.newStatus, $event) || (ctx_r1.newStatus = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(57, "option", 56);
    \u0275\u0275text(58, "S\xE9lectionner un nouveau statut");
    \u0275\u0275elementEnd();
    \u0275\u0275template(59, AdminOrdersComponent_div_29_option_59_Template, 2, 2, "option", 57);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(60, "button", 58);
    \u0275\u0275listener("click", function AdminOrdersComponent_div_29_Template_button_click_60_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.updateOrderStatus());
    });
    \u0275\u0275text(61);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(62, AdminOrdersComponent_div_29_div_62_Template, 2, 1, "div", 59);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(63, "div", 60)(64, "button", 61);
    \u0275\u0275listener("click", function AdminOrdersComponent_div_29_Template_button_click_64_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeModal());
    });
    \u0275\u0275text(65, " Annuler ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(66, "button", 58);
    \u0275\u0275listener("click", function AdminOrdersComponent_div_29_Template_button_click_66_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.saveChanges());
    });
    \u0275\u0275text(67);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("D\xE9tails de la commande #", ctx_r1.selectedOrder.id_order, "");
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r1.getStatusClass(ctx_r1.selectedOrder.id_statut));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getStatusLabel(ctx_r1.selectedOrder.id_statut), " ");
    \u0275\u0275advance(12);
    \u0275\u0275textInterpolate2("", ctx_r1.selectedOrder.client == null ? null : ctx_r1.selectedOrder.client.firstName, " ", ctx_r1.selectedOrder.client == null ? null : ctx_r1.selectedOrder.client.lastName, "");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(25, 19, ctx_r1.selectedOrder.date_order, "dd/MM/yyyy HH:mm"));
    \u0275\u0275advance(20);
    \u0275\u0275property("ngForOf", ctx_r1.selectedOrder.orderDetails)("ngForTrackBy", ctx_r1.trackByOrderDetailId);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(51, 22, ctx_r1.selectedOrder.montant_total, "EUR"));
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.newStatus);
    \u0275\u0275property("disabled", ctx_r1.processing);
    \u0275\u0275advance();
    \u0275\u0275property("ngValue", null);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r1.getAvailableStatuses(ctx_r1.selectedOrder));
    \u0275\u0275advance();
    \u0275\u0275property("disabled", !ctx_r1.newStatus || ctx_r1.processing || ctx_r1.newStatus === ctx_r1.selectedOrder.id_statut);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.processing ? "Mise \xE0 jour..." : "Mettre \xE0 jour le statut", " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.statusError);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r1.processing || !ctx_r1.hasChanges());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.processing ? "Enregistrement..." : "Sauvegarder", " ");
  }
}
var OrderStatus;
(function(OrderStatus2) {
  OrderStatus2[OrderStatus2["Pending"] = 1] = "Pending";
  OrderStatus2[OrderStatus2["Processing"] = 2] = "Processing";
  OrderStatus2[OrderStatus2["Shipped"] = 3] = "Shipped";
  OrderStatus2[OrderStatus2["Delivered"] = 4] = "Delivered";
  OrderStatus2[OrderStatus2["Cancelled"] = 5] = "Cancelled";
})(OrderStatus || (OrderStatus = {}));
var AdminOrdersComponent = class _AdminOrdersComponent {
  constructor(orderService, notificationService) {
    this.orderService = orderService;
    this.notificationService = notificationService;
    this.orders = [];
    this.filteredOrders = [];
    this.selectedOrder = null;
    this.newStatus = null;
    this.statusError = null;
    this.loading = false;
    this.error = null;
    this.processing = false;
    this.searchTerm = "";
    this.statusFilter = "all";
    this.OrderStatus = OrderStatus;
    this.availablePromotions = [];
    this.selectedPromotion = null;
    this.tempSelectedPromotion = null;
    this.originalTotal = 0;
    this.orderUpdated = new EventEmitter();
    this.orderStatuses = [
      { id_statut: OrderStatus.Pending, label: "En attente" },
      { id_statut: OrderStatus.Processing, label: "En cours de traitement" },
      { id_statut: OrderStatus.Shipped, label: "Exp\xE9di\xE9" },
      { id_statut: OrderStatus.Delivered, label: "Livr\xE9" },
      { id_statut: OrderStatus.Cancelled, label: "Annul\xE9" }
    ];
    this.validTransitions = {
      [OrderStatus.Pending]: [OrderStatus.Processing, OrderStatus.Cancelled],
      [OrderStatus.Processing]: [OrderStatus.Shipped, OrderStatus.Cancelled],
      [OrderStatus.Shipped]: [OrderStatus.Delivered, OrderStatus.Cancelled],
      [OrderStatus.Delivered]: [],
      [OrderStatus.Cancelled]: []
    };
    this.originalOrder = null;
  }
  ngOnInit() {
    this.loadOrders();
  }
  calculateDiscount() {
    if (!this.selectedPromotion || !this.selectedOrder)
      return 0;
    return this.selectedOrder.montant_total * this.selectedPromotion.discountPercentage / 100;
  }
  openModal(order) {
    this.selectedOrder = __spreadValues({}, order);
    this.selectedPromotion = null;
  }
  cancelOrder() {
    if (!this.selectedOrder || !confirm("\xCAtes-vous s\xFBr de vouloir annuler cette commande ?")) {
      return;
    }
    this.processing = true;
    this.orderService.updateOrderStatus(this.selectedOrder.id_order, 5).subscribe({
      next: () => {
        this.notificationService.success("Commande annul\xE9e avec succ\xE8s");
        this.closeModal();
        this.loadOrders();
      },
      error: (error) => {
        console.error("Erreur annulation commande:", error);
        this.notificationService.error("Erreur lors de l'annulation de la commande");
      },
      complete: () => {
        this.processing = false;
      }
    });
  }
  // Ajoutez ces nouvelles méthodes
  removePromotion() {
    if (!this.selectedOrder)
      return;
    this.selectedOrder.montant_total = this.originalTotal;
    this.selectedPromotion = null;
    this.tempSelectedPromotion = null;
  }
  updateTotal() {
    if (!this.selectedOrder)
      return;
    this.originalTotal = this.selectedOrder.orderDetails.reduce((total, detail) => total + (detail.quantity > 0 ? detail.quantity * detail.unit_price : 0), 0);
    if (this.selectedPromotion) {
      const discountAmount = this.calculateDiscount();
      this.selectedOrder.montant_total = this.originalTotal - discountAmount;
    } else {
      this.selectedOrder.montant_total = this.originalTotal;
    }
  }
  saveChanges() {
    if (!this.selectedOrder)
      return;
    console.log("Selected Order:", this.selectedOrder);
    this.processing = true;
    const updates = {
      orderDetails: this.selectedOrder.orderDetails,
      id_statut: this.selectedOrder.id_statut,
      promotionId: this.selectedPromotion?.id_promotion
    };
    this.orderService.updateOrder(this.selectedOrder.id_order, updates).subscribe({
      next: () => {
        this.notificationService.success("Commande mise \xE0 jour avec succ\xE8s");
        this.closeModal();
        this.loadOrders();
      },
      error: (error) => {
        console.error("Erreur mise \xE0 jour commande:", error);
        this.notificationService.error("Erreur lors de la mise \xE0 jour de la commande");
      },
      complete: () => {
        this.processing = false;
      }
    });
  }
  getStatusClass(statusId) {
    return `status status-${statusId}`;
  }
  getStatusLabel(statusId) {
    const status = this.orderStatuses.find((s) => s.id_statut === statusId);
    return status ? status.label : "Inconnu";
  }
  loadOrders() {
    this.loading = true;
    this.error = null;
    this.orders = [];
    this.filteredOrders = [];
    this.orderService.getAllOrders().subscribe({
      next: (orders) => {
        if (!orders) {
          this.error = "Aucune commande trouv\xE9e";
          return;
        }
        this.orders = orders;
        this.filteredOrders = [...orders];
        this.loading = false;
      },
      error: (error) => {
        console.error("Erreur chargement commandes:", error);
        this.error = "Impossible de charger les commandes.";
        this.loading = false;
      }
    });
  }
  closeStatusModal() {
    this.selectedOrder = null;
    this.selectedPromotion = null;
    this.newStatus = null;
    this.statusError = null;
    this.processing = false;
  }
  getAvailableStatuses(order) {
    if (!order)
      return [];
    const currentStatus = order.id_statut;
    const availableTransitions = this.validTransitions[currentStatus] || [];
    return this.orderStatuses.filter((status) => availableTransitions.includes(status.id_statut));
  }
  updateOrderStatus() {
    if (!this.selectedOrder || !this.newStatus) {
      this.statusError = "Veuillez s\xE9lectionner un nouveau statut.";
      return;
    }
    if (this.newStatus === this.selectedOrder.id_statut) {
      this.statusError = "Le nouveau statut doit \xEAtre diff\xE9rent de l'ancien.";
      return;
    }
    if (!this.isValidTransition(this.selectedOrder.id_statut, this.newStatus)) {
      this.statusError = "Cette transition de statut n'est pas autoris\xE9e.";
      return;
    }
    this.processing = true;
    this.statusError = null;
    this.orderService.updateOrderStatus(this.selectedOrder.id_order, this.newStatus).subscribe({
      next: () => {
        this.notificationService.success("Statut mis \xE0 jour avec succ\xE8s");
        this.loadOrders();
        this.closeStatusModal();
        this.orderUpdated.emit();
      },
      error: (error) => {
        console.error("Erreur lors de la mise \xE0 jour du statut:", error);
        this.statusError = "Erreur lors de la mise \xE0 jour du statut.";
        this.processing = false;
      }
    });
  }
  isValidTransition(currentStatus, newStatus) {
    if (currentStatus === newStatus)
      return false;
    const currentStatusEnum = currentStatus;
    const validTransitions = this.validTransitions[currentStatusEnum];
    if (!validTransitions)
      return false;
    return validTransitions.includes(newStatus);
  }
  applySelectedPromotion() {
    if (!this.tempSelectedPromotion || !this.selectedOrder)
      return;
    if (this.selectedPromotion) {
      this.removePromotion();
    }
    this.selectedPromotion = this.tempSelectedPromotion;
    const discountAmount = this.calculateDiscount();
    this.selectedOrder.montant_total = this.originalTotal - discountAmount;
    this.tempSelectedPromotion = null;
  }
  // Méthodes trackBy pour améliorer les performances
  trackByOrderId(index, order) {
    return order.id_order;
  }
  trackByOrderDetailId(index, detail) {
    return detail.id_order_detail;
  }
  trackByPromotionId(index, promotion) {
    return promotion.id_promotion;
  }
  trackByStatusId(index, status) {
    return status.id_statut;
  }
  removeProduct(detail) {
    if (!this.selectedOrder || !detail) {
      this.notificationService.error("Impossible de supprimer le produit : informations manquantes");
      return;
    }
    const detailId = detail.id_order_detail;
    if (!detailId) {
      this.notificationService.error("Impossible de supprimer le produit : identifiant manquant");
      return;
    }
    console.log("Suppression du produit avec id_order_detail:", detailId);
    this.processing = true;
    this.orderService.deleteOrderDetail(detailId).subscribe({
      next: () => {
        if (this.selectedOrder) {
          this.selectedOrder.orderDetails = this.selectedOrder.orderDetails.filter((d) => d.id_order_detail !== detailId);
          this.updateTotal();
        }
        this.notificationService.success("Produit supprim\xE9 avec succ\xE8s");
      },
      error: (error) => {
        console.error("Erreur lors de la suppression du produit:", error);
        this.notificationService.error("Erreur lors de la suppression du produit");
      },
      complete: () => {
        this.processing = false;
      }
    });
  }
  filterOrders() {
    this.filteredOrders = this.orders.filter((order) => {
      const matchesSearch = !this.searchTerm || order.id_order.toString().includes(this.searchTerm) || order.client?.firstName?.toLowerCase().includes(this.searchTerm.toLowerCase()) || order.client?.lastName?.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesStatus = this.statusFilter === "all" || order.id_statut.toString() === this.statusFilter;
      return matchesSearch && matchesStatus;
    });
  }
  // Gestion des statuts
  getOrdersByStatus(status) {
    return this.orders.filter((order) => order.id_statut === status).length;
  }
  validateAndUpdateQuantity(detail) {
    if (detail.quantity < 1) {
      detail.quantity = 1;
    }
    this.updateTotal();
  }
  updateQuantity(detail, change) {
    const newQty = detail.quantity + change;
    if (newQty >= 1) {
      detail.quantity = newQty;
      this.updateTotal();
    }
  }
  hasChanges() {
    if (!this.selectedOrder || !this.originalOrder) {
      return false;
    }
    const quantityChanged = this.selectedOrder.orderDetails.some((detail) => {
      const original = this.originalOrder.orderDetails.find((d) => d.id_order_detail === detail.id_order_detail);
      return original ? original.quantity !== detail.quantity : false;
    });
    const statusChanged = Boolean(this.newStatus && this.newStatus !== this.originalOrder.id_statut);
    return quantityChanged || statusChanged;
  }
  closeModal() {
    if (this.hasChanges() && !confirm("Des modifications non sauvegard\xE9es seront perdues. Voulez-vous continuer ?")) {
      return;
    }
    this.closeStatusModal();
  }
  openOrderDetails(order) {
    this.selectedOrder = __spreadValues({}, order);
    this.originalOrder = __spreadValues({}, order);
    this.newStatus = null;
    this.statusError = null;
  }
  static {
    this.\u0275fac = function AdminOrdersComponent_Factory(t) {
      return new (t || _AdminOrdersComponent)(\u0275\u0275directiveInject(OrderService), \u0275\u0275directiveInject(NotificationService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminOrdersComponent, selectors: [["app-admin-order-details"]], outputs: { orderUpdated: "orderUpdated" }, standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 30, vars: 10, consts: [[1, "orders-container"], [1, "page-header"], [1, "stats"], [1, "stat-card"], [1, "label"], [1, "value"], [1, "filters"], ["type", "text", "placeholder", "Rechercher une commande...", 1, "search-input", 3, "ngModelChange", "ngModel"], [1, "status-select", 3, "ngModelChange", "change", "ngModel"], ["value", "all"], [3, "value", 4, "ngFor", "ngForOf"], ["class", "loading", 4, "ngIf"], ["class", "error", 4, "ngIf"], [4, "ngIf"], ["class", "modal-overlay", 4, "ngIf"], [3, "value"], [1, "loading"], [1, "error"], ["class", "empty-state", 4, "ngIf"], ["class", "orders-grid", 4, "ngIf"], [1, "empty-state"], [1, "orders-grid"], ["class", "order-card", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "order-card"], [1, "order-header"], [1, "order-info"], [1, "order-date"], ["class", "order-products", 4, "ngIf"], [1, "order-footer"], [1, "order-totals"], [1, "order-total"], [1, "details-btn", 3, "click"], [1, "order-products"], ["class", "product-item", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "product-item"], [1, "product-name"], [1, "product-quantity"], [1, "product-price"], [1, "modal-overlay"], [1, "modal-content"], [1, "modal-header"], [1, "header-content"], [1, "status-badge"], [1, "close-btn", 3, "click"], [1, "modal-body"], [1, "card", "info-section"], [1, "client-info"], [1, "info-row"], [1, "card", "product-section"], [1, "table-responsive"], [4, "ngFor", "ngForOf", "ngForTrackBy"], ["colspan", "3", 1, "total-label"], ["colspan", "2", 1, "total-value"], [1, "card", "status-section"], [1, "status-control"], [1, "status-select", 3, "ngModelChange", "ngModel", "disabled"], [3, "ngValue"], [3, "ngValue", 4, "ngFor", "ngForOf"], [1, "action-btn", "primary", 3, "click", "disabled"], ["class", "error-message", 4, "ngIf"], [1, "modal-footer"], [1, "action-btn", "secondary", 3, "click"], [1, "quantity-control"], [1, "qty-btn", 3, "click", "disabled"], ["type", "number", "min", "1", 1, "qty-input", 3, "ngModelChange", "change", "ngModel"], [1, "qty-btn", 3, "click"], [1, "delete-btn", 3, "click"], [1, "error-message"]], template: function AdminOrdersComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "header", 1)(2, "h1");
        \u0275\u0275text(3, "Gestion des Commandes");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "div", 2)(5, "div", 3)(6, "span", 4);
        \u0275\u0275text(7, "Total");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(8, "span", 5);
        \u0275\u0275text(9);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(10, "div", 3)(11, "span", 4);
        \u0275\u0275text(12, "En cours");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(13, "span", 5);
        \u0275\u0275text(14);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(15, "div", 3)(16, "span", 4);
        \u0275\u0275text(17, "En attente");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(18, "span", 5);
        \u0275\u0275text(19);
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(20, "div", 6)(21, "input", 7);
        \u0275\u0275twoWayListener("ngModelChange", function AdminOrdersComponent_Template_input_ngModelChange_21_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.searchTerm, $event) || (ctx.searchTerm = $event);
          return $event;
        });
        \u0275\u0275listener("ngModelChange", function AdminOrdersComponent_Template_input_ngModelChange_21_listener() {
          return ctx.filterOrders();
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(22, "select", 8);
        \u0275\u0275twoWayListener("ngModelChange", function AdminOrdersComponent_Template_select_ngModelChange_22_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.statusFilter, $event) || (ctx.statusFilter = $event);
          return $event;
        });
        \u0275\u0275listener("change", function AdminOrdersComponent_Template_select_change_22_listener() {
          return ctx.filterOrders();
        });
        \u0275\u0275elementStart(23, "option", 9);
        \u0275\u0275text(24, "Tous les statuts");
        \u0275\u0275elementEnd();
        \u0275\u0275template(25, AdminOrdersComponent_option_25_Template, 2, 2, "option", 10);
        \u0275\u0275elementEnd()();
        \u0275\u0275template(26, AdminOrdersComponent_div_26_Template, 2, 0, "div", 11)(27, AdminOrdersComponent_div_27_Template, 2, 1, "div", 12)(28, AdminOrdersComponent_div_28_Template, 3, 2, "div", 13);
        \u0275\u0275elementEnd();
        \u0275\u0275template(29, AdminOrdersComponent_div_29_Template, 68, 25, "div", 14);
      }
      if (rf & 2) {
        \u0275\u0275advance(9);
        \u0275\u0275textInterpolate(ctx.orders.length);
        \u0275\u0275advance(5);
        \u0275\u0275textInterpolate(ctx.getOrdersByStatus(ctx.OrderStatus.Processing));
        \u0275\u0275advance(5);
        \u0275\u0275textInterpolate(ctx.getOrdersByStatus(ctx.OrderStatus.Pending));
        \u0275\u0275advance(2);
        \u0275\u0275twoWayProperty("ngModel", ctx.searchTerm);
        \u0275\u0275advance();
        \u0275\u0275twoWayProperty("ngModel", ctx.statusFilter);
        \u0275\u0275advance(3);
        \u0275\u0275property("ngForOf", ctx.orderStatuses);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.error);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.loading && !ctx.error);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.selectedOrder);
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, CurrencyPipe, DatePipe, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, NgControlStatus, MinValidator, NgModel], styles: ["\n\n.details-btn[_ngcontent-%COMP%] {\n  background: #2563eb;\n  color: white;\n  padding: 0.5rem 1rem;\n  border: none;\n  border-radius: 0.375rem;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.details-btn[_ngcontent-%COMP%]:hover {\n  background: #1d4ed8;\n}\n.details-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.order-total[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #1a56db;\n  font-size: 1.125rem;\n  padding: 0.5rem;\n  background: #f3f4f6;\n  border-radius: 0.375rem;\n}\n.update-status-btn[_ngcontent-%COMP%] {\n  background: #3b82f6;\n  color: white;\n  padding: 0.5rem 1rem;\n  border: none;\n  border-radius: 0.375rem;\n  font-weight: 500;\n  transition: all 0.2s;\n}\n.update-status-btn[_ngcontent-%COMP%]:hover {\n  background: #2563eb;\n}\n.update-status-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.modal-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 1rem;\n  padding: 1rem;\n  border-top: 1px solid #e5e7eb;\n  background: #f9fafb;\n}\n.modal-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  padding: 0.5rem 1.5rem;\n  border-radius: 0.375rem;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.modal-actions[_ngcontent-%COMP%]   button.cancel[_ngcontent-%COMP%] {\n  background: #f3f4f6;\n  color: #374151;\n  border: 1px solid #d1d5db;\n}\n.modal-actions[_ngcontent-%COMP%]   button.cancel[_ngcontent-%COMP%]:hover {\n  background: #e5e7eb;\n}\n.modal-actions[_ngcontent-%COMP%]   button.save[_ngcontent-%COMP%] {\n  background: #2563eb;\n  color: white;\n  border: none;\n}\n.modal-actions[_ngcontent-%COMP%]   button.save[_ngcontent-%COMP%]:hover {\n  background: #1d4ed8;\n}\n.modal-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.status-select[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 0.5rem;\n  border: 1px solid #d1d5db;\n  border-radius: 0.375rem;\n  background-color: white;\n  font-size: 0.875rem;\n  color: #374151;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.status-select[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #2563eb;\n  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.1);\n}\n.status-select[_ngcontent-%COMP%]:disabled {\n  background-color: #f3f4f6;\n  cursor: not-allowed;\n}\n.orders-container[_ngcontent-%COMP%] {\n  padding: 2rem;\n  max-width: 1400px;\n  margin: 0 auto;\n  background: #f8f9fa;\n}\n.stats-container[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 8px;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n  padding: 1.5rem;\n  margin-bottom: 2rem;\n  display: flex;\n  justify-content: flex-end;\n  gap: 2rem;\n}\n.stats-container[_ngcontent-%COMP%]   .stat-item[_ngcontent-%COMP%] {\n  text-align: center;\n}\n.stats-container[_ngcontent-%COMP%]   .stat-item[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  font-weight: bold;\n  color: #2563eb;\n}\n.stats-container[_ngcontent-%COMP%]   .stat-item[_ngcontent-%COMP%]   .value.processing[_ngcontent-%COMP%] {\n  color: #0369a1;\n}\n.stats-container[_ngcontent-%COMP%]   .stat-item[_ngcontent-%COMP%]   .value.pending[_ngcontent-%COMP%] {\n  color: #92400e;\n}\n.stats-container[_ngcontent-%COMP%]   .stat-item[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  color: #6b7280;\n}\n.filters[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 1rem;\n  margin-bottom: 2rem;\n  padding: 1rem;\n  background: white;\n  border-radius: 8px;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n}\n.filters[_ngcontent-%COMP%]   .search-input[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 0.625rem 1rem;\n  border: 1px solid #E5E7EB;\n  border-radius: 6px;\n  min-width: 250px;\n}\n.filters[_ngcontent-%COMP%]   .search-input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #0066CC;\n}\n.filters[_ngcontent-%COMP%]   .stats[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 1.5rem;\n}\n.filters[_ngcontent-%COMP%]   .stats[_ngcontent-%COMP%]   .stat-card[_ngcontent-%COMP%] {\n  background: white;\n  padding: 1rem 1.5rem;\n  border-radius: 8px;\n  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);\n  min-width: 120px;\n  text-align: center;\n}\n.filters[_ngcontent-%COMP%]   .stats[_ngcontent-%COMP%]   .stat-card[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] {\n  color: #0066CC;\n  font-size: 1.5rem;\n  font-weight: bold;\n  margin-bottom: 0.25rem;\n}\n.filters[_ngcontent-%COMP%]   .stats[_ngcontent-%COMP%]   .stat-card[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%] {\n  color: #6B7280;\n  font-size: 0.875rem;\n}\n.filters[_ngcontent-%COMP%]   .status-select[_ngcontent-%COMP%] {\n  padding: 0.625rem 1rem;\n  border: 1px solid #E5E7EB;\n  border-radius: 6px;\n  min-width: 200px;\n  background: white;\n  cursor: pointer;\n}\n.filters[_ngcontent-%COMP%]   .status-select[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #0066CC;\n}\n.page-header[_ngcontent-%COMP%] {\n  background: white;\n  padding: 1.5rem;\n  border-radius: 8px;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n  margin-bottom: 2rem;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.page-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  color: #0066CC;\n  font-size: 1.5rem;\n  margin: 0;\n  font-weight: 500;\n}\n.stats[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 1.5rem;\n}\n.stats[_ngcontent-%COMP%]   .stat-card[_ngcontent-%COMP%] {\n  background: white;\n  padding: 1rem 1.5rem;\n  border-radius: 8px;\n  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);\n  min-width: 120px;\n  text-align: center;\n}\n.stats[_ngcontent-%COMP%]   .stat-card[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] {\n  color: #0066CC;\n  font-size: 1.5rem;\n  font-weight: bold;\n  margin-bottom: 0.25rem;\n}\n.stats[_ngcontent-%COMP%]   .stat-card[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%] {\n  color: #6B7280;\n  font-size: 0.875rem;\n}\n.orders-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr;\n  gap: 1rem;\n}\n.order-card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 8px;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n  overflow: hidden;\n}\n.order-card[_ngcontent-%COMP%]   .order-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1.25rem;\n  background: #f8f9fa;\n  border-bottom: 1px solid #e5e7eb;\n}\n.order-card[_ngcontent-%COMP%]   .order-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #111827;\n  font-size: 1rem;\n  font-weight: 500;\n}\n.order-card[_ngcontent-%COMP%]   .order-header[_ngcontent-%COMP%]   .status[_ngcontent-%COMP%] {\n  padding: 0.375rem 0.75rem;\n  border-radius: 9999px;\n  font-size: 0.875rem;\n  font-weight: 500;\n}\n.order-card[_ngcontent-%COMP%]   .order-header[_ngcontent-%COMP%]   .status.status-1[_ngcontent-%COMP%] {\n  background: #FEF3C7;\n  color: #92400E;\n}\n.order-card[_ngcontent-%COMP%]   .order-header[_ngcontent-%COMP%]   .status.status-2[_ngcontent-%COMP%] {\n  background: #DBEAFE;\n  color: #1E40AF;\n}\n.order-card[_ngcontent-%COMP%]   .order-header[_ngcontent-%COMP%]   .status.status-3[_ngcontent-%COMP%] {\n  background: #D1FAE5;\n  color: #065F46;\n}\n.order-card[_ngcontent-%COMP%]   .order-header[_ngcontent-%COMP%]   .status.status-4[_ngcontent-%COMP%] {\n  background: #BBF7D0;\n  color: #166534;\n}\n.order-card[_ngcontent-%COMP%]   .order-header[_ngcontent-%COMP%]   .status.status-5[_ngcontent-%COMP%] {\n  background: #FEE2E2;\n  color: #991B1B;\n}\n.order-card[_ngcontent-%COMP%]   .order-details[_ngcontent-%COMP%] {\n  padding: 1.25rem;\n}\n.order-card[_ngcontent-%COMP%]   .order-details[_ngcontent-%COMP%]   table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n}\n.order-card[_ngcontent-%COMP%]   .order-details[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  text-align: left;\n  padding: 0.75rem;\n  background: #f8f9fa;\n  border-bottom: 1px solid #e5e7eb;\n  font-weight: 500;\n  color: #374151;\n}\n.order-card[_ngcontent-%COMP%]   .order-details[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 0.75rem;\n  border-bottom: 1px solid #e5e7eb;\n}\n.order-card[_ngcontent-%COMP%]   .product-item[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 0.75rem;\n  border-bottom: 1px solid #e5e7eb;\n}\n.order-card[_ngcontent-%COMP%]   .product-item[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n.action-buttons[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.75rem;\n  margin-top: 1rem;\n}\n.action-buttons[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  padding: 0.5rem 1rem;\n  border-radius: 6px;\n  font-weight: 500;\n  cursor: pointer;\n  border: none;\n  transition: all 0.2s;\n}\n.action-buttons[_ngcontent-%COMP%]   button.update-btn[_ngcontent-%COMP%] {\n  background: #0066CC;\n  color: white;\n}\n.action-buttons[_ngcontent-%COMP%]   button.update-btn[_ngcontent-%COMP%]:hover {\n  background: #0052a3;\n}\n.action-buttons[_ngcontent-%COMP%]   button.cancel-btn[_ngcontent-%COMP%] {\n  background: #DC2626;\n  color: white;\n}\n.action-buttons[_ngcontent-%COMP%]   button.cancel-btn[_ngcontent-%COMP%]:hover {\n  background: #B91C1C;\n}\n.action-buttons[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.quantity-control[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n.quantity-control[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  width: 60px;\n  text-align: center;\n  padding: 0.25rem;\n  border: 1px solid #D1D5DB;\n  border-radius: 4px;\n}\n.quantity-control[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  width: 24px;\n  height: 24px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border: none;\n  background: #F3F4F6;\n  cursor: pointer;\n  border-radius: 4px;\n}\n.quantity-control[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\n  background: #E5E7EB;\n}\n.modal-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.5);\n  display: grid;\n  place-items: center;\n  z-index: 50;\n}\n.modal-content[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 8px;\n  width: 90%;\n  max-width: 800px;\n  max-height: 90vh;\n  overflow-y: auto;\n  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);\n}\n.modal-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.5);\n  display: grid;\n  place-items: center;\n  z-index: 50;\n  padding: 1rem;\n}\n.modal-content[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 0.75rem;\n  width: 100%;\n  max-width: 900px;\n  max-height: calc(100vh - 2rem);\n  overflow-y: auto;\n  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);\n}\n.modal-header[_ngcontent-%COMP%] {\n  padding: 1.25rem;\n  border-bottom: 1px solid #e5e7eb;\n  background: #f8fafc;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.modal-header[_ngcontent-%COMP%]   .header-content[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n}\n.modal-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1.25rem;\n  color: #0f172a;\n}\n.modal-header[_ngcontent-%COMP%]   .close-btn[_ngcontent-%COMP%] {\n  background: transparent;\n  border: none;\n  font-size: 1.5rem;\n  color: #64748b;\n  cursor: pointer;\n  padding: 0.25rem;\n  line-height: 1;\n}\n.modal-header[_ngcontent-%COMP%]   .close-btn[_ngcontent-%COMP%]:hover {\n  color: #0f172a;\n}\n.card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 0.5rem;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n  padding: 1.25rem;\n  margin-bottom: 1rem;\n}\n.card[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  margin: 0 0 1rem 0;\n  font-size: 1rem;\n  color: #0f172a;\n}\n.info-section[_ngcontent-%COMP%]   .client-info[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.75rem;\n}\n.info-section[_ngcontent-%COMP%]   .info-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n.info-section[_ngcontent-%COMP%]   .info-row[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%] {\n  color: #64748b;\n  min-width: 80px;\n}\n.info-section[_ngcontent-%COMP%]   .info-row[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] {\n  color: #0f172a;\n  font-weight: 500;\n}\n.table-responsive[_ngcontent-%COMP%] {\n  overflow-x: auto;\n  margin: 0 -1.25rem;\n  padding: 0 1.25rem;\n}\n.table-responsive[_ngcontent-%COMP%]   table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  white-space: nowrap;\n}\n.table-responsive[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  background: #f8fafc;\n  padding: 0.75rem 1rem;\n  text-align: left;\n  color: #64748b;\n  font-weight: 500;\n  border-bottom: 1px solid #e2e8f0;\n}\n.table-responsive[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 0.75rem 1rem;\n  border-bottom: 1px solid #e2e8f0;\n  vertical-align: middle;\n}\n.table-responsive[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   tfoot[_ngcontent-%COMP%] {\n  font-weight: 600;\n}\n.table-responsive[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   tfoot[_ngcontent-%COMP%]   .total-label[_ngcontent-%COMP%] {\n  text-align: right;\n  color: #64748b;\n}\n.table-responsive[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   tfoot[_ngcontent-%COMP%]   .total-value[_ngcontent-%COMP%] {\n  color: #0f172a;\n}\n.quantity-control[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.25rem;\n}\n.quantity-control[_ngcontent-%COMP%]   .qty-input[_ngcontent-%COMP%] {\n  width: 60px;\n  text-align: center;\n  padding: 0.375rem;\n  border: 1px solid #e2e8f0;\n  border-radius: 0.375rem;\n}\n.quantity-control[_ngcontent-%COMP%]   .qty-input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #3b82f6;\n  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);\n}\n.quantity-control[_ngcontent-%COMP%]   .qty-btn[_ngcontent-%COMP%] {\n  width: 24px;\n  height: 24px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border: 1px solid #e2e8f0;\n  background: white;\n  border-radius: 0.375rem;\n  cursor: pointer;\n  color: #64748b;\n  padding: 0;\n}\n.quantity-control[_ngcontent-%COMP%]   .qty-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #f8fafc;\n  color: #0f172a;\n}\n.quantity-control[_ngcontent-%COMP%]   .qty-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.status-section[_ngcontent-%COMP%]   .status-control[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 1rem;\n  align-items: center;\n}\n.status-section[_ngcontent-%COMP%]   .status-select[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 0.5rem;\n  border: 1px solid #e2e8f0;\n  border-radius: 0.375rem;\n  background: white;\n}\n.status-section[_ngcontent-%COMP%]   .status-select[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #3b82f6;\n  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);\n}\n.status-section[_ngcontent-%COMP%]   .status-select[_ngcontent-%COMP%]:disabled {\n  background: #f8fafc;\n  cursor: not-allowed;\n}\n.action-btn[_ngcontent-%COMP%] {\n  padding: 0.5rem 1rem;\n  border-radius: 0.375rem;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.action-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.action-btn.primary[_ngcontent-%COMP%] {\n  background: #3b82f6;\n  color: white;\n  border: none;\n}\n.action-btn.primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #2563eb;\n}\n.action-btn.secondary[_ngcontent-%COMP%] {\n  background: white;\n  color: #64748b;\n  border: 1px solid #e2e8f0;\n}\n.action-btn.secondary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #f8fafc;\n  color: #0f172a;\n}\n.delete-btn[_ngcontent-%COMP%] {\n  padding: 0.375rem 0.75rem;\n  background: #ef4444;\n  color: white;\n  border: none;\n  border-radius: 0.375rem;\n  cursor: pointer;\n}\n.delete-btn[_ngcontent-%COMP%]:hover {\n  background: #dc2626;\n}\n.status-badge[_ngcontent-%COMP%] {\n  padding: 0.25rem 0.75rem;\n  border-radius: 9999px;\n  font-size: 0.875rem;\n  font-weight: 500;\n}\n.status-badge.status-1[_ngcontent-%COMP%] {\n  background: #fef3c7;\n  color: #92400e;\n}\n.status-badge.status-2[_ngcontent-%COMP%] {\n  background: #dbeafe;\n  color: #1e40af;\n}\n.status-badge.status-3[_ngcontent-%COMP%] {\n  background: #d1fae5;\n  color: #065f46;\n}\n.status-badge.status-4[_ngcontent-%COMP%] {\n  background: #bbf7d0;\n  color: #166534;\n}\n.status-badge.status-5[_ngcontent-%COMP%] {\n  background: #fee2e2;\n  color: #991b1b;\n}\n.error-message[_ngcontent-%COMP%] {\n  color: #ef4444;\n  font-size: 0.875rem;\n  margin-top: 0.5rem;\n}\n.modal-footer[_ngcontent-%COMP%] {\n  padding: 1.25rem;\n  border-top: 1px solid #e2e8f0;\n  background: #f8fafc;\n  display: flex;\n  justify-content: flex-end;\n  gap: 1rem;\n}\n/*# sourceMappingURL=admin-orders.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminOrdersComponent, { className: "AdminOrdersComponent", filePath: "src\\app\\feature\\Dashboard\\DashboardComponent\\admin\\orders\\admin-orders.component.ts", lineNumber: 920 });
})();

// src/app/feature/Dashboard/DashboardComponent/admin/clients/admin-clients.component.ts
var AdminClientsComponent = class _AdminClientsComponent {
  constructor(http) {
    this.http = http;
    this.clients = [];
  }
  ngOnInit() {
    this.loadClients();
  }
  loadClients() {
    this.http.get("http://localhost:2024/api/clients").subscribe({
      next: (data) => this.clients = data,
      error: (error) => console.error("Erreur de chargement des clients:", error)
    });
  }
  static {
    this.\u0275fac = function AdminClientsComponent_Factory(t) {
      return new (t || _AdminClientsComponent)(\u0275\u0275directiveInject(HttpClient));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminClientsComponent, selectors: [["app-admin-clients"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 0, vars: 0, template: function AdminClientsComponent_Template(rf, ctx) {
    }, dependencies: [CommonModule], styles: ["\n\n.admin-clients[_ngcontent-%COMP%] {\n  padding: 20px;\n}\n.admin-clients[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 20px;\n}\n.admin-clients[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #333;\n}\n.admin-clients[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]   .search[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  padding: 8px 12px;\n  border: 1px solid #ddd;\n  border-radius: 4px;\n  width: 300px;\n}\n.admin-clients[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]   .search[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #4f46e5;\n}\n.admin-clients[_ngcontent-%COMP%]   table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  background: white;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n}\n.admin-clients[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], .admin-clients[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 12px;\n  text-align: left;\n  border-bottom: 1px solid #eee;\n}\n.admin-clients[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  background: #f8f9fa;\n  font-weight: 600;\n}\n.admin-clients[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  padding: 6px 12px;\n  border: none;\n  border-radius: 4px;\n  cursor: pointer;\n  margin-right: 5px;\n}\n.admin-clients[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .actions[_ngcontent-%COMP%]   button.view-btn[_ngcontent-%COMP%] {\n  background: #4f46e5;\n  color: white;\n}\n.admin-clients[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .actions[_ngcontent-%COMP%]   button.view-btn[_ngcontent-%COMP%]:hover {\n  background: #4338ca;\n}\n.admin-clients[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .actions[_ngcontent-%COMP%]   button.edit-btn[_ngcontent-%COMP%] {\n  background: #0ea5e9;\n  color: white;\n}\n.admin-clients[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .actions[_ngcontent-%COMP%]   button.edit-btn[_ngcontent-%COMP%]:hover {\n  background: #0284c7;\n}\n.admin-clients[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .actions[_ngcontent-%COMP%]   button.delete-btn[_ngcontent-%COMP%] {\n  background: #dc2626;\n  color: white;\n}\n.admin-clients[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .actions[_ngcontent-%COMP%]   button.delete-btn[_ngcontent-%COMP%]:hover {\n  background: #b91c1c;\n}\n/*# sourceMappingURL=admin-clients.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminClientsComponent, { className: "AdminClientsComponent", filePath: "src\\app\\feature\\Dashboard\\DashboardComponent\\admin\\clients\\admin-clients.component.ts", lineNumber: 21 });
})();

// src/app/services/Service/service.service.ts
var API_URL = "http://localhost:2024/api/services";
var ServiceService = class _ServiceService {
  constructor(http) {
    this.http = http;
  }
  getAllServices() {
    return this.http.get(API_URL);
  }
  getService(id) {
    return this.http.get(`${API_URL}/${id}`);
  }
  createService(data) {
    return this.http.post(API_URL, data);
  }
  updateService(id, data) {
    return this.http.put(`${API_URL}/${id}`, {
      name: data.name,
      description: data.description,
      price: Number(data.price),
      duration: String(data.duration)
      // conversion en string pour le backend
    });
  }
  deleteService(id) {
    return this.http.delete(`${API_URL}/${id}`);
  }
  static {
    this.\u0275fac = function ServiceService_Factory(t) {
      return new (t || _ServiceService)(\u0275\u0275inject(HttpClient));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ServiceService, factory: _ServiceService.\u0275fac, providedIn: "root" });
  }
};

// src/app/feature/Dashboard/DashboardComponent/admin/services/admin-service.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function AdminServicesComponent_Conditional_6_div_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 26);
    \u0275\u0275text(1, " Le nom est requis ");
    \u0275\u0275elementEnd();
  }
}
function AdminServicesComponent_Conditional_6_div_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 26);
    \u0275\u0275text(1, " La description est requise ");
    \u0275\u0275elementEnd();
  }
}
function AdminServicesComponent_Conditional_6_div_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 26);
    \u0275\u0275text(1, " Le prix doit \xEAtre sup\xE9rieur \xE0 0 ");
    \u0275\u0275elementEnd();
  }
}
function AdminServicesComponent_Conditional_6_div_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 26);
    \u0275\u0275text(1, " La dur\xE9e doit \xEAtre sup\xE9rieure \xE0 0 minutes ");
    \u0275\u0275elementEnd();
  }
}
function AdminServicesComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 8)(1, "h3");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "form", 11, 0);
    \u0275\u0275listener("ngSubmit", function AdminServicesComponent_Conditional_6_Template_form_ngSubmit_3_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.saveService());
    });
    \u0275\u0275elementStart(5, "div", 12)(6, "label", 13);
    \u0275\u0275text(7, "Nom du service*");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "input", 14, 1);
    \u0275\u0275twoWayListener("ngModelChange", function AdminServicesComponent_Conditional_6_Template_input_ngModelChange_8_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.newService.name, $event) || (ctx_r1.newService.name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275template(10, AdminServicesComponent_Conditional_6_div_10_Template, 2, 0, "div", 15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 12)(12, "label", 16);
    \u0275\u0275text(13, "Description*");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "textarea", 17, 2);
    \u0275\u0275twoWayListener("ngModelChange", function AdminServicesComponent_Conditional_6_Template_textarea_ngModelChange_14_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.newService.description, $event) || (ctx_r1.newService.description = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275template(16, AdminServicesComponent_Conditional_6_div_16_Template, 2, 0, "div", 15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "div", 18)(18, "div", 12)(19, "label", 19);
    \u0275\u0275text(20, "Prix (\u20AC)*");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "input", 20, 3);
    \u0275\u0275twoWayListener("ngModelChange", function AdminServicesComponent_Conditional_6_Template_input_ngModelChange_21_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.newService.price, $event) || (ctx_r1.newService.price = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275template(23, AdminServicesComponent_Conditional_6_div_23_Template, 2, 0, "div", 15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "div", 12)(25, "label", 21);
    \u0275\u0275text(26, "Dur\xE9e (minutes)*");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "input", 22, 4);
    \u0275\u0275twoWayListener("ngModelChange", function AdminServicesComponent_Conditional_6_Template_input_ngModelChange_27_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.newService.duration, $event) || (ctx_r1.newService.duration = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275template(29, AdminServicesComponent_Conditional_6_div_29_Template, 2, 0, "div", 15);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(30, "div", 23)(31, "button", 24);
    \u0275\u0275text(32);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "button", 25);
    \u0275\u0275listener("click", function AdminServicesComponent_Conditional_6_Template_button_click_33_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cancelForm());
    });
    \u0275\u0275text(34, " Annuler ");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const serviceForm_r3 = \u0275\u0275reference(4);
    const nameInput_r4 = \u0275\u0275reference(9);
    const descInput_r5 = \u0275\u0275reference(15);
    const priceInput_r6 = \u0275\u0275reference(22);
    const durationInput_r7 = \u0275\u0275reference(28);
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.editingService ? "Modifier le service" : "Nouveau service");
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.newService.name);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", nameInput_r4.invalid && (nameInput_r4.dirty || nameInput_r4.touched));
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.newService.description);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", descInput_r5.invalid && (descInput_r5.dirty || descInput_r5.touched));
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.newService.price);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", priceInput_r6.invalid && (priceInput_r6.dirty || priceInput_r6.touched));
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.newService.duration);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", durationInput_r7.invalid && (durationInput_r7.dirty || durationInput_r7.touched));
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", !serviceForm_r3.valid);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.editingService ? "Mettre \xE0 jour" : "Cr\xE9er", " ");
  }
}
function AdminServicesComponent_For_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 10)(1, "div", 27)(2, "h3");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 28);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 29)(7, "span", 30);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "span", 31);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(12, "div", 32)(13, "button", 33);
    \u0275\u0275listener("click", function AdminServicesComponent_For_9_Template_button_click_13_listener() {
      const service_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.editService(service_r9));
    });
    \u0275\u0275text(14, " Modifier ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "button", 34);
    \u0275\u0275listener("click", function AdminServicesComponent_For_9_Template_button_click_15_listener() {
      const service_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.deleteService(service_r9));
    });
    \u0275\u0275text(16, " Supprimer ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const service_r9 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(service_r9.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(service_r9.description);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(9, 4, service_r9.price, "EUR"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.formatDuration(service_r9.duration));
  }
}
var AdminServicesComponent = class _AdminServicesComponent {
  constructor(serviceService, notificationService) {
    this.serviceService = serviceService;
    this.notificationService = notificationService;
    this.services = [];
    this.showAddForm = false;
    this.editingService = null;
    this.newService = {
      name: "",
      description: "",
      price: 0,
      duration: 0
    };
  }
  // Initialisation du composant
  ngOnInit() {
    this.loadServices();
  }
  // Valide la durée entrée dans le formulaire
  validateDuration(event) {
    const input = event.target;
    const value = input.value;
    const numValue = parseInt(value, 10);
    if (isNaN(numValue) || numValue < 0) {
      input.value = "0";
      this.newService.duration = 0;
    } else {
      this.newService.duration = numValue;
    }
  }
  // Formate la durée pour l'affichage (conversion minutes en heures/minutes)
  formatDuration(minutes) {
    if (!minutes)
      return "0 min";
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return remainingMinutes > 0 ? `${hours}h${remainingMinutes}min` : `${hours}h`;
    }
    return `${minutes}min`;
  }
  // Charge tous les services depuis le service
  loadServices() {
    this.serviceService.getAllServices().subscribe({
      next: (services) => {
        this.services = services;
      },
      error: () => {
        this.notificationService.error("Erreur lors du chargement des services");
      }
    });
  }
  // Sauvegarde un service (création ou mise à jour)
  saveService() {
    if (this.newService.duration <= 0) {
      this.notificationService.error("La dur\xE9e doit \xEAtre sup\xE9rieure \xE0 0 minutes");
      return;
    }
    const serviceData = {
      name: this.newService.name,
      description: this.newService.description,
      price: Number(this.newService.price),
      duration: String(this.newService.duration)
      // Conversion en string pour l'API
    };
    if (this.editingService) {
      this.serviceService.updateService(this.editingService.id, serviceData).subscribe({
        next: () => {
          this.loadServices();
          this.cancelForm();
          this.notificationService.success("Service mis \xE0 jour avec succ\xE8s");
        },
        error: (error) => {
          console.error("Erreur:", error);
          this.notificationService.error("Erreur lors de la mise \xE0 jour du service");
        }
      });
    } else {
      this.serviceService.createService(serviceData).subscribe({
        next: () => {
          this.loadServices();
          this.cancelForm();
          this.notificationService.success("Service cr\xE9\xE9 avec succ\xE8s");
        },
        error: (error) => {
          console.error("Erreur:", error);
          this.notificationService.error("Erreur lors de la cr\xE9ation du service");
        }
      });
    }
  }
  // Prépare l'édition d'un service existant
  editService(service) {
    this.editingService = __spreadValues({}, service);
    this.newService = {
      name: service.name,
      description: service.description,
      price: service.price,
      duration: service.duration
    };
    this.showAddForm = true;
  }
  // Supprime un service après confirmation
  deleteService(service) {
    if (confirm("\xCAtes-vous s\xFBr de vouloir supprimer ce service ?")) {
      this.serviceService.deleteService(service.id).subscribe({
        next: () => {
          this.loadServices();
          this.notificationService.success("Service supprim\xE9 avec succ\xE8s");
        },
        error: (error) => {
          console.error("Erreur:", error);
          this.notificationService.error("Erreur lors de la suppression du service");
        }
      });
    }
  }
  // Réinitialise le formulaire et annule l'édition en cours
  cancelForm() {
    this.showAddForm = false;
    this.editingService = null;
    this.newService = {
      name: "",
      description: "",
      price: 0,
      duration: 0
    };
  }
  static {
    this.\u0275fac = function AdminServicesComponent_Factory(t) {
      return new (t || _AdminServicesComponent)(\u0275\u0275directiveInject(ServiceService), \u0275\u0275directiveInject(NotificationService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminServicesComponent, selectors: [["app-admin-services"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 10, vars: 1, consts: [["serviceForm", "ngForm"], ["nameInput", "ngModel"], ["descInput", "ngModel"], ["priceInput", "ngModel"], ["durationInput", "ngModel"], [1, "services-container"], [1, "page-header"], [1, "add-btn", 3, "click"], [1, "form-container"], [1, "services-grid"], [1, "service-card"], [3, "ngSubmit"], [1, "form-group"], ["for", "name"], ["id", "name", "name", "name", "required", "", "type", "text", "placeholder", "Ex: Soin du visage", 3, "ngModelChange", "ngModel"], ["class", "error-message", 4, "ngIf"], ["for", "description"], ["id", "description", "name", "description", "required", "", "rows", "3", "placeholder", "D\xE9crivez le service...", 3, "ngModelChange", "ngModel"], [1, "form-row"], ["for", "price"], ["id", "price", "name", "price", "required", "", "type", "number", "min", "0", "step", "0.01", 3, "ngModelChange", "ngModel"], ["for", "duration"], ["id", "duration", "name", "duration", "required", "", "type", "number", "min", "1", 3, "ngModelChange", "ngModel"], [1, "form-actions"], ["type", "submit", 1, "save-btn", 3, "disabled"], ["type", "button", 1, "cancel-btn", 3, "click"], [1, "error-message"], [1, "service-content"], [1, "description"], [1, "service-details"], [1, "price"], [1, "duration"], [1, "service-actions"], [1, "edit-btn", 3, "click"], [1, "delete-btn", 3, "click"]], template: function AdminServicesComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 5)(1, "header", 6)(2, "h2");
        \u0275\u0275text(3, "Gestion des Services");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "button", 7);
        \u0275\u0275listener("click", function AdminServicesComponent_Template_button_click_4_listener() {
          return ctx.showAddForm = true;
        });
        \u0275\u0275text(5, " Nouveau Service ");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(6, AdminServicesComponent_Conditional_6_Template, 35, 11, "div", 8);
        \u0275\u0275elementStart(7, "div", 9);
        \u0275\u0275repeaterCreate(8, AdminServicesComponent_For_9_Template, 17, 7, "div", 10, _forTrack0);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275advance(6);
        \u0275\u0275conditional(6, ctx.showAddForm ? 6 : -1);
        \u0275\u0275advance(2);
        \u0275\u0275repeater(ctx.services);
      }
    }, dependencies: [CommonModule, NgIf, CurrencyPipe, FormsModule, \u0275NgNoValidate, DefaultValueAccessor, NumberValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, MinValidator, NgModel, NgForm], styles: ["\n\n.services-container[_ngcontent-%COMP%] {\n  padding: 20px;\n  max-width: 1200px;\n  margin: 0 auto;\n}\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 20px;\n}\n.page-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  color: #333;\n  margin: 0;\n}\n.page-header[_ngcontent-%COMP%]   .add-btn[_ngcontent-%COMP%] {\n  background: #4f46e5;\n  color: white;\n  padding: 8px 16px;\n  border: none;\n  border-radius: 4px;\n  cursor: pointer;\n}\n.page-header[_ngcontent-%COMP%]   .add-btn[_ngcontent-%COMP%]:hover {\n  background: #4338ca;\n}\n.form-container[_ngcontent-%COMP%] {\n  background: white;\n  padding: 20px;\n  border-radius: 8px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n  margin-bottom: 20px;\n}\n.form-container[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin-top: 0;\n  color: #333;\n}\n.form-group[_ngcontent-%COMP%] {\n  margin-bottom: 15px;\n}\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 5px;\n  color: #4b5563;\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], .form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 8px;\n  border: 1px solid #d1d5db;\n  border-radius: 4px;\n  resize: vertical;\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus, .form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #4f46e5;\n}\n.form-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 15px;\n}\n.form-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  margin-top: 20px;\n}\n.form-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  padding: 8px 16px;\n  border: none;\n  border-radius: 4px;\n  cursor: pointer;\n}\n.form-actions[_ngcontent-%COMP%]   button.save-btn[_ngcontent-%COMP%] {\n  background: #16a34a;\n  color: white;\n}\n.form-actions[_ngcontent-%COMP%]   button.save-btn[_ngcontent-%COMP%]:disabled {\n  background: #d1d5db;\n  cursor: not-allowed;\n}\n.form-actions[_ngcontent-%COMP%]   button.cancel-btn[_ngcontent-%COMP%] {\n  background: #dc2626;\n  color: white;\n}\n.services-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));\n  gap: 20px;\n}\n.service-card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 8px;\n  padding: 20px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n}\n.service-card[_ngcontent-%COMP%]   .service-content[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0 0 10px 0;\n  color: #333;\n  font-size: 1.2em;\n}\n.service-card[_ngcontent-%COMP%]   .service-content[_ngcontent-%COMP%]   .description[_ngcontent-%COMP%] {\n  color: #6b7280;\n  margin: 10px 0;\n  line-height: 1.5;\n}\n.service-card[_ngcontent-%COMP%]   .service-content[_ngcontent-%COMP%]   .service-details[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-top: 10px;\n}\n.service-card[_ngcontent-%COMP%]   .service-content[_ngcontent-%COMP%]   .service-details[_ngcontent-%COMP%]   .price[_ngcontent-%COMP%] {\n  color: #4f46e5;\n  font-weight: 600;\n  font-size: 1.1em;\n}\n.service-card[_ngcontent-%COMP%]   .service-content[_ngcontent-%COMP%]   .service-details[_ngcontent-%COMP%]   .duration[_ngcontent-%COMP%] {\n  color: #6b7280;\n  font-size: 0.9em;\n}\n.service-card[_ngcontent-%COMP%]   .service-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  margin-top: 15px;\n  padding-top: 15px;\n  border-top: 1px solid #e5e7eb;\n}\n.service-card[_ngcontent-%COMP%]   .service-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 6px 12px;\n  border: none;\n  border-radius: 4px;\n  cursor: pointer;\n  font-size: 0.9em;\n}\n.service-card[_ngcontent-%COMP%]   .service-actions[_ngcontent-%COMP%]   button.edit-btn[_ngcontent-%COMP%] {\n  background: #4f46e5;\n  color: white;\n}\n.service-card[_ngcontent-%COMP%]   .service-actions[_ngcontent-%COMP%]   button.delete-btn[_ngcontent-%COMP%] {\n  background: #dc2626;\n  color: white;\n}\n.service-card[_ngcontent-%COMP%]   .service-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\n  opacity: 0.9;\n}\n.no-data[_ngcontent-%COMP%] {\n  grid-column: 1/-1;\n  padding: 40px;\n  text-align: center;\n  color: #666;\n  background: white;\n  border-radius: 8px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n}\n@media (max-width: 768px) {\n  .form-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .services-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=admin-service.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminServicesComponent, { className: "AdminServicesComponent", filePath: "src\\app\\feature\\Dashboard\\DashboardComponent\\admin\\services\\admin-service.component.ts", lineNumber: 350 });
})();

// src/app/models/Appointment/appointment-types.ts
var AppointmentStatus;
(function(AppointmentStatus2) {
  AppointmentStatus2["PENDING"] = "pending";
  AppointmentStatus2["CONFIRMED"] = "confirmed";
  AppointmentStatus2["CANCELLED"] = "cancelled";
  AppointmentStatus2["COMPLETED"] = "completed";
  AppointmentStatus2["NOSHOW"] = "noshow";
})(AppointmentStatus || (AppointmentStatus = {}));

// src/app/feature/Dashboard/DashboardComponent/admin/appointments/admin-appointments.component.ts
function AdminAppointmentsComponent_div_6_option_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 27);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const client_r3 = ctx.$implicit;
    \u0275\u0275property("value", client_r3.clientId);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", client_r3.firstName, " ", client_r3.lastName, " ");
  }
}
function AdminAppointmentsComponent_div_6_span_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 28);
    \u0275\u0275text(1, " Veuillez s\xE9lectionner un client ");
    \u0275\u0275elementEnd();
  }
}
function AdminAppointmentsComponent_div_6_option_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 27);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const service_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("value", service_r4.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", service_r4.name, " (", ctx_r1.getServiceDuration(service_r4.id), ") ");
  }
}
function AdminAppointmentsComponent_div_6_span_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 28);
    \u0275\u0275text(1, " Veuillez s\xE9lectionner un service ");
    \u0275\u0275elementEnd();
  }
}
function AdminAppointmentsComponent_div_6_span_24_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Veuillez s\xE9lectionner une date");
    \u0275\u0275elementEnd();
  }
}
function AdminAppointmentsComponent_div_6_span_24_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "La date ne peut pas \xEAtre dans le pass\xE9");
    \u0275\u0275elementEnd();
  }
}
function AdminAppointmentsComponent_div_6_span_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 28);
    \u0275\u0275template(1, AdminAppointmentsComponent_div_6_span_24_span_1_Template, 2, 0, "span", 29)(2, AdminAppointmentsComponent_div_6_span_24_span_2_Template, 2, 0, "span", 29);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_2_0;
    let tmp_3_0;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (tmp_2_0 = ctx_r1.appointmentForm.get("appointmentDate")) == null ? null : tmp_2_0.errors == null ? null : tmp_2_0.errors["required"]);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (tmp_3_0 = ctx_r1.appointmentForm.get("appointmentDate")) == null ? null : tmp_3_0.errors == null ? null : tmp_3_0.errors["pastDate"]);
  }
}
function AdminAppointmentsComponent_div_6_option_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 27);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const slot_r5 = ctx.$implicit;
    \u0275\u0275property("value", slot_r5);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(slot_r5);
  }
}
function AdminAppointmentsComponent_div_6_span_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 28);
    \u0275\u0275text(1, " Veuillez s\xE9lectionner une heure ");
    \u0275\u0275elementEnd();
  }
}
function AdminAppointmentsComponent_div_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 7)(1, "form", 8);
    \u0275\u0275listener("ngSubmit", function AdminAppointmentsComponent_div_6_Template_form_ngSubmit_1_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.submitAppointment());
    });
    \u0275\u0275elementStart(2, "div", 9)(3, "div", 10)(4, "label", 11);
    \u0275\u0275text(5, "Client");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "select", 12)(7, "option", 13);
    \u0275\u0275text(8, "S\xE9lectionnez un client");
    \u0275\u0275elementEnd();
    \u0275\u0275template(9, AdminAppointmentsComponent_div_6_option_9_Template, 2, 3, "option", 14);
    \u0275\u0275elementEnd();
    \u0275\u0275template(10, AdminAppointmentsComponent_div_6_span_10_Template, 2, 0, "span", 15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 10)(12, "label", 16);
    \u0275\u0275text(13, "Service");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "select", 17);
    \u0275\u0275listener("change", function AdminAppointmentsComponent_div_6_Template_select_change_14_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onServiceChange());
    });
    \u0275\u0275elementStart(15, "option", 13);
    \u0275\u0275text(16, "S\xE9lectionnez un service");
    \u0275\u0275elementEnd();
    \u0275\u0275template(17, AdminAppointmentsComponent_div_6_option_17_Template, 2, 3, "option", 14);
    \u0275\u0275elementEnd();
    \u0275\u0275template(18, AdminAppointmentsComponent_div_6_span_18_Template, 2, 0, "span", 15);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "div", 9)(20, "div", 10)(21, "label", 18);
    \u0275\u0275text(22, "Date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "input", 19);
    \u0275\u0275listener("change", function AdminAppointmentsComponent_div_6_Template_input_change_23_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onDateChange());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275template(24, AdminAppointmentsComponent_div_6_span_24_Template, 3, 2, "span", 15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "div", 10)(26, "label", 20);
    \u0275\u0275text(27, "Heure");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "select", 21)(29, "option", 13);
    \u0275\u0275text(30, "S\xE9lectionnez une heure");
    \u0275\u0275elementEnd();
    \u0275\u0275template(31, AdminAppointmentsComponent_div_6_option_31_Template, 2, 2, "option", 14);
    \u0275\u0275elementEnd();
    \u0275\u0275template(32, AdminAppointmentsComponent_div_6_span_32_Template, 2, 0, "span", 15);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(33, "div", 10)(34, "label", 22);
    \u0275\u0275text(35, "Notes");
    \u0275\u0275elementEnd();
    \u0275\u0275element(36, "textarea", 23);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "div", 24)(38, "button", 25);
    \u0275\u0275text(39);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(40, "button", 26);
    \u0275\u0275listener("click", function AdminAppointmentsComponent_div_6_Template_button_click_40_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleAddForm());
    });
    \u0275\u0275text(41, "Annuler");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    let tmp_3_0;
    let tmp_5_0;
    let tmp_7_0;
    let tmp_9_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("formGroup", ctx_r1.appointmentForm);
    \u0275\u0275advance(8);
    \u0275\u0275property("ngForOf", ctx_r1.clients);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ((tmp_3_0 = ctx_r1.appointmentForm.get("clientId")) == null ? null : tmp_3_0.touched) && ((tmp_3_0 = ctx_r1.appointmentForm.get("clientId")) == null ? null : tmp_3_0.errors));
    \u0275\u0275advance(7);
    \u0275\u0275property("ngForOf", ctx_r1.services);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ((tmp_5_0 = ctx_r1.appointmentForm.get("serviceId")) == null ? null : tmp_5_0.touched) && ((tmp_5_0 = ctx_r1.appointmentForm.get("serviceId")) == null ? null : tmp_5_0.errors));
    \u0275\u0275advance(5);
    \u0275\u0275property("min", ctx_r1.minDate);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ((tmp_7_0 = ctx_r1.appointmentForm.get("appointmentDate")) == null ? null : tmp_7_0.touched) && ((tmp_7_0 = ctx_r1.appointmentForm.get("appointmentDate")) == null ? null : tmp_7_0.errors));
    \u0275\u0275advance(7);
    \u0275\u0275property("ngForOf", ctx_r1.availableTimeSlots);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ((tmp_9_0 = ctx_r1.appointmentForm.get("time")) == null ? null : tmp_9_0.touched) && ((tmp_9_0 = ctx_r1.appointmentForm.get("time")) == null ? null : tmp_9_0.errors));
    \u0275\u0275advance(6);
    \u0275\u0275property("disabled", !ctx_r1.appointmentForm.valid);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.editingAppointment ? "Mettre \xE0 jour" : "Cr\xE9er le rendez-vous", " ");
  }
}
function AdminAppointmentsComponent_div_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 30);
    \u0275\u0275text(1, " Aucun rendez-vous trouv\xE9 ");
    \u0275\u0275elementEnd();
  }
}
function AdminAppointmentsComponent_div_9_div_1_button_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 39);
    \u0275\u0275listener("click", function AdminAppointmentsComponent_div_9_div_1_button_18_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      const appointment_r7 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.editAppointment(appointment_r7));
    });
    \u0275\u0275text(1, "Modifier");
    \u0275\u0275elementEnd();
  }
}
function AdminAppointmentsComponent_div_9_div_1_button_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 40);
    \u0275\u0275listener("click", function AdminAppointmentsComponent_div_9_div_1_button_19_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r8);
      const appointment_r7 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.cancelAppointment(appointment_r7));
    });
    \u0275\u0275text(1, "Annuler");
    \u0275\u0275elementEnd();
  }
}
function AdminAppointmentsComponent_div_9_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 33)(1, "div", 34)(2, "h3");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p");
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "p");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "p");
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "p", 35);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "p");
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 36);
    \u0275\u0275template(18, AdminAppointmentsComponent_div_9_div_1_button_18_Template, 2, 0, "button", 37)(19, AdminAppointmentsComponent_div_9_div_1_button_19_Template, 2, 0, "button", 38);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const appointment_r7 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("Rendez-vous #", appointment_r7.appointmentId, "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Date : ", \u0275\u0275pipeBind2(6, 11, appointment_r7.appointmentDate, "dd/MM/yyyy"), "");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("Heure : ", ctx_r1.formatTime(appointment_r7.time), "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("Client : ", appointment_r7.client == null ? null : appointment_r7.client.firstName, " ", appointment_r7.client == null ? null : appointment_r7.client.lastName, "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Service : ", appointment_r7.service == null ? null : appointment_r7.service.name, "");
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r1.getStatusClass(appointment_r7.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" Statut : ", ctx_r1.getStatusLabel(appointment_r7.status), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Notes : ", appointment_r7.notes || "-", "");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r1.canEditAppointment(appointment_r7));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.canEditAppointment(appointment_r7));
  }
}
function AdminAppointmentsComponent_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 31);
    \u0275\u0275template(1, AdminAppointmentsComponent_div_9_div_1_Template, 20, 14, "div", 32);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.filteredAppointments);
  }
}
var AdminAppointmentsComponent = class _AdminAppointmentsComponent {
  constructor(adminService, fb, notificationService) {
    this.adminService = adminService;
    this.fb = fb;
    this.notificationService = notificationService;
    this.appointments = [];
    this.filteredAppointments = [];
    this.statusFilter = "";
    this.dateFilter = "";
    this.searchQuery = "";
    this.showAddForm = false;
    this.editingAppointment = null;
    this.clients = [];
    this.services = [];
    this.availableTimeSlots = [];
    this.subscriptions = [];
    this.AppointmentStatus = AppointmentStatus;
    this.minDate = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    this.initForm();
    this.generateTimeSlots();
  }
  ngOnInit() {
    this.loadInitialData();
    this.setupFormListeners();
  }
  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
  loadInitialData() {
    this.loadAppointments();
    this.loadClients();
    this.loadServices();
  }
  setupFormListeners() {
    const dateControl = this.appointmentForm.get("appointmentDate");
    const serviceControl = this.appointmentForm.get("serviceId");
    if (dateControl) {
      this.subscriptions.push(dateControl.valueChanges.subscribe(() => {
        this.onDateChange();
      }));
    }
    if (serviceControl) {
      this.subscriptions.push(serviceControl.valueChanges.subscribe(() => {
        this.onServiceChange();
      }));
    }
  }
  initForm() {
    this.appointmentForm = this.fb.group({
      clientId: ["", Validators.required],
      serviceId: ["", Validators.required],
      appointmentDate: ["", [Validators.required, this.dateValidator()]],
      time: ["", Validators.required],
      notes: [""]
    });
  }
  dateValidator() {
    return (control) => {
      const selectedDate = new Date(control.value);
      const today = /* @__PURE__ */ new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        return { pastDate: true };
      }
      return null;
    };
  }
  generateTimeSlots() {
    const slots = [];
    const startHour = 9;
    const endHour = 18;
    for (let hour = startHour; hour <= endHour; hour++) {
      const formattedHour = hour.toString().padStart(2, "0");
      slots.push(`${formattedHour}:00`);
      if (hour < endHour) {
        slots.push(`${formattedHour}:30`);
      }
    }
    return slots;
  }
  getSlotDuration(serviceId) {
    const service = this.services.find((s) => s.id === serviceId);
    return service ? service.duration : 60;
  }
  isTimeSlotAvailable(date, time) {
    const dateTime = /* @__PURE__ */ new Date(`${date}T${time}`);
    const now = /* @__PURE__ */ new Date();
    const selectedServiceId = this.appointmentForm.get("serviceId")?.value;
    const duration = this.getSlotDuration(selectedServiceId);
    if (dateTime < now) {
      return false;
    }
    const endTime = new Date(dateTime);
    endTime.setMinutes(endTime.getMinutes() + duration);
    if (endTime.getHours() > 18) {
      return false;
    }
    return !this.appointments.some((appointment) => {
      if (appointment.appointmentId === this.editingAppointment?.appointmentId) {
        return false;
      }
      const appointmentStart = /* @__PURE__ */ new Date(`${appointment.appointmentDate}T${appointment.time}`);
      const appointmentEnd = new Date(appointmentStart);
      const appointmentDuration = this.getSlotDuration(appointment.serviceId);
      appointmentEnd.setMinutes(appointmentEnd.getMinutes() + appointmentDuration);
      const slotEnd = new Date(dateTime);
      slotEnd.setMinutes(slotEnd.getMinutes() + duration);
      return dateTime < appointmentEnd && slotEnd > appointmentStart;
    });
  }
  onDateChange() {
    const selectedDate = this.appointmentForm.get("appointmentDate")?.value;
    if (selectedDate) {
      const allSlots = this.generateTimeSlots();
      this.availableTimeSlots = allSlots.filter((slot) => this.isTimeSlotAvailable(selectedDate, slot));
      if (this.availableTimeSlots.length === 0) {
        this.notificationService.warning("Aucun cr\xE9neau disponible pour cette date");
      }
    }
  }
  onServiceChange() {
    const serviceId = this.appointmentForm.get("serviceId")?.value;
    const service = this.services.find((s) => s.id === serviceId);
    if (service) {
      this.onDateChange();
      if (service.duration > 60) {
        this.notificationService.info(`Ce service n\xE9cessite ${service.duration} minutes`);
      }
    }
  }
  editAppointment(appointment) {
    this.editingAppointment = appointment;
    const appointmentDate = new Date(appointment.appointmentDate).toISOString().split("T")[0];
    this.appointmentForm.patchValue({
      clientId: appointment.clientId,
      serviceId: appointment.serviceId,
      appointmentDate,
      time: appointment.time,
      notes: appointment.notes || ""
    });
    this.onDateChange();
    this.showAddForm = true;
  }
  toggleAddForm() {
    this.showAddForm = !this.showAddForm;
    if (!this.showAddForm) {
      this.editingAppointment = null;
      this.appointmentForm.reset();
    } else {
      this.availableTimeSlots = this.generateTimeSlots();
    }
  }
  filterAppointments() {
    this.filteredAppointments = this.appointments.filter((appointment) => {
      const matchesStatus = !this.statusFilter || appointment.status.toLowerCase() === this.statusFilter.toLowerCase();
      const matchesDate = !this.dateFilter || new Date(appointment.appointmentDate).toISOString().split("T")[0] === this.dateFilter;
      const matchesSearch = !this.searchQuery || appointment.client && `${appointment.client.firstName} ${appointment.client.lastName}`.toLowerCase().includes(this.searchQuery.toLowerCase());
      return matchesStatus && matchesDate && matchesSearch;
    });
  }
  validateAppointmentData(data) {
    const now = /* @__PURE__ */ new Date();
    const appointmentDate = new Date(data.appointmentDate);
    if (appointmentDate < now) {
      this.notificationService.error("La date du rendez-vous ne peut pas \xEAtre dans le pass\xE9");
      return false;
    }
    if (!this.isTimeSlotAvailable(data.appointmentDate.toString(), data.time)) {
      this.notificationService.error("Ce cr\xE9neau horaire n'est plus disponible");
      return false;
    }
    const existingAppointment = this.appointments.find((a) => a.clientId === data.clientId && new Date(a.appointmentDate).toDateString() === appointmentDate.toDateString() && a.appointmentId !== this.editingAppointment?.appointmentId);
    if (existingAppointment) {
      this.notificationService.warning("Ce client a d\xE9j\xE0 un rendez-vous pr\xE9vu ce jour");
      return false;
    }
    return true;
  }
  submitAppointment() {
    if (!this.appointmentForm.valid) {
      this.notificationService.error("Veuillez remplir tous les champs obligatoires");
      this.markFormGroupTouched(this.appointmentForm);
      return;
    }
    const formValue = this.appointmentForm.value;
    const appointmentData = {
      clientId: formValue.clientId,
      serviceId: formValue.serviceId,
      appointmentDate: /* @__PURE__ */ new Date(`${formValue.appointmentDate}T${formValue.time}`),
      time: formValue.time,
      notes: formValue.notes || void 0,
      status: this.editingAppointment ? this.editingAppointment.status : AppointmentStatus.PENDING
    };
    if (this.validateAppointmentData(appointmentData)) {
      if (this.editingAppointment) {
        this.updateAppointment(this.editingAppointment.appointmentId, appointmentData);
      } else {
        this.createAppointment(appointmentData);
      }
    }
  }
  loadAppointments() {
    this.adminService.getAllAppointments().subscribe({
      next: (appointments) => {
        this.appointments = appointments;
        this.filterAppointments();
        this.notificationService.success("Rendez-vous charg\xE9s avec succ\xE8s");
      },
      error: (error) => {
        console.error("Erreur chargement rendez-vous:", error);
        this.notificationService.error("Erreur lors du chargement des rendez-vous");
      }
    });
  }
  loadClients() {
    this.adminService.getClients().subscribe({
      next: (clients) => {
        this.clients = clients;
      },
      error: (error) => {
        console.error("Erreur chargement clients:", error);
        this.notificationService.error("Erreur lors du chargement des clients");
      }
    });
  }
  loadServices() {
    this.adminService.getServices().subscribe({
      next: (services) => {
        this.services = services;
      },
      error: (error) => {
        console.error("Erreur chargement services:", error);
        this.notificationService.error("Erreur lors du chargement des services");
      }
    });
  }
  createAppointment(appointmentData) {
    this.adminService.createAppointment(appointmentData).subscribe({
      next: (_) => {
        this.loadAppointments();
        this.toggleAddForm();
        this.notificationService.success("Rendez-vous cr\xE9\xE9 avec succ\xE8s");
        this.sendConfirmationEmail(appointmentData);
      },
      error: (error) => {
        console.error("Erreur cr\xE9ation rendez-vous:", error);
        this.notificationService.error("Erreur lors de la cr\xE9ation du rendez-vous");
      }
    });
  }
  updateAppointment(id, appointmentData) {
    this.adminService.updateAppointment(id, appointmentData).subscribe({
      next: (_) => {
        this.loadAppointments();
        this.toggleAddForm();
        this.notificationService.success("Rendez-vous mis \xE0 jour avec succ\xE8s");
        this.sendUpdateNotification(appointmentData);
      },
      error: (error) => {
        console.error("Erreur mise \xE0 jour rendez-vous:", error);
        this.notificationService.error("Erreur lors de la mise \xE0 jour du rendez-vous");
      }
    });
  }
  updateStatus(appointmentId, newStatus) {
    const appointment = this.appointments.find((a) => a.appointmentId === appointmentId);
    if (!appointment) {
      this.notificationService.error("Rendez-vous non trouv\xE9");
      return;
    }
    this.adminService.updateAppointmentStatus(appointmentId, newStatus).subscribe({
      next: (_) => {
        this.loadAppointments();
        this.notificationService.success(`Statut du rendez-vous mis \xE0 jour : ${newStatus}`);
        if (newStatus === AppointmentStatus.CONFIRMED) {
          this.sendConfirmationEmail(appointment);
        }
      },
      error: (error) => {
        console.error("Erreur mise \xE0 jour statut:", error);
        this.notificationService.error("Erreur lors de la mise \xE0 jour du statut");
      }
    });
  }
  markFormGroupTouched(formGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
  sendConfirmationEmail(appointment) {
    const client = this.clients.find((c) => c.clientId === appointment.clientId);
    if (client?.user?.email) {
      this.notificationService.success(`Un email de confirmation a \xE9t\xE9 envoy\xE9 \xE0 ${client.user.email}`);
    }
  }
  sendUpdateNotification(appointment) {
    const client = this.clients.find((c) => c.clientId === appointment.clientId);
    if (client?.user?.email) {
      this.notificationService.info(`Un email de mise \xE0 jour a \xE9t\xE9 envoy\xE9 \xE0 ${client.user.email}`);
    }
  }
  formatDate(date) {
    return new Date(date).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    });
  }
  formatTime(time) {
    return time.padStart(5, "0");
  }
  getAllStatuses() {
    return Object.values(AppointmentStatus);
  }
  getStatusLabel(status) {
    const statusLabels = {
      [AppointmentStatus.PENDING]: "En attente",
      [AppointmentStatus.CONFIRMED]: "Confirm\xE9",
      [AppointmentStatus.CANCELLED]: "Annul\xE9",
      [AppointmentStatus.COMPLETED]: "Termin\xE9",
      [AppointmentStatus.NOSHOW]: "Non pr\xE9sent\xE9"
    };
    return statusLabels[status] || status;
  }
  getServiceDuration(serviceId) {
    const service = this.services.find((s) => s.id === serviceId);
    if (!service)
      return "";
    const hours = Math.floor(service.duration / 60);
    const minutes = service.duration % 60;
    return hours > 0 ? `${hours}h${minutes > 0 ? minutes : ""}` : `${minutes}min`;
  }
  getStatusClass(status) {
    const classes = {
      [AppointmentStatus.PENDING]: "bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full",
      [AppointmentStatus.CONFIRMED]: "bg-blue-100 text-blue-800 px-2 py-1 rounded-full",
      [AppointmentStatus.CANCELLED]: "bg-red-100 text-red-800 px-2 py-1 rounded-full",
      [AppointmentStatus.COMPLETED]: "bg-green-100 text-green-800 px-2 py-1 rounded-full",
      [AppointmentStatus.NOSHOW]: "bg-gray-100 text-gray-800 px-2 py-1 rounded-full"
    };
    return classes[status] || "bg-gray-100 text-gray-800 px-2 py-1 rounded-full";
  }
  canEditAppointment(appointment) {
    return appointment.status !== AppointmentStatus.CANCELLED && appointment.status !== AppointmentStatus.COMPLETED && new Date(appointment.appointmentDate) > /* @__PURE__ */ new Date();
  }
  cancelAppointment(appointment) {
    if (confirm(`\xCAtes-vous s\xFBr de vouloir annuler ce rendez-vous avec ${appointment.client?.firstName} ${appointment.client?.lastName} ?`)) {
      this.updateStatus(appointment.appointmentId, AppointmentStatus.CANCELLED);
    }
  }
  static {
    this.\u0275fac = function AdminAppointmentsComponent_Factory(t) {
      return new (t || _AdminAppointmentsComponent)(\u0275\u0275directiveInject(AdminService), \u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(NotificationService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminAppointmentsComponent, selectors: [["app-admin-appointments"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 10, vars: 4, consts: [[1, "appointments-container"], [1, "page-header"], [1, "add-btn", 3, "click"], ["class", "appointment-form", 4, "ngIf"], [1, "appointments-list"], ["class", "no-data", 4, "ngIf"], ["class", "appointments-grid", 4, "ngIf"], [1, "appointment-form"], [3, "ngSubmit", "formGroup"], [1, "form-row"], [1, "form-group"], ["for", "client"], ["id", "client", "formControlName", "clientId", "required", ""], ["value", ""], [3, "value", 4, "ngFor", "ngForOf"], ["class", "error-message", 4, "ngIf"], ["for", "service"], ["id", "service", "formControlName", "serviceId", "required", "", 3, "change"], ["for", "date"], ["type", "date", "id", "date", "formControlName", "appointmentDate", "required", "", 3, "change", "min"], ["for", "time"], ["id", "time", "formControlName", "time", "required", ""], ["for", "notes"], ["id", "notes", "formControlName", "notes", "rows", "3", "placeholder", "Ajoutez des notes ou instructions particuli\xE8res..."], [1, "form-actions"], ["type", "submit", 1, "submit-btn", 3, "disabled"], ["type", "button", 1, "cancel-btn", 3, "click"], [3, "value"], [1, "error-message"], [4, "ngIf"], [1, "no-data"], [1, "appointments-grid"], ["class", "appointment-card", 4, "ngFor", "ngForOf"], [1, "appointment-card"], [1, "appointment-content"], [1, "status", 3, "ngClass"], [1, "appointment-actions"], ["class", "edit-btn", 3, "click", 4, "ngIf"], ["class", "cancel-btn", 3, "click", 4, "ngIf"], [1, "edit-btn", 3, "click"], [1, "cancel-btn", 3, "click"]], template: function AdminAppointmentsComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "header", 1)(2, "h2");
        \u0275\u0275text(3, "Gestion des Rendez-vous");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "button", 2);
        \u0275\u0275listener("click", function AdminAppointmentsComponent_Template_button_click_4_listener() {
          return ctx.toggleAddForm();
        });
        \u0275\u0275text(5);
        \u0275\u0275elementEnd()();
        \u0275\u0275template(6, AdminAppointmentsComponent_div_6_Template, 42, 11, "div", 3);
        \u0275\u0275elementStart(7, "div", 4);
        \u0275\u0275template(8, AdminAppointmentsComponent_div_8_Template, 2, 0, "div", 5)(9, AdminAppointmentsComponent_div_9_Template, 2, 1, "div", 6);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275advance(5);
        \u0275\u0275textInterpolate1(" ", ctx.showAddForm ? "Fermer" : "Nouveau Rendez-vous", " ");
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.showAddForm);
        \u0275\u0275advance(2);
        \u0275\u0275property("ngIf", ctx.filteredAppointments.length === 0);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.filteredAppointments.length > 0);
      }
    }, dependencies: [CommonModule, NgClass, NgForOf, NgIf, DatePipe, FormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, ReactiveFormsModule, FormGroupDirective, FormControlName], styles: ["\n\n.appointments-container[_ngcontent-%COMP%] {\n  padding: 20px;\n  max-width: 1200px;\n  margin: 0 auto;\n}\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 20px;\n}\n.page-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  color: #333;\n  margin: 0;\n}\n.page-header[_ngcontent-%COMP%]   .add-btn[_ngcontent-%COMP%] {\n  background: #4f46e5;\n  color: white;\n  padding: 8px 16px;\n  border: none;\n  border-radius: 8px;\n  cursor: pointer;\n}\n.page-header[_ngcontent-%COMP%]   .add-btn[_ngcontent-%COMP%]:hover {\n  background: #4338ca;\n}\n.appointment-form[_ngcontent-%COMP%] {\n  background: white;\n  padding: 20px;\n  border-radius: 16px;\n  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);\n  margin-bottom: 20px;\n}\n.form-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 20px;\n  margin-bottom: 15px;\n}\n.form-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  margin-bottom: 5px;\n  color: #4b5563;\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], .form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%], .form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  padding: 8px;\n  border: 1px solid #d1d5db;\n  border-radius: 8px;\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus, .form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:focus, .form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #4f46e5;\n}\n.form-group[_ngcontent-%COMP%]   .error-message[_ngcontent-%COMP%] {\n  color: #b91c1c;\n  margin-top: 5px;\n}\n.form-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  margin-top: 20px;\n}\n.form-actions[_ngcontent-%COMP%]   .submit-btn[_ngcontent-%COMP%] {\n  background: #16a34a;\n  color: white;\n  padding: 10px 20px;\n  border: none;\n  border-radius: 8px;\n  cursor: pointer;\n}\n.form-actions[_ngcontent-%COMP%]   .submit-btn[_ngcontent-%COMP%]:disabled {\n  background: #d1d5db;\n  cursor: not-allowed;\n}\n.form-actions[_ngcontent-%COMP%]   .cancel-btn[_ngcontent-%COMP%] {\n  background: #dc2626;\n  color: white;\n  padding: 10px 20px;\n  border: none;\n  border-radius: 8px;\n  cursor: pointer;\n}\n.appointments-list[_ngcontent-%COMP%] {\n  margin-top: 20px;\n}\n.appointments-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));\n  gap: 20px;\n}\n.appointment-card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 16px;\n  padding: 20px;\n  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n}\n.appointment-content[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0 0 10px 0;\n  color: #333;\n  font-size: 1.5rem;\n}\n.appointment-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #6b7280;\n  margin: 5px 0;\n  font-size: 1rem;\n}\n.appointment-content[_ngcontent-%COMP%]   .status[_ngcontent-%COMP%] {\n  font-weight: 600;\n}\n.appointment-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  margin-top: 20px;\n}\n.appointment-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 10px 20px;\n  border: none;\n  border-radius: 8px;\n  cursor: pointer;\n  font-size: 1rem;\n}\n.appointment-actions[_ngcontent-%COMP%]   button.edit-btn[_ngcontent-%COMP%] {\n  background: #4f46e5;\n  color: white;\n}\n.appointment-actions[_ngcontent-%COMP%]   button.cancel-btn[_ngcontent-%COMP%] {\n  background: #dc2626;\n  color: white;\n}\n.appointment-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\n  opacity: 0.9;\n}\n.no-data[_ngcontent-%COMP%] {\n  grid-column: 1/-1;\n  padding: 40px;\n  text-align: center;\n  color: #666;\n  background: white;\n  border-radius: 16px;\n  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);\n}\n@media (max-width: 768px) {\n  .appointments-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=admin-appointments.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminAppointmentsComponent, { className: "AdminAppointmentsComponent", filePath: "src\\app\\feature\\Dashboard\\DashboardComponent\\admin\\appointments\\admin-appointments.component.ts", lineNumber: 341 });
})();

// src/app/services/type/type.service.ts
var TypeService = class _TypeService {
  constructor(http) {
    this.http = http;
    this.API_URL = "http://localhost:2024/api/types";
  }
  getTypes() {
    return this.http.get(this.API_URL).pipe(catchError(this.handleError));
  }
  getTypeById(id) {
    return this.http.get(`${this.API_URL}/${id}`).pipe(catchError(this.handleError));
  }
  createType(type) {
    if (!type.name?.trim()) {
      return throwError(() => new Error("Le nom du type est requis"));
    }
    if (type.name.length > 200) {
      return throwError(() => new Error("Le nom ne doit pas d\xE9passer 200 caract\xE8res"));
    }
    return this.http.post(this.API_URL, type).pipe(catchError(this.handleError));
  }
  updateType(id, type) {
    return this.http.put(`${this.API_URL}/${id}`, type).pipe(catchError(this.handleError));
  }
  deleteType(id) {
    const numericId = Number(id);
    if (isNaN(numericId)) {
      return throwError(() => new Error("ID invalide"));
    }
    return this.http.delete(`${this.API_URL}/${numericId}`);
  }
  checkTypeExists(name) {
    return this.getTypes().pipe(map((types) => types.some((type) => type.name.toLowerCase() === name.toLowerCase())));
  }
  handleError(error) {
    let errorMessage = "Une erreur est survenue";
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      switch (error.status) {
        case 400:
          errorMessage = "Donn\xE9es invalides";
          break;
        case 404:
          errorMessage = "Type non trouv\xE9";
          break;
        case 409:
          errorMessage = "Ce type existe d\xE9j\xE0";
          break;
        default:
          errorMessage = "Erreur serveur";
      }
    }
    return throwError(() => errorMessage);
  }
  static {
    this.\u0275fac = function TypeService_Factory(t) {
      return new (t || _TypeService)(\u0275\u0275inject(HttpClient));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _TypeService, factory: _TypeService.\u0275fac, providedIn: "root" });
  }
};

// src/app/feature/Dashboard/DashboardComponent/admin/products/product-form/admin-product-form.component.ts
var _forTrack02 = ($index, $item) => $item.id_type;
function AdminProductFormComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 3);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.errorMessage, " ");
  }
}
function AdminProductFormComponent_Conditional_12_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Le nom est requis ");
  }
}
function AdminProductFormComponent_Conditional_12_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Le nom doit contenir au moins 3 caract\xE8res ");
  }
}
function AdminProductFormComponent_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8);
    \u0275\u0275template(1, AdminProductFormComponent_Conditional_12_Conditional_1_Template, 1, 0)(2, AdminProductFormComponent_Conditional_12_Conditional_2_Template, 1, 0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_1_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional(1, ((tmp_1_0 = ctx_r0.productForm.get("name")) == null ? null : tmp_1_0.errors == null ? null : tmp_1_0.errors["required"]) ? 1 : ((tmp_1_0 = ctx_r0.productForm.get("name")) == null ? null : tmp_1_0.errors == null ? null : tmp_1_0.errors["minlength"]) ? 2 : -1);
  }
}
function AdminProductFormComponent_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8);
    \u0275\u0275text(1, " La description est requise ");
    \u0275\u0275elementEnd();
  }
}
function AdminProductFormComponent_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8);
    \u0275\u0275text(1, " Prix invalide ");
    \u0275\u0275elementEnd();
  }
}
function AdminProductFormComponent_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8);
    \u0275\u0275text(1, " Stock invalide ");
    \u0275\u0275elementEnd();
  }
}
function AdminProductFormComponent_For_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 19);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const type_r2 = ctx.$implicit;
    \u0275\u0275property("value", type_r2.id_type);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(type_r2.name);
  }
}
function AdminProductFormComponent_Conditional_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8);
    \u0275\u0275text(1, " Le type est requis ");
    \u0275\u0275elementEnd();
  }
}
function AdminProductFormComponent_Conditional_43_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 22);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" Fichier s\xE9lectionn\xE9: ", ctx_r0.selectedFile.name, " ");
  }
}
function AdminProductFormComponent_Conditional_44_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 23);
    \u0275\u0275element(1, "img", 29);
    \u0275\u0275elementStart(2, "button", 30);
    \u0275\u0275listener("click", function AdminProductFormComponent_Conditional_44_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.removeImage());
    });
    \u0275\u0275text(3, " Supprimer ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("src", ctx_r0.currentImage, \u0275\u0275sanitizeUrl);
  }
}
function AdminProductFormComponent_Conditional_53_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Traitement en cours...");
    \u0275\u0275elementEnd();
  }
}
function AdminProductFormComponent_Conditional_54_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.isEditMode ? "Mettre \xE0 jour" : "Ajouter");
  }
}
var AdminProductFormComponent = class _AdminProductFormComponent {
  constructor(fb, productService, typeService, router, route) {
    this.fb = fb;
    this.productService = productService;
    this.typeService = typeService;
    this.router = router;
    this.route = route;
    this.productForm = this.initForm();
    this.isLoading = false;
    this.isEditMode = false;
    this.errorMessage = "";
    this.selectedFile = null;
    this.currentImage = null;
    this.types = [];
  }
  initForm() {
    return this.fb.group({
      name: ["", [Validators.required, Validators.minLength(3)]],
      description: ["", Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      active: [true],
      typeId: [null, Validators.required],
      requiresPrescription: [false]
    });
  }
  ngOnInit() {
    this.loadTypes();
    this.checkEditMode();
  }
  loadTypes() {
    this.typeService.getTypes().subscribe({
      next: (types) => this.types = types,
      error: () => this.errorMessage = "Erreur lors du chargement des types"
    });
  }
  checkEditMode() {
    return __async(this, null, function* () {
      const id = this.route.snapshot.params["id"];
      if (id) {
        this.isEditMode = true;
        yield this.loadProduct(Number(id));
      }
    });
  }
  loadProduct(id) {
    return __async(this, null, function* () {
      try {
        const product = yield firstValueFrom(this.productService.getProductById(id));
        this.productForm.patchValue({
          name: product.name,
          description: product.description,
          price: product.price,
          stock: product.stock,
          active: product.active,
          typeId: product.typeId,
          requiresPrescription: false
          // valeur par défaut
        });
        this.currentImage = product.imageUrls?.[0] ?? null;
      } catch (error) {
        this.errorMessage = "Erreur lors du chargement du produit";
      }
    });
  }
  onSubmit() {
    return __async(this, null, function* () {
      if (this.productForm.invalid || this.isLoading)
        return;
      this.isLoading = true;
      try {
        const formValue = this.productForm.value;
        const productData = {
          id_product: this.isEditMode ? Number(this.route.snapshot.params["id"]) : 0,
          name: formValue.name,
          description: formValue.description,
          price: formValue.price,
          stock: formValue.stock,
          active: formValue.active,
          typeId: formValue.typeId,
          imageUrls: this.currentImage ? [this.currentImage] : []
        };
        if (this.isEditMode) {
          yield firstValueFrom(this.productService.updateProduct(productData.id_product, productData));
        } else {
          yield firstValueFrom(this.productService.createProduct(productData));
        }
        this.router.navigate(["/admin/products"]);
      } catch (error) {
        this.errorMessage = "Erreur lors de l'enregistrement du produit";
      } finally {
        this.isLoading = false;
      }
    });
  }
  onFileSelected(event) {
    const input = event.target;
    if (input.files?.length) {
      this.selectedFile = input.files[0];
    }
  }
  removeImage() {
    this.currentImage = null;
    this.selectedFile = null;
  }
  isFieldInvalid(fieldName) {
    const field = this.productForm.get(fieldName);
    return !!field && field.invalid && (field.dirty || field.touched);
  }
  goBack() {
    this.router.navigate(["/admin/products"]);
  }
  static {
    this.\u0275fac = function AdminProductFormComponent_Factory(t) {
      return new (t || _AdminProductFormComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(ProductService), \u0275\u0275directiveInject(TypeService), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(ActivatedRoute));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminProductFormComponent, selectors: [["app-admin-product-form"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 55, vars: 22, consts: [[1, "admin-product-form"], [1, "form-header"], ["type", "button", 1, "back-btn", 3, "click"], [1, "error-alert"], [1, "form-container", 3, "ngSubmit", "formGroup"], [1, "form-group"], ["for", "name"], ["id", "name", "type", "text", "formControlName", "name", 1, "form-control"], [1, "error-message"], ["for", "description"], ["id", "description", "formControlName", "description", "rows", "4", 1, "form-control"], [1, "form-row"], ["for", "price"], ["id", "price", "type", "number", "formControlName", "price", "step", "0.01", "min", "0", 1, "form-control"], ["for", "stock"], ["id", "stock", "type", "number", "formControlName", "stock", "min", "0", 1, "form-control"], ["for", "typeId"], ["id", "typeId", "formControlName", "typeId", 1, "form-control"], ["value", ""], [3, "value"], [1, "image-upload"], ["type", "file", "accept", "image/*", 1, "file-input", 3, "change"], [1, "selected-file"], [1, "current-image"], [1, "checkbox-label"], ["type", "checkbox", "formControlName", "active"], [1, "form-actions"], ["type", "button", 1, "cancel-btn", 3, "click"], ["type", "submit", 1, "submit-btn", 3, "disabled"], ["alt", "Image actuelle", 3, "src"], ["type", "button", 1, "remove-image", 3, "click"]], template: function AdminProductFormComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2");
        \u0275\u0275text(3);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "button", 2);
        \u0275\u0275listener("click", function AdminProductFormComponent_Template_button_click_4_listener() {
          return ctx.goBack();
        });
        \u0275\u0275text(5, " Retour ");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(6, AdminProductFormComponent_Conditional_6_Template, 2, 1, "div", 3);
        \u0275\u0275elementStart(7, "form", 4);
        \u0275\u0275listener("ngSubmit", function AdminProductFormComponent_Template_form_ngSubmit_7_listener() {
          return ctx.onSubmit();
        });
        \u0275\u0275elementStart(8, "div", 5)(9, "label", 6);
        \u0275\u0275text(10, "Nom du produit*");
        \u0275\u0275elementEnd();
        \u0275\u0275element(11, "input", 7);
        \u0275\u0275template(12, AdminProductFormComponent_Conditional_12_Template, 3, 1, "div", 8);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(13, "div", 5)(14, "label", 9);
        \u0275\u0275text(15, "Description*");
        \u0275\u0275elementEnd();
        \u0275\u0275element(16, "textarea", 10);
        \u0275\u0275template(17, AdminProductFormComponent_Conditional_17_Template, 2, 0, "div", 8);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(18, "div", 11)(19, "div", 5)(20, "label", 12);
        \u0275\u0275text(21, "Prix*");
        \u0275\u0275elementEnd();
        \u0275\u0275element(22, "input", 13);
        \u0275\u0275template(23, AdminProductFormComponent_Conditional_23_Template, 2, 0, "div", 8);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(24, "div", 5)(25, "label", 14);
        \u0275\u0275text(26, "Stock*");
        \u0275\u0275elementEnd();
        \u0275\u0275element(27, "input", 15);
        \u0275\u0275template(28, AdminProductFormComponent_Conditional_28_Template, 2, 0, "div", 8);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(29, "div", 5)(30, "label", 16);
        \u0275\u0275text(31, "Type de produit*");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(32, "select", 17)(33, "option", 18);
        \u0275\u0275text(34, "S\xE9lectionner un type");
        \u0275\u0275elementEnd();
        \u0275\u0275repeaterCreate(35, AdminProductFormComponent_For_36_Template, 2, 2, "option", 19, _forTrack02);
        \u0275\u0275elementEnd();
        \u0275\u0275template(37, AdminProductFormComponent_Conditional_37_Template, 2, 0, "div", 8);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(38, "div", 5)(39, "label");
        \u0275\u0275text(40, "Image du produit");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(41, "div", 20)(42, "input", 21);
        \u0275\u0275listener("change", function AdminProductFormComponent_Template_input_change_42_listener($event) {
          return ctx.onFileSelected($event);
        });
        \u0275\u0275elementEnd();
        \u0275\u0275template(43, AdminProductFormComponent_Conditional_43_Template, 2, 1, "div", 22)(44, AdminProductFormComponent_Conditional_44_Template, 4, 1, "div", 23);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(45, "div", 5)(46, "label", 24);
        \u0275\u0275element(47, "input", 25);
        \u0275\u0275text(48, " Produit actif ");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(49, "div", 26)(50, "button", 27);
        \u0275\u0275listener("click", function AdminProductFormComponent_Template_button_click_50_listener() {
          return ctx.goBack();
        });
        \u0275\u0275text(51, " Annuler ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(52, "button", 28);
        \u0275\u0275template(53, AdminProductFormComponent_Conditional_53_Template, 2, 0, "span")(54, AdminProductFormComponent_Conditional_54_Template, 2, 1);
        \u0275\u0275elementEnd()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate(ctx.isEditMode ? "Modifier le produit" : "Ajouter un produit");
        \u0275\u0275advance(3);
        \u0275\u0275conditional(6, ctx.errorMessage ? 6 : -1);
        \u0275\u0275advance();
        \u0275\u0275property("formGroup", ctx.productForm);
        \u0275\u0275advance(4);
        \u0275\u0275classProp("is-invalid", ctx.isFieldInvalid("name"));
        \u0275\u0275advance();
        \u0275\u0275conditional(12, ctx.isFieldInvalid("name") ? 12 : -1);
        \u0275\u0275advance(4);
        \u0275\u0275classProp("is-invalid", ctx.isFieldInvalid("description"));
        \u0275\u0275advance();
        \u0275\u0275conditional(17, ctx.isFieldInvalid("description") ? 17 : -1);
        \u0275\u0275advance(5);
        \u0275\u0275classProp("is-invalid", ctx.isFieldInvalid("price"));
        \u0275\u0275advance();
        \u0275\u0275conditional(23, ctx.isFieldInvalid("price") ? 23 : -1);
        \u0275\u0275advance(4);
        \u0275\u0275classProp("is-invalid", ctx.isFieldInvalid("stock"));
        \u0275\u0275advance();
        \u0275\u0275conditional(28, ctx.isFieldInvalid("stock") ? 28 : -1);
        \u0275\u0275advance(4);
        \u0275\u0275classProp("is-invalid", ctx.isFieldInvalid("typeId"));
        \u0275\u0275advance(3);
        \u0275\u0275repeater(ctx.types);
        \u0275\u0275advance(2);
        \u0275\u0275conditional(37, ctx.isFieldInvalid("typeId") ? 37 : -1);
        \u0275\u0275advance(6);
        \u0275\u0275conditional(43, ctx.selectedFile ? 43 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(44, ctx.currentImage ? 44 : -1);
        \u0275\u0275advance(8);
        \u0275\u0275property("disabled", ctx.productForm.invalid || ctx.isLoading);
        \u0275\u0275advance();
        \u0275\u0275conditional(53, ctx.isLoading ? 53 : 54);
      }
    }, dependencies: [CommonModule, ReactiveFormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, CheckboxControlValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, MinValidator, FormGroupDirective, FormControlName], styles: ["\n\n.admin-product-form[_ngcontent-%COMP%] {\n  max-width: 800px;\n  margin: 0 auto;\n  padding: 2rem;\n  background: white;\n  border-radius: 8px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n}\n.form-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 2rem;\n}\n.form-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #1a1a1a;\n}\n.form-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1.5rem;\n}\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 0.5rem;\n  color: #4b5563;\n  font-weight: 500;\n}\n.form-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 1rem;\n}\n.form-control[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 0.75rem;\n  border: 1px solid #d1d5db;\n  border-radius: 6px;\n  transition: all 0.2s;\n}\n.form-control[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #4f46e5;\n  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);\n}\n.form-control.is-invalid[_ngcontent-%COMP%] {\n  border-color: #dc2626;\n}\n.error-message[_ngcontent-%COMP%] {\n  color: #dc2626;\n  font-size: 0.875rem;\n  margin-top: 0.25rem;\n}\n.error-alert[_ngcontent-%COMP%] {\n  background: #fee2e2;\n  border: 1px solid #fecaca;\n  color: #dc2626;\n  padding: 1rem;\n  border-radius: 6px;\n  margin-bottom: 1.5rem;\n}\n.image-upload[_ngcontent-%COMP%] {\n  padding: 1rem;\n  border: 2px dashed #d1d5db;\n  border-radius: 6px;\n}\n.image-upload[_ngcontent-%COMP%]   .current-image[_ngcontent-%COMP%] {\n  margin-top: 1rem;\n}\n.image-upload[_ngcontent-%COMP%]   .current-image[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  max-width: 200px;\n  border-radius: 4px;\n}\n.image-upload[_ngcontent-%COMP%]   .current-image[_ngcontent-%COMP%]   .remove-image[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 0.5rem;\n  color: #dc2626;\n  background: none;\n  border: none;\n  cursor: pointer;\n}\n.image-upload[_ngcontent-%COMP%]   .selected-file[_ngcontent-%COMP%] {\n  margin-top: 0.5rem;\n  font-size: 0.875rem;\n  color: #4b5563;\n}\n.checkbox-label[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  cursor: pointer;\n}\n.form-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 1rem;\n  margin-top: 2rem;\n}\n.form-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  padding: 0.75rem 1.5rem;\n  border-radius: 6px;\n  font-weight: 500;\n  cursor: pointer;\n}\n.form-actions[_ngcontent-%COMP%]   button.submit-btn[_ngcontent-%COMP%] {\n  background: #16a34a;\n  color: white;\n  border: none;\n}\n.form-actions[_ngcontent-%COMP%]   button.submit-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #15803d;\n}\n.form-actions[_ngcontent-%COMP%]   button.submit-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.7;\n  cursor: not-allowed;\n}\n.form-actions[_ngcontent-%COMP%]   button.cancel-btn[_ngcontent-%COMP%] {\n  background: white;\n  border: 1px solid #d1d5db;\n  color: #4b5563;\n}\n.form-actions[_ngcontent-%COMP%]   button.cancel-btn[_ngcontent-%COMP%]:hover {\n  background: #f9fafb;\n}\n@media (max-width: 640px) {\n  .form-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=admin-product-form.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminProductFormComponent, { className: "AdminProductFormComponent", filePath: "src\\app\\feature\\Dashboard\\DashboardComponent\\admin\\products\\product-form\\admin-product-form.component.ts", lineNumber: 340 });
})();

// src/app/feature/Dashboard/DashboardComponent/admin/products/admin-products.component.ts
function AdminProductsComponent_div_6_option_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 27);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const type_r3 = ctx.$implicit;
    \u0275\u0275property("value", type_r3.id_type);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", type_r3.name, " ");
  }
}
function AdminProductsComponent_div_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 8)(1, "h3");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "form", 9, 0);
    \u0275\u0275listener("ngSubmit", function AdminProductsComponent_div_6_Template_form_ngSubmit_3_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onSubmit());
    });
    \u0275\u0275elementStart(5, "div", 10)(6, "label", 11);
    \u0275\u0275text(7, "Nom du produit*");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "input", 12);
    \u0275\u0275twoWayListener("ngModelChange", function AdminProductsComponent_div_6_Template_input_ngModelChange_8_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.newProduct.name, $event) || (ctx_r1.newProduct.name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 10)(10, "label", 13);
    \u0275\u0275text(11, "Description*");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "textarea", 14);
    \u0275\u0275twoWayListener("ngModelChange", function AdminProductsComponent_div_6_Template_textarea_ngModelChange_12_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.newProduct.description, $event) || (ctx_r1.newProduct.description = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "div", 15)(14, "div", 10)(15, "label", 16);
    \u0275\u0275text(16, "Prix (\u20AC)*");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "input", 17);
    \u0275\u0275twoWayListener("ngModelChange", function AdminProductsComponent_div_6_Template_input_ngModelChange_17_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.newProduct.price, $event) || (ctx_r1.newProduct.price = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "div", 10)(19, "label", 18);
    \u0275\u0275text(20, "Stock*");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "input", 19);
    \u0275\u0275twoWayListener("ngModelChange", function AdminProductsComponent_div_6_Template_input_ngModelChange_21_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.newProduct.stock, $event) || (ctx_r1.newProduct.stock = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(22, "div", 10)(23, "label", 20);
    \u0275\u0275text(24, "Cat\xE9gorie*");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "select", 21);
    \u0275\u0275twoWayListener("ngModelChange", function AdminProductsComponent_div_6_Template_select_ngModelChange_25_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.newProduct.typeId, $event) || (ctx_r1.newProduct.typeId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(26, "option", 22);
    \u0275\u0275text(27, "S\xE9lectionner une cat\xE9gorie");
    \u0275\u0275elementEnd();
    \u0275\u0275template(28, AdminProductsComponent_div_6_option_28_Template, 2, 2, "option", 23);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(29, "div", 24)(30, "button", 25);
    \u0275\u0275text(31);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "button", 26);
    \u0275\u0275listener("click", function AdminProductsComponent_div_6_Template_button_click_32_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleAddForm());
    });
    \u0275\u0275text(33, " Annuler ");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const productForm_r4 = \u0275\u0275reference(4);
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.editingProduct ? "Modifier le produit" : "Ajouter un produit");
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.newProduct.name);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.newProduct.description);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.newProduct.price);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.newProduct.stock);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.newProduct.typeId);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", ctx_r1.types);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", !productForm_r4.valid);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.editingProduct ? "Mettre \xE0 jour" : "Ajouter", " ");
  }
}
function AdminProductsComponent_div_8_span_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 43);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "currency");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const product_r6 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 1, product_r6.price * (1 - product_r6.activePromotion.discountPercentage / 100), "EUR"), " ");
  }
}
function AdminProductsComponent_div_8_option_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 27);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const promo_r7 = ctx.$implicit;
    \u0275\u0275property("value", promo_r7.id_promotion);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", promo_r7.description, " (-", promo_r7.discountPercentage, "%) ");
  }
}
function AdminProductsComponent_div_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 28)(1, "div", 29)(2, "h3");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 30);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 31)(7, "div", 32)(8, "span", 33);
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275template(11, AdminProductsComponent_div_8_span_11_Template, 3, 4, "span", 34);
    \u0275\u0275elementStart(12, "span", 35);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 36)(15, "select", 37);
    \u0275\u0275twoWayListener("ngModelChange", function AdminProductsComponent_div_8_Template_select_ngModelChange_15_listener($event) {
      const product_r6 = \u0275\u0275restoreView(_r5).$implicit;
      \u0275\u0275twoWayBindingSet(product_r6.selectedPromotionId, $event) || (product_r6.selectedPromotionId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(16, "option", 38);
    \u0275\u0275text(17, "S\xE9lectionner une promotion");
    \u0275\u0275elementEnd();
    \u0275\u0275template(18, AdminProductsComponent_div_8_option_18_Template, 2, 3, "option", 23);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "button", 39);
    \u0275\u0275listener("click", function AdminProductsComponent_div_8_Template_button_click_19_listener() {
      const product_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.applyPromotion(product_r6, product_r6.selectedPromotionId));
    });
    \u0275\u0275text(20, " Appliquer ");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(21, "div", 40)(22, "button", 41);
    \u0275\u0275listener("click", function AdminProductsComponent_div_8_Template_button_click_22_listener() {
      const product_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.editProduct(product_r6));
    });
    \u0275\u0275text(23, " Modifier ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "button", 42);
    \u0275\u0275listener("click", function AdminProductsComponent_div_8_Template_button_click_24_listener() {
      const product_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.deleteProduct(product_r6.id_product));
    });
    \u0275\u0275text(25, " Supprimer ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const product_r6 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(product_r6.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(product_r6.description);
    \u0275\u0275advance(3);
    \u0275\u0275classProp("original-price", product_r6.activePromotion);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(10, 13, product_r6.price, "EUR"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", product_r6.activePromotion);
    \u0275\u0275advance();
    \u0275\u0275classProp("low-stock", product_r6.stock < 5);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" Stock: ", product_r6.stock, " ");
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", product_r6.selectedPromotionId);
    \u0275\u0275advance();
    \u0275\u0275property("ngValue", null);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r1.availablePromotions);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", product_r6.selectedPromotionId === void 0 || product_r6.selectedPromotionId === null);
  }
}
function AdminProductsComponent_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 44);
    \u0275\u0275text(1, "Aucun produit disponible");
    \u0275\u0275elementEnd();
  }
}
var AdminProductsComponent = class _AdminProductsComponent {
  constructor(productService, promotionService, notificationService, typeService) {
    this.productService = productService;
    this.promotionService = promotionService;
    this.notificationService = notificationService;
    this.typeService = typeService;
    this.products = [];
    this.availablePromotions = [];
    this.showAddForm = false;
    this.editingProduct = null;
    this.types = [];
    this.newProduct = {
      name: "",
      description: "",
      price: 0,
      stock: 0,
      active: true,
      typeId: 0
    };
  }
  // Initialisation du composant
  ngOnInit() {
    this.loadProducts();
    this.loadPromotions();
    this.loadTypes();
  }
  // Charge les catégories de produits
  loadTypes() {
    this.typeService.getTypes().subscribe({
      next: (typesData) => {
        this.types = typesData;
      },
      error: () => this.notificationService.error("Erreur lors du chargement des cat\xE9gories")
    });
  }
  // Bascule l'affichage du formulaire d'ajout/édition
  toggleAddForm() {
    this.showAddForm = !this.showAddForm;
    if (!this.showAddForm) {
      this.resetForm();
    }
  }
  // Gère la soumission du formulaire
  onSubmit() {
    if (this.editingProduct) {
      this.updateProduct();
    } else {
      this.addProduct();
    }
  }
  // Ajoute un nouveau produit
  addProduct() {
    const productExists = this.products.some((product) => product.name.toLowerCase() === this.newProduct.name.toLowerCase());
    if (productExists) {
      this.notificationService.error("Un produit avec ce nom existe d\xE9j\xE0");
      return;
    }
    const newProduct = __spreadProps(__spreadValues({}, this.newProduct), {
      id_product: 0,
      imageUrls: []
    });
    this.productService.createProduct(newProduct).subscribe({
      next: () => {
        this.notificationService.success("Produit ajout\xE9 avec succ\xE8s");
        this.loadProducts();
        this.toggleAddForm();
      },
      error: () => this.notificationService.error("Erreur lors de l'ajout du produit")
    });
  }
  // Met à jour un produit existant
  updateProduct() {
    if (!this.editingProduct)
      return;
    const updatedProduct = __spreadProps(__spreadValues({}, this.newProduct), {
      id_product: this.editingProduct.id_product,
      price: Number(this.newProduct.price),
      stock: Number(this.newProduct.stock),
      typeId: Number(this.newProduct.typeId),
      imageUrls: this.editingProduct.imageUrls || []
    });
    this.productService.updateProduct(this.editingProduct.id_product, updatedProduct).subscribe({
      next: (response) => {
        this.notificationService.success("Produit mis \xE0 jour avec succ\xE8s");
        this.loadProducts();
        this.toggleAddForm();
      },
      error: (error) => {
        this.notificationService.error("Erreur lors de la mise \xE0 jour: " + (error.error?.message || "Une erreur est survenue"));
      }
    });
  }
  // Charge les promotions actives
  loadPromotions() {
    this.promotionService.getActivePromotions().subscribe({
      next: (promotions) => {
        this.availablePromotions = promotions;
      },
      error: (error) => {
        console.error("Erreur chargement promotions:", error);
        this.notificationService.error("Erreur lors du chargement des promotions");
      }
    });
  }
  // Prépare l'édition d'un produit
  editProduct(product) {
    this.editingProduct = __spreadValues({}, product);
    this.newProduct = {
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      active: product.active,
      typeId: product.typeId || 0
    };
    this.showAddForm = true;
  }
  // Supprime un produit
  deleteProduct(id) {
    if (confirm("\xCAtes-vous s\xFBr de vouloir supprimer ce produit ?")) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          this.notificationService.success("Produit supprim\xE9");
          this.loadProducts();
        },
        error: () => this.notificationService.error("Erreur lors de la suppression")
      });
    }
  }
  // Charge tous les produits avec leurs promotions
  loadProducts() {
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        this.products = products.map((product) => {
          const hasActivePromotion = product.promotion && this.isPromotionActive(product.promotion);
          return __spreadProps(__spreadValues({}, product), {
            activePromotion: hasActivePromotion && product.promotion ? {
              id_promotion: product.promotion.id_promotion,
              description: product.promotion.description,
              discountPercentage: product.promotion.discountPercentage,
              startDate: product.promotion.startDate,
              endDate: product.promotion.endDate
            } : void 0,
            selectedPromotionId: hasActivePromotion && product.promotion ? product.promotion.id_promotion : void 0
          });
        });
      },
      error: (error) => {
        console.error("Error loading products:", error);
        this.notificationService.error("Erreur lors du chargement des produits");
      }
    });
  }
  // Vérifie si une promotion est active
  isPromotionActive(promotion) {
    if (!promotion)
      return false;
    const now = /* @__PURE__ */ new Date();
    const startDate = new Date(promotion.startDate);
    const endDate = new Date(promotion.endDate);
    return now >= startDate && now <= endDate;
  }
  // Applique une promotion à un produit
  applyPromotion(product, promotionId) {
    if (!promotionId)
      return;
    this.productService.applyPromotion(product.id_product, promotionId).subscribe({
      next: () => {
        const selectedPromotion = this.availablePromotions.find((p) => p.id_promotion === promotionId);
        if (selectedPromotion) {
          product.activePromotion = {
            id_promotion: selectedPromotion.id_promotion,
            description: selectedPromotion.description,
            discountPercentage: selectedPromotion.discountPercentage,
            startDate: selectedPromotion.startDate,
            endDate: selectedPromotion.endDate
          };
          product.promotionPrice = product.price * (1 - selectedPromotion.discountPercentage / 100);
        }
        this.notificationService.success("Promotion appliqu\xE9e avec succ\xE8s");
        this.loadProducts();
      },
      error: (error) => {
        console.error("Error applying promotion:", error);
        this.notificationService.error("Erreur lors de l'application de la promotion: " + (error.error?.message || "Une erreur est survenue"));
        product.selectedPromotionId = void 0;
      }
    });
  }
  // Réinitialise le formulaire
  resetForm() {
    this.editingProduct = null;
    this.newProduct = {
      name: "",
      description: "",
      price: 0,
      stock: 0,
      active: true,
      typeId: 0
    };
  }
  static {
    this.\u0275fac = function AdminProductsComponent_Factory(t) {
      return new (t || _AdminProductsComponent)(\u0275\u0275directiveInject(ProductService), \u0275\u0275directiveInject(PromotionService), \u0275\u0275directiveInject(NotificationService), \u0275\u0275directiveInject(TypeService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminProductsComponent, selectors: [["app-admin-products"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 10, vars: 3, consts: [["productForm", "ngForm"], [1, "products-container"], [1, "page-header"], [1, "add-btn", 3, "click"], ["class", "form-container", 4, "ngIf"], [1, "products-grid"], ["class", "product-card", 4, "ngFor", "ngForOf"], ["class", "no-data", 4, "ngIf"], [1, "form-container"], [3, "ngSubmit"], [1, "form-group"], ["for", "name"], ["id", "name", "name", "name", "required", "", "type", "text", "placeholder", "Ex: Cr\xE8me hydratante", 3, "ngModelChange", "ngModel"], ["for", "description"], ["id", "description", "name", "description", "required", "", "rows", "3", "placeholder", "D\xE9crivez le produit...", 3, "ngModelChange", "ngModel"], [1, "form-row"], ["for", "price"], ["id", "price", "name", "price", "required", "", "type", "number", "min", "0", "step", "0.01", 3, "ngModelChange", "ngModel"], ["for", "stock"], ["id", "stock", "name", "stock", "required", "", "type", "number", "min", "0", 3, "ngModelChange", "ngModel"], ["for", "typeId"], ["id", "typeId", "name", "typeId", "required", "", 3, "ngModelChange", "ngModel"], ["value", ""], [3, "value", 4, "ngFor", "ngForOf"], [1, "form-actions"], ["type", "submit", 1, "save-btn", 3, "disabled"], ["type", "button", 1, "cancel-btn", 3, "click"], [3, "value"], [1, "product-card"], [1, "product-content"], [1, "description"], [1, "product-info"], [1, "price-stock"], [1, "price"], ["class", "promotion-price", 4, "ngIf"], [1, "stock"], [1, "promotion-controls"], [1, "promotion-select", 3, "ngModelChange", "ngModel"], [3, "ngValue"], [1, "promotion-btn", "apply", 3, "click", "disabled"], [1, "product-actions"], [1, "edit-btn", 3, "click"], [1, "delete-btn", 3, "click"], [1, "promotion-price"], [1, "no-data"]], template: function AdminProductsComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 1)(1, "header", 2)(2, "h2");
        \u0275\u0275text(3, "Gestion des Produits");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "button", 3);
        \u0275\u0275listener("click", function AdminProductsComponent_Template_button_click_4_listener() {
          return ctx.toggleAddForm();
        });
        \u0275\u0275text(5, " Ajouter un produit ");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(6, AdminProductsComponent_div_6_Template, 34, 9, "div", 4);
        \u0275\u0275elementStart(7, "div", 5);
        \u0275\u0275template(8, AdminProductsComponent_div_8_Template, 26, 16, "div", 6)(9, AdminProductsComponent_div_9_Template, 2, 0, "div", 7);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275advance(6);
        \u0275\u0275property("ngIf", ctx.showAddForm);
        \u0275\u0275advance(2);
        \u0275\u0275property("ngForOf", ctx.products);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.products.length === 0);
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, CurrencyPipe, FormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, MinValidator, NgModel, NgForm], styles: ["\n\n.products-container[_ngcontent-%COMP%] {\n  padding: 20px;\n  max-width: 1200px;\n  margin: 0 auto;\n}\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 20px;\n}\n.add-btn[_ngcontent-%COMP%] {\n  background: #4f46e5;\n  color: white;\n  padding: 8px 16px;\n  border: none;\n  border-radius: 4px;\n  cursor: pointer;\n  transition: background 0.3s;\n}\n.add-btn[_ngcontent-%COMP%]:hover {\n  background: #4338ca;\n}\n.form-container[_ngcontent-%COMP%] {\n  background: white;\n  padding: 20px;\n  border-radius: 8px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n  margin-bottom: 20px;\n}\n.form-group[_ngcontent-%COMP%] {\n  margin-bottom: 15px;\n}\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 5px;\n  color: #4b5563;\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], .form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%], .form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 8px;\n  border: 1px solid #d1d5db;\n  border-radius: 4px;\n}\n.form-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 15px;\n}\n.products-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));\n  gap: 20px;\n}\n.product-card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 8px;\n  padding: 20px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n}\n.product-content[_ngcontent-%COMP%] {\n  margin-bottom: 15px;\n}\n.product-info[_ngcontent-%COMP%] {\n  margin: 15px 0;\n}\n.price-stock[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 10px;\n}\n.original-price[_ngcontent-%COMP%] {\n  text-decoration: line-through;\n  color: #6b7280;\n}\n.promotion-price[_ngcontent-%COMP%] {\n  color: #dc2626;\n  font-weight: bold;\n}\n.low-stock[_ngcontent-%COMP%] {\n  color: #dc2626;\n}\n.promotion-controls[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n}\n.promotion-select[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.form-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  margin-top: 20px;\n}\n.save-btn[_ngcontent-%COMP%], .cancel-btn[_ngcontent-%COMP%] {\n  padding: 8px 16px;\n  border: none;\n  border-radius: 4px;\n  cursor: pointer;\n  transition: background 0.3s;\n}\n.save-btn[_ngcontent-%COMP%] {\n  background: #4f46e5;\n  color: white;\n}\n.save-btn[_ngcontent-%COMP%]:disabled {\n  background: #d1d5db;\n  cursor: not-allowed;\n}\n.cancel-btn[_ngcontent-%COMP%] {\n  background: #dc2626;\n  color: white;\n}\n.edit-btn[_ngcontent-%COMP%], .delete-btn[_ngcontent-%COMP%] {\n  padding: 8px 16px;\n  border: none;\n  border-radius: 4px;\n  cursor: pointer;\n  transition: background 0.3s;\n}\n.edit-btn[_ngcontent-%COMP%] {\n  background: #4f46e5;\n  color: white;\n}\n.delete-btn[_ngcontent-%COMP%] {\n  background: #dc2626;\n  color: white;\n}\n.no-data[_ngcontent-%COMP%] {\n  grid-column: 1/-1;\n  text-align: center;\n  padding: 40px;\n  background: white;\n  border-radius: 8px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n}\n@media (max-width: 768px) {\n  .form-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .products-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=admin-products.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminProductsComponent, { className: "AdminProductsComponent", filePath: "src\\app\\feature\\Dashboard\\DashboardComponent\\admin\\products\\admin-products.component.ts", lineNumber: 353 });
})();

// src/app/feature/Dashboard/DashboardComponent/admin/type/type-form/admin-type-form.component.ts
function AdminTypeFormComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 1);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.errorMessage, " ");
  }
}
function AdminTypeFormComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.successMessage, " ");
  }
}
function AdminTypeFormComponent_Conditional_10_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Le nom du type est obligatoire ");
  }
}
function AdminTypeFormComponent_Conditional_10_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Le nom ne doit pas d\xE9passer 200 caract\xE8res ");
  }
}
function AdminTypeFormComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7);
    \u0275\u0275template(1, AdminTypeFormComponent_Conditional_10_Conditional_1_Template, 1, 0)(2, AdminTypeFormComponent_Conditional_10_Conditional_2_Template, 1, 0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_1_0;
    let tmp_2_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional(1, ((tmp_1_0 = ctx_r0.typeForm.get("name")) == null ? null : tmp_1_0.errors == null ? null : tmp_1_0.errors["required"]) ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(2, ((tmp_2_0 = ctx_r0.typeForm.get("name")) == null ? null : tmp_2_0.errors == null ? null : tmp_2_0.errors["maxlength"]) ? 2 : -1);
  }
}
function AdminTypeFormComponent_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7);
    \u0275\u0275text(1, " La description est obligatoire ");
    \u0275\u0275elementEnd();
  }
}
function AdminTypeFormComponent_Conditional_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7);
    \u0275\u0275text(1, " L'ic\xF4ne est obligatoire ");
    \u0275\u0275elementEnd();
  }
}
var AdminTypeFormComponent = class _AdminTypeFormComponent {
  constructor(fb, typeService, router) {
    this.fb = fb;
    this.typeService = typeService;
    this.router = router;
    this.typeForm = this.fb.group({
      name: ["", [Validators.required, Validators.maxLength(200)]],
      description: ["", [Validators.required]],
      icon: ["", [Validators.required]]
    });
    this.errorMessage = "";
    this.successMessage = "";
    this.isSubmitting = false;
    this.initForm();
  }
  initForm() {
    this.typeForm = this.fb.group({
      name: ["", [Validators.required, Validators.maxLength(200)]],
      description: ["", [Validators.required]],
      icon: ["", [Validators.required]]
    });
  }
  ngOnInit() {
  }
  shouldShowError(fieldName) {
    const field = this.typeForm.get(fieldName);
    return !!field && !field.valid && (field.dirty || field.touched);
  }
  onSubmit() {
    return __async(this, null, function* () {
      if (this.typeForm.invalid) {
        Object.keys(this.typeForm.controls).forEach((key) => {
          const control = this.typeForm.get(key);
          if (control) {
            control.markAsTouched();
          }
        });
        return;
      }
      if (this.isSubmitting)
        return;
      this.isSubmitting = true;
      this.errorMessage = "";
      this.successMessage = "";
      try {
        const existingType = yield this.typeService.checkTypeExists(this.typeForm.value.name).toPromise();
        if (existingType) {
          this.errorMessage = "Ce type existe d\xE9j\xE0";
          this.isSubmitting = false;
          return;
        }
        yield this.typeService.createType(this.typeForm.value).toPromise();
        this.successMessage = "Type ajout\xE9 avec succ\xE8s";
        setTimeout(() => {
          this.router.navigate(["/admin/types"]);
        }, 1500);
      } catch (error) {
        this.errorMessage = "Erreur lors de la cr\xE9ation du type";
      } finally {
        this.isSubmitting = false;
      }
    });
  }
  onCancel() {
    this.router.navigate(["/admin/types"]);
  }
  static {
    this.\u0275fac = function AdminTypeFormComponent_Factory(t) {
      return new (t || _AdminTypeFormComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(TypeService), \u0275\u0275directiveInject(Router));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminTypeFormComponent, selectors: [["app-admin-type-form"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 42, vars: 12, consts: [[1, "type-form-container"], [1, "error-alert"], [1, "success-alert"], [1, "type-form", 3, "ngSubmit", "formGroup"], [1, "form-group"], ["for", "name"], ["id", "name", "type", "text", "formControlName", "name", "maxlength", "200"], [1, "error-message"], ["for", "description"], ["id", "description", "formControlName", "description", "rows", "3"], ["for", "icon"], ["id", "icon", "formControlName", "icon"], ["value", ""], ["value", "\u{1F9F4}"], ["value", "\u{1F486}\u200D\u2640\uFE0F"], ["value", "\u{1F484}"], ["value", "\u{1F444}"], ["value", "\u2728"], ["value", "\u{1F485}"], ["value", "\u{1F33F}"], [1, "form-actions"], ["type", "button", 1, "cancel-btn", 3, "click"], ["type", "submit", 1, "submit-btn"]], template: function AdminTypeFormComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "h2");
        \u0275\u0275text(2, "Ajouter un type");
        \u0275\u0275elementEnd();
        \u0275\u0275template(3, AdminTypeFormComponent_Conditional_3_Template, 2, 1, "div", 1)(4, AdminTypeFormComponent_Conditional_4_Template, 2, 1, "div", 2);
        \u0275\u0275elementStart(5, "form", 3);
        \u0275\u0275listener("ngSubmit", function AdminTypeFormComponent_Template_form_ngSubmit_5_listener() {
          return ctx.onSubmit();
        });
        \u0275\u0275elementStart(6, "div", 4)(7, "label", 5);
        \u0275\u0275text(8, "Nom du type*");
        \u0275\u0275elementEnd();
        \u0275\u0275element(9, "input", 6);
        \u0275\u0275template(10, AdminTypeFormComponent_Conditional_10_Template, 3, 2, "div", 7);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(11, "div", 4)(12, "label", 8);
        \u0275\u0275text(13, "Description*");
        \u0275\u0275elementEnd();
        \u0275\u0275element(14, "textarea", 9);
        \u0275\u0275template(15, AdminTypeFormComponent_Conditional_15_Template, 2, 0, "div", 7);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(16, "div", 4)(17, "label", 10);
        \u0275\u0275text(18, "Ic\xF4ne*");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(19, "select", 11)(20, "option", 12);
        \u0275\u0275text(21, "S\xE9lectionner une ic\xF4ne");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(22, "option", 13);
        \u0275\u0275text(23, "\u{1F9F4} Cr\xE8mes");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(24, "option", 14);
        \u0275\u0275text(25, "\u{1F486}\u200D\u2640\uFE0F Soins");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(26, "option", 15);
        \u0275\u0275text(27, "\u{1F484} Maquillage");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(28, "option", 16);
        \u0275\u0275text(29, "\u{1F444} L\xE8vres");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(30, "option", 17);
        \u0275\u0275text(31, "\u2728 Soins visage");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(32, "option", 18);
        \u0275\u0275text(33, "\u{1F485} Ongles");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(34, "option", 19);
        \u0275\u0275text(35, "\u{1F33F} Bio & Naturel");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(36, AdminTypeFormComponent_Conditional_36_Template, 2, 0, "div", 7);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(37, "div", 20)(38, "button", 21);
        \u0275\u0275listener("click", function AdminTypeFormComponent_Template_button_click_38_listener() {
          return ctx.onCancel();
        });
        \u0275\u0275text(39, " Annuler ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(40, "button", 22);
        \u0275\u0275text(41, " Ajouter ");
        \u0275\u0275elementEnd()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(3);
        \u0275\u0275conditional(3, ctx.errorMessage ? 3 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(4, ctx.successMessage ? 4 : -1);
        \u0275\u0275advance();
        \u0275\u0275property("formGroup", ctx.typeForm);
        \u0275\u0275advance(4);
        \u0275\u0275classProp("error", ctx.shouldShowError("name"));
        \u0275\u0275advance();
        \u0275\u0275conditional(10, ctx.shouldShowError("name") ? 10 : -1);
        \u0275\u0275advance(4);
        \u0275\u0275classProp("error", ctx.shouldShowError("description"));
        \u0275\u0275advance();
        \u0275\u0275conditional(15, ctx.shouldShowError("description") ? 15 : -1);
        \u0275\u0275advance(4);
        \u0275\u0275classProp("error", ctx.shouldShowError("icon"));
        \u0275\u0275advance(17);
        \u0275\u0275conditional(36, ctx.shouldShowError("icon") ? 36 : -1);
      }
    }, dependencies: [CommonModule, ReactiveFormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, MaxLengthValidator, FormGroupDirective, FormControlName], styles: ["\n\n.type-form-container[_ngcontent-%COMP%] {\n  background: white;\n  padding: 2rem;\n  max-width: 800px;\n  margin: 0 auto;\n}\nh2[_ngcontent-%COMP%] {\n  color: #1a1a1a;\n  margin-bottom: 2rem;\n  font-weight: 500;\n}\n.form-group[_ngcontent-%COMP%] {\n  margin-bottom: 1.5rem;\n}\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 0.5rem;\n  color: #374151;\n  font-size: 0.875rem;\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], .form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%], .form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 0.75rem;\n  border: 1px solid #d1d5db;\n  border-radius: 4px;\n  font-size: 0.875rem;\n}\n.form-group[_ngcontent-%COMP%]   input.error[_ngcontent-%COMP%], .form-group[_ngcontent-%COMP%]   textarea.error[_ngcontent-%COMP%], .form-group[_ngcontent-%COMP%]   select.error[_ngcontent-%COMP%] {\n  border-color: #dc2626;\n}\n.form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  resize: vertical;\n}\n.form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  background-color: white;\n}\n.error-alert[_ngcontent-%COMP%] {\n  background: #fee2e2;\n  border: 1px solid #fecaca;\n  color: #dc2626;\n  padding: 0.75rem;\n  border-radius: 4px;\n  margin-bottom: 1rem;\n}\n.success-alert[_ngcontent-%COMP%] {\n  background: #dcfce7;\n  border: 1px solid #bbf7d0;\n  color: #15803d;\n  padding: 0.75rem;\n  border-radius: 4px;\n  margin-bottom: 1rem;\n}\n.error-message[_ngcontent-%COMP%] {\n  color: #dc2626;\n  font-size: 0.75rem;\n  margin-top: 0.25rem;\n}\n.form-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 1rem;\n  margin-top: 2rem;\n}\n.form-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  padding: 0.5rem 1rem;\n  border-radius: 4px;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.form-actions[_ngcontent-%COMP%]   button.cancel-btn[_ngcontent-%COMP%] {\n  background: white;\n  border: 1px solid #d1d5db;\n  color: #4b5563;\n}\n.form-actions[_ngcontent-%COMP%]   button.cancel-btn[_ngcontent-%COMP%]:hover {\n  background: #f3f4f6;\n}\n.form-actions[_ngcontent-%COMP%]   button.submit-btn[_ngcontent-%COMP%] {\n  background: #10b981;\n  color: white;\n  border: none;\n}\n.form-actions[_ngcontent-%COMP%]   button.submit-btn[_ngcontent-%COMP%]:hover {\n  background: #059669;\n}\n.form-actions[_ngcontent-%COMP%]   button.submit-btn[_ngcontent-%COMP%]:disabled {\n  background: #9ca3af;\n  cursor: not-allowed;\n}\n/*# sourceMappingURL=admin-type-form.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminTypeFormComponent, { className: "AdminTypeFormComponent", filePath: "src\\app\\feature\\Dashboard\\DashboardComponent\\admin\\type\\type-form\\admin-type-form.component.ts", lineNumber: 212 });
})();

// src/app/feature/Dashboard/DashboardComponent/admin/type/admin-types.component.ts
var _forTrack03 = ($index, $item) => $item.id_type;
function AdminTypesComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6);
    \u0275\u0275element(1, "span", 14);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "Chargement des cat\xE9gories...");
    \u0275\u0275elementEnd()();
  }
}
function AdminTypesComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 7)(1, "p");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 15);
    \u0275\u0275listener("click", function AdminTypesComponent_Conditional_5_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.loadTypes());
    });
    \u0275\u0275text(4, "R\xE9essayer");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.error);
  }
}
function AdminTypesComponent_For_8_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 20);
    \u0275\u0275text(1, "Ordonnance requise");
    \u0275\u0275elementEnd();
  }
}
function AdminTypesComponent_For_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 16)(1, "div", 17)(2, "div", 18);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 19);
    \u0275\u0275template(5, AdminTypesComponent_For_8_Conditional_5_Template, 2, 0, "span", 20);
    \u0275\u0275elementStart(6, "h3");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 21)(11, "button", 22);
    \u0275\u0275listener("click", function AdminTypesComponent_For_8_Template_button_click_11_listener() {
      const type_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.editType(type_r4));
    });
    \u0275\u0275text(12, " Modifier ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "button", 23);
    \u0275\u0275listener("click", function AdminTypesComponent_For_8_Template_button_click_13_listener() {
      const type_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.confirmDelete(type_r4));
    });
    \u0275\u0275text(14, " Supprimer ");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const type_r4 = ctx.$implicit;
    \u0275\u0275classProp("requires-prescription", type_r4.prescription_required);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(type_r4.icon);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(5, type_r4.prescription_required ? 5 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(type_r4.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(type_r4.description);
  }
}
function AdminTypesComponent_Conditional_14_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 28);
    \u0275\u0275text(1, "Le nom est requis");
    \u0275\u0275elementEnd();
  }
}
function AdminTypesComponent_Conditional_14_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 28);
    \u0275\u0275text(1, "La description est requise");
    \u0275\u0275elementEnd();
  }
}
function AdminTypesComponent_Conditional_14_Conditional_47_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 28);
    \u0275\u0275text(1, "L'ic\xF4ne est requise");
    \u0275\u0275elementEnd();
  }
}
function AdminTypesComponent_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 13)(1, "div", 24)(2, "h3");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "form", 25, 0);
    \u0275\u0275listener("ngSubmit", function AdminTypesComponent_Conditional_14_Template_form_ngSubmit_4_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onSubmit());
    });
    \u0275\u0275elementStart(6, "div", 26)(7, "label");
    \u0275\u0275text(8, "Nom");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "input", 27, 1);
    \u0275\u0275twoWayListener("ngModelChange", function AdminTypesComponent_Conditional_14_Template_input_ngModelChange_9_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.currentType.name, $event) || (ctx_r1.currentType.name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275template(11, AdminTypesComponent_Conditional_14_Conditional_11_Template, 2, 0, "div", 28);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 26)(13, "label");
    \u0275\u0275text(14, "Description");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "textarea", 29, 2);
    \u0275\u0275twoWayListener("ngModelChange", function AdminTypesComponent_Conditional_14_Template_textarea_ngModelChange_15_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.currentType.description, $event) || (ctx_r1.currentType.description = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275template(17, AdminTypesComponent_Conditional_14_Conditional_17_Template, 2, 0, "div", 28);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "div", 26)(19, "label");
    \u0275\u0275text(20, "Ic\xF4ne");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "select", 30, 3);
    \u0275\u0275twoWayListener("ngModelChange", function AdminTypesComponent_Conditional_14_Template_select_ngModelChange_21_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.currentType.icon, $event) || (ctx_r1.currentType.icon = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(23, "option", 31);
    \u0275\u0275text(24, "S\xE9lectionner une ic\xF4ne");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "option", 32);
    \u0275\u0275text(26, "\u{1F48A} M\xE9dicaments");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "option", 33);
    \u0275\u0275text(28, "\u{1F3E5} Ordonnance");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "option", 34);
    \u0275\u0275text(30, "\u{1F9EA} Pr\xE9parations");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "option", 35);
    \u0275\u0275text(32, "\u{1F33F} Naturel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "option", 36);
    \u0275\u0275text(34, "\u{1FA7A} Mat\xE9riel m\xE9dical");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "option", 37);
    \u0275\u0275text(36, "\u{1F476} P\xE9diatrie");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "option", 38);
    \u0275\u0275text(38, "\u{1F9B7} Dentaire");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "option", 39);
    \u0275\u0275text(40, "\u{1F441}\uFE0F Optique");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "option", 40);
    \u0275\u0275text(42, "\u{1F9F4} Dermocosm\xE9tique");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "option", 41);
    \u0275\u0275text(44, "\u{1FA79} Premiers secours");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(45, "option", 42);
    \u0275\u0275text(46, "\u267F Maintien \xE0 domicile");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(47, AdminTypesComponent_Conditional_14_Conditional_47_Template, 2, 0, "div", 28);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(48, "div", 26)(49, "label")(50, "input", 43);
    \u0275\u0275twoWayListener("ngModelChange", function AdminTypesComponent_Conditional_14_Template_input_ngModelChange_50_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.currentType.prescription_required, $event) || (ctx_r1.currentType.prescription_required = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275text(51, " Ordonnance requise ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(52, "div", 44)(53, "button", 45);
    \u0275\u0275listener("click", function AdminTypesComponent_Conditional_14_Template_button_click_53_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cancelEdit());
    });
    \u0275\u0275text(54, " Annuler ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(55, "button", 46);
    \u0275\u0275text(56);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const typeForm_r6 = \u0275\u0275reference(5);
    const name_r7 = \u0275\u0275reference(10);
    const description_r8 = \u0275\u0275reference(16);
    const icon_r9 = \u0275\u0275reference(22);
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", ctx_r1.editingType ? "Modifier" : "Ajouter", " une cat\xE9gorie");
    \u0275\u0275advance(6);
    \u0275\u0275classProp("invalid", name_r7.invalid && name_r7.touched);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.currentType.name);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(11, name_r7.invalid && name_r7.touched ? 11 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275classProp("invalid", description_r8.invalid && description_r8.touched);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.currentType.description);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(17, description_r8.invalid && description_r8.touched ? 17 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275classProp("invalid", icon_r9.invalid && icon_r9.touched);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.currentType.icon);
    \u0275\u0275advance(26);
    \u0275\u0275conditional(47, icon_r9.invalid && icon_r9.touched ? 47 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.currentType.prescription_required);
    \u0275\u0275advance(5);
    \u0275\u0275property("disabled", typeForm_r6.invalid || !ctx_r1.currentType.name || !ctx_r1.currentType.description || !ctx_r1.currentType.icon);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.editingType ? "Modifier" : "Ajouter", " ");
  }
}
function AdminTypesComponent_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 13)(1, "div", 24)(2, "h3");
    \u0275\u0275text(3, "Confirmation de suppression");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p");
    \u0275\u0275text(5, "\xCAtes-vous s\xFBr de vouloir supprimer cette cat\xE9gorie ?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 44)(7, "button", 47);
    \u0275\u0275listener("click", function AdminTypesComponent_Conditional_15_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cancelDelete());
    });
    \u0275\u0275text(8, "Annuler");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "button", 48);
    \u0275\u0275listener("click", function AdminTypesComponent_Conditional_15_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.deleteType());
    });
    \u0275\u0275text(10, "Confirmer");
    \u0275\u0275elementEnd()()()();
  }
}
var AdminTypesComponent = class _AdminTypesComponent {
  constructor(typeService, notificationService) {
    this.typeService = typeService;
    this.notificationService = notificationService;
    this.types = [];
    this.loading = false;
    this.error = "";
    this.showForm = false;
    this.showDeleteModal = false;
    this.editingType = null;
    this.typeToDelete = null;
    this.currentType = {
      name: "",
      description: "",
      icon: "",
      prescription_required: false
    };
  }
  ngOnInit() {
    this.loadTypes();
  }
  // Chargement des types
  loadTypes() {
    this.loading = true;
    this.error = "";
    this.typeService.getTypes().subscribe({
      next: (types) => {
        this.types = types;
        this.loading = false;
      },
      error: (error) => {
        this.error = "Erreur lors du chargement des types";
        this.loading = false;
        console.error("Erreur:", error);
      }
    });
  }
  // Gestion du formulaire d'ajout
  startAdd() {
    this.editingType = null;
    this.resetForm();
    this.showForm = true;
  }
  // Gestion de la modification
  editType(type) {
    this.editingType = type;
    this.currentType = __spreadValues({}, type);
    this.showForm = true;
  }
  // Gestion de la suppression
  confirmDelete(type) {
    this.typeToDelete = type;
    this.showDeleteModal = true;
  }
  cancelDelete() {
    this.typeToDelete = null;
    this.showDeleteModal = false;
  }
  cancelEdit() {
    this.showForm = false;
    this.editingType = null;
    this.resetForm();
  }
  // Soumission du formulaire
  onSubmit() {
    if (!this.currentType.name || !this.currentType.description || !this.currentType.icon) {
      this.notificationService.error("Veuillez remplir tous les champs obligatoires");
      return;
    }
    if (this.editingType) {
      this.updateExistingType();
    } else {
      this.createNewType();
    }
  }
  updateExistingType() {
    if (!this.editingType)
      return;
    this.typeService.updateType(this.editingType.id_type, this.currentType).subscribe({
      next: () => {
        this.notificationService.success("Type modifi\xE9 avec succ\xE8s");
        this.loadTypes();
        this.cancelEdit();
      },
      error: (error) => {
        if (error.status === 409) {
          this.notificationService.error("Ce type existe d\xE9j\xE0");
        } else {
          this.notificationService.error("Erreur lors de la modification");
        }
      }
    });
  }
  createNewType() {
    this.typeService.getTypes().subscribe((types) => {
      const exists = types.some((t) => t.name.toLowerCase() === this.currentType.name?.toLowerCase());
      if (exists) {
        this.notificationService.error("Ce type existe d\xE9j\xE0");
        return;
      }
      this.typeService.createType(this.currentType).subscribe({
        next: () => {
          this.notificationService.success("Type ajout\xE9 avec succ\xE8s");
          this.loadTypes();
          this.cancelEdit();
        },
        error: () => {
          this.notificationService.error("Erreur lors de la cr\xE9ation");
        }
      });
    });
  }
  // Suppression d'un type
  deleteType() {
    if (!this.typeToDelete)
      return;
    this.loading = true;
    this.typeService.deleteType(this.typeToDelete.id_type).subscribe({
      next: () => {
        this.notificationService.success("Type supprim\xE9 avec succ\xE8s");
        this.loadTypes();
        this.cancelDelete();
      },
      error: (error) => {
        if (error.status === 409) {
          this.notificationService.error("Ce type ne peut pas \xEAtre supprim\xE9 car il est associ\xE9 \xE0 des produits");
        } else {
          this.notificationService.error("Erreur lors de la suppression");
        }
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
  // Réinitialisation du formulaire
  resetForm() {
    this.currentType = {
      name: "",
      description: "",
      icon: "",
      prescription_required: false
    };
  }
  static {
    this.\u0275fac = function AdminTypesComponent_Factory(t) {
      return new (t || _AdminTypesComponent)(\u0275\u0275directiveInject(TypeService), \u0275\u0275directiveInject(NotificationService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminTypesComponent, selectors: [["app-admin-types"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 16, vars: 4, consts: [["typeForm", "ngForm"], ["name", "ngModel"], ["description", "ngModel"], ["icon", "ngModel"], [1, "types-management"], [1, "page-header"], [1, "loading-state"], [1, "error-state"], [1, "types-grid"], [1, "type-card", 3, "requires-prescription"], [1, "add-card", 3, "click"], [1, "add-content"], [1, "fas", "fa-plus"], [1, "modal-overlay"], [1, "loader"], [3, "click"], [1, "type-card"], [1, "card-content"], [1, "type-icon"], [1, "type-details"], [1, "prescription-badge"], [1, "card-actions"], [1, "action-btn", "edit", 3, "click"], [1, "action-btn", "delete", 3, "click"], [1, "modal-content"], ["novalidate", "", 3, "ngSubmit"], [1, "form-group"], ["name", "name", "required", "", 3, "ngModelChange", "ngModel"], [1, "error-message"], ["name", "description", "required", "", 3, "ngModelChange", "ngModel"], ["name", "icon", "required", "", 3, "ngModelChange", "ngModel"], ["value", ""], ["value", "\u{1F48A}"], ["value", "\u{1F3E5}"], ["value", "\u{1F9EA}"], ["value", "\u{1F33F}"], ["value", "\u{1FA7A}"], ["value", "\u{1F476}"], ["value", "\u{1F9B7}"], ["value", "\u{1F441}\uFE0F"], ["value", "\u{1F9F4}"], ["value", "\u{1FA79}"], ["value", "\u267F"], ["type", "checkbox", "name", "prescription_required", 3, "ngModelChange", "ngModel"], [1, "form-actions"], ["type", "button", 1, "cancel-btn", 3, "click"], ["type", "submit", 1, "confirm-btn", 3, "disabled"], [1, "cancel-btn", 3, "click"], [1, "delete-btn", 3, "click"]], template: function AdminTypesComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 4)(1, "div", 5)(2, "h1");
        \u0275\u0275text(3, "Cat\xE9gories de M\xE9dicaments et Produits");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(4, AdminTypesComponent_Conditional_4_Template, 4, 0, "div", 6)(5, AdminTypesComponent_Conditional_5_Template, 5, 1, "div", 7);
        \u0275\u0275elementStart(6, "div", 8);
        \u0275\u0275repeaterCreate(7, AdminTypesComponent_For_8_Template, 15, 6, "div", 9, _forTrack03);
        \u0275\u0275elementStart(9, "div", 10);
        \u0275\u0275listener("click", function AdminTypesComponent_Template_div_click_9_listener() {
          return ctx.startAdd();
        });
        \u0275\u0275elementStart(10, "div", 11);
        \u0275\u0275element(11, "i", 12);
        \u0275\u0275elementStart(12, "span");
        \u0275\u0275text(13, "Ajouter une cat\xE9gorie");
        \u0275\u0275elementEnd()()()()();
        \u0275\u0275template(14, AdminTypesComponent_Conditional_14_Template, 57, 16, "div", 13)(15, AdminTypesComponent_Conditional_15_Template, 11, 0, "div", 13);
      }
      if (rf & 2) {
        \u0275\u0275advance(4);
        \u0275\u0275conditional(4, ctx.loading ? 4 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(5, ctx.error ? 5 : -1);
        \u0275\u0275advance(2);
        \u0275\u0275repeater(ctx.types);
        \u0275\u0275advance(7);
        \u0275\u0275conditional(14, ctx.showForm ? 14 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(15, ctx.showDeleteModal ? 15 : -1);
      }
    }, dependencies: [CommonModule, FormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, CheckboxControlValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, NgModel, NgForm], styles: ["\n\n.types-management[_ngcontent-%COMP%] {\n  padding: 2rem;\n}\n.page-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  color: #333;\n  margin-bottom: 2rem;\n}\n.types-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));\n  gap: 1.5rem;\n}\n.type-card[_ngcontent-%COMP%] {\n  min-height: 150px;\n  background: white;\n  border: 1px solid #e5e7eb;\n  border-radius: 8px;\n  overflow: hidden;\n  transition: all 0.2s;\n  padding: 20px;\n  margin-bottom: 1rem;\n}\n.type-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\n}\n.type-card[_ngcontent-%COMP%]:hover   .card-actions[_ngcontent-%COMP%] {\n  opacity: 1;\n}\n.requires-prescription[_ngcontent-%COMP%] {\n  border-color: #fecaca;\n  background:\n    linear-gradient(\n      to bottom,\n      white,\n      #fff5f5);\n}\n.requires-prescription[_ngcontent-%COMP%]   .prescription-badge[_ngcontent-%COMP%] {\n  background: #fee2e2;\n  color: #dc2626;\n  padding: 0.25rem 0.75rem;\n  border-radius: 4px;\n  font-size: 0.75rem;\n  margin-bottom: 0.5rem;\n  display: inline-block;\n}\n.card-content[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n  display: flex;\n  gap: 1rem;\n  background-color: #ffffff;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);\n}\n.type-icon[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  background: #f3f4f6;\n  border-radius: 8px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 1.5rem;\n}\n.type-details[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.type-details[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1.125rem;\n  color: #1f2937;\n  font-weight: 600;\n}\n.type-details[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0.5rem 0 0;\n  color: #6b7280;\n  font-size: 0.875rem;\n}\n.card-actions[_ngcontent-%COMP%] {\n  display: flex;\n  background: #f9fafb;\n  opacity: 0;\n  transition: opacity 0.2s;\n  gap: 0.5rem;\n  padding: 0;\n}\n.card-actions[_ngcontent-%COMP%]   .action-btn[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 0.5rem;\n  border: none;\n  border-radius: 4px;\n  cursor: pointer;\n  transition: all 0.2s;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 80px;\n}\n.card-actions[_ngcontent-%COMP%]   .action-btn.edit[_ngcontent-%COMP%] {\n  background: #4f46e5;\n  color: white;\n}\n.card-actions[_ngcontent-%COMP%]   .action-btn.edit[_ngcontent-%COMP%]:hover {\n  background: #4338ca;\n}\n.card-actions[_ngcontent-%COMP%]   .action-btn.delete[_ngcontent-%COMP%] {\n  background: #fee2e2;\n  color: #dc2626;\n}\n.card-actions[_ngcontent-%COMP%]   .action-btn.delete[_ngcontent-%COMP%]:hover {\n  background: #fecaca;\n}\n.type-card[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  min-height: 180px;\n  padding: 1.5rem;\n}\n.type-card[_ngcontent-%COMP%]   .card-content[_ngcontent-%COMP%] {\n  padding: 0;\n  box-shadow: none;\n}\n.add-card[_ngcontent-%COMP%] {\n  border: 2px dashed #e5e7eb;\n  border-radius: 8px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  transition: all 0.2s;\n  min-height: 180px;\n}\n.add-card[_ngcontent-%COMP%]:hover {\n  border-color: #4f46e5;\n  background: #f3f4f6;\n}\n.add-card[_ngcontent-%COMP%]:hover   .add-content[_ngcontent-%COMP%] {\n  color: #4f46e5;\n}\n.add-card[_ngcontent-%COMP%]   .add-content[_ngcontent-%COMP%] {\n  text-align: center;\n  color: #6b7280;\n  transition: color 0.2s;\n}\n.add-card[_ngcontent-%COMP%]   .add-content[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  margin-bottom: 0.5rem;\n  display: block;\n}\n.add-card[_ngcontent-%COMP%]   .add-content[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  font-weight: 500;\n}\n.modal-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(0, 0, 0, 0.5);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  z-index: 1000;\n}\n.modal-content[_ngcontent-%COMP%] {\n  background: white;\n  padding: 2rem;\n  border-radius: 8px;\n  width: 100%;\n  max-width: 500px;\n  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\n}\n.form-group[_ngcontent-%COMP%] {\n  margin-bottom: 1rem;\n}\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 0.5rem;\n  color: #374151;\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], .form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%], .form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 0.5rem;\n  border: 1px solid #d1d5db;\n  border-radius: 4px;\n}\n.loading-state[_ngcontent-%COMP%], .error-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 2rem;\n}\n.error-message[_ngcontent-%COMP%] {\n  color: #dc2626;\n  font-size: 0.75rem;\n  margin-top: 0.25rem;\n}\n.error-state[_ngcontent-%COMP%] {\n  color: #dc2626;\n}\n.form-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 1rem;\n  margin-top: 2rem;\n}\n.form-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  padding: 0.5rem 1rem;\n  border-radius: 4px;\n  border: none;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.form-actions[_ngcontent-%COMP%]   button.cancel-btn[_ngcontent-%COMP%] {\n  background: #f3f4f6;\n  color: #4b5563;\n}\n.form-actions[_ngcontent-%COMP%]   button.confirm-btn[_ngcontent-%COMP%] {\n  background: #4f46e5;\n  color: white;\n}\n.form-actions[_ngcontent-%COMP%]   button.confirm-btn[_ngcontent-%COMP%]:disabled {\n  background: #9ca3af;\n  cursor: not-allowed;\n}\n.form-actions[_ngcontent-%COMP%]   button.delete-btn[_ngcontent-%COMP%] {\n  background: #dc2626;\n  color: white;\n}\n/*# sourceMappingURL=admin-types.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminTypesComponent, { className: "AdminTypesComponent", filePath: "src\\app\\feature\\Dashboard\\DashboardComponent\\admin\\type\\admin-types.component.ts", lineNumber: 456 });
})();

// src/app/feature/Dashboard/DashboardComponent/admin/admin-dashboard.component.ts
var AdminDashboardComponent = class _AdminDashboardComponent {
  constructor(authService, router) {
    this.authService = authService;
    this.router = router;
  }
  logout() {
    if (confirm("\xCAtes-vous s\xFBr de vouloir vous d\xE9connecter ?")) {
      this.authService.logout();
      this.router.navigate(["/login"]);
    }
  }
  static {
    this.\u0275fac = function AdminDashboardComponent_Factory(t) {
      return new (t || _AdminDashboardComponent)(\u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(Router));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminDashboardComponent, selectors: [["app-admin-dashboard"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 40, vars: 0, consts: [[1, "admin-layout"], [1, "sidebar"], [1, "logo"], [1, "nav-links"], ["routerLink", "categories", "routerLinkActive", "active"], ["routerLink", "products", "routerLinkActive", "active"], ["routerLink", "services", "routerLinkActive", "active"], ["routerLink", "prescriptions", "routerLinkActive", "active"], ["routerLink", "manufacturing", "routerLinkActive", "active"], ["routerLink", "orders", "routerLinkActive", "active"], ["routerLink", "clients", "routerLinkActive", "active"], ["routerLink", "stock", "routerLinkActive", "active"], ["routerLink", "appointments", "routerLinkActive", "active"], [1, "logout"], [1, "logout-btn", 3, "click"], [1, "main-content"]], template: function AdminDashboardComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "nav", 1)(2, "div", 2)(3, "h1");
        \u0275\u0275text(4, "GOHAN-MED Admin");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "p");
        \u0275\u0275text(6, "Espace Admin");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(7, "ul", 3)(8, "li")(9, "a", 4);
        \u0275\u0275text(10, "Cat\xE9gories");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(11, "li")(12, "a", 5);
        \u0275\u0275text(13, "M\xE9dicaments");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(14, "li")(15, "a", 6);
        \u0275\u0275text(16, "Services");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(17, "li")(18, "a", 7);
        \u0275\u0275text(19, "Ordonnances");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(20, "li")(21, "a", 8);
        \u0275\u0275text(22, "Pr\xE9parations");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(23, "li")(24, "a", 9);
        \u0275\u0275text(25, "Commandes");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(26, "li")(27, "a", 10);
        \u0275\u0275text(28, "Clients");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(29, "li")(30, "a", 11);
        \u0275\u0275text(31, "Stock");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(32, "li")(33, "a", 12);
        \u0275\u0275text(34, "Rendez-vous");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(35, "div", 13)(36, "button", 14);
        \u0275\u0275listener("click", function AdminDashboardComponent_Template_button_click_36_listener() {
          return ctx.logout();
        });
        \u0275\u0275text(37, "Se d\xE9connecter");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(38, "main", 15);
        \u0275\u0275element(39, "router-outlet");
        \u0275\u0275elementEnd()();
      }
    }, dependencies: [CommonModule, RouterModule, RouterOutlet, RouterLink, RouterLinkActive], styles: ["\n\n.admin-layout[_ngcontent-%COMP%] {\n  display: flex;\n  min-height: 100vh;\n}\n.sidebar[_ngcontent-%COMP%] {\n  width: 250px;\n  background: #0066CC;\n  padding: 1.5rem;\n  color: #f0f0f0;\n  display: flex;\n  flex-direction: column;\n}\n.logo[_ngcontent-%COMP%] {\n  padding: 1rem;\n  text-align: center;\n  border-bottom: 1px solid rgba(255, 255, 255, 0.1);\n  margin-bottom: 1rem;\n}\n.logo[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  margin: 0;\n  color: white;\n}\n.nav-links[_ngcontent-%COMP%] {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n  flex: 1;\n}\n.nav-links[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  display: block;\n  padding: 0.75rem 1rem;\n  color: #f0f0f0;\n  text-decoration: none;\n  border-radius: 6px;\n  margin-bottom: 0.5rem;\n  transition: all 0.2s ease;\n}\n.nav-links[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, 0.15);\n  transform: translateY(-1px);\n}\n.nav-links[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a.active[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.2);\n  color: #ffffff;\n  font-weight: bold;\n}\n.logout[_ngcontent-%COMP%] {\n  padding-top: 1rem;\n  border-top: 1px solid rgba(255, 255, 255, 0.1);\n}\n.logout-btn[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 0.75rem;\n  background: none;\n  color: #FFD2D2;\n  border: 1px solid #FFD2D2;\n  border-radius: 6px;\n  cursor: pointer;\n  font-weight: bold;\n  transition: all 0.2s ease;\n}\n.logout-btn[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 210, 210, 0.1);\n  color: white;\n}\n.main-content[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 2rem;\n  background: #f8fafc;\n  overflow-y: auto;\n}\n/*# sourceMappingURL=admin-dashboard.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminDashboardComponent, { className: "AdminDashboardComponent", filePath: "src\\app\\feature\\Dashboard\\DashboardComponent\\admin\\admin-dashboard.component.ts", lineNumber: 114 });
})();

// src/app/feature/Dashboard/DashboardComponent/admin/manufacturing/admin-manufacturing-list.component.ts
var _forTrack04 = ($index, $item) => $item.id;
function AdminManufacturingListComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 1);
    \u0275\u0275text(1, "Chargement...");
    \u0275\u0275elementEnd();
  }
}
function AdminManufacturingListComponent_Conditional_4_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 3)(1, "div", 4)(2, "div", 5);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 6)(5, "div", 7);
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 8);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(10, "div", 9)(11, "div", 10);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "select", 11);
    \u0275\u0275listener("change", function AdminManufacturingListComponent_Conditional_4_For_2_Template_select_change_13_listener($event) {
      const item_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.updateStatus(item_r2.id, $event));
    });
    \u0275\u0275elementStart(14, "option", 12);
    \u0275\u0275text(15, "En attente d'acompte");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "option", 13);
    \u0275\u0275text(17, "Acompte pay\xE9");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "option", 14);
    \u0275\u0275text(19, "En fabrication");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "option", 15);
    \u0275\u0275text(21, "Pr\xEAt");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "option", 16);
    \u0275\u0275text(23, "Termin\xE9");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "button", 17);
    \u0275\u0275listener("click", function AdminManufacturingListComponent_Conditional_4_For_2_Template_button_click_24_listener() {
      const item_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.viewDetails(item_r2.id));
    });
    \u0275\u0275text(25, " Voir d\xE9tails ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const item_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("Fabrication #", item_r2.id, "");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(7, 6, item_r2.createdAt, "dd/MM/yyyy"));
    \u0275\u0275advance(2);
    \u0275\u0275attribute("data-status", item_r2.status);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.getStatusLabel(item_r2.status), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("Type: ", item_r2.type, "");
    \u0275\u0275advance();
    \u0275\u0275property("value", item_r2.status);
  }
}
function AdminManufacturingListComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2);
    \u0275\u0275repeaterCreate(1, AdminManufacturingListComponent_Conditional_4_For_2_Template, 26, 9, "div", 3, _forTrack04);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.manufacturingItems);
  }
}
var AdminManufacturingListComponent = class _AdminManufacturingListComponent {
  constructor(manufacturingService, notificationService) {
    this.manufacturingService = manufacturingService;
    this.notificationService = notificationService;
    this.manufacturingItems = [];
    this.loading = true;
  }
  ngOnInit() {
    this.loadManufacturingItems();
  }
  loadManufacturingItems() {
    this.loading = true;
    this.manufacturingService.getAllManufacturingItems().subscribe({
      next: (items) => {
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
  getStatusLabel(status) {
    const statusMap = {
      "EN_ATTENTE_ACOMPTE": "En attente d'acompte",
      "ACOMPTE_PAYE": "Acompte pay\xE9",
      "EN_FABRICATION": "En fabrication",
      "PRET": "Pr\xEAt",
      "TERMINE": "Termin\xE9"
    };
    return statusMap[status] || "Inconnu";
  }
  updateStatus(id, event) {
    const newStatus = event.target.value;
    this.manufacturingService.updateManufacturingStatus(id, newStatus).subscribe({
      next: (updatedManufacturing) => {
        this.manufacturingItems = this.manufacturingItems.map((item) => item.id === id ? __spreadProps(__spreadValues({}, item), { status: newStatus }) : item);
        this.notificationService.success("Statut mis \xE0 jour avec succ\xE8s");
      },
      error: (error) => {
        console.error("Erreur mise \xE0 jour statut:", error);
        this.notificationService.error("Erreur lors de la mise \xE0 jour du statut");
      }
    });
  }
  viewDetails(id) {
    console.log("Voir d\xE9tails de la fabrication:", id);
  }
  static {
    this.\u0275fac = function AdminManufacturingListComponent_Factory(t) {
      return new (t || _AdminManufacturingListComponent)(\u0275\u0275directiveInject(ManufacturingService), \u0275\u0275directiveInject(NotificationService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminManufacturingListComponent, selectors: [["app-admin-manufacturing-list"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 5, vars: 2, consts: [[1, "manufacturing-list"], [1, "loading"], [1, "items-grid"], [1, "fabrication-item"], [1, "header"], [1, "title"], [1, "meta"], [1, "date"], [1, "status"], [1, "content"], [1, "type"], [3, "change", "value"], ["value", "EN_ATTENTE_ACOMPTE"], ["value", "ACOMPTE_PAYE"], ["value", "EN_FABRICATION"], ["value", "PRET"], ["value", "TERMINE"], [1, "btn-details", 3, "click"]], template: function AdminManufacturingListComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "h2");
        \u0275\u0275text(2, "Gestion des Fabrications");
        \u0275\u0275elementEnd();
        \u0275\u0275template(3, AdminManufacturingListComponent_Conditional_3_Template, 2, 0, "div", 1)(4, AdminManufacturingListComponent_Conditional_4_Template, 3, 0, "div", 2);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(3);
        \u0275\u0275conditional(3, ctx.loading ? 3 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(4, !ctx.loading && ctx.manufacturingItems.length > 0 ? 4 : -1);
      }
    }, dependencies: [CommonModule, DatePipe, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption], styles: ['@charset "UTF-8";\n\n\n\n.manufacturing-list[_ngcontent-%COMP%] {\n  padding: 24px;\n  max-width: 1400px;\n  margin: 0 auto;\n  background: #f8f9fa;\n}\nh2[_ngcontent-%COMP%] {\n  color: #2c3e50;\n  font-size: 24px;\n  margin-bottom: 24px;\n  font-weight: 600;\n}\n.items-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));\n  gap: 24px;\n}\n.fabrication-item[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 12px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);\n  overflow: hidden;\n  transition: transform 0.2s, box-shadow 0.2s;\n}\n.fabrication-item[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n}\n.header[_ngcontent-%COMP%] {\n  padding: 20px;\n  background: #fff;\n  border-bottom: 1px solid #eef2f7;\n}\n.title[_ngcontent-%COMP%] {\n  color: #2c3e50;\n  font-size: 1.1em;\n  font-weight: 600;\n  margin-bottom: 12px;\n}\n.meta[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.date[_ngcontent-%COMP%] {\n  color: #64748b;\n  font-size: 0.9em;\n}\n.status[_ngcontent-%COMP%] {\n  padding: 6px 12px;\n  border-radius: 6px;\n  font-size: 0.85em;\n  font-weight: 500;\n}\n.status[data-status=EN_ATTENTE_ACOMPTE][_ngcontent-%COMP%] {\n  background-color: #f97316;\n  color: white;\n}\n.status[data-status=ACOMPTE_PAYE][_ngcontent-%COMP%] {\n  background-color: #f3f4f6;\n  color: #4b5563;\n  border: 1px solid #e5e7eb;\n}\n.status[data-status=EN_FABRICATION][_ngcontent-%COMP%] {\n  background-color: #2196F3;\n  color: white;\n}\n.status[data-status=PRET][_ngcontent-%COMP%] {\n  background-color: #10b981;\n  color: white;\n}\n.status[data-status=TERMINE][_ngcontent-%COMP%] {\n  background-color: #6b7280;\n  color: white;\n}\n.content[_ngcontent-%COMP%] {\n  padding: 20px;\n}\n.type[_ngcontent-%COMP%] {\n  color: #475569;\n  margin-bottom: 16px;\n  font-weight: 500;\n}\nselect[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 10px 12px;\n  border: 1px solid #e2e8f0;\n  border-radius: 8px;\n  font-size: 0.95em;\n  color: #475569;\n  background-color: white;\n  margin-bottom: 16px;\n  transition: all 0.2s;\n}\nselect[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #93c5fd;\n  box-shadow: 0 0 0 3px rgba(147, 197, 253, 0.25);\n}\n.btn-details[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 8px 16px;\n  background: #f97316;\n  color: white;\n  border: none;\n  border-radius: 6px;\n  font-size: 0.9em;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.btn-details[_ngcontent-%COMP%]:hover {\n  background: #ea580c;\n  transform: translateY(-1px);\n}\n.loading[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 40px;\n  color: #64748b;\n}\n.empty-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 40px;\n  color: #64748b;\n  background: white;\n  border-radius: 12px;\n  margin-top: 24px;\n}\n/*# sourceMappingURL=admin-manufacturing-list.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminManufacturingListComponent, { className: "AdminManufacturingListComponent", filePath: "src\\app\\feature\\Dashboard\\DashboardComponent\\admin\\manufacturing\\admin-manufacturing-list.component.ts", lineNumber: 210 });
})();

// src/app/feature/Dashboard/DashboardComponent/admin/admin.routes.ts
var adminRoutes = [
  {
    path: "",
    // Route racine admin
    component: AdminDashboardComponent,
    // Composant principal du dashboard
    children: [
      {
        path: "",
        // Route par défaut
        redirectTo: "types",
        // Redirection vers la page des types
        pathMatch: "full"
        // Correspondance exacte du chemin
      },
      {
        path: "categories",
        // Route pour la gestion des catégories
        component: AdminTypesComponent
      },
      {
        path: "types/add",
        // Route pour l'ajout d'une catégorie
        component: AdminTypeFormComponent
      },
      {
        path: "types/edit/:id",
        // Route pour l'édition d'une catégorie avec paramètre id
        component: AdminTypeFormComponent
      },
      {
        path: "products",
        // Route pour la gestion des produits
        component: AdminProductsComponent
      },
      {
        path: "products/add",
        // Route pour l'ajout d'un produit
        component: AdminProductFormComponent
      },
      {
        path: "products/edit/:id",
        // Route pour l'édition d'un produit avec paramètre id
        component: AdminProductFormComponent
      },
      {
        path: "orders",
        // Route pour la gestion des commandes
        component: AdminOrdersComponent
      },
      {
        path: "clients",
        // Route pour la gestion des clients
        component: AdminClientsComponent
      },
      {
        path: "services",
        // Route pour la gestion des services
        component: AdminServicesComponent
      },
      {
        path: "appointments",
        // Route pour la gestion des rendez-vous
        component: AdminAppointmentsComponent
      },
      {
        path: "manufacturing",
        // Route pour la gestion des fabrications
        component: AdminManufacturingListComponent
      }
    ]
  }
];
export {
  adminRoutes
};
//# sourceMappingURL=chunk-FKD4W3RM.js.map
