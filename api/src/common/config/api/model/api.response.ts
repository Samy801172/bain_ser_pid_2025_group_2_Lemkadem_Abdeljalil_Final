import { ApiCodeResponse } from "../enum";

/**
 * Interface définissant la structure standard des réponses API
 * @interface ApiResponse
 * @property code - Code de réponse API standardisé
 * @property data - Données de la réponse (type générique)
 * @property result - Indicateur de succès de la requête
 */
export interface ApiResponse {
  code: ApiCodeResponse;
  data: any;
  result: boolean;
}