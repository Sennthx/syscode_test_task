// src/app/core/auth/auth.guard.ts
import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const username = prompt('Username:'); // Replace with real auth later
    const password = prompt('Password:');

    if (username === 'admin' && password === 'secret') {
      return true; // Allow access
    } else {
      this.router.navigate(['/students']); // Redirect if failed
      return false;
    }
  }
}
