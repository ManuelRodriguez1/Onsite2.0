import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ProComponent } from './components/pro/pro.component';
import { HireComponent } from './components/hire/hire.component';

import { MenuComponent } from './components/menu/menu.component';

import { router } from "./routes/routes";
import { RouterModule } from '@angular/router';
import { HomeComponent } from "./components/home/home.component";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './components/footer/footer.component';
import { HirePrincipalComponent } from './components/hire-principal/hire-principal.component';
import { MenuHomeComponent } from './components/hire-principal/menu-home/menu-home.component';
import { MenuInboxComponent } from './components/hire-principal/menu-inbox/menu-inbox.component';
import { MenuProjectsComponent } from './components/hire-principal/menu-projects/menu-projects.component';
import { MenuExploreComponent } from './components/hire-principal/menu-explore/menu-explore.component';





@NgModule({
  declarations: [
    AppComponent,
    ProComponent,
    MenuComponent,
    HomeComponent,
    FooterComponent,
    HireComponent,
    HirePrincipalComponent,
    MenuHomeComponent,
    MenuInboxComponent,
    MenuProjectsComponent,
    MenuExploreComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(router),
    NgbModule,

  //  AngularFireDatabaseModule,
//    AngularFireModule.initializeApp(environment.firebase),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
