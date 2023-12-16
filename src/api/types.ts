export interface BrandSynchronizationDetails {
  apiSmBrands: FreshSBrand[];
  dbSmBrands: DbSBrand[],
  apiTrayBrands: FreshTBrand[],
  dbTrayBrands: DbTBrand[],
}

export interface DbTBrand {
  id: number;
  slug: string;
  brand: string;
  createDate: string;
  updateDate?: string;
  active: number;
}

export interface FreshTBrand {
  id: number;
  slug: string;
  brand: string;
}

export interface FreshSBrand {
  id: number;
  name: string;
  slug: string;
  seo_title: string;
  seo_description: string;
  seo_keywords: string;
}

export interface DbSBrand {
  id: number;
  name: string;
  slug: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  createDate: string;
  updateDate?: string;
  active: number;
}