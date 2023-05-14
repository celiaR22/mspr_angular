import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'frenchDate'
})
export class FrenchDatePipe implements PipeTransform {

  transform(value: string): string {
    const dateParts = value?.split('-');
    const day = dateParts[2];
    const month = new Date(Number(dateParts[0]), Number(dateParts[1]) - 1, Number(dateParts[2]))
      .toLocaleString('fr-FR', { month: 'long' });
    const year = dateParts[0];
    return `${day} ${month} ${year}`;
  }
}
