import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';	
import { OrdercloudFormsCoreModule } from './ordercloud-forms/core.module'

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    OrdercloudFormsCoreModule.forRoot({
      exclude:[
        'ID', 
        'AddressName',
        'ToAddressID',
        'FromAddressID',
        'TermsAccepted'
      ], 
      labelMap:[
        {
          key:'Street1',
          label:'Address Line 1'
        },
        {
          key:'Street2',
          label:'Address Line 2'
        }
      ]
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
