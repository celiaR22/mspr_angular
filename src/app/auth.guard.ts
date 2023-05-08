import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthService
  ) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = sessionStorage.getItem('currentUser');
    /// si on a bien le token de l'utilisateur on renvoie true pour autoriser l'acces a la page
    if (currentUser) {
      return true;
    }
    //// sinon on bloque l'acces et on redirige vers la page de login
    this.router.navigate(['/login']);
    return false;
  }



}
