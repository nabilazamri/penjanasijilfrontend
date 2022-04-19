import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  
})

export class CreateComponent implements OnInit {
  currentUser: any;
  penerima ={
    nama: '',
    nokadpengenalan: '',
    peranan:'',
    program:'',
    tarikh:'',
    tempat:''
  };

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

  generatepdf(){
    const doc = new jsPDF();
    const width = doc.internal.pageSize.getWidth();
    const height = doc.internal.pageSize.getHeight();
    
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
    doc.text(this.penerima.nama, width/2, 130, {align: "center"});
    doc.text(this.penerima.nokadpengenalan, width/2, 135, {align: "center"});
    doc.setFont('times','italic');
    doc.text('Sebagai '+this.penerima.peranan, width/2, 145, {align: "center"});
    doc.setFont('times','bold');
    doc.setFontSize(12);
    doc.text(this.penerima.program, width/2, 155, {maxWidth: 120, align: "center"});
    doc.setFont('times','italic');
    doc.text('pada',width/2, 170, {align: "center"});
    doc.setFont('times','bold');
    doc.setFontSize(12);
    doc.text(this.penerima.tarikh, width/2, 180, {align: "center"});
    doc.setFont('times','italic');
    doc.text('Bertempat di',width/2, 190, {align: "center"});
    doc.setFont('times','bold');
    doc.setFontSize(12);
    doc.text(this.penerima.tempat, width/2, 200, {maxWidth: 110, align: "center"});

    doc.save(this.penerima.nama+' - SIJIL.pdf');
  }
  }
  


