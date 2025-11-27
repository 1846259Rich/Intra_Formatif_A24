import { inject } from '@angular/core';
import { CanActivateFn, createUrlTreeFromSnapshot } from '@angular/router';
import { UserService } from './user.service';

export const userGuard: CanActivateFn = (route, state) => {
  if(!inject(UserService).currentUser){
    return createUrlTreeFromSnapshot(route, ["/login"]);
  }
  else return true;
};
