import { Component, OnInit, ViewChild} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Router } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';
import { ExcelService } from '../_services/excel.service';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import { saveAs } from '@progress/kendo-file-saver';
import * as JSZip from 'jszip';
import { PenerimaService } from '../_services/penerima.service';
import { Observable } from 'rxjs';  

@Component({
  selector: 'app-import-file',
  templateUrl: './import-file.component.html',
  styleUrls: ['./import-file.component.css']
})


export class ImportFileComponent implements OnInit {  
  title = 'app';
  currentUser: any;
  penerima: any;
  Penerima ={
    nama: '',
    nokadpengenalan: '',
    peranan:'',
    program:'',
    tarikh:'',
    tempat:''
  };
  uploaded = false;
  fileName;
  file: File;

  constructor(
    private service: ExcelService,
    private token: TokenStorageService,
    private _router: Router,
    private http: HttpClient,
    
    ) {}

  ngOnInit(): void { 
    this.currentUser = this.token.getUser();
  }

  fileChangeEvent(event):void{
    this.file = event.target.files[0];
    const formData = new FormData();  
    formData.append('file', this.file);  
    console.log(this.file)
    this.service.upload(formData).subscribe(
      response => {
        console.log(response);
        console.log(this.currentUser.id)
        this.uploaded=true;
      },
      error => {
        console.log(error);
      });  
  }

  uploadFile() {
    this._router.navigateByUrl('importedlist')
  }  


print(){
  const jszip = new JSZip();
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
      }
    );
}
}
