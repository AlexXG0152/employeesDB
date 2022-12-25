import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(private storageService: StorageService) {}

  currentUser: any;

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
  }
}
