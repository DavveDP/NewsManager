//mock data for articles
export interface Article {
  id?: number;
  title: string;
  subtitle?: string;
  abstract: string;
  body?: string; 
  category: 'National' | 'Economy' | 'Sports' | 'Technology' | string;
  image_data?: string | null;
  image_media_type?: string | null;
  update_date?: string;            
  modified_by?: string;
}
