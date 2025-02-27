export interface Watercrafts {
    _id: string, 
    title: string,
    description: string,
    imageUrl: string, 
    date_of_creation: Date,
    offerState: string, 
    offerViews: number,
    date_of_publication?: Date,
    createdBy: string,
    __v: number
  }

export interface OffersResponse {
    data: Watercrafts[],
    success: boolean
}