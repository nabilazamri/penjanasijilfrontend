import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';
import { PenerimaService } from '../_services/penerima.service';


@Component({
  selector: 'app-edit-list;',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.css']
})
export class EditListComponent implements OnInit {
  penerima ={
    nama: '',
    nokadpengenalan: '',
    peranan:'',
    program:'',
    tarikh:'',
    tempat:''
  };
  currentUser: any;
  message = '';
  id: number;

  constructor(
    private token: TokenStorageService,
    private route: ActivatedRoute,
    private service: PenerimaService,
    private router: Router) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.message = '';
    this.getTutorial(this.route.snapshot.paramMap.get('id'));
    
  }

  getTutorial(id): void {
    this.service.get(this.currentUser.id, id)
      .subscribe(
        data => {
          console.log('got penerima with id '+id )
          this.penerima = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  updatePenerima(): void {
    const data ={
      nama: this.penerima.nama,
      nokadpengenalan: this.penerima.nokadpengenalan,
      peranan: this.penerima.peranan,
      program:this.penerima.program,
      tarikh:this.penerima.tarikh,
      tempat:this.penerima.tempat
    };

    this.service.update(this.route.snapshot.paramMap.get('id'), data)
      .subscribe(
        response => {
          console.log(response);
          this.message = 'The tutorial was updated successfully!';
          this.router.navigateByUrl('mylist');
        },
        error => {
          console.log(error);
        });
  }

  navigatetologin(){
    this.router.navigate(['login'])
}
/*
  updateTutorial(): void {
    this.tutorialService.update(this.currentTutorial.id, this.currentTutorial)
      .subscribe(
        response => {
          console.log(response);
          this.message = 'The tutorial was updated successfully!';
        },
        error => {
          console.log(error);
        });
  }

  deleteTutorial(): void {
    this.tutorialService.delete(this.currentTutorial.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/tutorials']);
        },
        error => {
          console.log(error);
        });
  }*/
  
}