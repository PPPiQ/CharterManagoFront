export interface OrganizationsI {
    _id?: string,
    id: string, 
    name: string,
    created_at?: Date,
    __v?: number;
  }

export interface OrganizationsListingResponse {
    data: OrganizationsI[],
    success: boolean
}

export interface OrganizationCreateResponse {
  data: OrganizationsI,
  success: boolean
}

export interface ResponseOnDelete {
  success: boolean,
}
