
import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProComponent } from "../components/pro/pro.component";
import { HomeComponent } from "../components/home/home.component";
import { HireComponent } from "../components/hire/hire.component";
import { ProfileProComponent } from "../components/pro/profile-pro/profile-pro.component";
import { ProfileHireComponent } from "../components/hire/hire-principal/profile-hire/profile-hire.component";
import { EmailVerificationComponent } from "../components/hire/hire-principal/email-verification/email-verification.component";
import { ChangeEmailComponent } from "../components/hire/hire-principal/change-email/change-email.component";
import { HirePrincipalComponent } from "../components/hire/hire-principal/hire-principal.component";
import { AuthGuard } from '../services/auth.service';
import { RecordarPassComponent } from '../components/recordar-pass/recordar-pass.component';
import { VerifyEmailComponent } from '../components/pro/verify-email/verify-email.component';
import { VerifySuccessComponent } from '../components/pro/verify-success/verify-success.component';
import { PlantillaComponent } from '../components/plantilla/plantilla.component';


export const router: Routes = [
    { path: '', redirectTo: 'Home', pathMatch: 'full' },
    { path: 'Home', component: HomeComponent },
    { path: 'Hire', component: HireComponent },
    { path: 'Pro', component: ProComponent },
    { path: 'Recuperar', component: RecordarPassComponent },
    { path: 'ProfilePro', component: ProfileProComponent, data: { role: "pro" }, canActivate: [AuthGuard] },
    { path: 'VerifyEmailPro', component: VerifyEmailComponent },
    { path: 'Hireprincipal', component: HirePrincipalComponent, data: { role: "hire" }, canActivate: [AuthGuard] },
    { path: 'ProfileHire', component: ProfileHireComponent },
    { path: 'VerificationEmail', component: EmailVerificationComponent },
    { path: 'SuccesEmail', component: VerifySuccessComponent },
    { path: 'Plantilla', component: PlantillaComponent },
    { path: 'ChangeEmail', component: ChangeEmailComponent },

]
export const routes: ModuleWithProviders = RouterModule.forRoot(router);