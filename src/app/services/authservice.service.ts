import { inject, Injectable } from '@angular/core';
import {Auth, createUserWithEmailAndPassword, updateProfile} from '@angular/fire/auth'
import { RegisterRequest } from '../models/register-request';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  firebaseAuth = inject(Auth);

  register(params: RegisterRequest): Observable<void> {
    const promise = createUserWithEmailAndPassword(this.firebaseAuth, params.email, params.password).then(response => updateProfile(response.user, {displayName: `${params.firstName} ${params.lastName}`}))
  
      return from(promise);
  }

  
}
