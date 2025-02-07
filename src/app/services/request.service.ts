import { inject, Injectable } from '@angular/core';
import { Firestore, collection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

    firestore: Firestore = inject(Firestore);


    // addRequest(wasteType: string[], weight: number, address: string, date: string) {
    
    //     return collection(this.firestore,'recyquest').add({
    //       userId: 1,
    //       wasteType,
    //       weight,
    //       address,
    //       date,
    //       status: 'Pending'
    //     });
    // }
  
}
