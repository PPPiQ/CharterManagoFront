import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { WatercraftsListingComponent } from '../watercrafts-listing/watercrafts-listing.component';
import { watercraftList } from '../data/watercraft'

@Component({
  selector: 'app-offer',
  imports: [ CommonModule, WatercraftsListingComponent ],
  templateUrl: './offer.component.html',
  styleUrl: './offer.component.scss'
})
export class OfferComponent {
  watercrafts: any[] = watercraftList

  getWatercraft(id: string) {
    return this.watercrafts.find(watercraft => watercraft.id === id);
  }
}
