import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  content: string;

  constructor(
    private userService: UserService,
    private tokenStorageService: TokenStorageService,
    private _router: Router,
    ) { }

  get isLoggedIn(){
    !!this.tokenStorageService.getToken();
    return this.tokenStorageService.getUser();
  }

  ngOnInit(): void {
    this.userService.getAdminBoard().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }

  navigatetologin(){
    this._router.navigate(['login'])
}

navigatetolistUser(){
  this._router.navigate(['listuser'])
}

navigatetolistPenerima(){
  this._router.navigate(['listpenerima'])
}

}
