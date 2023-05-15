import { Component, ElementRef, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from './services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  title = 'zavrsni-ecommerce';
  @ViewChild('mySidenav') mySideNav!: ElementRef<any>;

  constructor(private titleService: Title, private authService: AuthService, private fireAuth: AngularFireAuth) {
    this.titleService.setTitle($localize`${this.title}`);
  }

  openNav() {
    this.mySideNav.nativeElement.style.width ="250px";
  }

  closeNav(){
    this.mySideNav.nativeElement.style.width ="0px";
  }

  getUserFromDb() {
    this.fireAuth.authState.subscribe(user => {
      if (user) {
        console.log("User is logged in", user.email);
        return user;
      } else {
        console.log("User is not logged in");
        return;
      }
    });
  }

  
}
