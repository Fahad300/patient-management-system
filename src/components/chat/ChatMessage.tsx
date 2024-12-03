"use client";

import React from 'react';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { formatDate } from '@/lib/utils';

interface ChatMessageProps {
  message: {
    id: string;
    text: string;
    sender: string;
    timestamp: Date;
  };
  isSelf: boolean;
}

const ChatMessage = ({ message, isSelf }: ChatMessageProps) => {
  return (
    <div className={`chat-message ${isSelf ? 'self' : 'other'}`}>
      <div className="message-content">
        {!isSelf && (
          <Avatar icon={<UserOutlined />} className="message-avatar" />
        )}
        <div className="message-bubble">
          <div className="message-text">{message.text}</div>
          <div className="message-time">
            {formatDate(message.timestamp, 'HH:mm')}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage; 