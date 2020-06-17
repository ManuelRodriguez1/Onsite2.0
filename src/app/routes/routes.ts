
import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProComponent } from "../components/pro/pro.component";
import { HomeComponent } from "../components/home/home.component";
import { HireComponent } from "../components/hire/hire.component";
import { ProfileProComponent } from "../components/pro/profile-pro/profile-pro.component";
import { ProfileHireComponent } from "../components/hire/hire-principal/profile-hire/profile-hire.component";
import { EmailVerificationComponent } from "../components/email-verification/email-verification.component";
import { ChangeEmailComponent } from "../components/hire/hire-principal/change-email-------/change-email.component";
import { HirePrincipalComponent } from "../components/hire/hire-principal/hire-principal.component";
import { AuthGuard } from '../services/auth.service';
import { PlantillaComponent } from '../components/plantilla/plantilla.component';
import { ExploreComponent } from '../components/pro/profile-pro/explore/explore.component';
import { ChatComponent } from '../components/chat/chat.component';
import { ProjectsComponent } from '../components/pro/profile-pro/projects/projects.component';
import { DashboardComponent } from '../components/pro/profile-pro/dashboard/dashboard.component';


export const router: Routes = [
    { path: '', redirectTo: 'Home', pathMatch: 'full' },
    { path: 'Home', component: HomeComponent },
    { path: 'Hire', component: HireComponent },
    { path: 'Pro', component: ProComponent },
    { path: 'ProfilePro', component: ProfileProComponent, data: { role: "pro" }, canActivate: [AuthGuard] },
    { path: 'ChangeEmail', component: ChangeEmailComponent, data: { role: "hire" }, canActivate: [AuthGuard] },
    { path: 'Plantilla', component: PlantillaComponent },
    { path: 'VerificationEmail', component: EmailVerificationComponent },
    { path: 'ProfileHire', component: ProfileHireComponent, data: { role: "hire" }, canActivate: [AuthGuard] },
    { path: 'Hireprincipal', component: HirePrincipalComponent, data: { role: "hire" }, canActivate: [AuthGuard] },
    { path: 'ExplorePro', component: ExploreComponent, data: { role: "pro" }, canActivate: [AuthGuard] },
    { path: 'Dashboard', component: DashboardComponent, data: { role: "pro" }, canActivate: [AuthGuard] },
    { path: 'Projects', component: ProjectsComponent, data: { role: "pro" }, canActivate: [AuthGuard] },
    { path: 'Chat', component: ChatComponent, canActivate: [AuthGuard] }
]
export const routes: ModuleWithProviders = RouterModule.forRoot(router);

