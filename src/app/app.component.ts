import { Component } from '@angular/core';
import { SelectItem } from 'primeng/primeng';
import { OcFormService } from "./ordercloud-forms/oc-form.service";
import _ from "lodash";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string;
  models: SelectItem[];
  selectedModel: string;

  constructor(private ocFormService:OcFormService) {
    ocFormService.getSpec()
      .then(swaggerSpec => {
        this.models = [];
        for (let modelId in swaggerSpec.definitions) {
          if (!modelId.includes('List') && 
            !modelId.includes('Me') && 
            !modelId.includes('Assignment') && 
            !modelId.includes('Payload') && 
            !modelId.includes('BuyerAddress') && !modelId.includes('BuyerCreditCard') && !modelId.includes('BuyerProduct') && 
            !modelId.includes('Config')
          ) {
            this.models.push({
              label: _.startCase(modelId),
              value: modelId
            })
          }
        }
        this.selectedModel = 'BuyerShipment';
      });
  }
}