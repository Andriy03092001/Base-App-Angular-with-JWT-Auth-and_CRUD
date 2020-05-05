import { Component } from '@angular/core';
import { ApiService } from '../core/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {

  isExpanded = false;
  isLoggedIn: boolean;
  isAdmin: boolean;



  constructor(
    private apiService: ApiService,
    private router: Router
    ) {

      this.isLoggedIn = this.apiService.isLoggedIn();
      this.isAdmin = this.apiService.isAdmin();

      this.apiService.loginStatus.subscribe((status) => {
        this.isLoggedIn = status;
        this.isAdmin = this.apiService.isAdmin();
      });

    }



  Logout() {
    this.apiService.Logout();
    this.router.navigate(['/']);
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
