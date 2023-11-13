// ChatMessage.js
import React from 'react';

const ChatMessage = ({ text, name, sentOrReceived }) => {
  const isSent = sentOrReceived === 'sent';
  const alignmentClass = isSent ? 'text-right' : 'text-left';
  const colorClass = isSent ? 'bg-blue-500 text-white' : 'bg-gray-300';

  return (
    <div className={`mb-2 ${alignmentClass}`}>
      <span className={`inline-block p-2 rounded-lg ${colorClass}`}>
        {text}
      </span>
      {name && <div className="text-xs mt-1">{name}</div>}
    </div>
  );
};

export default ChatMessage;
