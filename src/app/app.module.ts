import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AppMaterialModule } from './material.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ManagementModule } from './management/management.module';
import { CguComponent } from './cgu/cgu.component';
import { FooterComponent } from './share/footer/footer.component';
import { ContactComponent } from './contact/contact.component';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PageNotFoundComponent,
    CguComponent,
    FooterComponent,
    ContactComponent,
  ],
  imports: [
    BrowserModule,
    AppMaterialModule,
    ManagementModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)), // Initialisation de Firebase
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
