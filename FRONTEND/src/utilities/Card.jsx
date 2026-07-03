import React from "react";

function Card({ children }) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm shadow-slate-200/70">
      {children}
    </div>
  );
}

export default Card;
