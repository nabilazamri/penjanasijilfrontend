import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.css']
})
export class OptionComponent implements OnInit {
  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  username: string;
  currentUser: any;

  constructor(
    private token: TokenStorageService,
    private _router: Router
    ) {}
  
  ngOnInit(): void {
    this.isLoggedIn = !!this.token.getToken();
      this.currentUser = this.token.getUser();
      if (this.isLoggedIn) {
        const user = this.token.getUser();
        this.roles = user.roles;
  
        this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
  
        this.username = user.username;

        this._router.navigateByUrl('option');
      }
    }

  navigatetologin(){
      this._router.navigate(['login'])
  }

  navigatetoCreate(){
    this._router.navigate(['create'])
  }

  navigatetoCreateList(){
    this._router.navigate(['createlist'])
  }

  navigatetoMyList(){
    this._router.navigate(['mylist'])
  }

  navigatetoImport(){
    this._router.navigate(['import'])
  }

  

}
