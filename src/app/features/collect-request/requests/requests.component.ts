import { Component, inject, signal } from '@angular/core';
import { collection, collectionData, Firestore, query, where } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Auth, authState } from '@angular/fire/auth';

@Component({
  selector: 'app-requests',
  standalone: true,
  imports: [],
  templateUrl: './requests.component.html',
  styles: ``,
})
export class RequestsComponent {

  firestore: Firestore = inject(Firestore);
  router: Router = inject(Router);
  auth: Auth = inject(Auth);
  items = signal<any[]>([]);
  error = signal('');
  max = 3;

  ngOnInit() {

    authState(this.auth).subscribe(user => {
      if (user) {

        const userId = user.uid;
        
        const itemsCollection = collection(this.firestore, 'recyquest');
        const filteredQuery = query(itemsCollection, where('userId', '==', userId));

        collectionData(filteredQuery).subscribe((crequests) => {
          this.items.set(crequests);
        });
      }
    });
  }

  addReqForm() {
    const pendingRequests = this.items().filter(item => item.status === 'Pending').length;

    if (pendingRequests >= this.max) {
      this.error.set('You cannot add more than 3 pending requests.')
      // alert('You cannot');

      setTimeout(() => {
        this.error.set('');
      }, 3000);
      return;
    }
    this.router.navigate(['add-request']);
  }
}
