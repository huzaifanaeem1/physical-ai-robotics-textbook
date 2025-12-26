# Implementation Plan: User Authentication + Personalized Learning System

**Feature**: 005-user-auth
**Created**: 2025-12-12
**Status**: Draft
**Input**: Create a full implementation plan for the feature "User Authentication + Personalized Learning System".

## Technical Context

### Architecture Overview
The system will implement a user authentication and personalization layer for the robotics textbook platform. The architecture follows a microservices approach with:
- Frontend: Docusaurus-based documentation site with authentication pages
- Backend: Python-based API service using FastAPI for authentication and user management
- Database: PostgreSQL for user data storage
- Integration: RAG chatbot personalization using user profile data

### Technology Stack
- **Frontend**: React components in Docusaurus, using React hooks for state management
- **Backend**: Python with FastAPI, using better-auth for authentication
- **Database**: PostgreSQL (Neon) with Alembic for migrations
- **Security**: JWT tokens, bcrypt for password hashing
- **Deployment**: Hugging Face Spaces for backend, Vercel for frontend

### Unknowns (NEEDS CLARIFICATION)
- [NEEDS CLARIFICATION: How will the existing RAG backend be modified to support authentication?]
- [NEEDS CLARIFICATION: What specific PostgreSQL connection details for Neon?]
- [NEEDS CLARIFICATION: How should the existing RAG system be integrated with the new authentication system?]

## Constitution Check

### Alignment with Core Principles
- **Technical accuracy**: Following established authentication patterns (JWT, bcrypt hashing)
- **Educational clarity**: User experience designed for beginner-to-intermediate students
- **Structured pedagogical flow**: Authentication adds to the learning experience without disrupting content flow
- **Consistency**: Will maintain Docusaurus formatting and styling conventions
- **AI-native workflow**: Following Spec-Kit standards for development

### Potential Violations
- The constitution mentions "no chatbot, authentication, personalization, or translation features at this stage" in line 61, but this feature explicitly adds authentication and personalization. This suggests the constitution may need updating to reflect the evolved scope of the project, which now includes these features as evidenced by the feature specification being approved.

## Gates

### Gate 1: Technical Feasibility
- ✅ Authentication can be implemented with better-auth and PostgreSQL
- ✅ Integration with existing RAG system is technically possible
- ✅ Docusaurus supports custom React components for auth pages

### Gate 2: Security Compliance
- ✅ Password hashing with bcrypt
- ✅ JWT token security measures
- ✅ Input validation and sanitization
- ✅ Session management best practices

### Gate 3: Performance Requirements
- ✅ PostgreSQL can handle expected user load
- ✅ JWT token validation is efficient
- ✅ Personalization logic won't significantly impact response times

## Phase 0: Research & Resolution of Unknowns

### Research Findings

#### RAG Backend Integration
The existing RAG backend in `rag_backend/` will need to be extended to support authentication. The `/api/ask`, `/api/ask-selected`, and `/api/history/{session_id}` endpoints will require middleware to validate JWT tokens and fetch user profiles for personalization.

#### PostgreSQL Connection Details
Using Neon PostgreSQL service with environment variables for connection details:
- `DATABASE_URL`: Connection string for PostgreSQL database
- Connection pooling and SSL settings as per Neon recommendations

#### RAG System Integration
The existing RAG system will be enhanced with:
- Authentication middleware to validate tokens
- User profile fetching for personalization
- Context injection with user background information

## Phase 1: Data Model & Contracts

### Data Model (data-model.md)

#### User Entity
- **id**: UUID (Primary Key, default: gen_random_uuid())
- **email**: String (Unique, Not Null, Validated as email format)
- **password_hash**: String (Not Null, bcrypt hashed)
- **hardware_exp**: String (Optional, e.g., "beginner", "intermediate", "advanced", "none")
- **software_exp**: String (Optional, e.g., "beginner", "intermediate", "advanced", "none")
- **robotics_level**: Enum (Required, values: "beginner", "intermediate", "advanced")
- **goals**: Text (Optional, user's learning objectives)
- **created_at**: Timestamp (Default: current timestamp)

#### Session Entity
- **id**: UUID (Primary Key, default: gen_random_uuid())
- **user_id**: UUID (Foreign Key to User, Not Null)
- **token**: String (JWT token, Not Null, Unique)
- **expires_at**: Timestamp (Not Null)
- **created_at**: Timestamp (Default: current timestamp)

### API Contracts

#### Authentication Endpoints

**POST /api/auth/signup**
- Request:
  ```json
  {
    "email": "user@example.com",
    "password": "securePassword123",
    "hardware_exp": "beginner",
    "software_exp": "intermediate",
    "robotics_level": "beginner",
    "goals": "Learn ROS2 fundamentals"
  }
  ```
- Response (201):
  ```json
  {
    "user_id": "uuid-string",
    "email": "user@example.com",
    "token": "jwt-token-string"
  }
  ```
- Error Response (400): Validation errors
- Error Response (409): Email already exists

**POST /api/auth/login**
- Request:
  ```json
  {
    "email": "user@example.com",
    "password": "securePassword123"
  }
  ```
- Response (200):
  ```json
  {
    "user_id": "uuid-string",
    "email": "user@example.com",
    "token": "jwt-token-string"
  }
  ```
- Error Response (401): Invalid credentials

**GET /api/auth/profile**
- Headers: Authorization: Bearer {token}
- Response (200):
  ```json
  {
    "user_id": "uuid-string",
    "email": "user@example.com",
    "hardware_exp": "beginner",
    "software_exp": "intermediate",
    "robotics_level": "beginner",
    "goals": "Learn ROS2 fundamentals"
  }
  ```
- Error Response (401): Invalid or expired token

**PUT /api/auth/profile**
- Headers: Authorization: Bearer {token}
- Request:
  ```json
  {
    "hardware_exp": "intermediate",
    "software_exp": "advanced",
    "robotics_level": "intermediate",
    "goals": "Master humanoid robotics"
  }
  ```
- Response (200): Updated profile object
- Error Response (401): Invalid or expired token

#### Personalized RAG Endpoints

**POST /api/ask (Enhanced)**
- Headers: Authorization: Bearer {token} (Optional)
- Request:
  ```json
  {
    "question": "Explain ROS2 concepts",
    "session_id": "session-uuid"
  }
  ```
- Response (200):
  ```json
  {
    "response": "Personalized response based on user profile",
    "sources": ["source1", "source2"]
  }
  ```
- Error Response (401): Invalid token (if provided)

## Phase 1: Backend Plan

### New Folders Structure
```
rag_backend/
├── auth/
│   ├── __init__.py
│   ├── models.py          # User and Session models
│   ├── schemas.py         # Pydantic schemas for auth
│   ├── database.py        # Database connection and session handling
│   ├── crud.py            # User and session CRUD operations
│   ├── security.py        # Password hashing, JWT utilities
│   ├── routes.py          # Authentication routes (signup, login, profile)
│   └── middleware.py      # Authentication middleware
├── migrations/            # Alembic migration files
├── alembic/
│   └── versions/          # Generated migration files
└── utils/
    └── personalization.py # Logic for user profile-based responses
```

### New Routes
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User authentication
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile
- Enhanced `POST /api/ask` - With user context injection
- Enhanced `POST /api/ask-selected` - With user context injection
- Enhanced `GET /api/history/{session_id}` - With user context injection

### Service Layers
1. **Authentication Service** (`auth/security.py`):
   - Password hashing with bcrypt
   - JWT token generation and validation
   - Password strength validation

2. **User Management Service** (`auth/crud.py`):
   - User creation, retrieval, update
   - Email validation and uniqueness checks
   - Profile management

3. **Session Management Service** (`auth/crud.py`):
   - Session creation and validation
   - Token expiration handling
   - Session cleanup

4. **Personalization Service** (`utils/personalization.py`):
   - User profile context injection
   - Response customization based on user level
   - Fallback logic for non-authenticated users

### Database Migrations
- **Migration 1**: Create users table with all required fields
- **Migration 2**: Create sessions table with foreign key to users
- **Migration 3**: Add indexes for performance optimization
- **Migration 4**: Set up row-level security if needed

### Security Logic
- Passwords hashed using bcrypt with 12 rounds
- JWT tokens with 24-hour expiration (configurable)
- Rate limiting on authentication endpoints
- Input validation using Pydantic models
- SQL injection prevention via SQLAlchemy ORM
- Cross-site request forgery (CSRF) protection
- Secure token storage and transmission

## Phase 1: Frontend Plan

### New Pages
- `/auth/signup` - Registration form with profile information
- `/auth/login` - Login form with email and password
- `/auth/profile` - User profile management page (stretch goal)

### React Hooks for Token Management
- `useAuth()` - Main authentication hook managing state
  - `user` - Current user object or null
  - `token` - JWT token or null
  - `loading` - Loading state
  - `login(email, password)` - Login function
  - `signup(email, password, profileData)` - Signup function
  - `logout()` - Logout function
  - `updateProfile(profileData)` - Profile update function

### UI Flow for Signup + Login
1. **Signup Flow**:
   - Landing on `/auth/signup` shows registration form
   - Form collects email, password, and profile information
   - On submit, calls `/api/auth/signup`
   - On success, stores token in localStorage and redirects to home
   - On error, displays validation messages

2. **Login Flow**:
   - Landing on `/auth/login` shows login form
   - Form collects email and password
   - On submit, calls `/api/auth/login`
   - On success, stores token in localStorage and redirects to home
   - On error, displays error message

3. **Protected Routes**:
   - Components check for valid token before rendering
   - Redirect to login if token is invalid/expired

### Chatbot Integration with JWT
- Modify existing chat widget to include Authorization header when token exists
- Update `ragChatWidget.js` to read token from localStorage
- Add user context indicator in chat interface
- Implement automatic re-authentication if token expires during chat session

## Phase 1: RAG Personalization Plan

### How User Background Modifies Prompt
1. **Profile Retrieval**: When authenticated, retrieve user profile with experience levels and goals
2. **Context Injection**: Inject user profile data into the RAG context before generating responses
3. **Response Modification**: Adjust response complexity based on robotics_level:
   - Beginner: Simplified explanations, analogies, step-by-step instructions
   - Intermediate: Technical details with some high-level explanations
   - Advanced: In-depth technical explanations, advanced concepts

### Example Prompts

**Beginner Context Injection**:
```
User Profile: Beginner in robotics, intermediate in software, learning ROS2 fundamentals
When explaining technical concepts, use simple language, provide analogies, and break down complex processes into smaller steps.
```

**Advanced Context Injection**:
```
User Profile: Advanced in robotics, advanced in software, expert in ROS2
Provide detailed technical explanations, use domain-specific terminology, and include advanced implementation details.
```

### Fallback Behavior
- If no token provided: Use default response style (intermediate level)
- If token invalid/expired: Use default response style with suggestion to log in for personalized experience
- If profile unavailable: Use default response style
- If personalization service fails: Gracefully fall back to standard RAG response

## Phase 1: Deployment Plan

### Backend on HuggingFace
- Update `rag_backend` to include authentication endpoints
- Add environment variables for:
  - `DATABASE_URL` - PostgreSQL connection string
  - `JWT_SECRET` - Secret for JWT signing
  - `BCRYPT_ROUNDS` - Bcrypt hashing rounds (default: 12)
- Update `requirements.txt` with new dependencies (better-auth equivalent, bcrypt, etc.)
- Configure Hugging Face Space to run the enhanced backend

### Frontend on Vercel
- No changes needed to deployment configuration
- Ensure frontend can handle authentication state
- Update environment variables if needed for local development

### Environment Variables Setup
**Backend (.env)**:
```
DATABASE_URL=postgresql://username:password@neon-host.region.neon.tech/dbname
JWT_SECRET=your-super-secret-jwt-key-here
BCRYPT_ROUNDS=12
ACCESS_TOKEN_EXPIRE_MINUTES=1440  # 24 hours
```

**Frontend**:
- No additional environment variables needed
- Token storage handled in browser localStorage

## Quickstart Guide

### For Development
1. Set up PostgreSQL database (Neon recommended)
2. Run database migrations: `alembic upgrade head`
3. Set environment variables
4. Install dependencies: `pip install -r requirements.txt`
5. Run backend: `uvicorn main:app --reload`
6. Run frontend: `cd docusaurus-project && npm run start`

### For Testing
1. Use Postman/Newman or curl to test auth endpoints
2. Verify token-based access to RAG endpoints
3. Test personalization with different user profiles
4. Validate security measures (password hashing, token expiration)

## Agent Context Update

The following technologies have been added to the agent's context:
- Better-auth authentication patterns
- JWT token management
- PostgreSQL with Alembic migrations
- Password hashing with bcrypt
- User profile-based personalization
- RAG system enhancement with user context

## Re-evaluated Constitution Check

After implementing this feature, the constitution should be updated to reflect that authentication and personalization features are now part of the project scope, as evidenced by the approved feature specification and implementation plan.