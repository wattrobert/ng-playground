import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ReactiveFormsModule } from "@angular/forms";
import { DynamicFormsCoreModule } from "@ng-dynamic-forms/core";
import { DynamicFormsPrimeNGUIModule } from "@ng-dynamic-forms/ui-primeng";
import { FormExampleComponent } from "./form-example/form-example.component"
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PanelModule } from 'primeng/primeng';

@NgModule({
  declarations: [
    AppComponent,
    FormExampleComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    DynamicFormsCoreModule.forRoot(), 
    DynamicFormsPrimeNGUIModule, 
    PanelModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
