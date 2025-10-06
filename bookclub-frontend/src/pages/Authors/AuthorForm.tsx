import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { authorsApi } from '../../services/api';
import { AuthorFormData } from '../../types';
import LoadingSpinner from '../../components/LoadingSpinner';
import toast from 'react-hot-toast';

interface FormErrors {
  name?: string;
  bio?: string;
}

export default function AuthorForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [formData, setFormData] = useState<AuthorFormData>({
    name: '',
    bio: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(isEditing);

  useEffect(() => {
    const fetchAuthor = async () => {
      if (!id) return;

      try {
        const author = await authorsApi.getById(id);
        setFormData({
          name: author.name,
          bio: author.bio || '',
        });
      } catch (err) {
        toast.error('Failed to load author');
        navigate('/authors');
      } finally {
        setInitialLoading(false);
      }
    };

    fetchAuthor();
  }, [id, navigate]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (formData.bio && formData.bio.length > 1000) {
      newErrors.bio = 'Bio must not exceed 1000 characters';
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
      const submitData: AuthorFormData = {
        name: formData.name.trim(),
        bio: formData.bio?.trim() || undefined,
      };

      if (isEditing && id) {
        await authorsApi.update(id, submitData);
        toast.success('Author updated successfully');
      } else {
        await authorsApi.create(submitData);
        toast.success('Author created successfully');
      }
      navigate('/authors');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to save author');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof AuthorFormData, value: string) => {
    setFormData({ ...formData, [field]: value });
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined });
    }
  };

  if (initialLoading) return <LoadingSpinner />;

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

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h1 className="text-2xl font-semibold text-gray-900">
            {isEditing ? 'Edit Author' : 'Add New Author'}
          </h1>
        </div>
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter author name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                Biography
              </label>
              <textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => handleChange('bio', e.target.value)}
                rows={6}
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                  errors.bio ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter author biography"
              />
              <p className="mt-1 text-sm text-gray-500">
                {formData.bio?.length || 0}/1000 characters
              </p>
              {errors.bio && (
                <p className="mt-1 text-sm text-red-600">{errors.bio}</p>
              )}
            </div>

            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => navigate('/authors')}
                className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
              >
                {loading ? 'Saving...' : isEditing ? 'Update Author' : 'Create Author'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
