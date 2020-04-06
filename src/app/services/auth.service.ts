import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})

export class AuthService implements CanActivate {

  constructor(public cookie: CookieService, private _router: Router) {
  }

  // canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

  //   let getToken = this.cookie.get('jwtToken');
  //   let user=this.cookie.get('user_details');
  //   if (getToken !=null &&  user == '') {
  //     return true;
  //   } 
  // }
  canActivate() {
    // console.log('This is auth guard');
    // console.log(this.cookieService.get('jwtToken'));
    if (this.cookie.get('jwtToken') == null || this.cookie.get('jwtToken').length < 10) {
        this._router.navigate(['/']);
    } else return true;
    return false;
}
}
