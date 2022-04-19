import { Component, OnInit } from '@angular/core';
import { ITS_JUST_ANGULAR } from '@angular/core/src/r3_symbols';
import { TokenStorageService } from '../_services/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    private roles: string[];
    isLoggedIn = false;
    showAdminBoard = false;
    username: string;
    currentUser: any;

  
    constructor(
      private tokenStorageService: TokenStorageService,
      private _router: Router
      ) {}
    
    navigatetologin(){
        this._router.navigate(['login'])
    }
  
    navigatetoregister(){
      this._router.navigate(['register'])
    }
  
    ngOnInit(): void {
      this.isLoggedIn = !!this.tokenStorageService.getToken();
      this.currentUser = this.tokenStorageService.getUser();
      if (this.isLoggedIn) {
        const user = this.tokenStorageService.getUser();
        this.roles = user.roles;
  
        this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
  
        this.username = user.username;

        this._router.navigateByUrl('option');
      }
    }
  
    logout(): void {
      this.tokenStorageService.signOut();
      window.location.reload();
    }
  }