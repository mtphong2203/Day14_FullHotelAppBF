import { Component, Input } from '@angular/core';
import { FormatDatePipe } from '../../pipe/format-date.pipe';

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [FormatDatePipe],
  templateUrl: './event.component.html',
  styleUrl: './event.component.css'
})
export class EventComponent {


  @Input('eventItem') eventItem: any = {};
}
