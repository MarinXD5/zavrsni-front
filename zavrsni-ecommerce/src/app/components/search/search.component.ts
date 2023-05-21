import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { authState, Auth, user } from '@angular/fire/auth';
import { User } from 'firebase/auth';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService, private auth: Auth) {}

  currentUser$!: Observable<User | null>;
  @ViewChild('selectElement', { static: false })
  selectElement!: ElementRef;
  storage: Storage = sessionStorage;

  ngOnInit(): void {
    this.currentUser$ = authState(this.auth);
    this.currentUser$.subscribe((user: any) => {
      console.log(user);
      this.storage.setItem('userEmail', JSON.stringify(user.email))
    });
    
  }

  doSearch(value: string) {
    console.log(`value=${value}`);
    this.router.navigateByUrl(`/search/${value}`);
  }

  signOut(){
    this.authService.signOut();
  }

  redirectToUrl(url: String) {
    console.log(url);
    if (url){
      const urlTree: UrlTree = this.router.createUrlTree([url]);
      this.router.navigateByUrl(urlTree);
    }
  }
}
