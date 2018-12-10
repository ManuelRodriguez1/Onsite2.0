import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { environment } from 'src/environments/environment';
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFireModule } from "angularfire2";
import { FormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { ProComponent } from './components/pro/pro.component';
import { MenuComponent } from './components/menu/menu.component';

import { router } from "./routes/routes";
import { RouterModule } from '@angular/router';
import { HomeComponent } from "./components/home/home.component";




@NgModule({
  declarations: [
    AppComponent,
    ProComponent,
    MenuComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(router),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }