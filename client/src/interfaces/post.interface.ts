export interface IPost {
  post_id?: number;
  title: string;
  content: string;
  creator?: string;
  created_at?: Date;
  updated_at?: Date;
}
