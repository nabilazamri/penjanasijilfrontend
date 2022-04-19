import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { OptionComponent } from './option/option.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { CreateComponent } from './create/create.component';
import { CreateListComponent } from './create-list/create-list.component';
import { MyListComponent } from './my-list/my-list.component';
import { ImportFileComponent } from './import-file/import-file.component';
import { PreviewpageComponent } from './previewpage/previewpage.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditListComponent } from './edit-list/edit-list.component';
import { AddComponent } from './add/add.component';
import { ImportedlistComponent } from './importedlist/importedlist.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProfileComponent } from './profile/profile.component';
import { AdminComponent } from './admin/admin.component';
import { ListuserpageComponent } from './listuserpage/listuserpage.component';
import { ListpenerimapageComponent } from './listpenerimapage/listpenerimapage.component';
import { MainpageComponent } from './mainpage/mainpage.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    OptionComponent,
    CreateComponent,
    CreateListComponent,
    MyListComponent,
    ImportFileComponent,
    PreviewpageComponent,
    EditListComponent,
    AddComponent,
    ImportedlistComponent,
    ProfileComponent,
    AdminComponent,
    ListuserpageComponent,
    ListpenerimapageComponent,
    MainpageComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    NgxPaginationModule,
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,
    })

  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
