import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser: any;

  constructor(
    private token: TokenStorageService,
    private _router: Router
    ) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
  }

  navigatetologin(){
    this._router.navigate(['login'])
}

}