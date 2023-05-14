import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilComponent } from './profil/profil.component';
import { PlantComponent } from './plant/plant/plant.component';
import { CardPlantComponent } from './plant/card-plant/card-plant.component';
import { RouterModule, Routes } from '@angular/router';
import { AppMaterialModule } from '../material.module';
import { NavBarComponent } from '../share/nav-bar/navBar/nav-bar.component';
import { AuthGuard } from '../auth.guard';
import { SearchComponent } from './search/search.component';
import { SearchBarComponent } from '../share/search-bar/search-bar.component';
import { AddPlantComponent } from './plant/add-plant/add-plant.component';
import { KeepComponent } from '../management/keep/keep.component';
import { AddKeepComponent } from '../management/keep/add-keep/add-keep.component';
import { CardKeepComponent } from '../management/keep/card-keep/card-keep.component';
import { FrenchDatePipe } from '../share/pipe/date-format.pipe';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

const managementRoutes: Routes = [
  { path: 'plants', component: PlantComponent, canActivate: [AuthGuard] },
  { path: 'profil', component: ProfilComponent, canActivate: [AuthGuard] },
  { path: 'search', component: SearchComponent, canActivate: [AuthGuard] },
  { path: 'keeps', component: KeepComponent, canActivate: [AuthGuard] },
  { path: 'plant/:id', component: AddPlantComponent, canActivate: [AuthGuard] },
  { path: 'keep/:id', component: AddKeepComponent, canActivate: [AuthGuard] },
  { path: 'add', component: AddPlantComponent, canActivate: [AuthGuard] },
  { path: 'addKeep', component: AddKeepComponent, canActivate: [AuthGuard] },
]

@NgModule({
  declarations: [
    CardPlantComponent,
    PlantComponent,
    ProfilComponent,
    NavBarComponent,
    SearchComponent,
    SearchBarComponent,
    AddPlantComponent,
    KeepComponent,
    AddKeepComponent,
    CardKeepComponent,
    FrenchDatePipe,
  ],
  imports: [
    CommonModule,
    AppMaterialModule,
    LeafletModule,
    RouterModule.forChild(managementRoutes)
  ]
})
export class ManagementModule { }
