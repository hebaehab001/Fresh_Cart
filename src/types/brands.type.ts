import { MetaDataResponse } from "./common.type";

export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface BrandResponse {
  results: number;
  metadata: MetaDataResponse;
  data: Brand[];
}