import { ApiOperationOptions } from "@nestjs/swagger";

/**
 * Configuration Swagger pour l'endpoint Hello World
 */
export const AppControllerHelloWorld: ApiOperationOptions = {
  summary: 'Hello world',
  description: "My great description for this method",
}

/**
 * Configuration Swagger pour l'endpoint Hello World 2
 */
export const AppControllerHelloWorld2: ApiOperationOptions = {
  summary: 'sum',
  description: 'desc'
}