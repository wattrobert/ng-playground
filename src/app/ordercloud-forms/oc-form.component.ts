import { Component, OnInit, OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { OcFormService } from "./oc-form.service";
import { OcFormOptions } from "./classes/form-options";
import { DynamicFormControlModel, DynamicFormService } from "@ng-dynamic-forms/core";
import { SimpleChanges } from "@angular/core";

@Component( {
    selector: 'oc-form',
    inputs: ['type', 'options'],
    template:'<div *ngIf="formGroup">' +
                '<form [formGroup]="formGroup">' +
                    '<dynamic-primeng-form [group]="formGroup" [model]="formModel"></dynamic-primeng-form>' +
                '</form>' +
            '</div>'
} )

export class OcFormComponent implements OnInit, OnChanges {

    formModel: DynamicFormControlModel[];
    formGroup: FormGroup;
    type: string;
    options: OcFormOptions;


    constructor(  private formService: DynamicFormService, private ocFormService: OcFormService ) { }

    ngOnInit() {
        // this.ocModelService.get(this.model);
        this.ocFormService.get(this.type, this.options).then( ocFormModel => {
            this.formModel = ocFormModel;
            this.formGroup = this.formService.createFormGroup( this.formModel );
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.type && !changes.type.firstChange) {
            this.ocFormService.get(this.type, this.options).then( ocFormModel => {
                this.formModel = ocFormModel;
                this.formGroup = this.formService.createFormGroup( this.formModel );
            });
        }
    }
}