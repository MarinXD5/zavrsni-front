import { Component, OnInit } from '@angular/core';
import { User } from '@auth0/auth0-angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: string = '';
  surname: string = '';
  email: string = '';
  password: string = '';
  repeatPassword: string = '';
  role: string = '';

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  register(){
    if (this.password != this.repeatPassword){
      alert("Please, repeat your password correctly!");
      return;
    }
    
    this.auth.register(this.email, this.password);

    this.email = '';
    this.password = '';
    this.repeatPassword = '';
  }

}
