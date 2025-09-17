import { CanActivateChildFn, RedirectCommand, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { inject } from '@angular/core';
/**Revisa que la gente esté logeada */
export const onlyLoggedUserGuard: CanActivateChildFn = (childRoute, state) => {
  const auth = inject(AuthService)
  const router = inject(Router)
  //Si no estoy logueado redirijo al usuario
  if (!auth.token) {
    const loginPath = router.parseUrl("/login");
    return new RedirectCommand(loginPath, {
      skipLocationChange: true,
    });
  }
  return true;
};
