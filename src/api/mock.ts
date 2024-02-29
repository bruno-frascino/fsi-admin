import { BrandSynchronizationDetails, CategorySynchronizationDetails, FreshSCategory, FreshTCategory, Thumbs, Image, UrlType, DbSCategory, DbTCategory } from "./types";

export const mockBrandSyncDetails: BrandSynchronizationDetails = {
  apiSmBrands: [
    { id: 1, name: 'Gucci', slug: 'gucci', seo_title: 'Gucci Title', seo_description: 'Gucci Description', seo_keywords: 'Gucci, Clothes' },
    { id: 2, name: 'Louis Vuitton', slug: 'louis-vuitton', seo_title: 'Louis Vuitton Title', seo_description: 'Louis Vuitton Description', seo_keywords: 'Louis Vuitton, Clothes' },
    { id: 3, name: 'Hermes', slug: 'hermes', seo_title: 'Hermes Title', seo_description: 'Hermes Description', seo_keywords: 'Hermes, Clothes' },
    { id: 4, name: 'Prada', slug: 'prada', seo_title: 'Prada Title', seo_description: 'Prada Description', seo_keywords: 'Prada, Clothes' },
    { id: 5, name: 'Chanel', slug: 'chanel', seo_title: 'Chanel Title', seo_description: 'Chanel Description', seo_keywords: 'Chanel, Clothes' },
  ],
  dbSmBrands: [
    { id: 6, brandId: 23, name: 'Versace', slug: 'versace', seoTitle: 'Versace Title', seoDescription: 'Versace Description', seoKeywords: 'Versace, Clothes', createDate: '2022-01-01', updateDate: '2022-01-02', active: 1 },
    { id: 7, brandId: 24, name: 'Armani', slug: 'armani', seoTitle: 'Armani Title', seoDescription: 'Armani Description', seoKeywords: 'Armani, Clothes', createDate: '2022-01-01', updateDate: '2022-01-02', active: 1 },
    { id: 8, brandId: 25, name: 'Dolce & Gabbana', slug: 'dolce-gabbana', seoTitle: 'Dolce & Gabbana Title', seoDescription: 'Dolce & Gabbana Description', seoKeywords: 'Dolce & Gabbana, Clothes', createDate: '2022-01-01', updateDate: '2022-01-02', active: 1 },
    { id: 9, brandId: 26, name: 'Burberry', slug: 'burberry', seoTitle: 'Burberry Title', seoDescription: 'Burberry Description', seoKeywords: 'Burberry, Clothes', createDate: '2022-01-01', updateDate: '2022-01-02', active: 1 },
    { id: 10, brandId: 27, name: 'Dior', slug: 'dior', seoTitle: 'Dior Title', seoDescription: 'Dior Description', seoKeywords: 'Dior, Clothes', createDate: '2022-01-01', updateDate: '2022-01-02', active: 1 },
  ],
  apiTrayBrands: [
    { id: 11, slug: 'ralph-lauren', brand: 'Ralph Lauren' },
    { id: 12, slug: 'tommy-hilfiger', brand: 'Tommy Hilfiger' },
    { id: 13, slug: 'calvin-klein', brand: 'Calvin Klein' },
    { id: 14, slug: 'diesel', brand: 'Diesel' },
    { id: 15, slug: 'zara', brand: 'Zara' },
  ],
  dbTrayBrands: [
    { id: 16, brandId: 23, slug: 'h&m', brand: 'H&M', createDate: '2022-01-01', updateDate: '2022-01-02', active: 1 },
    { id: 17, brandId: 24, slug: 'uniqlo', brand: 'Uniqlo', createDate: '2022-01-01', updateDate: '2022-01-02', active: 1 },
    { id: 18, brandId: 25, slug: 'gap', brand: 'Gap', createDate: '2022-01-01', updateDate: '2022-01-02', active: 1 },
    { id: 19, brandId: 26, slug: 'levi-strauss-co', brand: 'Levi Strauss & Co.', createDate: '2022-01-01', updateDate: '2022-01-02', active: 1 },
    { id: 20, brandId: 27, slug: 'adidas', brand: 'Adidas', createDate: '2022-01-01', updateDate: '2022-01-02', active: 1 },
  ],
};

const mockUrlType: UrlType = {
  http: 'http://example.com',
  https: 'https://example.com',
};

const mockThumbs: Thumbs = {
  '30': mockUrlType,
  '90': mockUrlType,
  '180': mockUrlType,
};

const mockImage: Image = {
  http: 'http://example.com',
  https: 'https://example.com',
  thumbs: mockThumbs,
};

const mockFreshTCategory: FreshTCategory = {
  id: 1,
  parent_id: 0,
  name: 'Fresh T Category',
  small_description: 'Fresh T Category Description',
  Images: [mockImage],
  slug: 'fresh-t-category',
};

const mockStoredTCategory: DbTCategory = {
  id: 1,
  categoryId: 1,
  parentId: 0,
  name: 'Stored T Category',
  smallDescription: 'Stored T Category Description',
  slug: 'stored-t-category',
  createDate: '2022-01-01',
  updateDate: '2022-01-02',
  active: 1,
};

const mockFreshSCategory: FreshSCategory = {
  id: 1,
  parent_id: 0,
  referenceCode: 'fresh-s-category',
  name: 'Fresh S Category',
  slug: 'fresh-s-category',
  seo_title: 'Fresh S Category SEO Title',
  seo_description: 'Fresh S Category SEO Description',
  seo_keywords: 'Fresh, S, Category, SEO, Keywords',
  seo_h1: 'Fresh S Category SEO H1',
  description: 'Fresh S Category Description',
  image_url: 'http://example.com',
  active: true,
};

const mockStoredSCategory: DbSCategory = {
  id: 1,
  categoryId: 1,
  parentId: 0,
  referenceCode: 'stored-s-category',
  name: 'Stored S Category',
  slug: 'stored-s-category',
  seoTitle: 'Stored S Category SEO Title',
  seoDescription: 'Stored S Category SEO Description',
  seoKeywords: 'Stored, S, Category, SEO, Keywords',
  seoH1: 'Stored S Category SEO H1',
  description: 'Stored S Category Description',
  imageUrl: 'http://example.com',
  createDate: '2022-01-01',
  updateDate: '2022-01-02',
  active: 1,
};

export const mockCategorySynchronizationDetails: CategorySynchronizationDetails = {
  apiSmCategories: [mockFreshSCategory],
  dbSmCategories: [mockStoredSCategory],
  apiTrayCategories: [mockFreshTCategory],
  dbTrayCategories: [mockStoredTCategory],
};