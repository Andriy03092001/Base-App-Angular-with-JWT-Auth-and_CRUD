import { UserManagerComponent } from './Areas/admin-area/Components/user-manager/user-manager.component';
import { DashboardComponent } from './Areas/admin-area/Components/dashboard/dashboard.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NotFoundComponent } from './NotFound/NotFound.component';
import { AppRoutingModule } from './app-routing.module';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminAreaComponent } from './Areas/admin-area/admin-area.component';
import { UserAreaComponent } from './Areas/user-area/user-area.component';
import { DemoNgZorroAntdModule } from './ng-zorro-antd.module';
import { NZ_I18N } from 'ng-zorro-antd/i18n/public-api';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { UserEditComponent } from './Areas/admin-area/Components/user-manager/user-edit/user-edit.component';
registerLocaleData(en);

const notifierOptions: NotifierOptions = {
  position: {horizontal: { position: 'right' }, vertical: { position: 'top' }}
};

@NgModule({
   declarations: [
      AppComponent,
      NavMenuComponent,
      HomeComponent,
      LoginComponent,
      RegisterComponent,
      RegisterComponent,
      NotFoundComponent,
      AdminAreaComponent,
      UserAreaComponent,
      DashboardComponent,
      UserManagerComponent,
      UserEditComponent
   ],
   imports: [
      BrowserModule.withServerTransition({appId: 'ng-cli-universal'}),
      HttpClientModule,
      FormsModule,
      AppRoutingModule,
      NotifierModule.withConfig(notifierOptions),
      BrowserAnimationsModule,
      NgxSpinnerModule,
      DemoNgZorroAntdModule
   ],

  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
