import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { booksApi } from '../../services/api';
import { Book } from '../../types';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';
import toast from 'react-hot-toast';

export default function BookDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      if (!id) return;

      try {
        setLoading(true);
        setError(null);
        const data = await booksApi.getById(id);
        setBook(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load book details');
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const handleDelete = async () => {
    if (!book || !confirm(`Are you sure you want to delete "${book.title}"?`)) return;

    try {
      await booksApi.delete(book.id.toString());
      toast.success('Book deleted successfully');
      navigate('/books');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to delete book');
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={() => window.location.reload()} />;
  if (!book) return <ErrorMessage message="Book not found" />;

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

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{book.title}</h1>
              <Link
                to={`/authors/${book.author.id}`}
                className="text-xl text-blue-600 hover:text-blue-800"
              >
                by {book.author.name}
              </Link>
            </div>
            <div className="flex space-x-2">
              <Link
                to={`/books/${book.id}/edit`}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
              >
                Edit
              </Link>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>

          {book.publishedYear && (
            <div className="mb-6">
              <p className="text-sm text-gray-500">Published Year</p>
              <p className="font-semibold text-gray-900">{book.publishedYear}</p>
            </div>
          )}

          {book.description && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Description</h2>
              <p className="text-gray-600 whitespace-pre-wrap">{book.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
