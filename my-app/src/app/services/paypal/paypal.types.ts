// src/app/services/paypal/paypal.types.ts

// Interface représentant la réponse de l'API PayPal lors de la création d'une commande
export interface PayPalOrderResponse {
  id: string; // ID unique de la commande PayPal
  status: string; // Statut actuel de la commande (ex. PENDING, COMPLETED, etc.)
  links: Array<{ // Liste des liens associés à la commande PayPal pour diverses actions
    href: string; // URL à laquelle la commande peut être consultée ou modifiée
    rel: string; // Type de relation avec le lien (ex. "approval_url" pour l'URL de paiement)
    method: string; // Méthode HTTP utilisée pour l'accès au lien (généralement "GET" ou "POST")
  }>;
}

// Interface représentant la réponse de l'API PayPal lors de la capture d'un paiement
export interface PayPalCaptureResponse {
  id: string; // ID unique de la capture de paiement
  status: string; // Statut actuel de la capture du paiement (ex. COMPLETED, FAILED)
  payer: { // Informations sur le payeur
    email_address: string; // Adresse email du payeur
    payer_id: string; // ID unique du payeur dans le système PayPal
  };
}

// Enumération des différents statuts de paiement que l'on peut rencontrer lors de l'interaction avec PayPal
export enum PaymentStatus {
  PENDING = 'PENDING', // Statut indiquant que le paiement est en attente
  COMPLETED = 'COMPLETED', // Statut indiquant que le paiement a été effectué avec succès
  FAILED = 'FAILED' // Statut indiquant que le paiement a échoué
}
