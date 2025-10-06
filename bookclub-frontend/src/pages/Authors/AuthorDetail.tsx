import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { authorsApi, booksApi } from '../../services/api';
import { Author, Book } from '../../types';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';
import toast from 'react-hot-toast';

export default function AuthorDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [author, setAuthor] = useState<Author | null>(null);
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      try {
        setLoading(true);
        setError(null);
        const [authorData, allBooks] = await Promise.all([
          authorsApi.getById(id),
          booksApi.getAll(),
        ]);
        setAuthor(authorData);
        setBooks(allBooks.filter((book) => book.author.id === parseInt(id)));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load author details');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleDelete = async () => {
    if (!author || !confirm(`Are you sure you want to delete ${author.name}?`)) return;

    try {
      await authorsApi.delete(author.id.toString());
      toast.success('Author deleted successfully');
      navigate('/authors');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to delete author');
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={() => window.location.reload()} />;
  if (!author) return <ErrorMessage message="Author not found" />;

  return (
    <div>
      <div className="mb-6">
        <Link to="/authors" className="text-blue-600 hover:text-blue-800 flex items-center">
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Authors
        </Link>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{author.name}</h1>
            </div>
            <div className="flex space-x-2">
              <Link
                to={`/authors/${author.id}/edit`}
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

          {author.bio && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Biography</h2>
              <p className="text-gray-600">{author.bio}</p>
            </div>
          )}

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Books ({books.length})
            </h2>
            {books.length === 0 ? (
              <p className="text-gray-500">No books by this author yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {books.map((book) => (
                  <Link
                    key={book.id}
                    to={`/books/${book.id}`}
                    className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all"
                  >
                    <h3 className="font-semibold text-gray-900">{book.title}</h3>
                    {book.publishedYear && (
                      <p className="text-sm text-gray-500 mt-1">
                        {book.publishedYear}
                      </p>
                    )}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
