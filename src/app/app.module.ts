import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { environment } from 'src/environments/environment';
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFireModule } from "angularfire2";
import { FormsModule } from "@angular/forms";
import { AngularFireAuthModule } from "angularfire2/auth";

import { AppComponent } from './app.component';
import { ProComponent } from './components/pro/pro.component';
import { HireComponent } from './components/hire/hire.component';

import { MenuComponent } from './components/menu/menu.component';

import { router } from "./routes/routes";
import { RouterModule } from '@angular/router';
import { HomeComponent } from "./components/home/home.component";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './components/footer/footer.component';
import { ProfileProComponent } from './components/profile-pro/profile-pro.component';






@NgModule({
  declarations: [
    AppComponent,
    ProComponent,
    MenuComponent,
    HomeComponent,
    FooterComponent,
    HireComponent,
    ProfileProComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(router),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    FormsModule,
    NgbModule,
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }