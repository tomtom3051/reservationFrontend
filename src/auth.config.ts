import { AuthConfig } from "angular-oauth2-oidc";

export const authConfig: AuthConfig = {
    issuer: 'https://api.sijbers.net/auth/realms/reservations',
    redirectUri: window.location.origin + "/home",
    clientId: 'spa-reservations',
    scope: 'openid profile email offline_access',
    responseType: 'code',
    showDebugInformation: true
  }



      // at_hash is not present in id token in older versions of keycloak.
    // use the following property only if needed!
    //disableAtHashCheck: true,