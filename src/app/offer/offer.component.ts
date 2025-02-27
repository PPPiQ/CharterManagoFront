import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { WatercraftsListingComponent } from '../watercrafts-listing/watercrafts-listing.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OffersResponse, Watercrafts } from '../models/offers';

@Component({
  selector: 'app-offer',
  imports: [CommonModule, WatercraftsListingComponent],
  templateUrl: './offer.component.html',
  styleUrl: './offer.component.scss',
})
export class OfferComponent implements OnInit {
  watercrafts: Watercrafts[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getOffers();
  }

  getWatercraft(id: string) {
    return this.watercrafts.find((watercraft) => watercraft._id === id);
  }

  getOffers() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    console.log('Getting offers');

    this.http
      .get('http://127.0.0.1:5000/api/v1/offers', { headers })
      .subscribe({
        next: (resp: Object) => {
          console.log('Offers downloaded');
          const response: OffersResponse = resp as OffersResponse;
          if (response.data) {
            this.watercrafts = response.data;
          }
        },
        error: (err) => console.error(err),
      });
  }

  // addOffer() {
  //   this.http.post('h')
  // }
}
