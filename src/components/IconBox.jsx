import React from "react";

export default function IconBox({ icon, color = "bg-[#3BCBBE]" }) {
  return (
    <div className={`w-12 h-12 rounded-[12px] flex items-center justify-center text-white text-xl shadow-md ${color}`}>
      {icon}
    </div>
  );
}