export interface Post {
  id: string;
  title: string;
  content: string;
  slug: string;
  status: 'draft' | 'published';
  published_at: Date ;
  seo_title?: string;
  seo_description?: string;
  created_at: string;
  updated_at: string;
  author_id: string;
}
