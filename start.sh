#!/bin/bash

# BookClub Quick Start Script
# This script helps you quickly start the BookClub application

echo "╔══════════════════════════════════════╗"
echo "║   BookClub Application Starter       ║"
echo "╚══════════════════════════════════════╝"
echo ""

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Error: Docker is not running!"
    echo "Please start Docker Desktop and try again."
    exit 1
fi

echo "✅ Docker is running"
echo ""

# Ask user for environment
echo "Select environment:"
echo "1) Development (with hot-reload)"
echo "2) Production (optimized build)"
echo ""
read -p "Enter your choice (1 or 2): " choice

case $choice in
    1)
        echo ""
        echo "🚀 Starting DEVELOPMENT environment..."
        echo ""

        # Check if .env.dev exists
        if [ ! -f ".env.dev" ]; then
            echo "⚠️  Warning: .env.dev not found!"
            echo "Creating default .env.dev file..."
            cat > .env.dev << EOF
# Development Environment Variables
POSTGRES_DB=bookclub_dev
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
BACKEND_PORT=3004
FRONTEND_PORT=3000
VITE_API_URL=http://localhost:3004
EOF
            echo "✅ Created .env.dev with default values"
        fi

        docker-compose -f docker-compose.dev.yml --env-file .env.dev up -d

        echo ""
        echo "✨ Development environment is starting..."
        echo ""
        echo "📱 Access your application at:"
        echo "   Frontend:  http://localhost:3000"
        echo "   Backend:   http://localhost:3004"
        echo "   Database:  localhost:5432"
        echo ""
        echo "📋 Useful commands:"
        echo "   View logs:    docker-compose -f docker-compose.dev.yml logs -f"
        echo "   Stop:         docker-compose -f docker-compose.dev.yml down"
        echo "   Or use:       make dev-logs / make dev-down"
        echo ""
        ;;

    2)
        echo ""
        echo "🚀 Starting PRODUCTION environment..."
        echo ""

        # Check if .env.prod exists
        if [ ! -f ".env.prod" ]; then
            echo "❌ Error: .env.prod not found!"
            echo ""
            echo "Please create .env.prod from .env.prod.example:"
            echo "   cp .env.prod.example .env.prod"
            echo "   nano .env.prod  # Edit with your production values"
            echo ""
            exit 1
        fi

        docker-compose -f docker-compose.prod.yml --env-file .env.prod up -d --build

        echo ""
        echo "✨ Production environment is starting..."
        echo ""
        echo "📱 Access your application at:"
        echo "   Frontend:  http://localhost:80"
        echo "   Backend:   http://localhost:3004"
        echo ""
        echo "📋 Useful commands:"
        echo "   View logs:    docker-compose -f docker-compose.prod.yml logs -f"
        echo "   Stop:         docker-compose -f docker-compose.prod.yml down"
        echo "   Or use:       make prod-logs / make prod-down"
        echo ""
        ;;

    *)
        echo "❌ Invalid choice. Please run the script again and select 1 or 2."
        exit 1
        ;;
esac

echo "💡 Tip: Run 'make help' to see all available commands"
echo ""
