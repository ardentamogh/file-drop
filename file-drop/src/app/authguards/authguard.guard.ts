import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { BackEndService } from '../services/back-end.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private backService:BackEndService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.backService.getStatus().pipe(
      map(response => {
        if (response.result) {
          this.backService.showToast('Valid Login during routing', 'Login Status');
          return true;
        } else {
          this.backService.showToast('InValid Login during routing', 'Login Status','error');
          return false;
        }
      }),
      catchError((error) => {
        console.error('Error:', error);
        this.router.navigate(['/unauthorized']);
        return of(false);
      })
    );
  }
}
