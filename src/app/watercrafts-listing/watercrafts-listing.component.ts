import { Component, Input, signal, WritableSignal } from '@angular/core';

@Component({
  selector: 'app-watercrafts-listing',
  imports: [],
  templateUrl: './watercrafts-listing.component.html',
  styleUrl: './watercrafts-listing.component.scss'
})

export class WatercraftsListingComponent {
  @Input() number: string | undefined;
  @Input() name: string | undefined;
  @Input() image: string | undefined;
  @Input() alt: string | undefined;
  @Input() description: string | undefined;
  @Input() watercraft: any = {}
  @Input() count: WritableSignal<number> = signal(0);

  getWatercraft() {
    return this.watercraft;
  }

  getNumber() {
    return this.number ? parseInt(this.number) + 1 : 0;
  }
  
  getSingleWatercraft() {
    // TODO: implement
  }

  increment() {
    this.count.update(current => current + 1);
  }

  decrement() {
    this.count.update(current => current - 1);
  }

  getCount() {
    return this.count;
  }
}
