import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ProComponent } from './components/pro/pro.component';

import { router } from "./routes/routes";
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    ProComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(router)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
