import { Component, inject } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/users-services';


@Component({
  selector: 'app-register-page',
  imports: [RouterModule, FormsModule],
  templateUrl: './register-page.html',
  styleUrl: './register-page.scss'
})
export class RegisterPage {
  errorRegister = false;
  user = inject(UserService);
  isLoading = false;
  router = inject(Router)

  async register(form: any) {
    this.errorRegister = false;
    if (!form.email || !form.password || !form.password2 || !form.firstName || !form.lastName || form.password !== form.password2) {
      this.errorRegister = true;
      return
    }
    this.isLoading = true;
    const res = await this.user.register(form);
    if (res.ok) {
      this.router.navigate(["/login"])
    }
    this.isLoading = false;
    this.errorRegister = true;
  }
}
