import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';
import { jsPDF } from 'jspdf';
import { saveAs } from '@progress/kendo-file-saver';
import * as JSZip from 'jszip';
import { PenerimaService } from '../_services/penerima.service';

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.css']
})

export class MyListComponent implements OnInit {
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
    ) {
    }


  ngOnInit(): void {
    const params = this.getRequestParams(this.nama, this.page, this.pageSize);
    this.currentUser= this.token.getUser();
    if (this.currentUser){
    this.user= this.token.getUser().id;
    this.service.getAll(this.user, params)
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
            console.log(this.collection.data);
            
        },
        error => {
          console.log(error);
        });
    }
    else{
      console.log('not current user')
    }
      
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
    const params = this.getRequestParams(this.nama, this.page, this.pageSize);

    this.user= this.token.getUser().id;
    
    this.service.getAll(this.user, params)
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

  refreshList(): void{
    this.retrievePenerima();
    this.currentPenerima= null;
    this.currentIndex= -1;}
  

  setActivePenerima(penerima, index): void{
    this.currentPenerima = penerima;
    this.currentIndex = index;
  }

  removeAll(): void{
    this.service.deleteAll()
    .subscribe(
      response => {
        console.log(response);
        this.retrievePenerima();
      },
      error => {
        console.log(error);
      }
    );
  }

  searchpenerima(): void {
    this.service.findByTitle(this.nama)
      .subscribe(
        data => {
          this.penerima = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  deletePenerima(id: string){
    this.service.delete(id).subscribe();
    window.location.reload();
    

    /*
    console.log(id);
    this.service.delete(id)
    .subscribe(
      res=> {
       this.penerima = this.penerima.filter(item=>item.id!==id);
        console.log('penerima berjaya dibuang')
      }
    );*/
    
  }

  navigatetoadd(): void{
    this._router.navigate(['add']);
  }

  navigatetoedit(id): void{
    this._router.navigate(['id/edit']);
  }
  navigatetologin(){
    this._router.navigate(['login']);
  }

  navigatetopreview(){
    this._router.navigate(['previewpage']);
  }

  GeneratePDF(){
    const jszip = new JSZip();
    const id= this.token.getUser().id;
    this.service.getall(id)
    .subscribe(
      data=> {
        this.penerima = data;
        this.loading= false;
        
        for (var index=0; index < data.length; index++){
          const doc= new jsPDF();
          const width = doc.internal.pageSize.getWidth();
          const height = doc.internal.pageSize.getHeight();
          console.log(data[index]);

          doc.addImage("assets/SijilTemplate.jpg", "JPG", 0, 0, width, height);
          doc.setFont('times','italic');
          doc.setFontSize(36);
          doc.text('SIJIL PENGHARGAAN',width/2, 90, {align: "center"});
          doc.setFont('times','italic');
          doc.setFontSize(12);
          doc.text('Dengan sukacitanya',width/2, 100, {align: "center"} );
          doc.text('Merakamkan setinggi penghargaan dan terima kasih',width/2, 110, {align: "center"});
          doc.text('kepada',width/2, 120, {align: "center"});
          doc.setFont('times','bold');
          doc.setFontSize(12);
          doc.text(data[index].nama, width/2, 130, {align: "center"});
          doc.text(data[index].nokadpengenalan, width/2, 135, {align: "center"});
          doc.setFont('times','italic');
          doc.text('Sebagai '+data[index].peranan, width/2, 145, {align: "center"});
          doc.setFont('times','bold');
          doc.setFontSize(12);
          doc.text(data[index].program, width/2, 155, {maxWidth: 120, align: "center"});
          doc.setFont('times','italic');
          doc.text('pada',width/2, 170, {align: "center"});
          doc.setFont('times','bold');
          doc.setFontSize(12);
          doc.text(data[index].tarikh, width/2, 180, {align: "center"});
          doc.setFont('times','italic');
          doc.text('Bertempat di',width/2, 190, {align: "center"});
          doc.setFont('times','bold');
          doc.setFontSize(12);
          doc.text(data[index].tempat, width/2, 200, {maxWidth: 110, align: "center"});

          jszip.file('sijil'+(index+1)+'.pdf', doc.output(), {binary: true});
          
          console.log('printing '+index);

          if (index==data.length-1){
          jszip.generateAsync({ type: 'blob' }).then(function(content) {
          // see FileSaver.js
          saveAs(content, 'sijilpenerima.zip');
          console.log('pdf generated!');
          });
          
          }
          this.loading=true;

        }
        
      }); 
  } 
}

