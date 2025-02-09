import { Component, inject, OnInit, signal } from '@angular/core';
import { DashHeaderComponent } from "../../../shared/dash-header/dash-header.component";
import { SidebarComponent } from "../../../shared/sidebar/sidebar.component";
import { AuthserviceService } from '../../../services/authservice.service';
import { UserInfo } from '@angular/fire/auth';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { query, where } from '@firebase/firestore';

@Component({
  selector: 'app-collect-request',
  standalone: true,
  imports: [DashHeaderComponent, SidebarComponent],
  templateUrl: './collect-request.component.html',
  styles: ``
})
export class CollectRequestComponent implements OnInit{

  authservice = inject(AuthserviceService);
  firestore = inject(Firestore);
  userCon = signal<UserInfo | null>(null);
  reqs = signal<any[]>([]);

  ngOnInit(): void {
    this.fetchData();
  }

  async fetchData() {
    const user = await this.authservice.getCurrentUser();

    if (user) {
        const itemsCollection = collection(this.firestore, 'recyquest');
        const filteredQuery = query(itemsCollection, where('city', '==', user.city));

        collectionData(filteredQuery).subscribe((crequests) => {
          this.reqs.set(crequests);
        });
        
    } else {
      this.userCon.set(null);
    }
  }
  

}
