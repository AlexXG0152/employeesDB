import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.scss'],
})
export class BoardUserComponent implements OnInit {
  constructor(private userService: UserService) {}

  content?: string;

  ngOnInit(): void {
    this.userService.getUserBoard().subscribe({
      next: (data) => {
        this.content = data;
      },
      error: (err) => {
        console.error(err);
        if (err.error) {
          this.content = JSON.parse(err.error).message;
        } else {
          this.content = 'Error with status: ' + err.status;
        }
      },
    });
  }
}
