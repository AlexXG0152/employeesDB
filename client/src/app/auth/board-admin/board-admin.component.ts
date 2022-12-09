import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.scss'],
})
export class BoardAdminComponent implements OnInit {
  loading: boolean = true;
  content?: string;

  constructor(
    private UserService: UserService,
    private _liveAnnouncer: LiveAnnouncer
  ) {}

  ngOnInit(): void {
    this.getAllUsers();
    this.UserService.getAdminBoard().subscribe({
      next: (data) => {
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

  getAllUsers() {
    this.UserService.getAllUsers().subscribe((users) => {
      this.dataSource = new MatTableDataSource(users);
      this.dataSource.sort = this.sort;
      this.loading = this.dataSource ? false : true;
    });
  }

  dataSource?: any;
  displayedColumns: string[] = ['username', 'email', 'roles'];
  @ViewChild(MatSort) sort!: MatSort;

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  updateUserRights(id: string, roles: any) {
    const update = {
      _id: id,
      roles: roles,
    };

    this.UserService.patchUserRight(id, update).subscribe(() => {
      this.getAllUsers();
    });
    this.closePopup();
  }

  // POP-UP
  displayStyle = 'none';
  addRecordButton = '';
  userInfoForModal?: any;
  strUserInfoForModal?: any;
  admin = '';
  moderator = '';
  user = '';

  openPopup(data: any): void {
    if (!data._id) {
      this.addRecordButton = 'add';
    }
    this.userInfoForModal = data;
    this.displayStyle = 'block';
    this.strUserInfoForModal = JSON.stringify(data.roles);
    this.admin = this.strUserInfoForModal.includes('"name":"admin"');
    this.moderator = this.strUserInfoForModal.includes('"name":"moderator"');
    this.user = this.strUserInfoForModal.includes('"name":"user"');
  }
  closePopup(): void {
    this.displayStyle = this.displayFinish = 'none';
    this.userInfoForModal =
      this.admin =
      this.moderator =
      this.user =
      this.addRecordButton =
        '';
  }

  newRoles: string[] = [];
  updatedUserID: string = '';
  saveChanges(data: any) {
    this.updatedUserID = this.userInfoForModal._id;
    const roles = ['admin', 'moderator', 'user'];
    for (let i = 0; i < data.length; i++) {
      if (data[i]) {
        this.newRoles.push(roles[i]);
      }
    }
    this.updateUserRights(this.updatedUserID, this.newRoles);
    this.newRoles = [];
  }
  displayFinish = 'none';
  openPopupU(): void {
    this.displayFinish = 'block';
  }
}
