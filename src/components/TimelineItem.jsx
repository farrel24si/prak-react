import React from "react";

export default function TimelineItem({ title, time, colorClass }) {
  return (
    <div className="relative z-10 flex items-center gap-4">
      <div className={`w-4 h-4 flex-shrink-0 rounded-full bg-white border-2 ${colorClass}`}></div>
      <div>
        <p className="text-sm font-bold text-gray-800">{title}</p>
        <p className="text-xs font-bold text-gray-400">{time}</p>
      </div>
    </div>
  );
}