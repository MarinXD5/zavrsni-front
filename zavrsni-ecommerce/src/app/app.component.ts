import { Component, ElementRef, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  title = 'zavrsni-ecommerce';
  @ViewChild('mySidenav') mySideNav!: ElementRef<any>;

  constructor(private titleService: Title, private authService: AuthService) {
    this.titleService.setTitle($localize`${this.title}`);
  }

  openNav() {
    this.mySideNav.nativeElement.style.width ="250px";
  }

  closeNav(){
    this.mySideNav.nativeElement.style.width ="0px";
  }
}
