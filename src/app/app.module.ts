import { BrowserModule } from '@angular/platform-browser';
import {Component, NgModule} from '@angular/core';
import {ActivatedRoute, PreloadAllModules, RouterModule} from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { AppComponent } from "app/app.component";
import { AppRoutingModule } from "app/app-routing.module";
import { HomeComponent } from './home/home.component';
import { PremieresComponent } from './premieres/premieres.component';
import { SharedService } from "app/shared/shared.service";
import { ShowComponent } from "app/imported-directive/show.component";
import { ShowService } from "app/imported-directive/show.service";
import { HttpModule } from "@angular/http";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    PremieresComponent,
    ShowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule
  ],
  providers: [SharedService, ShowService],
  bootstrap: [AppComponent]
})
export class AppModule { }
