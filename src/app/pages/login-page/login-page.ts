import { Component, inject } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { FormsModule, NgForm } from '@angular/forms';


@Component({
  selector: 'app-login-page',
  imports: [RouterModule, RouterLink, FormsModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss'
})
export class LoginPage {
  errorLogin = false
  authService = inject(AuthService)
  isLoading = false;

  login(form: { email: string, password: string }) {
    console.log(form)
    this.errorLogin = false;
    if (!form.email || !form.password) {
      this.errorLogin = true;
      return
    }
    this.isLoading = true;
    this.authService.login(form);
    this.isLoading = false;
  }

}
