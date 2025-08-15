import React, { useState, useRef, useEffect } from 'react';
import './ChatInterface.css';
import Message from '../Message';
import ChatInput from '../ChatInput';
import { api, UploadResponse } from '../../services/api';

interface MessageData {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatInterfaceProps {
  documentName?: string;
  documentInfo?: UploadResponse | null;
  onBackToUpload?: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ documentName, documentInfo, onBackToUpload }) => {
  const [messages, setMessages] = useState<MessageData[]>([
    {
      id: '1',
      text: `Hello! I'm ready to help you with "${documentName || 'your document'}". Ask me anything about the content.`,
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (message: string) => {
    if (!message.trim() || isLoading) return;

    const userMessage: MessageData = {
      id: Date.now().toString(),
      text: message,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await api.queryDocument({ question: message });
      
      const aiMessage: MessageData = {
        id: (Date.now() + 1).toString(),
        text: response,
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: MessageData = {
        id: (Date.now() + 1).toString(),
        text: `Sorry, I encountered an error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <button className="back-btn" onClick={onBackToUpload}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back to Upload
        </button>
        <div className="chat-title">
          <h2>Ask AI</h2>
          {documentName && <p className="document-name">{documentName}</p>}
        </div>
        <div className="header-actions">
          <button className="action-btn" title="Clear Chat">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="messages-container">
        <div className="messages-list">
          {messages.map((message) => (
            <Message
              key={message.id}
              text={message.text}
              isUser={message.isUser}
              timestamp={message.timestamp}
            />
          ))}
          
          {isLoading && (
            <Message
              text=""
              isUser={false}
              timestamp={new Date()}
              isLoading={true}
            />
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      <ChatInput 
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
      />
    </div>
  );
};

export default ChatInterface; 