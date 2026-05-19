import React from "react";

export default function Card({ children, className = "" }) {
  return (
    <div className={`bg-[#FFFFFF] p-[18px] rounded-[15px] shadow-sm hover:shadow-md transition-all font-['Helvetica'] ${className}`}>
      {children}
    </div>
  );
}