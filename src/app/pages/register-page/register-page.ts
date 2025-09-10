import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth-service';


@Component({
  selector: 'app-register-page',
  imports: [RouterModule, FormsModule],
  templateUrl: './register-page.html',
  styleUrl: './register-page.scss'
})
export class RegisterPage {
  errorRegister = false;
  auth = inject(AuthService);
  
  register(form: any) {
    console.log(form);
    this.errorRegister = false;
    if (!form.email || !form.password || !form.password2 || form.password !== form.password2) {
      this.errorRegister = true;
      return
    }
  }
}
