import React from "react";
import IconBox from "./IconBox";

export default function StatCard({ title, value, pct, isPositive, icon }) {
  return (
    <div className="bg-[#FFFFFF] p-[18px] rounded-[15px] shadow-sm hover:shadow-md transition-all cursor-pointer font-['Helvetica'] flex justify-between items-center">
      <div>
        <p className="text-sm font-bold text-gray-400 mb-1">{title}</p>
        <div className="flex items-center gap-2">
          <h3 className="text-xl font-bold text-gray-800">{value}</h3>
          <span className={`text-sm font-bold ${isPositive ? 'text-[#48BB78]' : 'text-[#E53E3E]'}`}>
            {pct}
          </span>
        </div>
      </div>
      <IconBox icon={icon} />
    </div>
  );
}