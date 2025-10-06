# BookClub Frontend

A modern, responsive React application for managing books and authors, built with Vite, TypeScript, and TailwindCSS.

## Features

- 📚 **Book Management**: Create, read, update, and delete books
- 👤 **Author Management**: Manage author profiles and their works
- 🎨 **Beautiful UI**: Clean and intuitive interface with TailwindCSS
- ✅ **Form Validation**: Inline validation with clear error messages
- 🔄 **Loading States**: Smooth loading indicators for better UX
- 📱 **Responsive Design**: Works seamlessly on all devices
- 🔔 **Toast Notifications**: Real-time feedback for user actions
- 🎯 **Error Handling**: Graceful error states with retry options

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **React Router** - Client-side routing
- **TailwindCSS** - Utility-first CSS framework
- **React Hot Toast** - Toast notifications

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Backend API running (default: http://localhost:5000)

## Getting Started

1. **Clone the repository and install dependencies**:

```bash
npm install
```

2. **Set up environment variables**:

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:5000/api
```

3. **Start the development server**:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Layout.tsx
│   ├── LoadingSpinner.tsx
│   ├── EmptyState.tsx
│   └── ErrorMessage.tsx
├── pages/              # Page components
│   ├── Home.tsx
│   ├── Authors/
│   │   ├── AuthorsList.tsx
│   │   ├── AuthorDetail.tsx
│   │   └── AuthorForm.tsx
│   └── Books/
│       ├── BooksList.tsx
│       ├── BookDetail.tsx
│       └── BookForm.tsx
├── services/           # API services
│   └── api.ts
├── types/             # TypeScript type definitions
│   └── index.ts
├── App.tsx            # Main app component with routing
├── main.tsx           # Application entry point
└── index.css          # Global styles
```

## API Integration

The application expects the following API endpoints:

### Authors
- `GET /api/authors` - List all authors
- `GET /api/authors/:id` - Get author details
- `POST /api/authors` - Create new author
- `PUT /api/authors/:id` - Update author
- `DELETE /api/authors/:id` - Delete author

### Books
- `GET /api/books` - List all books
- `GET /api/books/:id` - Get book details
- `POST /api/books` - Create new book
- `PUT /api/books/:id` - Update book
- `DELETE /api/books/:id` - Delete book

## Form Validation

The application includes comprehensive form validation:

### Author Form
- **Name**: Required, minimum 2 characters
- **Birth Date**: Optional, cannot be in the future
- **Bio**: Optional, maximum 1000 characters

### Book Form
- **Title**: Required, minimum 2 characters
- **Author**: Required, select from existing authors
- **ISBN**: Optional, must be valid ISBN format
- **Published Date**: Optional, cannot be in the future
- **Genre**: Optional
- **Summary**: Optional, maximum 2000 characters

## Key Features

### Loading States
- Spinner animation during data fetching
- Disabled buttons during form submission

### Empty States
- Helpful messages when no data is available
- Quick action buttons to add new items

### Error Handling
- User-friendly error messages
- Retry functionality for failed requests
- Inline form validation errors

### Toast Notifications
- Success notifications for CRUD operations
- Error notifications with detailed messages
- Auto-dismiss after 3 seconds

## Building for Production

```bash
npm run build
```

The optimized production build will be in the `dist/` directory.

## License

MIT
