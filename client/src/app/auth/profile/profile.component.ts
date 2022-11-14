import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(private StorageService: StorageService) {}

  currentUser: any;

  ngOnInit(): void {
    this.currentUser = this.StorageService.getUser();
  }
}
