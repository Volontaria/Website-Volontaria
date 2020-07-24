import { Injectable } from '@angular/core';
import { ModalComponent } from '../components/modal/modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  map: Map<string, ModalComponent> = new Map;

  get(v: string): ModalComponent {
    return this.map.get(v);
  }

  set(key: string, v: ModalComponent): void {
    this.map.set(key, v);
  }
}
