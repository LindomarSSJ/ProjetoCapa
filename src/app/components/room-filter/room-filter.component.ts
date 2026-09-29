import { Component, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-room-filter',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './room-filter.component.html',
  styleUrl: './room-filter.component.css'
})
export class RoomFilterComponent {
  searchTerm = signal<string>('');
  filterChange = output<string>();

  onSearchChange(value: string) {
    this.searchTerm.set(value);
    this.filterChange.emit(value);
  }
}