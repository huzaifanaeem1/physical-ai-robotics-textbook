// RAG Chatbot Widget for Docusaurus
class RAGChatWidget {
  constructor() {
    this.isOpen = false;
    this.sessionId = localStorage.getItem('rag_chat_session_id') || this.generateSessionId();
    localStorage.setItem('rag_chat_session_id', this.sessionId);
    // Get backend URL from configuration (set in ragChatConfig.js)
    this.backendUrl = window.RAG_CHAT_CONFIG?.backendUrl || 'http://localhost:8000/api';
    this.currentSelectedText = ''; // Store the currently selected text
    this.init();
  }

  generateSessionId() {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  init() {
    this.createWidget();
    this.setupEventListeners();
  }

  createWidget() {
    // Create the chat button
    const chatButton = document.createElement('div');
    chatButton.id = 'rag-chat-button';
    chatButton.innerHTML = '💬';
    chatButton.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: #1b6cf5;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 1000;
      transition: all 0.3s ease;
    `;

    // Create the chat panel
    const chatPanel = document.createElement('div');
    chatPanel.id = 'rag-chat-panel';
    chatPanel.style.cssText = `
      position: fixed;
      bottom: 90px;
      right: 20px;
      width: 380px;
      height: 500px;
      background: white;
      border-radius: 12px;
      box-shadow: 0 8px 30px rgba(0,0,0,0.12);
      display: none;
      flex-direction: column;
      z-index: 1000;
      overflow: hidden;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    `;

    chatPanel.innerHTML = `
      <div id="rag-chat-header" style="
        padding: 16px;
        background: #1b6cf5;
        color: white;
        display: flex;
        justify-content: space-between;
        align-items: center;
      ">
        <div style="display: flex; align-items: center; gap: 8px;">
          <h3 style="margin: 0; font-size: 16px;">Textbook Assistant</h3>
        </div>
        <button id="rag-close-btn" style="
          background: none;
          border: none;
          color: white;
          font-size: 18px;
          cursor: pointer;
          padding: 4px;
        ">&times;</button>
      </div>

      <div id="rag-chat-messages" style="
        flex: 1;
        padding: 16px;
        overflow-y: auto;
        background: #f9f9f9;
      "></div>

      <div id="rag-chat-input-area" style="
        padding: 12px;
        border-top: 1px solid #eee;
        background: white;
      ">
        <div style="display: flex; margin-bottom: 8px;">
          <button id="rag-mode-global" class="rag-mode-btn active" style="
            flex: 1;
            padding: 8px 6px;
            border: 2px solid #e1e5e9;
            background: #f8f9fa;
            border-right: 1px solid #e1e5e9;
            border-radius: 6px 0 0 6px;
            cursor: pointer;
            font-size: 13px;
            font-weight: 500;
            color: #495057;
            transition: all 0.2s ease;
          ">Global Q&A</button>
          <button id="rag-mode-selected" class="rag-mode-btn" style="
            flex: 1;
            padding: 8px 6px;
            border: 2px solid #e1e5e9;
            background: white;
            border-radius: 0 6px 6px 0;
            cursor: pointer;
            font-size: 13px;
            font-weight: 500;
            color: #495057;
            transition: all 0.2s ease;
          ">Ask Selected</button>
        </div>

        <div id="rag-selection-instruction" style="
          margin-bottom: 8px;
          padding: 8px;
          background: #e7f3ff;
          border-radius: 6px;
          font-size: 12px;
          color: #0066cc;
          display: block;
          text-align: center;
          border-left: 3px solid #0066cc;
          font-weight: 500;
        ">
          📝 Select text on the page first, then ask your question
        </div>

        <div style="display: flex;">
          <textarea
            id="rag-user-input"
            placeholder="Ask a question about the textbook..."
            style="
              flex: 1;
              padding: 12px;
              border: 2px solid #e1e5e9;
              border-right: 1px solid #e1e5e9;
              border-radius: 8px 0 0 8px;
              resize: none;
              height: 60px;
              font-size: 14px;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              transition: border-color 0.2s ease;
            "></textarea>
          <button
            id="rag-send-btn"
            style="
              padding: 12px 16px;
              border: 2px solid #1b6cf5;
              border-left: 1px solid #1b6cf5;
              border-radius: 0 8px 8px 0;
              background: #1b6cf5;
              color: white;
              cursor: pointer;
              font-weight: 500;
              transition: all 0.2s ease;
            ">Send</button>
        </div>

        <div id="rag-selection-indicator" style="
          margin-top: 8px;
          padding: 8px;
          background: #e6f7ff;
          border-radius: 6px;
          font-size: 12px;
          color: #0066cc;
          display: none;
          text-align: center;
          font-weight: 500;
          border: 1px solid #91d5ff;
        ">
          🎯 Answering from selected text
        </div>

        <div id="rag-selected-text-preview" style="
          margin-top: 8px;
          padding: 10px;
          background: #f0f8ff;
          border-radius: 8px;
          font-size: 13px;
          display: none;
          border: 1px solid #c2e0ff;
        ">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
            <strong style="color: #0066cc; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Selected Text:</strong>
            <button id="rag-clear-selection" style="
              background: #e6f0ff;
              border: 1px solid #b3d1ff;
              color: #0066cc;
              cursor: pointer;
              font-size: 14px;
              width: 24px;
              height: 24px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 0;
              margin-left: 8px;
              transition: all 0.2s ease;
            " title="Clear selection">×</button>
          </div>
          <div id="rag-selected-text-content" style="
            line-height: 1.4;
            color: #333;
            max-height: 80px;
            overflow-y: auto;
            padding-right: 4px;
          "></div>
        </div>
      </div>
    `;

    document.body.appendChild(chatButton);
    document.body.appendChild(chatPanel);
  }

  setupEventListeners() {
    // Chat button click
    document.getElementById('rag-chat-button').addEventListener('click', () => {
      this.toggleChat();
    });

    // Close button click
    document.getElementById('rag-close-btn').addEventListener('click', () => {
      this.closeChat();
    });

    // Send button click
    document.getElementById('rag-send-btn').addEventListener('click', () => {
      this.sendMessage();
    });

    // Enter key in textarea (with Shift for new line)
    document.getElementById('rag-user-input').addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.sendMessage();
      }
    });

    // Mode switching
    document.getElementById('rag-mode-global').addEventListener('click', () => {
      this.switchMode('global');
      // When switching to global mode, clear the stored selected text
      this.currentSelectedText = '';
    });
    document.getElementById('rag-mode-selected').addEventListener('click', () => {
      this.switchMode('selected');
    });

    // Text selection detection
    document.addEventListener('mouseup', () => {
      this.handleTextSelection();
    });

    // Clear selection button
    document.getElementById('rag-clear-selection').addEventListener('click', () => {
      this.clearSelection();
    });
  }

  toggleChat() {
    const panel = document.getElementById('rag-chat-panel');
    if (this.isOpen) {
      panel.style.display = 'none';
    } else {
      panel.style.display = 'flex';
      panel.style.flexDirection = 'column';
      // Load conversation history
      this.loadHistory();
    }
    this.isOpen = !this.isOpen;
  }

  closeChat() {
    document.getElementById('rag-chat-panel').style.display = 'none';
    this.isOpen = false;
  }

  clearSelection() {
    // Clear the stored selected text
    this.currentSelectedText = '';

    // Clear the preview content
    document.getElementById('rag-selected-text-content').textContent = '';

    // Hide the preview and indicator
    document.getElementById('rag-selected-text-preview').style.display = 'none';
    document.getElementById('rag-selection-indicator').style.display = 'none';

    // Switch to global mode
    this.switchMode('global');
  }

  switchMode(mode) {
    // Update button states
    const globalBtn = document.getElementById('rag-mode-global');
    const selectedBtn = document.getElementById('rag-mode-selected');
    const indicator = document.getElementById('rag-selection-indicator');
    const instruction = document.getElementById('rag-selection-instruction');

    if (mode === 'global') {
      globalBtn.classList.add('active');
      selectedBtn.classList.remove('active');
      // Hide the preview, indicator, and show instruction for global mode
      document.getElementById('rag-selected-text-preview').style.display = 'none';
      indicator.style.display = 'none';
      instruction.style.display = 'block';
    } else {
      globalBtn.classList.remove('active');
      selectedBtn.classList.add('active');
      // Show the preview and indicator if we have selected text
      if (this.currentSelectedText) {
        document.getElementById('rag-selected-text-preview').style.display = 'block';
        indicator.style.display = 'block';
        instruction.style.display = 'none';
      } else {
        // If we're switching to selected mode but don't have stored text,
        // check if there's currently selected text on the page
        const currentlySelectedText = window.getSelection().toString().trim();
        if (currentlySelectedText) {
          this.currentSelectedText = currentlySelectedText;
          document.getElementById('rag-selected-text-content').textContent =
            currentlySelectedText.length > 100 ? currentlySelectedText.substring(0, 100) + '...' : currentlySelectedText;
          document.getElementById('rag-selected-text-preview').style.display = 'block';
          indicator.style.display = 'block';
          instruction.style.display = 'none';
        } else {
          // Show instruction to select text when in selected mode but no text is selected
          instruction.style.display = 'block';
        }
      }
    }
  }

  getCurrentMode() {
    return document.getElementById('rag-mode-global').classList.contains('active') ? 'global' : 'selected';
  }

  handleTextSelection() {
    const selectedText = window.getSelection().toString().trim();
    const previewDiv = document.getElementById('rag-selected-text-preview');
    const indicator = document.getElementById('rag-selection-indicator');
    const instruction = document.getElementById('rag-selection-instruction');

    if (selectedText && selectedText.length > 0) {
      // Store the selected text to use when sending the message
      this.currentSelectedText = selectedText;

      // Show the selected text preview
      document.getElementById('rag-selected-text-content').textContent =
        selectedText.length > 100 ? selectedText.substring(0, 100) + '...' : selectedText;
      previewDiv.style.display = 'block';

      // Switch to selected mode if not already
      if (!document.getElementById('rag-mode-selected').classList.contains('active')) {
        this.switchMode('selected');
      } else {
        // If already in selected mode, just show the indicator and hide instruction
        indicator.style.display = 'block';
        instruction.style.display = 'none';
      }
    } else {
      // Clear the stored selected text when no text is selected
      this.currentSelectedText = '';

      // Only hide the preview and indicator if we're in global mode, to allow users to keep selected mode active
      if (this.getCurrentMode() === 'global') {
        previewDiv.style.display = 'none';
        indicator.style.display = 'none';
        instruction.style.display = 'block'; // Show instruction in global mode
      } else {
        // In selected mode with no text selected, show instruction
        instruction.style.display = 'block';
      }
    }
  }

  async sendMessage() {
    const input = document.getElementById('rag-user-input');
    const message = input.value.trim();

    if (!message) return;

    // Get selected text if in selected mode
    let selectedText = '';
    if (this.getCurrentMode() === 'selected') {
      // Use the stored selected text instead of trying to get it from current selection
      selectedText = this.currentSelectedText;

      // If no stored selected text, try to get it from the preview content
      if (!selectedText) {
        const previewContent = document.getElementById('rag-selected-text-content').textContent;
        selectedText = previewContent.replace('...', '');
      }
    }

    // Add user message to UI
    this.addMessageToUI('user', message);

    // Clear input
    input.value = '';

    try {
      // Show typing indicator
      const typingId = this.addTypingIndicator();

      // Call backend API based on mode
      let response;
      if (this.getCurrentMode() === 'global') {
        response = await this.callGlobalAPI(message);
      } else {
        response = await this.callSelectedAPI(message, selectedText);
      }

      // Remove typing indicator
      this.removeTypingIndicator(typingId);

      // Add AI response to UI
      this.addMessageToUI('ai', response.answer, response.citations);

    } catch (error) {
      // Remove typing indicator
      this.removeTypingIndicator();

      // Add error message
      this.addMessageToUI('ai', `Sorry, I encountered an error: ${error.message}`);
    }
  }

  async callGlobalAPI(question) {
    const headers = {
      'Content-Type': 'application/json',
    };

    const response = await fetch(`${this.backendUrl}/ask`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        question: question,
        session_id: this.sessionId
      })
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  }

  async callSelectedAPI(question, selectedText) {
    const headers = {
      'Content-Type': 'application/json',
    };

    const response = await fetch(`${this.backendUrl}/ask-selected`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        question: question,
        selected_text: selectedText,
        session_id: this.sessionId
      })
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  }

  addMessageToUI(sender, text, citations = null) {
    const messagesContainer = document.getElementById('rag-chat-messages');

    const messageDiv = document.createElement('div');
    messageDiv.style.cssText = `
      margin-bottom: 12px;
      display: flex;
      ${sender === 'user' ? 'justify-content: flex-end;' : 'justify-content: flex-start;'}
    `;

    const bubbleDiv = document.createElement('div');
    bubbleDiv.style.cssText = `
      max-width: 85%;
      padding: 10px 14px;
      border-radius: 18px;
      font-size: 14px;
      line-height: 1.4;
      ${sender === 'user'
        ? 'background: #1b6cf5; color: white; border-bottom-right-radius: 4px;'
        : 'background: white; color: #333; border: 1px solid #eee; border-bottom-left-radius: 4px;'};
    `;

    bubbleDiv.textContent = text;
    messageDiv.appendChild(bubbleDiv);
    messagesContainer.appendChild(messageDiv);

    // Add citations if provided
    if (citations && citations.length > 0) {
      const citationsDiv = document.createElement('div');
      citationsDiv.style.cssText = `
        margin-top: 6px;
        margin-left: 10px;
        font-size: 12px;
        color: #666;
      `;

      citationsDiv.innerHTML = '<strong>Citations:</strong><br>';

      citations.forEach((citation, index) => {
        if (citation.url) {
          const link = document.createElement('a');
          link.href = citation.url;
          link.textContent = citation.section || `Source ${index + 1}`;
          link.target = '_blank';
          link.style.cssText = `
            display: block;
            margin: 2px 0;
            color: #1b6cf5;
            text-decoration: none;
          `;
          citationsDiv.appendChild(link);
        } else if (citation.module) {
          const span = document.createElement('span');
          span.textContent = `${citation.module} - ${citation.section}`;
          span.style.display = 'block';
          span.style.margin = '2px 0';
          citationsDiv.appendChild(span);
        }
      });

      messageDiv.appendChild(citationsDiv);
    }

    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  addTypingIndicator() {
    const messagesContainer = document.getElementById('rag-chat-messages');

    const typingDiv = document.createElement('div');
    typingDiv.id = 'rag-typing-indicator';
    typingDiv.style.cssText = `
      margin-bottom: 12px;
      display: flex;
      justify-content: flex-start;
    `;

    const bubbleDiv = document.createElement('div');
    bubbleDiv.style.cssText = `
      padding: 10px 14px;
      background: white;
      color: #333;
      border: 1px solid #eee;
      border-radius: 18px;
      border-bottom-left-radius: 4px;
      font-size: 14px;
    `;

    bubbleDiv.innerHTML = `
      <div style="display: flex;">
        <div style="width: 8px; height: 8px; background: #999; border-radius: 50%; margin-right: 4px; animation: typing 1s infinite;"></div>
        <div style="width: 8px; height: 8px; background: #999; border-radius: 50%; margin-right: 4px; animation: typing 1s infinite 0.2s;"></div>
        <div style="width: 8px; height: 8px; background: #999; border-radius: 50%; animation: typing 1s infinite 0.4s;"></div>
      </div>
    `;

    // Add animation style if not already present
    if (!document.getElementById('rag-typing-animation')) {
      const style = document.createElement('style');
      style.id = 'rag-typing-animation';
      style.textContent = `
        @keyframes typing {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
      `;
      document.head.appendChild(style);
    }

    typingDiv.appendChild(bubbleDiv);
    messagesContainer.appendChild(typingDiv);

    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    return typingDiv.id;
  }

  removeTypingIndicator(id = 'rag-typing-indicator') {
    const typingIndicator = document.getElementById(id);
    if (typingIndicator) {
      typingIndicator.remove();
    }
  }

  async loadHistory() {
    try {
      const headers = {
        'Content-Type': 'application/json',
      };

      const response = await fetch(`${this.backendUrl}/history/${this.sessionId}`, {
        headers: headers
      });
      if (response.ok) {
        const data = await response.json();
        const messagesContainer = document.getElementById('rag-chat-messages');
        messagesContainer.innerHTML = '';

        data.messages.forEach(msg => {
          this.addMessageToUI(msg.sender, msg.text);
        });

        // Scroll to bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }
    } catch (error) {
      console.error('Error loading history:', error);
    }
  }
}

// Add CSS for active state of mode buttons and hover effects
(function() {
  if (!document.getElementById('rag-widget-styles')) {
    const style = document.createElement('style');
    style.id = 'rag-widget-styles';
    style.textContent = `
      .rag-mode-btn.active {
        background: #1b6cf5;
        color: white;
        border-color: #1b6cf5;
      }

      .rag-mode-btn:hover:not(.active) {
        background: #e9ecef;
        border-color: #adb5bd;
      }

      #rag-send-btn:hover {
        background: #0d5bb8;
        border-color: #0d5bb8;
      }

      #rag-clear-selection:hover {
        background: #0066cc !important;
        border-color: #0066cc !important;
        color: white !important;
      }

      #rag-user-input:focus {
        outline: none;
        border-color: #1b6cf5 !important;
        box-shadow: 0 0 0 3px rgba(27, 108, 245, 0.1);
      }
    `;
    document.head.appendChild(style);
  }
})();

// Initialize the widget when the page loads
document.addEventListener('DOMContentLoaded', () => {
  new RAGChatWidget();
});