import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {MatButtonModule} from '@angular/material/button';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDivider} from "@angular/material/divider";
import {MatIcon} from "@angular/material/icon";
import {MainComponent} from './components/main/main.component';
import {HeaderComponent} from './components/header/header.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {provideHttpClient} from '@angular/common/http';
import {MatInput} from "@angular/material/input";
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from '@angular/material/input';
import {LoginComponent} from './components/login/login.component';
import {BraillectorBasicComponent} from './components/braillector-basic/braillector-basic.component';
import {BraillectorStandardComponent} from './components/braillector-standard/braillector-standard.component';
import {CdkMonitorFocus} from "@angular/cdk/a11y";
import { RegisterComponent } from './components/register/register.component';
import { BraillectorPremiumComponent } from './components/braillector-premium/braillector-premium.component';
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { FileUploadModule } from 'ng2-file-upload';
import {MatProgressBar} from "@angular/material/progress-bar";
import { UploadFilesComponent } from './components/upload-files/upload-files.component';
import { TruncateFileNamePipe } from './pipes/truncate-file-name.pipe';
import {MatMenu, MatMenuTrigger} from "@angular/material/menu";
import { UpgradePlanComponent } from './components/upgrade-plan/upgrade-plan.component';


@NgModule({
    declarations: [
        MainComponent,
        HeaderComponent,
        LoginComponent,
        BraillectorBasicComponent,
        BraillectorStandardComponent,
        RegisterComponent,
        BraillectorPremiumComponent,
        ResetPasswordComponent,
        UploadFilesComponent,
        TruncateFileNamePipe,
        UpgradePlanComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MatButtonModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatDivider,
        MatIcon,
        MatToolbarModule,
        MatInput,
        MatCard,
        MatCardContent,
        ReactiveFormsModule,
        MatInputModule,
        FormsModule,
        MatCardHeader,
        MatCardTitle,
        MatCardSubtitle,
        CdkMonitorFocus,
        MatTabGroup,
        MatTab,
        FileUploadModule,
        MatProgressBar,
        MatMenu,
        MatMenuTrigger,
    ],
    providers: [
        provideAnimationsAsync(),
        provideHttpClient()
    ],
    bootstrap: [MainComponent]
})
export class AppModule {
}
