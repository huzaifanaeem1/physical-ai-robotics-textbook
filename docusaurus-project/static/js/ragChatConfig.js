// RAG Chatbot Configuration
// This file sets up environment-specific configuration for the chat widget

// Define the backend URL based on the environment
(function() {
  // Default configuration
  window.RAG_CHAT_CONFIG = window.RAG_CHAT_CONFIG || {};

  // Determine the backend URL based on the current environment
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    // Local development environment
    window.RAG_CHAT_CONFIG.backendUrl = 'http://localhost:8000/api';
  } else {
    // Production environment - update this with your actual production backend URL
    // This should be configured in your deployment settings
    window.RAG_CHAT_CONFIG.backendUrl = 'https://huzaifanaeem1-robotics-rag-backend.hf.space/api';
  }
})();