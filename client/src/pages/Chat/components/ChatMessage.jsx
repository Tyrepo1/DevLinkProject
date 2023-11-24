import React from 'react';

const username = localStorage.getItem("username")
const ChatMessage = ({ msg }) => {
  let isSent = false
  if (msg.from == username) {
    isSent = true
  }
  const alignmentClass = isSent ? 'text-right' : 'text-left';
  const colorClass = isSent ? 'bg-blue-500 text-white' : 'bg-gray-300';

  return (
    <div className={`mb-2 ${alignmentClass}`}>
      <span className={`inline-block p-2 rounded-lg ${colorClass}`}>
        {msg.text}
      </span>
      {msg.from && <div className="text-xs mt-1">{msg.from}</div>}
    </div>
  );
};

export default ChatMessage;
