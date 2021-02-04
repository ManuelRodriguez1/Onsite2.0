import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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
import { ProfileHireComponent } from './components/hire/hire-principal/profile-hire/profile-hire.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown-angular7';
import { EmailVerificationComponent } from './components/email-verification/email-verification.component';
import { PlantillaComponent } from './components/plantilla/plantilla.component';
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
import { ChatSearchPipe } from './pipes/chat-search.pipe';
import { ChatTextPipe } from './pipes/chat-text.pipe';
import { AgmCoreModule,MapsAPILoader } from '@agm/core';
import { SkillsPipe } from './pipes/skills.pipe';
import { DistancePipe } from './pipes/distance.pipe';
import { VerifiedEmailComponent } from './components/verified-email/verified-email.component';
import { CommingComponent } from './components/comming/comming.component';

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
    ProfileHireComponent,
    EmailVerificationComponent,
    PlantillaComponent,
    LatestPipe,
    ChatComponent,
    DashboardComponent,
    FilterPipe,
    OrderPipe,
    AzPipe,
    AzStatusPipe,
    SearchZipPipe,
    ChatSearchPipe,
    ChatTextPipe,
    SkillsPipe,
    DistancePipe,
    VerifiedEmailComponent,
    CommingComponent,
  
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA_Ot_HfQuVnjjcS5pdW2YD3CiC2Z9CMrA',
        libraries: ['places']
    }),
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
    AngularFirestoreModule,
    AngularFireStorageModule
  ],
  //  providers: [ { provide: LocationStrategy, useClass: HashLocationStrategy },AuthGuard, ProjectService, ProService, ProuserService, HireuserService, HireService],

  providers: [ AuthGuard, ProjectService, ProService, ProuserService, HireuserService, HireService],
  bootstrap: [AppComponent]
})
export class AppModule { }
