import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  email: string = '';

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  resetPassword(){
    if (this.email == ''){
      alert("Please enter your email");
      return;
    }

    this.auth.forgotPassword(this.email);

    this.email = '';
  }

}
