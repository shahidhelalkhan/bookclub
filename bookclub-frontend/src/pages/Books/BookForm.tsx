import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { authorsApi, booksApi } from '../../services/api';
import { Author, BookFormData } from '../../types';
import LoadingSpinner from '../../components/LoadingSpinner';
import toast from 'react-hot-toast';

interface FormErrors {
  title?: string;
  authorId?: string;
  publishedYear?: string;
  description?: string;
}

export default function BookForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [formData, setFormData] = useState<BookFormData>({
    title: '',
    authorId: 0,
    publishedYear: undefined,
    description: '',
  });
  const [authors, setAuthors] = useState<Author[]>([]);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authorsData = await authorsApi.getAll();
        setAuthors(authorsData);

        if (id) {
          const book = await booksApi.getById(id);
          setFormData({
            title: book.title,
            authorId: book.author.id,
            publishedYear: book.publishedYear,
            description: book.description || '',
          });
        }
      } catch (err) {
        toast.error('Failed to load data');
        navigate('/books');
      } finally {
        setInitialLoading(false);
      }
    };

    fetchData();
  }, [id, navigate]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.trim().length < 2) {
      newErrors.title = 'Title must be at least 2 characters';
    }

    if (!formData.authorId) {
      newErrors.authorId = 'Author is required';
    }

    if (formData.publishedYear) {
      const currentYear = new Date().getFullYear();
      if (formData.publishedYear > currentYear) {
        newErrors.publishedYear = 'Published year cannot be in the future';
      }
      if (formData.publishedYear < 1) {
        newErrors.publishedYear = 'Invalid year';
      }
    }

    if (formData.description && formData.description.length > 2000) {
      newErrors.description = 'Description must not exceed 2000 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    try {
      setLoading(true);
      const submitData: BookFormData = {
        title: formData.title.trim(),
        authorId: formData.authorId,
        publishedYear: formData.publishedYear || undefined,
        description: formData.description?.trim() || undefined,
      };

      if (isEditing && id) {
        await booksApi.update(id, submitData);
        toast.success('Book updated successfully');
      } else {
        await booksApi.create(submitData);
        toast.success('Book created successfully');
      }
      navigate('/books');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to save book');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof BookFormData, value: string | number) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined });
    }
  };

  if (initialLoading) return <LoadingSpinner />;

  return (
    <div>
      <div className="mb-6">
        <Link to="/books" className="text-blue-600 hover:text-blue-800 flex items-center">
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Books
        </Link>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h1 className="text-2xl font-semibold text-gray-900">
            {isEditing ? 'Edit Book' : 'Add New Book'}
          </h1>
        </div>
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                  errors.title ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter book title"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title}</p>
              )}
            </div>

            <div>
              <label htmlFor="authorId" className="block text-sm font-medium text-gray-700 mb-1">
                Author <span className="text-red-500">*</span>
              </label>
              <select
                id="authorId"
                value={formData.authorId}
                onChange={(e) => handleChange('authorId', parseInt(e.target.value))}
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                  errors.authorId ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="0">Select an author</option>
                {authors.map((author) => (
                  <option key={author.id} value={author.id}>
                    {author.name}
                  </option>
                ))}
              </select>
              {errors.authorId && (
                <p className="mt-1 text-sm text-red-600">{errors.authorId}</p>
              )}
              {authors.length === 0 && (
                <p className="mt-1 text-sm text-yellow-600">
                  No authors available. Please create an author first.
                </p>
              )}
            </div>

            <div>
              <label htmlFor="publishedYear" className="block text-sm font-medium text-gray-700 mb-1">
                Published Year
              </label>
              <input
                type="number"
                id="publishedYear"
                value={formData.publishedYear || ''}
                onChange={(e) => handleChange('publishedYear', e.target.value ? parseInt(e.target.value) : undefined as any)}
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                  errors.publishedYear ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="e.g., 2024"
                min="1"
                max={new Date().getFullYear()}
              />
              {errors.publishedYear && (
                <p className="mt-1 text-sm text-red-600">{errors.publishedYear}</p>
              )}
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                rows={6}
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                  errors.description ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter book description"
              />
              <p className="mt-1 text-sm text-gray-500">
                {formData.description?.length || 0}/2000 characters
              </p>
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description}</p>
              )}
            </div>

            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => navigate('/books')}
                className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || authors.length === 0}
                className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
              >
                {loading ? 'Saving...' : isEditing ? 'Update Book' : 'Create Book'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
