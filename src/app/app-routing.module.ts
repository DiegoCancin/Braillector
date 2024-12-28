import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {BraillectorBasicComponent} from "./components/braillector-basic/braillector-basic.component";
import {BraillectorStandardComponent} from "./components/braillector-standard/braillector-standard.component";
import {RegisterComponent} from "./components/register/register.component";
import {BraillectorPremiumComponent} from "./components/braillector-premium/braillector-premium.component";
import {ResetPasswordComponent} from "./components/reset-password/reset-password.component";
import {braillectorGuard} from "./guards/braillector.guard";
import {UpgradePlanComponent} from "./components/upgrade-plan/upgrade-plan.component";

const routes: Routes = [
    { path: '', redirectTo: '/basic', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {
        path: 'basic',
        component: BraillectorBasicComponent,
        canActivate: [braillectorGuard],
        data: { requiredUserTypes: [1, 2, 3] } // Todos los tipos de usuario pueden acceder
    },
    {
        path: 'standard',
        component: BraillectorStandardComponent,
        canActivate: [braillectorGuard],
        data: { requiredUserTypes: [2, 3] } // Usuarios estándar y premium
    },
    {
        path: 'premium',
        component: BraillectorPremiumComponent,
        canActivate: [braillectorGuard],
        data: { requiredUserTypes: [3] } // Solo usuarios premium
    },
    { path: 'resetPassword', component: ResetPasswordComponent },
    { path: 'upgrade-plan', component: UpgradePlanComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
