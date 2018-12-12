import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';

import { environment } from 'src/environments/environment';
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFireModule } from "angularfire2";
import { FormsModule } from "@angular/forms";
import { AngularFireAuthModule } from "angularfire2/auth";
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AppComponent } from './app.component';
import { ProComponent } from './components/pro/pro.component';
import { HireComponent } from './components/hire/hire.component';
import { AuthGuard } from './services/auth.service';
import { MenuComponent } from './components/menu/menu.component';
import {HirePrincipalComponent} from './components/hire-principal/hire-principal.component';
import { router } from "./routes/routes";
import { RouterModule } from '@angular/router';
import { HomeComponent } from "./components/home/home.component";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './components/footer/footer.component';
import { ProfileProComponent } from './components/pro/profile-pro/profile-pro.component';

import {MenuHomeComponent} from './components/hire-principal/menu-home/menu-home.component';
import { LoginComponent } from './components/login/login.component';
import { ServiceService } from './services/service.service';

import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { InboxComponent } from './components/pro/profile-pro/inbox/inbox.component';


@NgModule({
  declarations: [
    AppComponent,
    ProComponent,
    MenuComponent,
    HomeComponent,
    FooterComponent,
    HireComponent,
    ProfileProComponent,
    HirePrincipalComponent,
    MenuHomeComponent,
    LoginComponent,
    InboxComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(router),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    FormsModule,
    NgbModule,
    AngularFireAuthModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAFgM81Qz-SwfTzUsr4F51AgDj0HdN88CQ'
    }),
    AngularFireAuthModule
  ],
  providers: [ServiceService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
