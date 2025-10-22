import { Component, inject } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { FormsModule } from '@angular/forms';
import { Spinner } from "../../components/spinner/spinner";

@Component({
  selector: 'app-login-page',
  imports: [RouterModule, RouterLink, FormsModule, Spinner],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss'
})
export class LoginPage {
  errorLogin = false;
  authService = inject(AuthService);
  isLoading = false;

  async login(form: { email: string, password: string }) {
    console.log(form);
    this.errorLogin = false;

    if (!form.email || !form.password) {
      this.errorLogin = true;
      return;
    }

    this.isLoading = true;

    try {
      const result = await this.authService.login(form) as boolean | void;

      if (result === false) {
        this.errorLogin = true;
      }

    } catch (error) {
      console.error('Error en login:', error);
      this.errorLogin = true;
    } finally {
      this.isLoading = false;
    }
  }
}