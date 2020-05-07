import { ApiResult } from './../../../../Models/result.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserManagerService } from './../../Services/user-manager.service';
import { UserItem } from './../../Models/user-item.model';
import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.css']
})
export class UserManagerComponent implements OnInit {

  listOfData: UserItem[] = [];

  constructor(
    private userService: UserManagerService,
    private spinner: NgxSpinnerService,
    private notifier: NotifierService
  ) { }

  deleteUser(id: string) {
    this.spinner.show();

    this.userService.removeUser(id).subscribe(
      (data: ApiResult) => {
        if (data.status === 200) {
          this.notifier.notify('success', 'User removed!');
        } else {
          for (let i = 0; i < data.errors; i++) {
            this.notifier.notify('error', data.errors[i]);
          }
        }
        this.spinner.hide();
      }
    );
  }


  ngOnInit(): void {
    this.spinner.show();

    this.userService.getAllUsers().subscribe((AllUsers: UserItem[]) => {
      this.listOfData = AllUsers;
      this.spinner.hide();
    }

    );



  }

}
