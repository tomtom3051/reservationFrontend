import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { HomeComponent } from './components/general/home/home.component';
import { AboutComponent } from './components/general/about/about.component';
import { NotfoundComponent } from './components/general/notfound/notfound.component';
import { NavbarComponent } from './components/general/navbar/navbar.component';
import { SimpleComponent } from './components/reservation/simple/simple.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';
import {MatListModule} from '@angular/material/list';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatRadioModule } from '@angular/material/radio';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { FlexModule } from '@angular/flex-layout';
import { TestauthComponent } from './components/reservation/testauth/testauth.component';
import { OAuthModule } from 'angular-oauth2-oidc';
import { LoginComponent } from './components/general/login/login.component';
import { AuthGuard } from './services/auth-guard';
import { UserReservationComponent } from './components/reservation/user-reservation/user-reservation.component';
import { AdminComponent } from './components/reservation/admin/admin.component';
import { MatTableModule} from '@angular/material/table';
import { MatSortModule} from '@angular/material/sort';
import { AdminTableComponent } from './components/reservation/admin-table/admin-table.component';
import { RequestTableComponent } from './components/reservation/request-table/request-table.component';
import { PopupConfirmationComponent } from './components/general/popup-confirmation/popup-confirmation.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { FooterComponent } from './components/general/footer/footer.component';
import { LoaderComponent } from './components/general/loader/loader.component';
import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { LoaderService } from './services/loader.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    NotfoundComponent,
    NavbarComponent,
    SimpleComponent,
    TestauthComponent,
    LoginComponent,
    UserReservationComponent,
    AdminComponent,
    AdminTableComponent,
    RequestTableComponent,
    PopupConfirmationComponent,
    FooterComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDialogModule,
    MatListModule,
    MatIconModule,
    MatRadioModule,
    GoogleMapsModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatSortModule,
    OAuthModule.forRoot({
      resourceServer: {
         // allowedUrls: ['http://localhost:9090/api'],
          allowedUrls: ['/api'],
          sendAccessToken: true
      }
  })
  ],
  providers: [
    AuthGuard,
    LoaderService, 
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: LoaderInterceptor, 
      multi: true 
    }, 

  ],
  bootstrap: [AppComponent],
  entryComponents: [
    PopupConfirmationComponent
    , 
  ]
})
export class AppModule { }
