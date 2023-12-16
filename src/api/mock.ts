import { BrandSynchronizationDetails } from "./types";

export const mockBrandSyncDetails: BrandSynchronizationDetails = {
  apiSmBrands: [
    { id: 1, name: 'Gucci', slug: 'gucci', seo_title: 'Gucci Title', seo_description: 'Gucci Description', seo_keywords: 'Gucci, Clothes' },
    { id: 2, name: 'Louis Vuitton', slug: 'louis-vuitton', seo_title: 'Louis Vuitton Title', seo_description: 'Louis Vuitton Description', seo_keywords: 'Louis Vuitton, Clothes' },
    { id: 3, name: 'Hermes', slug: 'hermes', seo_title: 'Hermes Title', seo_description: 'Hermes Description', seo_keywords: 'Hermes, Clothes' },
    { id: 4, name: 'Prada', slug: 'prada', seo_title: 'Prada Title', seo_description: 'Prada Description', seo_keywords: 'Prada, Clothes' },
    { id: 5, name: 'Chanel', slug: 'chanel', seo_title: 'Chanel Title', seo_description: 'Chanel Description', seo_keywords: 'Chanel, Clothes' },
  ],
  dbSmBrands: [
    { id: 6, name: 'Versace', slug: 'versace', seoTitle: 'Versace Title', seoDescription: 'Versace Description', seoKeywords: 'Versace, Clothes', createDate: '2022-01-01', updateDate: '2022-01-02', active: 1 },
    { id: 7, name: 'Armani', slug: 'armani', seoTitle: 'Armani Title', seoDescription: 'Armani Description', seoKeywords: 'Armani, Clothes', createDate: '2022-01-01', updateDate: '2022-01-02', active: 1 },
    { id: 8, name: 'Dolce & Gabbana', slug: 'dolce-gabbana', seoTitle: 'Dolce & Gabbana Title', seoDescription: 'Dolce & Gabbana Description', seoKeywords: 'Dolce & Gabbana, Clothes', createDate: '2022-01-01', updateDate: '2022-01-02', active: 1 },
    { id: 9, name: 'Burberry', slug: 'burberry', seoTitle: 'Burberry Title', seoDescription: 'Burberry Description', seoKeywords: 'Burberry, Clothes', createDate: '2022-01-01', updateDate: '2022-01-02', active: 1 },
    { id: 10, name: 'Dior', slug: 'dior', seoTitle: 'Dior Title', seoDescription: 'Dior Description', seoKeywords: 'Dior, Clothes', createDate: '2022-01-01', updateDate: '2022-01-02', active: 1 },
  ],
  apiTrayBrands: [
    { id: 11, slug: 'ralph-lauren', brand: 'Ralph Lauren' },
    { id: 12, slug: 'tommy-hilfiger', brand: 'Tommy Hilfiger' },
    { id: 13, slug: 'calvin-klein', brand: 'Calvin Klein' },
    { id: 14, slug: 'diesel', brand: 'Diesel' },
    { id: 15, slug: 'zara', brand: 'Zara' },
  ],
  dbTrayBrands: [
    { id: 16, slug: 'h&m', brand: 'H&M', createDate: '2022-01-01', updateDate: '2022-01-02', active: 1 },
    { id: 17, slug: 'uniqlo', brand: 'Uniqlo', createDate: '2022-01-01', updateDate: '2022-01-02', active: 1 },
    { id: 18, slug: 'gap', brand: 'Gap', createDate: '2022-01-01', updateDate: '2022-01-02', active: 1 },
    { id: 19, slug: 'levi-strauss-co', brand: 'Levi Strauss & Co.', createDate: '2022-01-01', updateDate: '2022-01-02', active: 1 },
    { id: 20, slug: 'adidas', brand: 'Adidas', createDate: '2022-01-01', updateDate: '2022-01-02', active: 1 },
  ],
};