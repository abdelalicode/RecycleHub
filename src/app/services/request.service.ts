import { AuthserviceService } from './authservice.service';
import { inject, Injectable } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { Request } from '../models/request.type';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

    firestore: Firestore = inject(Firestore);
    authservice: AuthserviceService = inject(AuthserviceService);

    async addRequest(request: Request) {
      try {
        const requestsCollection = collection(this.firestore, 'recyquest');
        await addDoc(requestsCollection, request);
        console.log('Request added successfully!');
      } catch (error) {
        console.error('Error adding request: ', error);
      }
    }
  
}
