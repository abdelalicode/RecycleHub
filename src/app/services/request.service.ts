import { AuthserviceService } from './authservice.service';
import { inject, Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, doc, updateDoc } from '@angular/fire/firestore';
import { Request } from '../models/request.type';
import { Observable } from 'rxjs';

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



  getAllRequests(): Observable<Request[]> {
    const requestsCollection = collection(this.firestore, 'recyquest');
    return collectionData(requestsCollection, { idField: 'id' }) as Observable<Request[]>;
  }


  async updateStatus(requestId: string, newStatus: string, collectorId: string) {
    try {
      const requestDoc = doc(this.firestore, 'recyquest', requestId);
      await updateDoc(requestDoc, {
        status: newStatus,
        collector: collectorId
      });
    } catch (error) {
      console.error(error);
    }
  }





}
