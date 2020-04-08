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
import {UserListingComponent} from '../Components/user/user-listing/user-listing.component';
import {ResolveService} from '../services/resolve.service';
import { UserAddEditComponent } from '../Components/user/user-add-edit/user-add-edit.component';
import {AuthService} from '../services/auth.service'



const routes: Routes = [

  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  {path:'reset-password/:token',component:ResetPasswordComponent},
  {path:'forget-password',component:ForgotPasswordComponent},
  {path:'user-details',component:AdminDetailsComponent},
  {path:'dashboard',component:DashboardAdminComponent},
  {
    path: 'admin/user-management', 
    component: UserListingComponent, 
    // canActivate: [AuthguardService], 
    resolve: { userManagementData: ResolveService },
    data: {
      requestcondition: {
        source: 'users',
        condition: {type:"user"}
      },
      endpoint:"datalist"
    },canActivate: [AuthService],
  },
  {path:'header',component:AdminheaderComponent},
  {path:'footer',component:FooterComponent},

  //-----------admin section route----------------//
  {path:'admin/add',component:AddAdminComponent,canActivate: [AuthService]},

  {path:'admin/edit/:_id',component:AddAdminComponent,
  resolve: { admin_data: ResolveService },
  data: {
    requestcondition: {
      source: 'users',
      condition: {_id:"_id"}
    },
    endpoint: 'datalist'
  },canActivate: [AuthService],
},

  {path:'admin/list',component:AdminDetailsComponent,
  resolve: { adminlist: ResolveService },
  data: {
    requestcondition: {
      source: 'users',
      condition: {type:"admin"}
    },
    endpoint: 'datalist'
  },canActivate: [AuthService]},




  {path:"user/add",component:UserAddEditComponent,canActivate: [AuthService]},
  {path:"user/edit/:id",component:UserAddEditComponent,canActivate: [AuthService]},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
