import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
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
    this.registerIntoDB();

    this.email = '';
    this.password = '';
    this.repeatPassword = '';
  }

  registerIntoDB(){
    let Record : any = {};
    Record['email'] = this.email;
    Record['role'] = 'Member';

    this.auth.insertIntoDb(Record).then(res => {
      alert("Successfully inserted into database");
    }, err => {
      alert(err);
    })
  }

}
