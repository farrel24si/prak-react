import React from "react";

export default function ProgressBar({ percentage, color = "bg-[#3BCBBE]" }) {
  return (
    <div className="flex flex-col gap-1 items-center w-full">
      <span className={`text-xs ${color.replace('bg-', 'text-')}`}>{percentage}%</span>
      <div className="w-full bg-gray-200 h-1.5 rounded">
        <div className={`${color} h-1.5 rounded`} style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  );
}