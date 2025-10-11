export interface Article {
  id: number;
  id_user: number;
  title: string;
  subtitle: string;
  category: string;
  abstract: string;
  body: string;
  image_data: string;
  image_media_type: string;
  thumbnail_image: string;
  thumbnail_media_type: string;
  update_date: number;
}