import { AuthConfig } from "angular-oauth2-oidc";

export const authConfig: AuthConfig = {
    issuer: 'http://localhost:8080/auth/realms/reservations',
    redirectUri: window.location.origin + "/login",
    clientId: 'spa-reservations',
    scope: 'openid profile email offline_access',
    responseType: 'code',
    // at_hash is not present in id token in older versions of keycloak.
    // use the following property only if needed!
    //disableAtHashCheck: true,
    showDebugInformation: true
  }