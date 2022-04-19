import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';
import { AuthService } from '../_services/auth.service';


@Component({
  selector: 'app-listuserpage',
  templateUrl: './listuserpage.component.html',
  styleUrls: ['./listuserpage.component.css']
})
export class ListuserpageComponent implements OnInit {
  currentUser: any;
  penerima: any;
  currentPenerima= null;
  currentIndex= -1;
  nama='';
  loading =true;
  user: any;
  tableindex: any;
  collection = { count: 1000, data: [] };
  page = 1;
  count = 0;
  pageSize = 3;
  pageSizes = [3, 6, 9];
  config: any;
  num:any;


  constructor(
    private service: AuthService,
    private token: TokenStorageService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.currentUser= this.token.getUser();
    this.retrievePenerima();
  }

  getRequestParams(searchNama, page, pageSize): any {
    // tslint:disable-next-line:prefer-const
    let params = {};

    if (searchNama) {
      params[`title`] = searchNama;
    }

    if (page) {
      params[`page`] = page - 1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    return params;
  }
  retrievePenerima(): void {
    this.currentUser = this.token.getUser();
    const params = this.getRequestParams(this.nama, this.page, this.pageSize);
    this.service.getAll(params)
      .subscribe(
        response => {
          this.penerima = response;
          console.log(response);
          console.log('Current user id:'+this.user);
          console.log('berapa penerima: '+this.penerima.length);
          for (var i = 0; i < this.penerima.length; i++) {
            this.collection.data.push(
              {
                in: i + 1
              }
            );}
        },
        error => {
          console.log(error);
        });
    
        
  }
  handlePageChange(event): void {
    this.page = event;
    this.retrievePenerima();
  }

  handlePageSizeChange(event): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrievePenerima();
  }

  navigatetologin(){
    this._router.navigate(['login'])
}


}
