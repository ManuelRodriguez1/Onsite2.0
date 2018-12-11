import { Routes } from "@angular/router";
import { ProComponent } from "../components/pro/pro.component";
import { HomeComponent } from "../components/home/home.component";
import { HireComponent } from "../components/hire/hire.component";
import { HirePrincipalComponent } from "../components/hire-principal/hire-principal.component";

export const router: Routes = [
    { path: '', redirectTo: 'Home', pathMatch: 'full' },
    { path: 'Home', component: HomeComponent },
    { path: 'Hire', component: HireComponent },
    { path: 'Pro', component: ProComponent },
    { path: 'Hireprincipal', component: HirePrincipalComponent },

]
