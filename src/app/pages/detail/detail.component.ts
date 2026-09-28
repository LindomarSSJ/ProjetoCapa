import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoomService, RoomItem } from '../../services/room.service';

@Component({
  selector: 'app-detail',
  standalone: true,
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private roomService = inject(RoomService);

  item = signal<RoomItem | null>(null);
  loading = signal<boolean>(true);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.roomService.getItemById(id)
        .then((data: RoomItem) => {
          this.item.set(data);
          this.loading.set(false);
        })
        .catch(() => {
          this.loading.set(false);
        });
    }
  }
}