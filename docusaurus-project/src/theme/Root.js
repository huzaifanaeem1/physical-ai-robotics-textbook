import React, { useEffect } from 'react';

// Default theme wrapper for Docusaurus
export default function Root({ children }) {
  useEffect(() => {
    // Load the RAG Chatbot widget script
    const script = document.createElement('script');
    script.src = '/js/ragChatWidget.js';
    script.async = true;
    document.head.appendChild(script);

    // Load the widget CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/css/ragChatWidget.css';
    link.type = 'text/css';
    document.head.appendChild(link);

    // Cleanup function
    return () => {
      // Remove script and link when component unmounts
      const scriptElement = document.querySelector(`script[src="/js/ragChatWidget.js"]`);
      const linkElement = document.querySelector(`link[href="/css/ragChatWidget.css"]`);

      if (scriptElement) scriptElement.remove();
      if (linkElement) linkElement.remove();
    };
  }, []);

  return (
    <>
      {children}
    </>
  );
}