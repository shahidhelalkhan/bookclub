# Bookclub API

A NestJS REST API for managing books and authors with TypeORM and PostgreSQL.

## Features

- **Authors API**: Create, read, update, and delete authors
- **Books API**: Create, read, update, and delete books
- Type-safe queries with TypeORM
- Request validation with class-validator
- Error handling (400/404 responses)
- Database migrations
- Seed data script

## Tech Stack

- NestJS
- TypeORM
- PostgreSQL
- TypeScript
- class-validator

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Environment variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Update the `.env` file with your database credentials:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=secret
DB_DATABASE=bookclub
PORT=3000
```

### 3. Create database

```bash
createdb bookclub
```

Or using PostgreSQL client:

```sql
CREATE DATABASE bookclub;
```

### 4. Run migrations

```bash
npm run migration:run
```

### 5. Seed database (optional)

```bash
npm run seed
```

### 6. Start the server

Development:
```bash
npm run start:dev
```

Production:
```bash
npm run build
npm run start:prod
```

## API Endpoints

### Authors

- `GET /authors` - Get all authors
- `GET /authors/:id` - Get author by ID
- `POST /authors` - Create new author
  ```json
  {
    "name": "Author Name",
    "bio": "Optional bio"
  }
  ```
- `PATCH /authors/:id` - Update author
- `DELETE /authors/:id` - Delete author

### Books

- `GET /books` - Get all books (with author data)
- `GET /books/:id` - Get book by ID
- `POST /books` - Create new book
  ```json
  {
    "title": "Book Title",
    "authorId": 1,
    "description": "Optional description",
    "publishedYear": 2024
  }
  ```
- `PATCH /books/:id` - Update book
- `DELETE /books/:id` - Delete book

## Scripts

| Command | Description |
|---------|-------------|
| `npm run start:dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start:prod` | Start production server |
| `npm run migration:generate -- src/migrations/MigrationName` | Generate new migration |
| `npm run migration:run` | Run pending migrations |
| `npm run migration:revert` | Revert last migration |
| `npm run seed` | Seed database with sample data |
| `npm run test` | Run unit tests |
| `npm run test:e2e` | Run e2e tests |
| `npm run lint` | Lint code |
| `npm run format` | Format code |

## Error Responses

The API returns appropriate HTTP status codes:

- `200 OK` - Successful GET/PATCH requests
- `201 Created` - Successful POST requests
- `204 No Content` - Successful DELETE requests
- `400 Bad Request` - Invalid request data
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server errors

## Validation

Request bodies are validated using class-validator decorators:

- `name` (Author): Required, max 100 characters
- `bio` (Author): Optional, text
- `title` (Book): Required, max 200 characters
- `authorId` (Book): Required, number
- `description` (Book): Optional, text
- `publishedYear` (Book): Optional, number

## Database Schema

### Author
- `id` (Primary Key)
- `name` (varchar 100)
- `bio` (text, nullable)
- `createdAt` (timestamp)
- `updatedAt` (timestamp)

### Book
- `id` (Primary Key)
- `title` (varchar 200)
- `author_id` (Foreign Key → Author)
- `description` (text, nullable)
- `published_year` (integer, nullable)
- `created_at` (timestamp)
- `updated_at` (timestamp)

## License

UNLICENSED
