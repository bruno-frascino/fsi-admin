//TOO delete this one once calls simplified
export interface BrandSynchronizationDetails {
  apiSmBrands: FreshSBrand[];
  dbSmBrands: DbSBrand[],
  apiTrayBrands: FreshTBrand[],
  dbTrayBrands: DbTBrand[],
}

export interface SmBrandSyncDetails {
  apiSmBrands: FreshSBrand[];
  dbSmBrands: DbSBrand[],
}

export interface TrayBrandSyncDetails {
  apiTrayBrands: FreshTBrand[],
  dbTrayBrands: DbTBrand[],
}

export interface CategorySynchronizationDetails {
  apiSmCategories: FreshSCategory[];
  dbSmCategories: DbSCategory[];
  apiTrayCategories: FreshTCategory[];
  dbTrayCategories: DbTCategory[];
}

export interface SmCategorySyncDetails {
  apiSmCategories: FreshSCategory[];
  dbSmCategories: DbSCategory[];
}

export interface TrayCategorySyncDetails {
  apiTrayCategories: FreshTCategory[];
  dbTrayCategories: DbTCategory[];
}

export interface DbTCategory {
  id: number; // internal category id
  categoryId: number; // external category id
  parentId: number;
  name: string;
  smallDescription: string;
  slug: string;
  createDate: string;
  updateDate?: string;
  active: number;
  fsActive: number;
}
export interface FreshTCategory {
  id: number;
  parent_id: number;
  name: string;
  description: string;
  small_description: string;
  Images?: Image[];
  order: number;
  has_product: number;
  active: number;
  slug?: string;
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
  id: number; // internal category id
  categoryId: number; // external category id
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
  active: 0 | 1;
  fsActive: 0 | 1;
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
  id: number; // internal brand id
  brandId: number; // external brand id
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
  id: number; // internal brand id
  brandId: number; // external brand id
  name: string;
  slug: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  createDate: string;
  updateDate?: string;
  active: number;
}