import { Component, OnInit } from '@angular/core';
import { RegisterModel } from '../Models/register.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  model = new RegisterModel();
  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    alert("It works");
    console.log(this.model);
  }


}
