import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MY_FORM_MODEL } from "./form-example.model";
import { DynamicFormControlModel, DynamicFormService } from "@ng-dynamic-forms/core";

@Component({
  selector: 'form-example',
  templateUrl: './form-example.component.html'
})

export class FormExampleComponent implements OnInit {

    formModel: DynamicFormControlModel[] = MY_FORM_MODEL;
    formGroup: FormGroup;

    constructor(private formService: DynamicFormService) {}

    ngOnInit() {
        this.formGroup = this.formService.createFormGroup(this.formModel);
    }
}
