# Quickstart Guide: Integrated RAG Chatbot for Physical AI & Humanoid Robotics Textbook

## Overview
This guide provides a quick setup and validation process for the RAG Chatbot system. The system consists of a FastAPI backend that handles RAG processing and a Docusaurus frontend widget that integrates with the textbook site.

## Prerequisites
- Python 3.11+ installed
- Node.js 18+ installed
- Access to OpenAI API key
- Access to Qdrant Cloud instance
- Access to Neon Postgres database

## Backend Setup

### 1. Environment Configuration
```bash
# Create backend directory structure
mkdir -p backend/{src,tests}
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install fastapi uvicorn openai qdrant-client psycopg2-binary python-dotenv
```

### 2. Environment Variables
Create `.env` file in backend root:
```env
OPENAI_API_KEY=your_openai_api_key
QDRANT_URL=your_qdrant_cloud_url
QDRANT_API_KEY=your_qdrant_api_key
DATABASE_URL=postgresql://user:password@neon_instance.neon.tech/db_name
```

### 3. Initialize Qdrant Collection
```python
# Initialize the textbook content collection in Qdrant
from qdrant_client import QdrantClient
from qdrant_client.http.models import Distance, VectorParams

client = QdrantClient(url=QDRANT_URL, api_key=QDRANT_API_KEY)
client.recreate_collection(
    collection_name="textbook_content",
    vectors_config=VectorParams(size=1536, distance=Distance.COSINE)  # OpenAI embedding size
)
```

### 4. Initialize Database Tables
```sql
-- Create sessions table
CREATE TABLE chat_sessions (
    session_id VARCHAR(255) PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id VARCHAR(255),
    metadata JSONB
);

-- Create messages table
CREATE TABLE messages (
    message_id VARCHAR(255) PRIMARY KEY,
    session_id VARCHAR(255) REFERENCES chat_sessions(session_id),
    sender VARCHAR(10) CHECK (sender IN ('user', 'assistant')),
    content TEXT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    citations JSONB,
    mode VARCHAR(20) CHECK (mode IN ('global', 'selection'))
);
```

## Frontend Integration

### 1. Install Chat Widget
Add the chat widget to your Docusaurus site by including the following in your `docusaurus.config.js`:

```js
// Add to plugins array in docusaurus.config.js
plugins: [
  // ... other plugins
  [
    '@docusaurus/plugin-content-docs',
    {
      id: 'chatbot',
      path: 'chatbot',
      routeBasePath: 'chatbot',
    },
  ],
],
```

### 2. Add Widget Component
Include the chat widget in your layout by adding this script to your `src/pages/index.js` or layout component:

```jsx
import ChatWidget from '../components/ChatWidget';

// In your component render
return (
  <Layout>
    {/* Your existing content */}
    <ChatWidget backendUrl="https://your-backend-api.com" />
  </Layout>
);
```

## API Endpoints

### Global Chat
```
POST /chat/global
Content-Type: application/json

{
  "question": "What are the key components of ROS 2?",
  "session_id": "unique-session-id"
}
```

### Selection-Based Chat
```
POST /chat/selection
Content-Type: application/json

{
  "question": "Explain this concept further",
  "selected_text": "The Robot Operating System (ROS) is a flexible framework for writing robot software...",
  "session_id": "unique-session-id"
}
```

### Get Conversation History
```
GET /history/{session_id}
```

## Validation Steps

### 1. Backend Health Check
```bash
curl http://localhost:8000/health
# Should return: {"status": "healthy"}
```

### 2. Test Chat Endpoint
```bash
curl -X POST http://localhost:8000/chat/global \
  -H "Content-Type: application/json" \
  -d '{
    "question": "What is ROS 2?",
    "session_id": "test-session-123"
  }'
```

### 3. Verify Database Connection
```bash
# Check if a session was created
psql $DATABASE_URL -c "SELECT * FROM chat_sessions LIMIT 1;"
```

### 4. Verify Vector Database
```bash
# Check if textbook content was indexed
# This would depend on your specific Qdrant setup
```

## Running the System

### Backend
```bash
cd backend
source venv/bin/activate  # On Windows: venv\Scripts\activate
uvicorn src.api.main:app --reload --port 8000
```

### Frontend
```bash
cd docusaurus-project
npm start
```

## Expected Output
- Backend server running on http://localhost:8000
- Docusaurus site with chat widget on http://localhost:3000
- Chat widget appears on all textbook pages
- Questions return cited responses within 5 seconds
- Conversation history persists across page reloads

## Troubleshooting

### Common Issues
1. **API Connection Errors**: Verify environment variables and network connectivity
2. **Slow Response Times**: Check OpenAI and Qdrant API response times
3. **Citation Errors**: Verify that textbook content was properly indexed in Qdrant

### Quick Fixes
- Ensure all environment variables are set correctly
- Verify database connection strings are valid
- Confirm Qdrant collection exists and is populated with textbook content