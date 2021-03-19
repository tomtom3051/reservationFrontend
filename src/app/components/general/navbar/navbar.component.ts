import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private routes: Router,
    private oauthService: OAuthService) {

    this.oauthService.events
      .pipe(filter(e => e.type === 'token_received'))
      .subscribe(_ => {
        if (this.oauthService.hasValidIdToken()) {
          //this.routes.navigate(['/about']);
          console.log("logged in");
        }
        this.oauthService.loadUserProfile();
      });
  }

  ngOnInit(): void {
  }

  public login() {
    this.oauthService.initLoginFlow();  

    //this.routes.navigate(['/login']);
    // this.oauthService.initLoginFlow();
  }

  public logout() {
    this.oauthService.logOut();
  }

  get isAdmin() {
    
    if (this.oauthService.getAccessToken()) {
      let base64Url = this.oauthService.getAccessToken().split('.')[1];
      let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      let jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

    //  console.log(jsonPayload);
      let tokenJSON = JSON.parse(jsonPayload);

      let spaReservation = tokenJSON.resource_access["spa-reservations"];


      for (var i = 0; i < spaReservation.roles.length; i++) {
       // console.log("spa:"+ spaReservation.roles[i]);
        if (spaReservation.roles[i].toLowerCase()==="admin") {
          return true;
        }
      }
/*
      for (var i = 0; i < tokenJSON.realm_access.roles.length; i++) {
        console.log("realm: "+ tokenJSON.realm_access.roles[i]);
        if (tokenJSON.realm_access.roles[i].toLowerCase()==="admin") {
          return true;
        }
      }
      */
    }
    
    return false;
  }

  get givenName() {
    const claims = this.oauthService.getIdentityClaims();
    if (!claims) {
      return null;
    }
    return claims['preferred_username'];
  }

  public get accessToken() { return this.oauthService.getAccessToken(); }
  public get refreshToken() { return this.oauthService.getRefreshToken(); }
  public get identityClaims() { return this.oauthService.getIdentityClaims(); }
  public get idToken() { return this.oauthService.getIdToken(); }
  public get logoutUrl() { return this.oauthService.logoutUrl; }
  public get isLoggedIn() { return this.oauthService.hasValidIdToken(); }
}
