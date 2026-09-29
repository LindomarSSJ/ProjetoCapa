import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  private items = signal<any[]>([]);     
  cartCount = signal<number>(0);

  
  addToCart(art: any) {
    const currentItems = this.items();
    this.items.set([...currentItems, art]);
    this.cartCount.set(this.items().length);
  }

  
  getItems() {
    return this.items();
  }
}