import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-board-moderator',
  templateUrl: './board-moderator.component.html',
  styleUrls: ['./board-moderator.component.scss'],
})
export class BoardModeratorComponent implements OnInit {
  constructor(private UserService: UserService) {}

  content?: string;

  ngOnInit(): void {
    this.UserService.getModeratorBoard().subscribe({
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
