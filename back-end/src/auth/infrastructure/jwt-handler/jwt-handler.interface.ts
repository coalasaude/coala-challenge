export interface JWTHandler {
  sign(payload: any): string;
}
