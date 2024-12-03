"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Input, Button } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import ChatMessage from './ChatMessage';

interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: Date;
}

interface ChatBoxProps {
  messages: Message[];
  onSendMessage: (text: string) => void;
}

const ChatBox = ({ messages, onSendMessage }: ChatBoxProps) => {
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (inputText.trim()) {
      onSendMessage(inputText.trim());
      setInputText('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat-box">
      <div className="messages-container">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message}
            isSelf={message.sender === 'Doctor'}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="chat-input-container">
        <Input.TextArea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
          autoSize={{ minRows: 1, maxRows: 4 }}
        />
        <Button
          type="primary"
          icon={<SendOutlined />}
          onClick={handleSend}
          disabled={!inputText.trim()}
        />
      </div>
    </div>
  );
};

export default ChatBox; 