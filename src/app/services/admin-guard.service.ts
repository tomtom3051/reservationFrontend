import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanActivate {

  constructor(private oauthService: OAuthService,
    private routes: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {


    if (this.oauthService.getAccessToken()) {

      let base64Url = this.oauthService.getAccessToken().split('.')[1];
      let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      let jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      let tokenJSON = JSON.parse(jsonPayload);

      let spaReservation = tokenJSON.resource_access["spa-reservations"];

      for (var i = 0; i < spaReservation.roles.length; i++) {
        if (spaReservation.roles[i].toLowerCase() === "admin") {
          return true;
        }
      }
    }
    return false;
  }
}
