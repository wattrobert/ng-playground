import { Injectable, Optional } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import _ from "lodash";

import { OcSwaggerSpec } from './classes/swagger-spec';
import { OcFormOptions } from './classes/form-options'
import { OcLabelPipe } from './oc-label.pipe';
import { OcTypePipe } from './oc-type.pipe';

import {
    DYNAMIC_FORM_CONTROL_INPUT_TYPE_NUMBER,
    DYNAMIC_FORM_CONTROL_INPUT_TYPE_PASSWORD,
    DYNAMIC_FORM_CONTROL_INPUT_TYPE_TEL,
    DynamicFormGroupModel,
    DynamicFormControlModel,
    DynamicDatePickerModel,
    DynamicCheckboxModel,
    DynamicInputModel,
    DynamicRadioGroupModel
} from "@ng-dynamic-forms/core";

@Injectable()
export class OcFormService {
    swagger: OcSwaggerSpec;
    globalOptions: OcFormOptions;
    layout: any;
    constructor( @Optional() config: OcFormOptions, private http: HttpClient, private labelPipe: OcLabelPipe, private typePipe: OcTypePipe ) {
        if (config) this.globalOptions = config;
        this.layout = {
            element: {
                label: 'ui-widget'
            },
            grid: {
                host: 'ui-fluid',
                container: 'ui-g-6'
            }
        }
    }

    getSpec(): Promise <OcSwaggerSpec> {
        if (this.swagger) {
            return Promise.resolve(this.swagger);
        } else {
            console.log('[OC FORMS] Retrieving Swagger Spec');
            return this.http.get<any>('https://api.ordercloud.io/v1/swagger')
                .toPromise()
                    .then(swagger => {
                        this.swagger = swagger;
                        return this.swagger;
                    })
                    .catch(this.handleError);
        }
    }

    get(type: string, options?:OcFormOptions): Promise < DynamicFormControlModel[] > {
        return this.getSpec()
            .then(swaggerSpec => {
                if (this.globalOptions) options = _.merge({}, this.globalOptions, options)
                return this.buildFormGroup(type, options);
            });
    }
    
    private buildFormGroup(type: string, options?:OcFormOptions) {
        let definitions = this.swagger.definitions;
        
        let baseForm = {
            id: type,
            group: [],
        }

        let baseFormGroup = [];

        for (let key in definitions[type].properties) {
            let prop = definitions[type].properties[key];

            if (prop.$ref) {

                let subType = prop.$ref.split('definitions/')[1];
                let subForm = {
                    id: key,
                    label: this.labelPipe.transform(key),
                    legend: this.labelPipe.transform(key),
                    group: []
                }

                for (let subKey in definitions[subType].properties) {
                    let subProp = definitions[subType].properties[subKey];
                    let subID = key + '_' + subKey;
                    subForm.group.push(this.initFormControl(subID, subKey, subProp, options));
                }

                subForm.group = _.compact(subForm.group);
                baseForm.group.push(new DynamicFormGroupModel(subForm, this.layout));
                
            } else {
                baseFormGroup.push(this.initFormControl(key, key, prop, options));
            }
        }

        baseForm.group = baseFormGroup.concat(baseForm.group);
        baseForm.group = _.compact(baseForm.group);
        let result: DynamicFormControlModel[] = [new DynamicFormGroupModel(baseForm)];
        return _.compact(result);
    }
    
    private isIncluded(propertyKey:string, options?:OcFormOptions) {
        if (options && options.include) {
            return options.include.includes(propertyKey);
        } else if (options && options.exclude) {
            return !options.exclude.includes(propertyKey);
        } else {
            return true;
        }
    }

    private initFormControl(propID, propKey, property, options?:OcFormOptions) {
        if (!this.isIncluded(propKey, options)) return;
        let label = this.labelPipe.transform(propKey);
        let model:any = {
            placeholder: label,
            id: propID,
            label: label
        }
        switch (this.typePipe.transform(propKey, property.type)) {
            case 'string':
                return new DynamicInputModel(model, this.layout)
            case 'number':
                model.min = 0;
                model.max = 100;
                model.step = 0.01;
                if (propKey.includes('Quantity')) model.step = 1;
                model.inputType = DYNAMIC_FORM_CONTROL_INPUT_TYPE_NUMBER;
                return new DynamicInputModel(model, this.layout)
            case 'boolean':
                return new DynamicCheckboxModel(model, this.layout);
            case 'phone': {
                model.mask = "(999) 999-9999",
                model.inputType = DYNAMIC_FORM_CONTROL_INPUT_TYPE_TEL;
                return new DynamicInputModel(model, this.layout);
            }
            case 'date':
                model.format = 'mm/dd/yy'
                return new DynamicDatePickerModel(model, this.layout);
            case 'password':
                model.inputType = DYNAMIC_FORM_CONTROL_INPUT_TYPE_PASSWORD;
                return new DynamicInputModel(model, this.layout);
            case 'object':
                break;
            default:
                break;
        }
    }

    private handleError(error: any): Promise<any> {
        console.error('Unable to retrieve swagger spec', error);
        return Promise.reject(error.message || error);
    }
}