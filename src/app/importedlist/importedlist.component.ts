import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';
import { ExcelService } from '../_services/excel.service';
import { jsPDF } from 'jspdf';
import { saveAs } from '@progress/kendo-file-saver';
import * as JSZip from 'jszip';

@Component({
  selector: 'app-importedlist',
  templateUrl: './importedlist.component.html',
  styleUrls: ['./importedlist.component.css']
})
export class ImportedlistComponent implements OnInit {

  penerima: any;
  currentPenerima= null;
  currentIndex= -1;
  nama='';
  currentUser: any;
  userID;
  collection = { count: 1000, data: [] };
  page = 1;
  count = 0;
  pageSize = 3;
  pageSizes = [3, 6, 9];


  constructor(
    private _router: Router,
    private token: TokenStorageService,
    private service: ExcelService
    ) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    const params = this.getRequestParams(this.nama, this.page, this.pageSize);
    this.userID= this.token.getUser().id
    this.service.getAll(params)
    .subscribe(
      dat=> {
        this.penerima = dat;
        console.log(dat);
        for (var i = 0; i < this.penerima.length; i++) {
          this.collection.data.push(
            {
              in: i + 1
            }
          );}
      },
      error=> {
        console.log(error);
      }
    );
  }

  getRequestParams(searchTitle, page, pageSize): any {
    // tslint:disable-next-line:prefer-const
    let params = {};

    if (searchTitle) {
      params[`title`] = searchTitle;
    }

    if (page) {
      params[`page`] = page - 1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    return params;
  }

  retrieveExcel(): void {
    const params = this.getRequestParams(this.nama, this.page, this.pageSize);
    this.userID= this.token.getUser().id
    this.service.getAll(params)
    .subscribe(
      data=> {
        this.penerima = data;
        console.log(data);
      },
      error=> {
        console.log(error);
      }
    );
    
  }

  navigatetologin(){
    this._router.navigate(['login'])
}


  GeneratePDF(){
    const jszip = new JSZip();
    const id= this.token.getUser().id;
    this.service.getall()
    .subscribe(
      data=> {
        this.penerima = data;
        
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

        }
        
      }); 
  } 
}

  





