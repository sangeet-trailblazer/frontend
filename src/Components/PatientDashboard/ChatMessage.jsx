import React from 'react';
import { User, Bot } from 'lucide-react';

const ChatMessage = ({ message, isUser }) => {
  return (
    <div className={`chat-message ${isUser ? 'user-message' : 'assistant-message'}`}>
      <div className="message-avatar">
        {isUser ? <User size={20} /> : <Bot size={20} />}
      </div>
      <div className="message-content">
        <div className="message-sender">{isUser ? 'You' : 'Assistant'}</div>
        <div className="message-text">{message}</div>
      </div>
    </div>
  );
};

export default ChatMessage;