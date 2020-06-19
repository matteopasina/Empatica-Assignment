import { StatsComponent } from './core/components/stats/stats.component';
import { HomeComponent } from './core/components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [{path: 'home', component: HomeComponent},
                        {path: 'stats', component: StatsComponent},
                        {path: '', redirectTo: 'home', pathMatch: 'full'},
                        {path: '**', redirectTo: 'home'}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
