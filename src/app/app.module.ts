import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ProComponent } from './components/pro/pro.component';
import { HireComponent } from './components/hire/hire.component';

import { MenuComponent } from './components/menu/menu.component';

import { router } from "./routes/routes";
import { RouterModule } from '@angular/router';
import { HomeComponent } from "./components/home/home.component";

import * as firebase from 'firebase/app';
import { environment } from '../environments/environment';




@NgModule({
  declarations: [
    AppComponent,
    ProComponent,
    MenuComponent,
    HomeComponent,
    HireComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(router)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
