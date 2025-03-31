import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(): boolean {
    const username = prompt('Username:');
    const password = prompt('Password:');

    if (username === 'admin' && password === 'secret') {
      return true;
    } else {
      this.router.navigate(['/students']);
      return false;
    }
  }
}
