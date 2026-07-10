export interface Profile {
  id: string;
  userId: string;
  bio?: string;
  avatar?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
  description?: string;
}

export interface HNStory {
  id: number;
  title: string;
  url?: string;
  by?: string;
  score?: number;
  time?: number;
}

export type ThemeMode = 'light' | 'dark' | 'system';

export type RootStackParamList = {
  Auth: undefined;
  App: undefined;
};
