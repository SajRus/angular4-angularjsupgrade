import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HomeComponent } from "app/home/home.component";
import { PremieresComponent } from "app/premieres/premieres.component";

const appRoute = [
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'home', component: HomeComponent},
      {path: 'premieres', component: PremieresComponent},
      {path: '', loadChildren: './angularjs/angularjs.module#AngularJSModule'}
    ]
    
@NgModule({
  imports: [
    RouterModule.forRoot(appRoute, { enableTracing: true})
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }