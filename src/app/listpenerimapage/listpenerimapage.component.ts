import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';
import { PenerimaService } from '../_services/penerima.service';

@Component({
  selector: 'app-listpenerimapage',
  templateUrl: './listpenerimapage.component.html',
  styleUrls: ['./listpenerimapage.component.css']
})
export class ListpenerimapageComponent implements OnInit {
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
    private service: PenerimaService,
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
    this.service.geteverything(params)
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
