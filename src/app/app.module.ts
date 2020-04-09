import { BrowserModule } from '@angular/platform-browser';
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

import { DatePipe } from '@angular/common';
import { BlogModule } from 'blog-lib-influxiq';
import { LoaderService } from './services/loader.service';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { LoaderInterceptor } from './Class/common/loader.interceptor';
import { HttpLoaderComponent } from './Components/common/http-loader/http-loader.component';

import { AccountsComponent } from './Components/common/accounts/accounts.component';
import { DialogBoxComponent } from './Components/common/dialog-box/dialog-box.component';
import { MatIconRegistry } from '@angular/material';

import { UploadDialogBoxComponent, DialogContentExampleDialog } from './Components/common/upload-dialog-box/upload-dialog-box.component';
// import { ContactusModule } from 'contactus';
import { MomentModule } from 'ngx-moment';
import {AdminDetailsComponent}from './Components/admin-details/admin-details.component';
import { MetaModule } from '@ngx-meta/core';
import {DashboardAdminComponent} from './Components/dashboard-admin/dashboard-admin.component'
import {AdminheaderComponent} from './Components/header/adminheader.component';
import {FooterComponent} from './Components/footer/footer.component';
import {AddAdminComponent} from './Components/addadmin/addadmin.component'
import { from } from 'rxjs';
import { UserListingComponent } from './Components/user/user-listing/user-listing.component';
import { UserAddEditComponent } from './Components/user/user-add-edit/user-add-edit.component';
import { OrderListingComponent } from './Components/order/order-listing/order-listing.component';
import  {ProductComponent} from './Components/product/product.component';
import {SuccessComponent} from './Components/success/success.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent,
    HttpLoaderComponent,
    AccountsComponent,
    DialogBoxComponent,
    UploadDialogBoxComponent,
    DialogContentExampleDialog,
    LoginComponent,
    AdminDetailsComponent,
    DashboardAdminComponent,
    AdminheaderComponent,
    FooterComponent,
    AddAdminComponent,
    UserListingComponent,
    UserAddEditComponent,
    OrderListingComponent,
    ProductComponent,
    SuccessComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
   
    TransferHttpCacheModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    LoginModule,
    FormsModule,
    ReactiveFormsModule,
    ListingModule,
    BlogModule,
    HttpClientModule,
    CommonModule,
    MomentModule,
    ClipboardModule,
    MetaModule.forRoot(),
    
  ],
  providers: [CookieService,DatePipe,LoaderService],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  entryComponents: [ DialogBoxComponent]
})
export class AppModule {
  constructor(public http: HttpClient, matIconRegistry: MatIconRegistry) {
    matIconRegistry.registerFontClassAlias('fontawesome', 'fa');
  }
}
