import { Component, OnInit } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { RestCallsService } from 'src/app/services/rest-calls.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(private oauthService: OAuthService,
    private restCallsService: RestCallsService) {

  }

  ngOnInit(): void {
  }

  testAuthAnon() {
    console.log("test auth");
    this.restCallsService.getTestAuthAnon()
      .subscribe(response => {
        console.log(response);
      });
  }

  testAuthUser() {
    console.log("test auth");
    this.restCallsService.getTestAuthUser()
      .subscribe(response => {
        console.log(response);
      });

    if (this.oauthService.getAccessToken()) {
      let base64Url = this.oauthService.getAccessToken().split('.')[1];
      let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      let jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      let tokenJSON = JSON.parse(jsonPayload);

      console.log(JSON.parse(jsonPayload));
      //console.log(tokenJSON.realm_access.roles);

      for (var i = 0; i < tokenJSON.realm_access.roles.length; i++) {
        console.log("realm: "+ tokenJSON.realm_access.roles[i]);
      }

      for (var i = 0; i < tokenJSON.resource_access.account.roles.length; i++) {
        console.log("resource: "+ tokenJSON.resource_access.account.roles[i]);
      }

      let spaReservation = tokenJSON.resource_access["spa-reservations"];


      for (var i = 0; i < spaReservation.roles.length; i++) {
        console.log("spa:"+ spaReservation.roles[i]);
      }
    }
  }

  testAuthAdmin() {
    console.log("test auth");
    this.restCallsService.getTestAuthAdmin()
      .subscribe(response => {
        console.log(response);
      });
  }

  public logoff() {
    this.oauthService.logOut();
  }

  public get accessToken() { return this.oauthService.getAccessToken(); }
  public get refreshToken() { return this.oauthService.getRefreshToken(); }
  public get identityClaims() { return this.oauthService.getIdentityClaims(); }
  public get idToken() { return this.oauthService.getIdToken(); }
  public get logoutUrl() { return this.oauthService.logoutUrl; }

  public get isLoggedIn() { return this.oauthService.hasValidIdToken(); }



}
