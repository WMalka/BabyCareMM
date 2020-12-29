import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from "@angular/router";

import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Users } from "../models/user.model";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (localStorage.getItem("user")) {
      const u = <Users>JSON.parse(localStorage.getItem("user"));
      if (u.IsMother) return true;
      else {
        this.router.navigateByUrl("/login");
        return false;
      }
    } else {
      this.router.navigateByUrl("/login");
      return false;
    }
  }
}
