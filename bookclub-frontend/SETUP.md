# Quick Setup Guide

## Step 1: Configure Environment

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Update the API URL if your backend is running on a different port:

```env
VITE_API_URL=http://localhost:5000/api
```

## Step 2: Start Development Server

```bash
npm run dev
```

The app will be available at: **http://localhost:3000**

## Step 3: Verify Backend Connection

Make sure your backend API is running on the configured port (default: http://localhost:5000)

## Step 4: Start Using the App

1. Navigate to **Authors** to add your first author
2. Then go to **Books** to add books linked to your authors
3. Explore the detail pages and try editing/deleting items

## Troubleshooting

### CORS Errors
If you see CORS errors, make sure your backend allows requests from `http://localhost:3000`

### API Connection Failed
- Verify the backend is running
- Check the `VITE_API_URL` in your `.env` file
- Ensure the backend port matches the configuration

### Port Already in Use
If port 3000 is in use, Vite will prompt you to use another port. Just press 'y' to accept.

## Production Build

To create a production build:

```bash
npm run build
npm run preview
```

The build will be in the `dist/` directory.
