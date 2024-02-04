export interface BrandSynchronizationDetails {
  apiSmBrands: FreshSBrand[];
  dbSmBrands: DbSBrand[],
  apiTrayBrands: FreshTBrand[],
  dbTrayBrands: DbTBrand[],
}

export interface CategorySynchronizationDetails {
  apiSmCategories: FreshSCategory[];
  dbSmCategories: DbSCategory[];
  apiTrayCategories: FreshTCategory[];
  dbTrayCategories: DbTCategory[];
}

export interface DbTCategory {
  id: number;
  parentId: number;
  name: string;
  smallDescription: string;
  slug: string;
  createDate: string;
  updateDate?: string;
  active: number;
}
export interface FreshTCategory {
  id: number;
  parent_id: number;
  name: string;
  small_description: string;
  Images?: Image[];
  slug: string;
}

export interface Image {
  http: string;
  https: string;
  thumbs?: Thumbs;
}

export interface Thumbs {
  '30': UrlType;
  '90': UrlType;
  '180': UrlType;
}
export interface UrlType {
  http: string;
  https: string;
}

export interface DbSCategory {
  id: number;
  parentId: number;
  referenceCode: string;
  name: string;
  slug: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  seoH1: string;
  description: string;
  imageUrl: string;
  createDate: string;
  updateDate?: string;
  active: number;
}

export interface FreshSCategory {
  id: number;
  parent_id: number;
  referenceCode: string;
  name: string;
  slug: string;
  seo_title: string;
  seo_description: string;
  seo_keywords: string;
  seo_h1: string;
  description: string;
  image_url: string;
  active: boolean;
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