import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDate',
  standalone: true
})
export class FormatDatePipe implements PipeTransform {

  transform(value: number): string {
    let result: string = '';

    let days = Math.floor(value / 1440);
    if (days > 0) {
      result += `${days}d`;
    }

    value -= days * 1440;
    let hours = Math.floor(value / 60);
    if (hours > 0) {
      result += `${hours}h`;
    }

    value -= hours * 60;

    let minutes = Math.floor(value % 60);
    if (minutes > 0) {
      result += `${minutes}m`;
    }

    return result;
  }
}
