import { Pipe, PipeTransform } from '@angular/core';
import { ocKeyTypeMap } from './constants/ocKeyTypeMap';
import { ocPropTypeMap } from './constants/ocPropTypeMap';
import _ from "lodash";

@Pipe({name: 'ocType'})
export class OcTypePipe implements PipeTransform {
  transform(key: string, type: string): string {
    var keyReplacement = _.find(ocKeyTypeMap, function(map) {
        return key.includes(map.matcher);
    });
    var typeReplacement = _.find(ocPropTypeMap, function(map) {
        return type === map.oType;
    });
    return keyReplacement ? keyReplacement.type : typeReplacement ? typeReplacement.nType : type;
  }
}