import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserManagerService {

  baseUrl = '/api/UserManager';
  constructor(private http: HttpClient) { }

  getAllUsers() {
    return this.http.get(this.baseUrl);
  }

  removeUser(id: string) {
    return this.http.post(this.baseUrl + '/RemoveUser/' + id,  id , { headers: {'Content-Type': 'application/json'}
});
  }

}
