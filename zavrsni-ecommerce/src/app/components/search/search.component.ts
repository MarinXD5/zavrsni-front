import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { authState, Auth } from '@angular/fire/auth';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService, private auth: Auth) {}

  currentUser$ = authState(this.auth);

  ngOnInit(): void {}

  doSearch(value: string) {
    console.log(`value=${value}`);
    this.router.navigateByUrl(`/search/${value}`);
  }

  signOut(){
    this.authService.signOut();
  }
}
