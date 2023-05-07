import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavBarComponent } from './share/nav-bar/navBar/nav-bar.component';
import { ProfilComponent } from './profil/profil.component';
import { RegisterComponent } from './register/register.component';
import { SearchBarComponent } from './share/search-bar/search-bar.component';
import { PlantComponent } from './plant/plant/plant.component';
import { CardPlantComponent } from './plant/card-plant/card-plant.component';
import { AppMaterialModule } from './material.module';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    NavBarComponent,
    ProfilComponent,
    RegisterComponent,
    SearchBarComponent,
    PlantComponent,
    CardPlantComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
