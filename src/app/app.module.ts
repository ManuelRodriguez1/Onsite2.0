import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';

import { environment } from 'src/environments/environment';
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFireModule } from "angularfire2";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuthModule } from "angularfire2/auth";
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AppComponent } from './app.component';
import { ProComponent } from './components/pro/pro.component';
import { HireComponent } from './components/hire/hire.component';
import { AuthGuard } from './services/auth.service';
import { MenuComponent } from './components/menu/menu.component';
import {HirePrincipalComponent} from './components/hire/hire-principal/hire-principal.component';
import { router } from "./routes/routes";
import { RouterModule } from '@angular/router';
import { HomeComponent } from "./components/home/home.component";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './components/footer/footer.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ProfileProComponent } from './components/pro/profile-pro/profile-pro.component';
import {MenuHomeComponent} from './components/hire/hire-principal/menu-home/menu-home.component';
import {MenuExploreComponent} from './components/hire/hire-principal/menu-explore/menu-explore.component';
import {MenuProjectsComponent} from './components/hire/hire-principal/menu-projects/menu-projects.component';
import { LoginComponent } from './components/login/login.component';
import { ServiceService } from './services/service.service';
import { InboxComponent } from './components/pro/profile-pro/inbox/inbox.component';
import { ExploreComponent } from './components/pro/profile-pro/explore/explore.component';
import { RecordarPassComponent } from './components/recordar-pass/recordar-pass.component';
import { ProjectsComponent } from './components/pro/profile-pro/projects/projects.component';
import { Ng5SliderModule } from 'ng5-slider';
import { ProfileComponent } from './components/hire/hire-principal/profile/profile.component';
import { MenuInboxComponent } from './components/hire/hire-principal/menu-inbox/menu-inbox.component';


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
    MenuProjectsComponent,
    LoginComponent,
    InboxComponent,
    ExploreComponent,
    RecordarPassComponent,
    ProjectsComponent,
    ProfileComponent,
    MenuExploreComponent,
    MenuInboxComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(router),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    SlickCarouselModule,
    Ng5SliderModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAFgM81Qz-SwfTzUsr4F51AgDj0HdN88CQ'
    }),
    AngularFirestoreModule
  ],
  providers: [ServiceService, AuthGuard, ServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
