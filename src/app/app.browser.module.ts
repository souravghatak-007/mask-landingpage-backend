import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from './Modules/material-module';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { LoginModule } from 'login-lib-influxiq';
import { CookieService } from 'ngx-cookie-service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListingModule } from 'listing-angular7';
import { ClipboardModule } from 'ngx-clipboard';
import { AppRoutingModule } from './Modules/app-routing.module';
import { LoginComponent } from './Components/auth/login/login.component';
import { ResetPasswordComponent } from './Components/auth/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './Components/auth/forgot-password/forgot-password.component';
import { CommonModule } from '@angular/common';

import { CKEditorModule } from 'ngx-ckeditor';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';



import { LoaderService } from './services/loader.service';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { LoaderInterceptor } from './Class/common/loader.interceptor';
import { HttpLoaderComponent } from './Components/common/http-loader/http-loader.component';
import { AccountsComponent } from './Components/common/accounts/accounts.component';
import { DialogBoxComponent } from './Components/common/dialog-box/dialog-box.component';
import { MatIconRegistry } from '@angular/material';

// import { ContactusModule } from 'contactus';
import { MomentModule } from 'ngx-moment';

import { FileUploadModule } from 'file-upload-lib-influxiq';
import { TeamModule } from 'team-lib-influxiq';

import { AppModule } from './app.module';


@NgModule({
  imports: [
    
    TransferHttpCacheModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    LoginModule,
    FormsModule,
    ReactiveFormsModule,
    ListingModule,
    FileUploadModule,
    CKEditorModule,
    TeamModule,
    HttpClientModule,
    CommonModule,
    MomentModule,
    ClipboardModule,
    NgxDaterangepickerMd.forRoot(),
    AppModule,
    BrowserTransferStateModule,
  ],
  providers: [CookieService,
    LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  entryComponents: []
})
export class AppBrowserModule {
  constructor(public http: HttpClient, matIconRegistry: MatIconRegistry) {
    matIconRegistry.registerFontClassAlias('fontawesome', 'fa');
  }
}
