import { ActivatedRoute, CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  const activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  const currentUrl: string = state.url;

  if (authService.getAuthState()) {
    return true;
  }

  authService.setDestiantionUrl(currentUrl);

  router.navigate(['/login'], { relativeTo: activatedRoute });
  return false;
};
