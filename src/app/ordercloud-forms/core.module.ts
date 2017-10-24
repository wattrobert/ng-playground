import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from "@angular/forms";

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DynamicFormsCoreModule } from "@ng-dynamic-forms/core";
import { DynamicFormsNGBootstrapUIModule } from "@ng-dynamic-forms/ui-ng-bootstrap";

import { OcFormService } from './oc-form.service';
import { OcFormComponent } from './oc-form.component';
import { OcLabelPipe } from './oc-label.pipe';
import { OcTypePipe } from './oc-type.pipe';
import { OcFormOptions } from './classes/form-options';
import { OcLabelMap } from './classes/label-map';
import { OcSwaggerSpec } from './classes/swagger-spec';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    DynamicFormsCoreModule.forRoot(), 
    DynamicFormsNGBootstrapUIModule,
    HttpClientModule
  ],
  declarations: [
    OcFormComponent,
    OcLabelPipe,
    OcTypePipe
  ],
  exports: [
    OcFormComponent,
    OcLabelPipe,
    OcTypePipe
  ]
})

export class OrdercloudFormsCoreModule {
  static forRoot(config?: OcFormOptions): ModuleWithProviders {
    return {
      ngModule: OrdercloudFormsCoreModule,
      providers: [
        {provide: OcFormOptions, useValue:config},
        OcLabelPipe,
        OcTypePipe,
        OcFormService,
      ]
    }
  }
}