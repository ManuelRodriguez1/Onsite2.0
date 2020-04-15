
import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProComponent } from "../components/pro/pro.component";
import { HomeComponent } from "../components/home/home.component";
import { HireComponent } from "../components/hire/hire.component";
import { ProfileProComponent } from "../components/pro/profile-pro/profile-pro.component";
import { HirePrincipalComponent } from "../components/hire-principal/hire-principal.component";
import { AuthGuard } from '../services/auth.service';
import { RecordarPassComponent } from '../components/recordar-pass/recordar-pass.component';


export const router: Routes = [
    { path: '', redirectTo: 'Home', pathMatch: 'full', canActivate:[AuthGuard] },
    { path: 'Home', component: HomeComponent },
    { path: 'Hire', component: HireComponent },
    { path: 'Pro', component: ProComponent },
    { path: 'Recuperar', component: RecordarPassComponent },
    { path: 'ProfilePro', component: ProfileProComponent , canActivate: [AuthGuard]},
    { path: 'Hireprincipal', component: HirePrincipalComponent, canActivate: [AuthGuard] }//login

]
export const routes: ModuleWithProviders = RouterModule.forRoot(router);
