export interface SocialPost {
  id: number;
  title: string;
  content: string;
  authorName: string;
  createdAt: Date;
  updatedAt?: Date;
}
// TypeScript Default value(any data type) = undefined
