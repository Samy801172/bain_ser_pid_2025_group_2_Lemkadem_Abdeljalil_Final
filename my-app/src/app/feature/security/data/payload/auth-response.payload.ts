// src/app/feature/security/data/payload/auth-response.payload.ts
export interface AuthResponse {
  clientId: string;
  role: string; // Ajoutez cette propriété pour le rôle
  // Autres propriétés que vous renvoyez dans la réponse de l'API
}
