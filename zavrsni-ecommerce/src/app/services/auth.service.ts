import { Injectable } from '@angular/core';
import { AngularFireAuth} from '@angular/fire/compat/auth'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireAuth: AngularFireAuth, private router: Router) { }


  login(email: string, password: string){
    this.fireAuth.signInWithEmailAndPassword(email, password).then(res => {
      localStorage.setItem('token', 'true');

      if (res.user?.emailVerified == true){
        this.router.navigate(['products']);
      }else{
        this.router.navigate(['verify-email']);
      }
    }, err => {
      alert(err);
      this.router.navigate(['login']);
    })
  }


  register(email: string, password: string){
    this.fireAuth.createUserWithEmailAndPassword(email, password).then(res => {
      alert("Registration successful!");
      this.sendEmailForVerification(res.user);
      this.router.navigate(['login']);
    }, err => {
      alert("Something went wrong! Please try again!");
      this.router.navigate(['register']);
    })
  }

  signOut(){
    this.fireAuth.signOut().then(() => {
      localStorage.removeItem('token');
      alert("You have been successfuly signed out!");
      this.router.navigate(['products']);
    }, err => {
      alert("Something went wrong! Please try again!");
      this.router.navigate(['login']);
    });
  }

  forgotPassword(email: string){
    this.fireAuth.sendPasswordResetEmail(email).then(() => {
      alert("Link to reset your password has been sent to that e-mail");
      this.router.navigate(['login']);
    }, err => {
      alert("Email not found. Please check your input!");
    });
  }

  sendEmailForVerification(user: any) {
    user.sendEmailForVerification().then((res:any) => {
      this.router.navigate(['verify-email']);
    }, (err: any) =>{
      alert("Something went wrong! Please check if you've entered correct email!");
    })
  }
}
