// Enumération des différents statuts d'une commande
export enum OrderStatusEnum {
  PENDING = 'En attente',      // Commande en attente
  PAID = 'Payé',               // Commande payée
  PROCESSING = 'En cours de traitement', // Commande en traitement
  SHIPPED = 'Expédié',         // Commande expédiée
  DELIVERED = 'Livré',         // Commande livrée
  CANCELLED = 'Annulé'         // Commande annulée
}

// Type pour le mapping des statuts aux couleurs (clé : statut, valeur : couleur)
export type Order_Status_Color = {
  [key in OrderStatusEnum]: string;  // Pour chaque statut, une couleur est associée
};

// Constantes pour les couleurs des statuts
export const ORDER_STATUS_COLORS: Order_Status_Color = {
  [OrderStatusEnum.PENDING]: '#fbbf24',    // Jaune pour "En attente"
  [OrderStatusEnum.PAID]: '#22c55e',       // Vert vif pour "Payé"
  [OrderStatusEnum.PROCESSING]: '#60a5fa', // Bleu pour "En cours de traitement"
  [OrderStatusEnum.SHIPPED]: '#34d399',    // Vert clair pour "Expédié"
  [OrderStatusEnum.DELIVERED]: '#10b981',  // Vert pour "Livré"
  [OrderStatusEnum.CANCELLED]: '#ef4444'   // Rouge pour "Annulé"
};

// Fonction pour obtenir la classe CSS correspondant au statut
export function getStatusClass(status: string): string {
  // Recherche de la clé correspondant au statut donné
  const statusKey = Object.keys(OrderStatusEnum).find(
    key => OrderStatusEnum[key as keyof typeof OrderStatusEnum] === status
  );
  // Si une clé correspondante est trouvée, retourne la classe CSS pour ce statut
  return statusKey ? `status-${statusKey.toLowerCase()}` : 'status-unknown';
}

// Fonction pour obtenir la couleur correspondant au statut
export function getStatusColor(status: string): string {
  // Recherche de la clé correspondant au statut donné
  const statusKey = Object.keys(OrderStatusEnum).find(
    key => OrderStatusEnum[key as keyof typeof OrderStatusEnum] === status
  );
  // Si une clé correspondante est trouvée, retourne la couleur associée
  return statusKey ? ORDER_STATUS_COLORS[OrderStatusEnum[statusKey as keyof typeof OrderStatusEnum]] : '#9ca3af'; // Couleur par défaut : gris
}
