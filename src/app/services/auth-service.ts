import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Este service se encarga del login, de tener el token y de deslogear
 * Siempre que se necesite el token hay que llamar a getToken().
 */
@Injectable({
  providedIn: 'root'
})

export class AuthService {
  loggeado: boolean = false;
  router = inject(Router);
  token: null | string = localStorage.getItem("token");
  async login(loginData: any) {
    const res = await fetch("https://agenda-api.somee.com/api/authentication/authenticate",
      {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData)
      }
    );
    if (res.ok) {
      this.router.navigate([""])
      this.token = await res.text();
      localStorage.setItem("token", this.token);
    }
    console.log("Respuesta del back", res);
  }

  logout() {
    localStorage.clear()
    this.token = null;
  }

  getToken() {
    return this.token;
  }
}
