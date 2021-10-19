import { Injectable } from '@angular/core';
import{CanActivate,Router} from '@angular/router';
import { PersistenceService } from 'angular-persistence';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router:Router,private persistenceService:PersistenceService) { }
  canActivate()
  {
    if(this.persistenceService.get('token'))
    {
      return true;
    }
    else
    {
      this.router.navigate(['login']);
      return false;
      
    }
  }
}
