import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { map, Observable } from 'rxjs';
import { Sesion } from '../../models/sesion';
import { SesionService } from '../services/sesion.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthState } from 'src/app/autenticacion/state/auth.reducer';
import { selectSesionState } from 'src/app/autenticacion/state/auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class SesionGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(
    private Sesion: SesionService,
    private authStore: Store<AuthState>,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authStore.select(selectSesionState).pipe(
      map((sesion: Sesion) => {
        if (sesion.sesionActiva) {
          return true;
        } else {
          this.router.navigate(['auth/login']);
          return false;
        }
      })
    );
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authStore.select(selectSesionState).pipe(
      map((sesion: Sesion) => {
        if (sesion.sesionActiva) {
          return true;
        } else {
          this.router.navigate(['auth/login']);
          return false;
        }
      })
    );
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authStore.select(selectSesionState).pipe(
      map((sesion: Sesion) => {
        if (sesion.sesionActiva) {
          return true;
        } else {
          this.router.navigate(['auth/login']);
          return false;
        }
      })
    );
  }
}
