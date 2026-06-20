export interface ShippingAddress {
  _id?: string;
  name: string;
  details: string;
  phone: string;
  city: string;
}

export interface AddressesResponse {
  status: string;
  results: number;
  data: ShippingAddress[];
}