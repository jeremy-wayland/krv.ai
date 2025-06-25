export type Author = {
  name: string;
  image: string;
  bio?: string;
  _id?: number | string;
  _ref?: number | string;
};

export type Blog = {
  _id: number;
  title: string;
  slug?: any;
  metadata?: string;
  body?: string;
  mainImage?: any;
  author?: Author;
  tags?: string[];
  publishedAt?: string;
};

export type TeamMember = {
  _id: number;
  name: string;
  role: string;
  headshot: string;
  linkedInUrl: string;
  keyAchievements: string[];
  education: string;
};
