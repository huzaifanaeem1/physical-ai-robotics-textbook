# Data Model: Integrated RAG Chatbot for Physical AI & Humanoid Robotics Textbook

## Entity: Chat Session
**Description**: Represents a user's conversation session with the chatbot

**Fields**:
- `session_id` (string, primary key): Unique identifier for the session
- `created_at` (timestamp): When the session was created
- `updated_at` (timestamp): When the session was last updated
- `user_id` (string, optional): Anonymous user identifier (if available)
- `metadata` (JSON): Additional session information (preferences, mode, etc.)

**Validation rules**:
- `session_id` must be unique and follow UUID format
- `created_at` must be in the past
- `updated_at` must be >= `created_at`

## Entity: Message
**Description**: Represents a single message in a conversation

**Fields**:
- `message_id` (string, primary key): Unique identifier for the message
- `session_id` (string, foreign key): Reference to the parent session
- `sender` (enum): Either "user" or "assistant"
- `content` (text): The actual message content
- `timestamp` (timestamp): When the message was created
- `citations` (JSON array): List of source citations for assistant responses
- `mode` (enum): Either "global" or "selection" indicating the chat mode

**Validation rules**:
- `session_id` must reference an existing session
- `sender` must be either "user" or "assistant"
- `content` must not be empty
- `citations` must be a valid array of citation objects when sender is "assistant"

## Entity: Textbook Content Chunk
**Description**: Represents a segment of textbook content stored in the vector database

**Fields**:
- `chunk_id` (string, primary key): Unique identifier for the chunk
- `document_id` (string): Identifier for the original document
- `content` (text): The actual text content of the chunk
- `module` (string): Module identifier (e.g., "module-1-ros2")
- `chapter` (string): Chapter identifier
- `section` (string): Section heading
- `url` (string): URL to the original location in the textbook
- `embedding` (vector): Vector embedding for similarity search
- `metadata` (JSON): Additional metadata (word count, token count, etc.)

**Validation rules**:
- `document_id` must be unique per document
- `content` must not be empty
- `embedding` must be a valid vector of the correct dimension
- `url` must be a valid relative URL to the textbook

## Entity: User Interaction
**Description**: Represents user actions and feedback

**Fields**:
- `interaction_id` (string, primary key): Unique identifier for the interaction
- `session_id` (string, foreign key): Reference to the associated session
- `message_id` (string, foreign key): Reference to the associated message (optional)
- `type` (enum): Type of interaction ("question", "feedback", "citation_click", etc.)
- `value` (string): The value of the interaction (e.g., "positive", "negative", URL clicked)
- `timestamp` (timestamp): When the interaction occurred
- `metadata` (JSON): Additional context about the interaction

**Validation rules**:
- `session_id` must reference an existing session
- `message_id` must reference an existing message if provided
- `type` must be a valid interaction type
- `value` must be appropriate for the interaction type

## State Transitions

### Chat Session
- **Active**: Session is currently in progress
- **Inactive**: Session has no activity for a specified period
- **Completed**: Session has reached a natural conclusion

### Message
- **Pending**: Message is being processed by the backend
- **Ready**: Message is fully processed and ready for display
- **Cited**: Message includes proper source citations (for assistant responses)

## Relationships

- **Chat Session** (1) → (Many) **Message**: A session contains multiple messages
- **Message** (Many) → (1) **Chat Session**: A message belongs to one session
- **User Interaction** (Many) → (1) **Chat Session**: Multiple interactions can occur in a session
- **User Interaction** (Many) → (0 or 1) **Message**: An interaction may be associated with a specific message