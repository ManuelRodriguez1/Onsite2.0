import { Routes } from "@angular/router";
import { ProComponent } from "../components/pro/pro.component";

export const router: Routes = [
    { path: '', redirectTo: 'Home', pathMatch: 'full' },
    { path: 'Pro', component: ProComponent }
]