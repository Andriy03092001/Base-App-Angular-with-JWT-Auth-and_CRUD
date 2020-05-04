import { ApiService } from './../core/Api.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NotifierService } from 'angular-notifier';

@Injectable({
  providedIn: 'root'
})
export class NotLoginGuard implements CanActivate {

  constructor(
    private apiService: ApiService,
    private router: Router,
    private notifier: NotifierService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkRole(state.url);
  }

  checkRole(url: string): boolean {
    if (!this.apiService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/']);
      this.notifier.notify('error', 'Ви вже війшли!');
      return false;
    }

  }
}
