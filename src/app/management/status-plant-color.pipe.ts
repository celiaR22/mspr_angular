import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusPlantColor'
})
export class StatusPlantColorPipe implements PipeTransform {

  transform(status: string) {
    let color;

    switch (status) {
      case 'Disponible':
        color = 'green';
        break;
      case 'garder':
        color = 'red';
        break;
      case 'recherche':
        color = 'blue';
        break;
      default:
        color = 'green';
    }
    return 'chip' + color;
  }

}
