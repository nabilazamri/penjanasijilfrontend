import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { OptionComponent } from './option/option.component';
import { PreviewpageComponent } from './previewpage/previewpage.component';
import { MyListComponent } from './my-list/my-list.component';
import { ImportFileComponent } from './import-file/import-file.component';
import { CreateListComponent } from './create-list/create-list.component';
import { CreateComponent } from './create/create.component';
import { EditListComponent } from './edit-list/edit-list.component';
import { AddComponent } from './add/add.component';
import { ImportedlistComponent } from './importedlist/importedlist.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminComponent } from './admin/admin.component';
import { ListuserpageComponent } from './listuserpage/listuserpage.component';
import { ListpenerimapageComponent } from './listpenerimapage/listpenerimapage.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'option', component: OptionComponent },
  { path: 'previewpage', component: PreviewpageComponent },
  { path: 'mylist', component: MyListComponent },
  { path: 'import', component: ImportFileComponent },
  { path: 'createlist', component: CreateListComponent },
  { path: 'create', component: CreateComponent },
  { path: 'edit/:id', component: EditListComponent },
  { path: 'add', component: AddComponent },
  { path: 'importedlist', component: ImportedlistComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'listuser', component: ListuserpageComponent },
  { path: 'listpenerima', component: ListpenerimapageComponent},
  { path: '', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
