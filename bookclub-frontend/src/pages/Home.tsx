import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="text-center py-16">
      <h1 className="text-5xl font-bold text-gray-900 mb-6">
        Welcome to BookClub
      </h1>
      <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
        Manage your book collection and discover new authors. Track your favorite books
        and build your personal library.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <Link
          to="/authors"
          className="group bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow"
        >
          <div className="text-5xl mb-4">👤</div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
            Authors
          </h2>
          <p className="text-gray-600">
            Browse and manage your collection of authors
          </p>
        </Link>

        <Link
          to="/books"
          className="group bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow"
        >
          <div className="text-5xl mb-4">📚</div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
            Books
          </h2>
          <p className="text-gray-600">
            Explore and organize your book library
          </p>
        </Link>
      </div>

      <div className="mt-16 max-w-3xl mx-auto bg-blue-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Quick Start</h3>
        <ol className="text-left text-gray-600 space-y-2">
          <li>1. Start by adding authors to your collection</li>
          <li>2. Then add books and link them to their authors</li>
          <li>3. View detailed information and manage your library</li>
        </ol>
      </div>
    </div>
  );
}
