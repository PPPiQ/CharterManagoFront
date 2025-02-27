export interface OrganizationsI {
    _id?: string,
    id: string, 
    name: string,
    created_at?: Date,
    __v?: number;
  }

export interface OperationsResponse {
    data: OrganizationsI[],
    success: boolean
}