import React, { useState, useRef, useEffect } from 'react';

const AskAI = () => {
  const [apiKey, setApiKey] = useState('');
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [streaming, setStreaming] = useState(false);
  const chatBoxRef = useRef(null);

  // Scroll chat to the bottom when a new message is added
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [response]);

  // Function to handle the API request via CORS proxy
  const fetchAIResponse = async (prompt) => {
    const serverlessUrl = '/.netlify/functions/askAI'; // Your Netlify serverless function
  
    try {
      const response = await fetch(serverlessUrl, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt, apiKey })
      });
  
      const data = await response.json();
      setResponse(data);
    } catch (error) {
      console.error('Error fetching AI response:', error);
      setResponse('Error fetching response. Please check your API key or try again.');
    }
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!apiKey || !prompt) {
      alert("Please provide both an API key and a prompt.");
      return;
    }
    fetchAIResponse(prompt);
  };

  return (
    <div style={styles.container}>
      <h1>AskAI</h1>

      {/* API Key Input */}
      <div style={styles.apiKeyContainer}>
        <input
          type="text"
          placeholder="Enter your API key"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          style={styles.apiInput}
        />
      </div>

      {/* Prompt Form */}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Ask a question..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          style={styles.promptInput}
          disabled={streaming} // Disable input while streaming response
        />
        <button type="submit" style={styles.submitButton} disabled={streaming}>
          {streaming ? 'Loading...' : 'Submit'}
        </button>
      </form>

      {/* Chat Display */}
      <div ref={chatBoxRef} style={styles.chatBox}>
        {response && <p style={styles.responseText}>{response}</p>}
      </div>
    </div>
  );
};

// Styling (adjust to suit your needs)
const styles = {
  container: {
    width: '100%',
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f7f7f7',
    borderRadius: '10px',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)'
  },
  apiKeyContainer: {
    marginBottom: '20px',
  },
  apiInput: {
    width: '100%',
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '16px'
  },
  form: {
    display: 'flex',
    marginBottom: '20px',
  },
  promptInput: {
    flex: 1,
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  submitButton: {
    marginLeft: '10px',
    padding: '10px 20px',
    backgroundColor: '#1976d2',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  chatBox: {
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    height: '300px',
    overflowY: 'scroll',
    backgroundColor: '#fff'
  },
  responseText: {
    fontSize: '16px',
    lineHeight: '1.5',
    color: '#333',
  }
};

export default AskAI;
