import { Author, AuthorFormData, Book, BookFormData } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3004';

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'An error occurred' }));
    throw new Error(error.message || 'An error occurred');
  }
  return response.json();
}

// Authors API
export const authorsApi = {
  getAll: async (): Promise<Author[]> => {
    const response = await fetch(`${API_BASE_URL}/authors`);
    return handleResponse<Author[]>(response);
  },

  getById: async (id: string): Promise<Author> => {
    const response = await fetch(`${API_BASE_URL}/authors/${id}`);
    return handleResponse<Author>(response);
  },

  create: async (data: AuthorFormData): Promise<Author> => {
    const response = await fetch(`${API_BASE_URL}/authors`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return handleResponse<Author>(response);
  },

  update: async (id: string, data: AuthorFormData): Promise<Author> => {
    const response = await fetch(`${API_BASE_URL}/authors/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return handleResponse<Author>(response);
  },

  delete: async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/authors/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'An error occurred' }));
      throw new Error(error.message || 'An error occurred');
    }
  },
};

// Books API
export const booksApi = {
  getAll: async (): Promise<Book[]> => {
    const response = await fetch(`${API_BASE_URL}/books`);
    return handleResponse<Book[]>(response);
  },

  getById: async (id: string): Promise<Book> => {
    const response = await fetch(`${API_BASE_URL}/books/${id}`);
    return handleResponse<Book>(response);
  },

  create: async (data: BookFormData): Promise<Book> => {
    const response = await fetch(`${API_BASE_URL}/books`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return handleResponse<Book>(response);
  },

  update: async (id: string, data: BookFormData): Promise<Book> => {
    const response = await fetch(`${API_BASE_URL}/books/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return handleResponse<Book>(response);
  },

  delete: async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/books/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'An error occurred' }));
      throw new Error(error.message || 'An error occurred');
    }
  },
};
