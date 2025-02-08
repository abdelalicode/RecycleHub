import { inject, Injectable, signal } from '@angular/core';
import {Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, user, UserCredential} from '@angular/fire/auth'
import { RegisterRequest } from '../models/register-request';
import { from, Observable } from 'rxjs';
import { AuthenticateRequest } from '../models/authenticate-request';
import { User } from '../models/user';
import { doc, Firestore, getDoc, setDoc, updateDoc } from '@angular/fire/firestore';
import { UserInfo } from '../models/userinfo';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  firebaseAuth = inject(Auth);
  firestore = inject(Firestore);
  user$ = user(this.firebaseAuth);
  currentUserSignal = signal<User | null | undefined>(undefined)



  register(params: RegisterRequest): Observable<void> {
    const promise = createUserWithEmailAndPassword(this.firebaseAuth, params.email, params.password).then(async (response) => {
      await updateProfile(response.user, { displayName: `${params.firstName} ${params.lastName}` });

      const userRef = doc(this.firestore, `users/${response.user.uid}`);
      const userDocData = {
        firstName: params.firstName,
        lastName: params.lastName,
        email: params.email,
        phone: null,
        city: null,
        role: "individual",
        points: 0,
      };

      await setDoc(userRef, userDocData);
    });

    return from(promise);
  }


  login(logparams: AuthenticateRequest): Observable<UserCredential> {
    const promise = signInWithEmailAndPassword(this.firebaseAuth, logparams.email, logparams.password);
    return from(promise);
  }

  logout() : Observable<void> {
    const promise = signOut(this.firebaseAuth);
    return from(promise);
  }

  updateProfile(updatedData: any): Promise<void> {
    const user = this.firebaseAuth.currentUser;

    if (!user) {
      return Promise.reject('No authenticated user found');
    }

    const userRef = doc(this.firestore, `users/${user.uid}`);
    const updatedUserData = {
      email: updatedData.email,
      phone: updatedData.phone,
      city: updatedData.city,
    };


    return updateDoc(userRef, updatedUserData)
      .then(() => {
        console.log('User profile updated successfully');
      })
      .catch((error) => {
        console.error('Error updating Firestore document:', error);
        throw new Error(error);
      });
  }


  async getCurrentUser(): Promise<UserInfo | null> {
    const user = this.firebaseAuth.currentUser;
    if (user) {
      const userRef = doc(this.firestore, `users/${user.uid}`);
      const docSnapshot = await getDoc(userRef);
      if (docSnapshot.exists()) {
        return docSnapshot.data() as UserInfo;
      } else {
        return null;
      }
    }
    return Promise.resolve(null); 
  }

  
}
