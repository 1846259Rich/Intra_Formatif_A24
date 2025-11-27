import { inject } from '@angular/core';
import { CanActivateFn, createUrlTreeFromSnapshot } from '@angular/router';
import { UserService } from './user.service';

export const preferGuard: CanActivateFn = (route, state) => {
  let user = inject(UserService).currentUser;
  if(!user?.prefercat){
      return createUrlTreeFromSnapshot(route, ["/dog"]);
  }
  else return true;
};
