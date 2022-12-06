import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { take } from 'rxjs/operators';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-board-moderator',
  templateUrl: './board-moderator.component.html',
  styleUrls: ['./board-moderator.component.scss'],
})
export class BoardModeratorComponent implements OnInit {
  constructor(private UserService: UserService) {}

  content?: string;
  loading: boolean = true;
  myData: any;
  myColumns: any;

  async setColumns(data: any) {
    const result = Object.keys(data[0]).slice(1);
    const res: { caption: string; field: string }[] = [];
    result.forEach((column) => res.push({ caption: column, field: column }));
    return res;
  }

  async ngOnInit(): Promise<void> {
    // const data = await this.UserService.getAllUsers().pipe(take(1)).toPromise();
    // this.myData = data;
    // const cols = await this.setColumns(this.myData);
    // this.myColumns = cols;
    // this.loading = this.myColumns ? false : true;




    // this.UserService.getAllUsers().subscribe(async (data) => {
    //   this.myData = data;

    //   let rr = [];
    //   this.myData.forEach((allUsersData: any) => {
    //     let roles = '';
    //     allUsersData.roles.forEach((e: any) => {
    //       roles += e.name + ', ';
    //     });
    //     allUsersData.roles = roles.slice(0, -2);
    //     rr.push(allUsersData);
    //   });

    //   this.myColumns = await this.setColumns(this.myData);
    //   this.loading = this.myColumns ? false : true;
    // });

    this.UserService.getModeratorBoard().subscribe({
      next: async (data) => {
        this.content = data;
      },
      error: (err) => {
        if (err.error) {
          try {
            const res = JSON.parse(err.error);
            this.content = res.message;
          } catch {
            this.content = `Error with status: ${err.status} - ${err.statusText}`;
          }
        } else {
          this.content = `Error with status: ${err.status}`;
        }
      },
    });
  }
}
