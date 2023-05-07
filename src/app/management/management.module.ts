import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilComponent } from './profil/profil.component';
import { PlantComponent } from './plant/plant/plant.component';
import { CardPlantComponent } from './plant/card-plant/card-plant.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { AppMaterialModule } from '../material.module';
import { NavBarComponent } from '../share/nav-bar/navBar/nav-bar.component';

const managementRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'plant', component: PlantComponent },
  { path: 'profil', component: ProfilComponent },
]

@NgModule({
  declarations: [
    DashboardComponent,
    CardPlantComponent,
    PlantComponent,
    ProfilComponent,
    NavBarComponent
  ],
  imports: [
    CommonModule,
    AppMaterialModule,
    RouterModule.forChild(managementRoutes)
  ]
})
export class ManagementModule { }
