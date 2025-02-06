import { Component, inject, signal } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-requests',
  standalone: true,
  imports: [],
  templateUrl: './requests.component.html',
  styles: ``
})
export class RequestsComponent {

  firestore: Firestore = inject(Firestore);
  items =  signal<any[]>([]);

  ngOnInit() {
    const itemsCollection = collection(this.firestore, 'recyquest');
    collectionData(itemsCollection).subscribe((crequests) => this.items.set(crequests));
  }

}
