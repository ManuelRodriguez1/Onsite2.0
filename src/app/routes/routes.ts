​
import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProComponent } from "../components/pro/pro.component";
import { HomeComponent } from "../components/home/home.component";
import { HireComponent } from "../components/hire/hire.component";
import { ProfileProComponent } from "../components/pro/profile-pro/profile-pro.component";
import { ProfileHireComponent } from "../components/hire/hire-principal/profile-hire/profile-hire.component";
import { EmailVerificationComponent } from "../components/hire/hire-principal/email-verification/email-verification.component";
import { HirePrincipalComponent } from "../components/hire/hire-principal/hire-principal.component";
import { AuthGuard } from '../services/auth.service';
import { RecordarPassComponent } from '../components/recordar-pass/recordar-pass.component';
import { VerifyEmailComponent } from '../components/pro/verify-email/verify-email.component';
import { VerifySuccessComponent } from '../components/pro/verify-success/verify-success.component';
​
​
export const router: Routes = [
    { path: '', redirectTo: 'Home', pathMatch: 'full', canActivate:[AuthGuard] },
    { path: 'Home', component: HomeComponent },
    { path: 'Hire', component: HireComponent },
    { path: 'Pro', component: ProComponent },
    { path: 'Recuperar', component: RecordarPassComponent },
    { path: 'ProfilePro', component: ProfileProComponent , canActivate: [AuthGuard]},
    { path: 'Hireprincipal', component: HirePrincipalComponent, canActivate: [AuthGuard] },//login
    { path: 'ProfileHire',component: ProfileHireComponent},
    { path: 'VerificationEmail', component: EmailVerificationComponent},
    { path: 'VerifyEmailPro', component: VerifyEmailComponent},
    { path: 'SuccesEmail', component: VerifySuccessComponent}
​
]
export const routes: ModuleWithProviders = RouterModule.forRoot(router);