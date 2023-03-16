import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccueilComponent } from './accueil/accueil.component';
import { ProblemeComponent } from './probleme/probleme.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    ProblemeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([
      { path: "accueil",component: AccueilComponent},
      { path: "",redirectTo:"accueil", pathMatch:"full"},      
      { path: "probleme",component: ProblemeComponent},
      

    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
