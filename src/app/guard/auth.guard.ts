import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const userDetais = localStorage.getItem('userDetails');

  const parseData = JSON.parse(userDetais!)

  if(parseData?.username === 'Anand' && parseData?.password == 12345){
    return true;
  }
  else {
    alert('Invalid Authentication');

    console.log(router);
    
    router.navigate(['/login'])
    return false;
  }

};
