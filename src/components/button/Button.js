import React from "react";

function Button({ onClick, children }) {
  return (
    <button
      className="w-full py-3 bg-primary rounded-lg mt-2"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
