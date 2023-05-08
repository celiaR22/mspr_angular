import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilComponent } from './profil/profil.component';
import { PlantComponent } from './plant/plant/plant.component';
import { CardPlantComponent } from './plant/card-plant/card-plant.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { AppMaterialModule } from '../material.module';
import { NavBarComponent } from '../share/nav-bar/navBar/nav-bar.component';
import { AuthGuard } from '../auth.guard';
import { SearchComponent } from './search/search.component';
import { SearchBarComponent } from '../share/search-bar/search-bar.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

const managementRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'plant', component: PlantComponent, canActivate: [AuthGuard] },
  { path: 'profil', component: ProfilComponent, canActivate: [AuthGuard] },
  { path: 'search', component: SearchComponent, canActivate: [AuthGuard] },
]

@NgModule({
  declarations: [
    DashboardComponent,
    CardPlantComponent,
    PlantComponent,
    ProfilComponent,
    NavBarComponent,
    SearchComponent,
    SearchBarComponent,
  ],
  imports: [
    CommonModule,
    AppMaterialModule,
    LeafletModule,
    RouterModule.forChild(managementRoutes)
  ]
})
export class ManagementModule { }
