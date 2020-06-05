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
import { LoginComponent } from './components/login/login.component';
import { ProjectService } from './services/project.service';
import { InboxComponent } from './components/pro/profile-pro/inbox/inbox.component';
import { ExploreComponent } from './components/pro/profile-pro/explore/explore.component';
import { ProjectsComponent } from './components/pro/profile-pro/projects/projects.component';
import { Ng5SliderModule } from 'ng5-slider';
import { MenuInboxComponent } from './components/hire/hire-principal/menu-inbox/menu-inbox.component';
import { ProfileHireComponent } from './components/hire/hire-principal/profile-hire/profile-hire.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown-angular7';
import { EmailVerificationComponent } from './components/email-verification/email-verification.component';
import { PlantillaComponent } from './components/plantilla/plantilla.component';
import { ChangeEmailComponent } from './components/hire/hire-principal/change-email/change-email.component';
import { LatestPipe } from './pipes/latest.pipe';
import { ProService } from './services/pro.service';
import { ProuserService } from './services/prouser.service';
import { HireuserService } from './services/hireuser.service';
import { HireService } from './services/hire.service';
import { ChatComponent } from './components/chat/chat.component';
import { DashboardComponent } from './components/pro/profile-pro/dashboard/dashboard.component';
import { FilterPipe } from './pipes/filter.pipe';
import { OrderPipe } from './pipes/order.pipe';
import { AzPipe } from './pipes/az.pipe';
import { AzStatusPipe } from './pipes/az-status.pipe';
import { SearchZipPipe } from './pipes/search-zip.pipe';

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
    InboxComponent,
    ExploreComponent,
    ProjectsComponent,
    MenuInboxComponent,
    ProfileHireComponent,
    EmailVerificationComponent,
    PlantillaComponent,
    ChangeEmailComponent,
    LatestPipe,
    ChatComponent,
    DashboardComponent,
    FilterPipe,
    OrderPipe,
    AzPipe,
    AzStatusPipe,
    SearchZipPipe
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
  //  providers: [ { provide: LocationStrategy, useClass: HashLocationStrategy },AuthGuard, ProjectService, ProService, ProuserService, HireuserService, HireService],

  providers: [ AuthGuard, ProjectService, ProService, ProuserService, HireuserService, HireService],
  bootstrap: [AppComponent]
})
export class AppModule { }
