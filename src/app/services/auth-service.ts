import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  logged: boolean = false

  auth: AuthService[] = []

  login() {
    this.logged = true
  }

  logout() {
    this.logged = false

  }
}
