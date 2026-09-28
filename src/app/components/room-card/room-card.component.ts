import { Component, input, output } from '@angular/core';
import { RoomItem } from '../../services/room.service';

@Component({
  selector: 'app-room-card',
  standalone: true,
  templateUrl: './room-card.component.html',
  styleUrl: './room-card.component.css'
})
export class RoomCardComponent {
  item = input.required<RoomItem>();
  select = output<RoomItem>();
}