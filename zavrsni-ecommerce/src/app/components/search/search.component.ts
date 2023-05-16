import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  ngOnInit(): void {
    this.currentUser$ = authState(this.auth);
    this.currentUser$.subscribe((user: any) => {
      console.log(user);
    });
  }

  doSearch(value: string) {
    console.log(`value=${value}`);
    this.router.navigateByUrl(`/search/${value}`);
  }

  signOut(){
    this.authService.signOut();
  }
}
