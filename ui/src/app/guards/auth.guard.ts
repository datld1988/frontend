import { UserService } from './../services/user.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private userservice: UserService) {

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    //let currentpath=state.url.substring(1);
    //currentpath=currentpath.substring(1);
    //console.log(currentpath);
    let user = this.userservice.getuser();
    //console.log(user);
    if (user.username != null) {
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page
    this.router.navigate(['/']);
    return false;
  }
}
