# Data Model: User Authentication System

## User Entity

### Fields
- **id**: UUID (Primary Key)
  - Type: UUID
  - Constraints: Primary Key, Not Null, Default: gen_random_uuid()
  - Description: Unique identifier for the user

- **email**: String (Unique)
  - Type: VARCHAR(255)
  - Constraints: Not Null, Unique, Valid Email Format
  - Description: User's email address for login

- **password_hash**: String
  - Type: VARCHAR(255)
  - Constraints: Not Null
  - Description: Bcrypt hash of the user's password

- **hardware_exp**: String
  - Type: VARCHAR(50)
  - Constraints: Nullable
  - Description: User's experience level with hardware (beginner, intermediate, advanced, none)

- **software_exp**: String
  - Type: VARCHAR(50)
  - Constraints: Nullable
  - Description: User's experience level with software (beginner, intermediate, advanced, none)

- **robotics_level**: Enum
  - Type: VARCHAR(20)
  - Constraints: Not Null, Check: 'beginner' | 'intermediate' | 'advanced'
  - Description: User's robotics skill level

- **goals**: Text
  - Type: TEXT
  - Constraints: Nullable
  - Description: User's learning goals and objectives

- **created_at**: Timestamp
  - Type: TIMESTAMP
  - Constraints: Not Null, Default: CURRENT_TIMESTAMP
  - Description: Timestamp when the user account was created

### Validation Rules
- Email must be a valid email format
- Password must meet minimum strength requirements (8+ characters)
- robotics_level must be one of: 'beginner', 'intermediate', 'advanced'
- Email must be unique across all users

## Session Entity

### Fields
- **id**: UUID (Primary Key)
  - Type: UUID
  - Constraints: Primary Key, Not Null, Default: gen_random_uuid()
  - Description: Unique identifier for the session

- **user_id**: UUID (Foreign Key)
  - Type: UUID
  - Constraints: Not Null, Foreign Key to users(id)
  - Description: Reference to the user who owns this session

- **token**: String (Unique)
  - Type: VARCHAR(512)
  - Constraints: Not Null, Unique
  - Description: JWT token string

- **expires_at**: Timestamp
  - Type: TIMESTAMP
  - Constraints: Not Null
  - Description: Expiration time for the session token

- **created_at**: Timestamp
  - Type: TIMESTAMP
  - Constraints: Not Null, Default: CURRENT_TIMESTAMP
  - Description: Timestamp when the session was created

### Validation Rules
- Session token must be unique
- expires_at must be in the future
- user_id must reference an existing user
- Session should be automatically cleaned up when expired

## Relationships
- User (1) → Session (Many): One user can have multiple active sessions
- Session (Many) → User (1): Each session belongs to exactly one user

## State Transitions
- User Registration: New user record created with provided information
- Login: New session record created with JWT token
- Logout: Session record deleted (token invalidated)
- Profile Update: User record updated with new profile information
- Session Expiration: Session record automatically removed when expires_at is reached