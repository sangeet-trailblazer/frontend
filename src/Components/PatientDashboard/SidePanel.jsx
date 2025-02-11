import './SidePanel.css';
import React, { useEffect, useState, useRef } from 'react';
import { X, MessageSquare } from 'lucide-react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';

const SlidePanel = ({ isOpen, onClose, patientParagraph }) => {
  const [messages, setMessages] = useState([
    { text: "Hello! I'm your medical assistant. How can I help you today?", isUser: false }
  ]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      
      // Automatically send patient paragraph message when panel opens
      if (patientParagraph) {
        handleSendMessage(patientParagraph); // Send patient paragraph immediately
      }
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, patientParagraph]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle sending message to chatbot
  const handleSendMessage = async (message) => {
    // Add user message
    setMessages(prev => [...prev, { text: message, isUser: true }]);

    // Simulate assistant response (replace with actual API call)
    setTimeout(() => {
      setMessages(prev => [...prev, {
        text: "I understand your concern. Based on the information provided, I recommend scheduling a follow-up appointment to discuss this further. Is there anything specific you'd like to know about your current treatment plan?",
        isUser: false
      }]);
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="slide-panel-backdrop" onClick={onClose}>
      <div className="slide-panel" onClick={e => e.stopPropagation()}>
        <div className="slide-panel-header">
          <h2>
            <MessageSquare size={24} />
            Ask AI 
          </h2>
          <button className="close-panel-button" onClick={onClose} aria-label="Close panel">
            <X size={24} />
          </button>
        </div>
        <div className="chat-container">
          <div className="messages-container">
            {messages.map((message, index) => (
              <ChatMessage
                key={index}
                message={message.text}
                isUser={message.isUser}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
          <ChatInput onSendMessage={handleSendMessage} />
        </div>
      </div>
    </div>
  );
};

export default SlidePanel;
