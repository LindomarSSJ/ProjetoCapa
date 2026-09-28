import { Component, inject, signal } from '@angular/core';
import { RoomService, RoomItem } from '../../services/room.service';
import { RoomCardComponent } from '../../components/room-card/room-card.component';
import { CartService } from '../../services/cart.service';  

@Component({
  selector: 'app-explore',
  standalone: true,
  imports: [RoomCardComponent],
  templateUrl: './explore.component.html',
  styleUrl: './explore.component.css'
})
export class ExploreComponent {
  roomService = inject(RoomService);
  cartService = inject(CartService);  
  selectedItem = signal<RoomItem | null>(null);

  onSelect(item: RoomItem) {
    this.selectedItem.set(item);
    this.cartService.addToCart(item);  
  }
}