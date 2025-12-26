# Quickstart Guide: User Authentication Implementation

## Prerequisites
- Python 3.9+
- Node.js 18+
- PostgreSQL database (Neon recommended)
- Git

## Setup Steps

### 1. Clone and Navigate to Repository
```bash
git clone <repository-url>
cd <repository-name>
```

### 2. Backend Setup
```bash
# Navigate to backend directory
cd rag_backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Install additional auth dependencies
pip install python-jose[cryptography] passlib[bcrypt] python-multipart
pip install alembic

# Set up environment variables
cp .env.example .env
# Edit .env with your database URL and JWT secret
```

### 3. Database Setup
```bash
# Run database migrations
alembic upgrade head
```

### 4. Frontend Setup
```bash
# Navigate to frontend directory
cd docusaurus-project

# Install dependencies
npm install
```

### 5. Environment Configuration
Create/update environment files:

**Backend (.env)**:
```env
DATABASE_URL=postgresql://username:password@neon-host.region.neon.tech/dbname
JWT_SECRET=your-super-secret-jwt-key-here
BCRYPT_ROUNDS=12
ACCESS_TOKEN_EXPIRE_MINUTES=1440
```

### 6. Run Development Servers
```bash
# Terminal 1: Start backend
cd rag_backend
uvicorn main:app --reload

# Terminal 2: Start frontend
cd docusaurus-project
npm run start
```

## Key Endpoints

### Authentication
- `POST /api/auth/signup` - Create new user account
- `POST /api/auth/login` - Authenticate user
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Enhanced RAG
- `POST /api/ask` - Ask question with optional user context

## Testing the Implementation

### Manual Testing
1. Visit http://localhost:3000/auth/signup to create an account
2. Use http://localhost:3000/auth/login to log in
3. Test the chatbot functionality with and without authentication

### API Testing
```bash
# Test signup
curl -X POST http://localhost:8000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "securePassword123",
    "hardware_exp": "beginner",
    "software_exp": "intermediate",
    "robotics_level": "beginner",
    "goals": "Learn ROS2 fundamentals"
  }'

# Test login
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "securePassword123"
  }'
```

## Architecture Overview

```
Frontend (Docusaurus)
├── /auth/signup - Registration page
├── /auth/login - Login page
├── useAuth() hook - Authentication state management
└── RAG chat widget - Enhanced with auth support

Backend (FastAPI)
├── auth/ - Authentication module
│   ├── models.py - User and Session models
│   ├── routes.py - Auth endpoints
│   ├── security.py - JWT and hashing utilities
│   └── middleware.py - Auth validation
├── utils/personalization.py - User context injection
└── existing RAG endpoints - Enhanced with user context
```

## Common Issues and Solutions

### Database Connection Issues
- Verify DATABASE_URL is correctly formatted
- Ensure PostgreSQL service is running
- Check firewall settings allow database connections

### JWT Token Issues
- Confirm JWT_SECRET is set in environment
- Check token expiration settings
- Verify token format in Authorization header

### Frontend Integration Issues
- Ensure localStorage is properly handling tokens
- Verify Authorization header is included in API calls
- Check CORS settings if developing across different ports