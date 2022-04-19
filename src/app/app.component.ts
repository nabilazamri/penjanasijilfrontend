import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';
import { Router } from '@angular/router';
import { ExcelService } from './_services/excel.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  private roles: string[];
  username: string;
  currentUser: any;
  showAdminBoard = false;
  isLoggedIn = false;


  constructor(
    private tokenStorageService: TokenStorageService,
    private _router: Router,
    private service: ExcelService
    ) {}
  
  
  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isloggedIn()) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      
      this.username = user.username;
    }
  }

  get isloggedIn(){
    !!this.tokenStorageService.getToken();
    return this.tokenStorageService.getUser();
  }
  
  navigatetologin(){
      this._router.navigate(['login'])
  }

  navigatetoregister(){
    this._router.navigate(['register'])
  }

  logout(): void {
    this.service.deleteAll()
    .subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}