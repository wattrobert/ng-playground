import { Optional, Pipe, PipeTransform } from '@angular/core';
import { OcLabelMap } from './classes/label-map';
import { OcFormOptions } from './classes/form-options';
import _ from "lodash";

@Pipe({name: 'ocLabel'})
export class OcLabelPipe implements PipeTransform {
  labelMap: OcLabelMap[];
  constructor(@Optional() config: OcFormOptions) {
    if (config && config.labelMap) this.labelMap = config.labelMap;
  };
  transform(key: string): string {
    var splitKeys = key.split('_');
    var splitReplacements = [];
    splitKeys.forEach(splitKey => {
      var replacement = _.find(this.labelMap, {key:splitKey});
      splitReplacements.push(replacement ? replacement.label : _.startCase(splitKey));
    });
    return splitReplacements.join(' ');
  }
}