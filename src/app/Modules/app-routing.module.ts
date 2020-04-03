import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../Components/auth/login/login.component';
import { ResetPasswordComponent } from '../Components/auth/reset-password/reset-password.component';
import { ForgotPasswordComponent } from '../Components/auth/forgot-password/forgot-password.component';
import { AdminDetailsComponent } from '../Components/admin-details/admin-details.component';
import { DashboardAdminComponent } from '../Components/dashboard-admin/dashboard-admin.component';
import { AdminheaderComponent } from '../Components/header/adminheader.component';
import { FooterComponent } from '../Components/footer/footer.component';
import { AddAdminComponent } from '../Components/addadmin/addadmin.component';




const routes: Routes = [

  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  {path:'reset-password/:token',component:ResetPasswordComponent},
  {path:'forget-password',component:ForgotPasswordComponent},
  {path:'user-details',component:AdminDetailsComponent},
  {path:'dashboard',component:DashboardAdminComponent},
  {path:'header',component:AdminheaderComponent},
  {path:'footer',component:FooterComponent},
  {path:'add-admin',component:AddAdminComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
