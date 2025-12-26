# Authentication System Documentation

This document describes the complete authentication system implemented for the Robotics Textbook Docusaurus project.

## Overview

The authentication system provides:
- User registration and login
- Profile management
- Personalized learning experiences
- Integration with the RAG chatbot
- Beautiful, modern UI components

## Architecture

### Frontend Components

1. **Auth Context** (`src/contexts/AuthContext.jsx`)
   - React context for managing authentication state
   - Provides `useAuth()` hook
   - Handles JWT token storage in localStorage

2. **Auth Pages**
   - `src/pages/auth/signup.jsx` - User registration
   - `src/pages/auth/login.jsx` - User login
   - `src/pages/auth/profile.jsx` - Profile management

3. **Modal Component** (`src/components/auth/Modal.jsx`)
   - Popup modal for first-time visitors
   - Appears automatically on first visit
   - Provides signup/login options

4. **Navigation Component** (`src/theme/NavbarItem/CustomAuthNavigation.js`)
   - Custom navbar item that shows login/logout options
   - Dynamically updates based on auth state

### Backend Integration

The system integrates with the existing backend API:
- `/api/auth/signup` - User registration
- `/api/auth/login` - User authentication
- `/api/auth/profile` - Profile management

### RAG Chatbot Integration

The chatbot widget (`static/js/ragChatWidget.js`) automatically:
- Includes JWT tokens in API requests
- Personalizes responses based on user profile
- Shows personalized status indicator

## Features

### Modern UI/UX
- Beautiful, responsive design with Tailwind-like styling
- Form validation with real-time feedback
- Error and success state handling
- Hover animations and interactive elements

### Security
- JWT token-based authentication
- Secure password handling
- Proper session management

### Personalization
- User background collection (hardware, software, robotics level)
- Adaptive learning experience based on user profile
- Goal tracking and personalization

## API Integration

All API calls use the backend URL configured in `ragChatConfig.js`:
- Authentication endpoints: `${BACKEND_URL}/api/auth/...`
- RAG endpoints: `${BACKEND_URL}/api/...`

## File Structure

```
docusaurus-project/
├── src/
│   ├── contexts/
│   │   └── AuthContext.jsx          # Authentication context
│   ├── components/
│   │   └── auth/
│   │       └── Modal.jsx            # Popup modal
│   ├── pages/
│   │   └── auth/
│   │       ├── signup.jsx           # Signup page
│   │       ├── login.jsx            # Login page
│   │       └── profile.jsx          # Profile page
│   ├── theme/
│   │   ├── Root.js                  # Auth provider wrapper
│   │   └── NavbarItem/
│   │       └── CustomAuthNavigation.js # Navbar auth links
│   └── css/
│       └── auth.css                 # Authentication styles
└── static/
    └── js/
        └── ragChatWidget.js         # Updated chat widget with auth
```

## Environment Configuration

The system uses the backend URL configured in `ragChatConfig.js`:
```javascript
window.RAG_CHAT_CONFIG = {
  backendUrl: 'http://localhost:8000/api'  // or your production URL
};
```

## Usage

### For Developers
1. The auth context is available globally through `useAuth()`
2. All pages have access to authentication state
3. Forms are fully controlled with validation
4. API calls automatically include authorization headers

### For Users
1. First-time visitors see a popup modal
2. Users can sign up with their background information
3. Login provides personalized learning experience
4. Profile can be updated at any time