import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { Router } from '@angular/router';
import { GoogleAuthProvider, TwitterAuthProvider, GithubAuthProvider } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireAuth: AngularFireAuth, private router: Router, private fireServices: AngularFirestore) { }

  insertIntoDb(Record: any) {
    return this.fireServices.collection('users').add(Record);
  }

  login(email: string, password: string) {
    this.fireAuth.signInWithEmailAndPassword(email, password).then(res => {
      localStorage.setItem('token', 'true');

      if (!res.user?.emailVerified){
        this.router.navigate(['verify-email']);
        this.sendEmailForVerification();
      }else{
        this.router.navigate(['products']);
        alert("You have been successfuly logged in!");
      }
      
    }, err => {
      alert(err);
      this.router.navigate(['login']);
    })
  }


  register(email: string, password: string) {
    this.fireAuth.createUserWithEmailAndPassword(email, password).then(res => {
      alert("Registration successful!");
      this.sendEmailForVerification();
      alert("Verification email has been sent to your email!");
      this.router.navigate(['login']);
    }, err => {
      alert(err);
      this.router.navigate(['register']);
    })
  }

  signOut() {
    this.fireAuth.signOut().then(() => {
      localStorage.removeItem('token');
      alert("You have been successfuly signed out!");
      this.router.navigate(['products']);
    }, err => {
      alert("Something went wrong! Please try again!");
      this.router.navigate(['login']);
    });
  }

  forgotPassword(email: string) {
    this.fireAuth.sendPasswordResetEmail(email).then(() => {
      alert("Link to reset your password has been sent to that e-mail");
      this.router.navigate(['login']);
    }, err => {
      alert("Email not found. Please check your input!");
    });
  }

  sendEmailForVerification() {
    this.fireAuth.authState.subscribe(user => {
      if (user) {
        user.sendEmailVerification().then((res: any) => {
          this.router.navigate(['verify-email']);
        }, (err: any) => {
          alert("Something went wrong! Please check if you've entered correct email!");
        })
      }
    });
  }

  loginGoogle() {
    return this.fireAuth.signInWithPopup(new GoogleAuthProvider).then(res => {
      this.router.navigate(['products']);
      localStorage.setItem('token', JSON.stringify(res.user?.uid));
    }, err => {
      alert(err);
    });
  }

  loginTwitter() {
    return this.fireAuth.signInWithPopup(new TwitterAuthProvider).then(res => {
      this.router.navigate(['products']);
      localStorage.setItem('token', JSON.stringify(res.user?.uid));
    }, err => {
      alert(err);
    });
  }

  loginGithub() {
    return this.fireAuth.signInWithPopup(new GithubAuthProvider).then(res => {
      this.router.navigate(['products']);
      localStorage.setItem('token', JSON.stringify(res.user?.uid));
    }, err => {
      alert(err);
    });
  }

  getUserFromDb() {
    this.fireAuth.authState.subscribe(user => {
      if (user) {
        console.log("User is logged in", user.email);
      } else {
        console.log("User is not logged in");
      }
    });
  }
}
