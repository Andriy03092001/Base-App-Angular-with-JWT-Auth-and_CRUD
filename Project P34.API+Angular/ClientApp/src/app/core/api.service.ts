import { SignInModel } from './../Models/login.model';
import { RegisterModel } from './../Models/register.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResult } from '../Models/result.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  baseUrl = '/api/Account';

  SingUp(UserRegisterDto: RegisterModel): Observable<ApiResult> {
    return this.http.post<ApiResult>(this.baseUrl + '/register', UserRegisterDto);
  }

  SignIn(UserLoginDto: SignInModel) {
    return this.http.post<ApiResult>(this.baseUrl + '/login', UserLoginDto);
  }

}
