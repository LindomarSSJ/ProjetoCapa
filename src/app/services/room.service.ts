import { Injectable, signal } from '@angular/core';

export interface RoomItem {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
  description?: string;
}

@Injectable({
  providedIn: 'root'
})
export class RoomService {
   
  private objectIds = [436535, 438002, 436524, 437980, 436532, 436965, 435882, 436533];

  items = signal<RoomItem[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  constructor() {
    this.fetchItems();
  }

  async fetchItems() {
    this.loading.set(true);
    this.error.set(null);

    try {
        
      const requests = this.objectIds.map(id =>
        fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`)
          .then(res => res.ok ? res.json() : null)
      );

      const results = await Promise.all(requests);

      const mappedItems: RoomItem[] = results
        .filter(art => art && art.primaryImageSmall)
        .map(art => ({
          id: art.objectID,
          title: art.title || 'Obra sem título',
          price: Math.floor(Math.random() * 400) + 100,
          category: art.department || 'Arte Clássica',
          // Proxy público do WServ para evitar problemas de CORS e redimensionar imagens
          image: `https://images.weserv.nl/?url=${encodeURIComponent(art.primaryImageSmall)}`,
          description: `${art.artistDisplayName || 'Artista Desconhecido'} (${art.objectEndDate || ''})`
        }));

      this.items.set(mappedItems);
    } catch (err: any) {
      this.error.set('Falha ao carregar o acervo do museu.');
    } finally {
      this.loading.set(false);
    }
  }

  async getItemById(id: string | number) {
    const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`);
    if (!response.ok) throw new Error('Obra não encontrada');
    const art = await response.json();

    return {
      id: art.objectID,
      title: art.title || 'Obra sem título',
      price: 250,
      category: art.department || 'Arte Clássica',
      image: art.primaryImageSmall ? `https://images.weserv.nl/?url=${encodeURIComponent(art.primaryImageSmall)}` : '',
      description: art.artistDisplayName || 'Artista Desconhecido'
    } as RoomItem;
  }
}