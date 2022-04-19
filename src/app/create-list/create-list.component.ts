import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';
import { PenerimaService } from '../_services/penerima.service';


@Component({
  selector: 'app-create-list',
  templateUrl: './create-list.component.html',
  styleUrls: ['./create-list.component.css']
})

export class CreateListComponent implements OnInit {
  penerima ={
    nama: '',
    nokadpengenalan: '',
    peranan:'',
    program:'',
    tarikh:'',
    tempat:'',
    userId: this.token.getUser().id
  };
  tambah = false;
  
currentUser: any;


  constructor(
    private service: PenerimaService,
    private token: TokenStorageService,
    private _router: Router
    ) { }

  ngOnInit(): void {
    
    this.currentUser = this.token.getUser();

  }

  AddReceiver(): void {
    const data ={
      nama: this.penerima.nama,
      nokadpengenalan: this.penerima.nokadpengenalan,
      peranan: this.penerima.peranan,
      program:this.penerima.program,
      tarikh:this.penerima.tarikh,
      tempat:this.penerima.tempat,
      userId: this.currentUser.id
    };

    this.service.create(data)
    .subscribe(
      response => {
        console.log(response);
        console.log(this.currentUser.id)
        this.tambah = true;
        
      },
      error => {
        console.log(error);
      });  
      this._router.navigateByUrl('mylist')
  }

  newPenerima(): void{
    this.tambah = false;
    this.penerima ={
      nama: '',
      nokadpengenalan: '',
      peranan:'',
      program:'',
      tarikh:'',
      tempat:'',
      userId: this.token.getUser()
    };
  }
  
  navigatetologin(){
    this._router.navigate(['login'])
}


}
