import { Pipe, PipeTransform } from '@angular/core';
import { Content } from '../models/content';


@Pipe({
  name: 'alphabeticSort',
  standalone: true
})
export class AlphabeticSortPipe implements PipeTransform {

  transform(value: Content[], ascending = true): Content[] {
    if (!value || value.length === 0) {
      return value;
    }


    return [...value].sort((a, b) => {
      const descA = a.description.toLowerCase();
      const descB = b.description.toLowerCase(); 
      return ascending ? descA.localeCompare(descB) : descB.localeCompare(descA);
    })
  }

}
