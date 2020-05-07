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
  searchResult: UserItem[] = [];
  searchText: string;

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

          this.listOfData = this.listOfData.filter(t => t.id !== id);
          this.searchResult = this.searchResult.filter(t => t.id !== id);

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
      this.searchResult = AllUsers;
      this.spinner.hide();
    }
    );
  }

  Search() {
    this.searchResult = this.listOfData.filter(t =>  t.fullName.includes(this.searchText) || t.email.includes(this.searchText));
  }

}
