import { Component, inject, signal, computed } from '@angular/core';
import { RoomFilterComponent } from '../../components/room-filter/room-filter.component';
import { RoomCardComponent } from '../../components/room-card/room-card.component';
import { RoomItem, RoomService } from '../../services/room.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-explore',
  standalone: true,
  imports: [RoomFilterComponent, RoomCardComponent],  
  templateUrl: './explore.component.html',
  styleUrl: './explore.component.css'
})
export class ExploreComponent {
  roomService = inject(RoomService);
  cartService = inject(CartService);

  // signal guarda
  searchTerm = signal<string>('');

 
  onFilter(term: string) {
    this.searchTerm.set(term);
  }

  // computed filter
 
  filteredItems = computed(() => {
    const query = this.searchTerm().toLowerCase().trim();
    const items = this.roomService.items();

    if (!query) {
      return items;
    }

    return items.filter(item => {
      const itemJson = JSON.stringify(item).toLowerCase();
      return itemJson.includes(query);
    });
  });
  onSelect(event: RoomItem) {
    this.cartService.addToCart(event);
  }
}