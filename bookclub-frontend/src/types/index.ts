export interface Author {
  id: number;
  name: string;
  bio?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Book {
  id: number;
  title: string;
  author: Author;
  description?: string;
  publishedYear?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthorFormData {
  name: string;
  bio?: string;
}

export interface BookFormData {
  title: string;
  authorId: number;
  description?: string;
  publishedYear?: number;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string>;
}
