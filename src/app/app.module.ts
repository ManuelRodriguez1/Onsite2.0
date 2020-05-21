import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';

import { environment } from 'src/environments/environment';
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFireModule } from "angularfire2";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuthModule } from "angularfire2/auth";
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule, AngularFireStorage } from "angularfire2/storage";
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
import { ProjectService } from './services/project.service';
import { InboxComponent } from './components/pro/profile-pro/inbox/inbox.component';
import { ExploreComponent } from './components/pro/profile-pro/explore/explore.component';
import { RecordarPassComponent } from './components/recordar-pass/recordar-pass.component';
import { ProjectsComponent } from './components/pro/profile-pro/projects/projects.component';
import { Ng5SliderModule } from 'ng5-slider';
import { MenuInboxComponent } from './components/hire/hire-principal/menu-inbox/menu-inbox.component';
import { ProfileHireComponent } from './components/hire/hire-principal/profile-hire/profile-hire.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown-angular7';
import { EmailVerificationComponent } from './components/hire/hire-principal/email-verification/email-verification.component';
import { VerifyEmailComponent } from './components/pro/verify-email/verify-email.component';
import { VerifySuccessComponent } from './components/pro/verify-success/verify-success.component';
import { PlantillaComponent } from './components/plantilla/plantilla.component';
import { ChangeEmailComponent } from './components/hire/hire-principal/change-email/change-email.component';
import { LatestPipe } from './pipes/latest.pipe';
import { SignoutComponent } from './components/pro/signout/signout.component';
import { ProService } from './services/pro.service';
import { ProuserService } from './services/prouser.service';


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
    MenuExploreComponent,
    MenuInboxComponent,
    ProfileHireComponent,
    EmailVerificationComponent,
    VerifyEmailComponent,
    VerifySuccessComponent,
    PlantillaComponent,
    ChangeEmailComponent,
    LatestPipe,
    SignoutComponent
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
    NgMultiSelectDropDownModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBmzxZXY2uUS9cKxiHAT09tnR1bKiJtJWI'
    }),
    AngularFirestoreModule,
    AngularFireStorageModule
  ],
  providers: [ServiceService, AuthGuard, ProjectService, ProService, ProuserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
