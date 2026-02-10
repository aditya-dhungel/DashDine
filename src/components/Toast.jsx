import React from "react";

const Toast = ({ message, show }) => {
  if (!show) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-9999">
      <div className="bg-gray-900 text-white px-6 py-3 rounded-2xl shadow-lg flex items-center gap-3 animate-slideUp">
        <span className="text-sm font-semibold">{message}</span>
      </div>
    </div>
  );
};

export default Toast;
