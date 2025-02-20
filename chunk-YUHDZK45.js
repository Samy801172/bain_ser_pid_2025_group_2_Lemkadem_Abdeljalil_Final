import {
  HttpClient,
  NotificationService,
  catchError,
  throwError,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-3KO5M7KA.js";

// src/app/services/promotion/promotion.service.ts
var PromotionService = class _PromotionService {
  constructor(http, notificationService) {
    this.http = http;
    this.notificationService = notificationService;
    this.API_URL = "http://localhost:2024/api/promotions";
  }
  // Méthode pour récupérer toutes les promotions
  getAllPromotions() {
    return this.http.get(this.API_URL).pipe(catchError((error) => {
      this.notificationService.error("Erreur lors du chargement des promotions");
      return throwError(() => error);
    }));
  }
  // Méthode pour récupérer les promotions actives
  getActivePromotions() {
    return this.http.get(`${this.API_URL}/active`).pipe(catchError((error) => {
      this.notificationService.error("Erreur lors du chargement des promotions actives");
      return throwError(() => error);
    }));
  }
  // Méthode pour créer une nouvelle promotion
  createPromotion(promotion) {
    return this.http.post(this.API_URL, promotion).pipe(catchError((error) => {
      this.notificationService.error("Erreur lors de la cr\xE9ation de la promotion");
      return throwError(() => error);
    }));
  }
  // Méthode pour mettre à jour une promotion existante
  updatePromotion(id, promotion) {
    return this.http.put(`${this.API_URL}/${id}`, promotion).pipe(catchError((error) => {
      this.notificationService.error("Erreur lors de la mise \xE0 jour de la promotion");
      return throwError(() => error);
    }));
  }
  // Méthode pour supprimer une promotion
  deletePromotion(id) {
    return this.http.delete(`${this.API_URL}/${id}`).pipe(catchError((error) => {
      this.notificationService.error("Erreur lors de la suppression de la promotion");
      return throwError(() => error);
    }));
  }
  // Méthode pour prolonger une promotion existante
  extendPromotion(id, newEndDate) {
    return this.http.patch(`${this.API_URL}/${id}/extend`, { endDate: newEndDate }).pipe(catchError((error) => {
      this.notificationService.error("Erreur lors de la prolongation de la promotion");
      return throwError(() => error);
    }));
  }
  // Méthode pour désactiver une promotion
  deactivatePromotion(id) {
    return this.http.patch(`${this.API_URL}/${id}/deactivate`, {}).pipe(catchError((error) => {
      this.notificationService.error("Erreur lors de la d\xE9sactivation de la promotion");
      return throwError(() => error);
    }));
  }
  static {
    this.\u0275fac = function PromotionService_Factory(t) {
      return new (t || _PromotionService)(\u0275\u0275inject(HttpClient), \u0275\u0275inject(NotificationService));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
      token: _PromotionService,
      factory: _PromotionService.\u0275fac,
      providedIn: "root"
      // Ce service est injecté globalement dans l'application
    });
  }
};

export {
  PromotionService
};
//# sourceMappingURL=chunk-YUHDZK45.js.map
