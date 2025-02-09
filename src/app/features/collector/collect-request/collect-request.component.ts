import { Component, inject, OnInit, signal } from '@angular/core';
import { DashHeaderComponent } from "../../../shared/dash-header/dash-header.component";
import { SidebarComponent } from "../../../shared/sidebar/sidebar.component";
import { AuthserviceService } from '../../../services/authservice.service';
import { UserInfo } from '@angular/fire/auth';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { query, where } from '@firebase/firestore';
import { Observable } from 'rxjs';
import { RequestService } from '../../../services/request.service';
import { Request } from '../../../models/request.type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-collect-request',
  standalone: true,
  imports: [DashHeaderComponent, SidebarComponent, CommonModule],
  templateUrl: './collect-request.component.html',
  styles: ``
})
export class CollectRequestComponent implements OnInit{



  requests$!: Observable<Request[]>;
  filteredRequests = signal<Request[]>([]);
  pending = signal<Request[]>([]);
  occupied = signal<Request[]>([]);
  inprogress = signal<Request[]>([]);

  constructor(
    private requestService: RequestService,
    private authservice: AuthserviceService
  ) {}



  ngOnInit(): void {
    this.requests$ = this.requestService.getAllRequests();
    this.filterRequestsByCity();
  }


  validate(reqId: string) {
    this.authservice.getCurrentUser().then(user => {
      if (user) {
        const collectorId = user.uid;
        this.requestService.updateStatus(reqId, 'Validated', collectorId);
      } 
    });
    
  }
   takerequest(reqId: string) {
    this.authservice.getCurrentUser().then(user => {
      if (user) {
        const collectorId = user.uid;
        this.requestService.updateStatus(reqId, 'Occupied', collectorId);
      } 
    });
   }


   reject(reqId: string) {
    this.authservice.getCurrentUser().then(user => {
      if (user) {
        const collectorId = user.uid;
        this.requestService.updateStatus(reqId, 'Cancelled', collectorId);
      } 
    });
  }
  
   
   begin(reqId: string) {
    this.authservice.getCurrentUser().then(user => {
      if (user) {
        const collectorId = user.uid;
        this.requestService.updateStatus(reqId, 'InProgress', collectorId);
      } 
    });
   }

  filterRequestsByCity() {
    this.requests$.subscribe((requests) => {
      this.authservice.getCurrentUser().then((user) => {
        if (user && user.city) {   
          const filtered = requests.filter((request) => request.city === user.city);
          this.filteredRequests.set(filtered);
          this.check(filtered);
        }
      }).catch((error) => {
        console.error('Error fetching user:', error);
      });
     
    });
  }


  check(filteredRequests: Request[]) {
    const pendingRequests = filteredRequests.filter((request) => request.status === 'Pending');

    this.pending.set(pendingRequests);

    this.authservice.getCurrentUser().then((user) => {
    
      
      if (user && user.uid) {
        const occupiedRequests = filteredRequests.filter(
          (request) => request.status === 'Occupied' && request.collector === user.uid
        );
        const inProgressRequests = filteredRequests.filter(
          (request) => request.status === 'InProgress' && request.collector === user.uid
        );
  
        this.occupied.set(occupiedRequests);
        this.inprogress.set(inProgressRequests);
      }
    }).catch((error) => {
      console.error('Error fetching user:', error);
    });

    console.log(this.pending());
    console.log(this.occupied());
    console.log(this.inprogress());
  }
  

}
