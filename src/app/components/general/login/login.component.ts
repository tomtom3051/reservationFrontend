import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { OAuthService } from 'angular-oauth2-oidc';
import { filter } from 'rxjs/operators';
import { CheckPasswordService } from 'src/app/services/check-password.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [CheckPasswordService]
})
export class LoginComponent implements OnInit {

  constructor(private routes: Router,
              private oauthService: OAuthService) {

    this.oauthService.events
      .pipe(filter(e => e.type === 'token_received'))
      .subscribe(_ => {
        if (this.oauthService.hasValidIdToken()){
          this.routes.navigate(['/simple']);
        }
        this.oauthService.loadUserProfile();
      });
  }

  public login() {
    this.oauthService.initLoginFlow();  
  }

  public logout() {
    this.oauthService.logOut();
  }

  public get accessToken() { return this.oauthService.getAccessToken(); }
  public get refreshToken() { return this.oauthService.getRefreshToken(); }
  public get identityClaims() { return this.oauthService.getIdentityClaims(); }
  public get idToken() { return this.oauthService.getIdToken(); }
  public get logoutUrl() { return this.oauthService.logoutUrl; }

  public get isLoggedIn() { return this.oauthService.hasValidIdToken();}



  ngOnInit() {
    if (this.oauthService.hasValidIdToken()) {
      this.routes.navigate(['/simple']);
    }
  }
}

