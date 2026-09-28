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
  filterChange = output<{ search: string; category: string }>();

  private category = signal<string>('');

  onSearchChange(text: string) {
    this.searchTerm.set(text);
    this.emitFilter();
  }

  onCategoryChange(event: Event) {
    const val = (event.target as HTMLSelectElement).value;
    this.category.set(val);
    this.emitFilter();
  }

  private emitFilter() {
    this.filterChange.emit({
      search: this.searchTerm(),
      category: this.category()
    });
  }
}