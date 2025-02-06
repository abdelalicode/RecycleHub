import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ul>
      <li *ngFor="let item of items$ | async">{{ item.type }}</li>
    </ul>
  `,
})

export class ExampleComponent {
  firestore: Firestore = inject(Firestore);
  items$: Observable<any[]>;

  constructor() {
    const itemsCollection = collection(this.firestore, 'recyquest');
    this.items$ = collectionData(itemsCollection);
  }

  
}