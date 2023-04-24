import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-authbuttoncomponent',
  templateUrl: './authbuttoncomponent.component.html',
  styleUrls: ['./authbuttoncomponent.component.css']
})
export class AuthbuttoncomponentComponent implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
  }

}
