import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private _router = inject(Router);
  private _loginService = inject(LoginService);

  canActivate(): boolean {
    if (this._loginService.isLoggedIn()) {
      return true;
    } else {
      this._router.navigate(['/login']);
      return false;
    }
  }
}

