import { Routes } from "@angular/router";
import { ProComponent } from "../components/pro/pro.component";
import { HomeComponent } from "../components/home/home.component";


export const router: Routes = [
    // { path: '', redirectTo: 'Home', pathMatch: 'full' },
    { path: 'Home', component: HomeComponent },
    { path: 'Pro', component: ProComponent }
]
