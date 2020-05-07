import { ApiResult } from './../../../../../Models/result.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserManagerService } from './../../../Services/user-manager.service';
import { Component, OnInit } from '@angular/core';
import { UserItem } from '../../../Models/user-item.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  constructor(
    private userService: UserManagerService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private notifier: NotifierService,
    private route: ActivatedRoute
  ) { }

  model: UserItem;
  userId: string;
  isError: boolean;



  submitForm () {
    this.spinner.show();


    if (this.model.email === null) {
      this.notifier.notify('error', 'Please, enter email!');
      this.isError = true;
    }
    if (this.model.fullName === null) {
      this.notifier.notify('error', 'Please, enter full name!');
      this.isError = true;
    }
    if (this.model.phone === null) {
      this.notifier.notify('error', 'Please, enter phone!');
      this.isError = true;
    }
    if (!this.validateEmail(this.model.email)) {
      this.notifier.notify('error', 'Email is not correct format!');
      this.isError = true;
    }


    if (this.isError === false) {
      this.userService.editUser(this.userId, this.model).subscribe(
        (data: ApiResult) => {
          if (data.status === 200) {
            this.notifier.notify('success', 'User edited!');
            this.router.navigate(['/admin-panel/user-manager']);
          }
        },
        (error) => {
          this.notifier.notify('error', 'Server error');
        }
      );
    }

    this.isError = false;
    this.spinner.hide();
  }


  validateEmail(email: string) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }


  ngOnInit() {
    this.spinner.show();
    this.route.params.subscribe((params: Params) => {
      this.userId = params['id'];
    });
    this.userService.getUser(this.userId).subscribe(
      (user: UserItem) => {
        this.model = user;
        this.spinner.hide();
        console.log(this.model);
      }
    );

  }

}
