import { useState } from "react";
import { 
  FaHome, FaListAlt, FaUserFriends, FaChartBar, 
  FaStar, FaUtensils, FaPlus, FaCalendarAlt, FaCommentDots, FaWallet 
} from "react-icons/fa";

export default function Sidebar() {
  // Improvisasi: State untuk menu aktif
  const [activeMenu, setActiveMenu] = useState("Dashboard");

  const menus = [
    { name: "Dashboard", icon: <FaHome /> },
    { name: "Order List", icon: <FaListAlt /> },
    { name: "Order Detail", icon: <FaListAlt /> },
    { name: "Customer", icon: <FaUserFriends /> },
    { name: "Analytics", icon: <FaChartBar /> },
    { name: "Reviews", icon: <FaStar /> },
    { name: "Foods", icon: <FaUtensils /> },
  ];

  return (
    <div className="flex min-h-screen w-80 flex-col bg-white p-8 shadow-xl overflow-y-auto">
      {/* Logo Section */}
      <div className="flex flex-col mb-10">
        <span className="font-poppins font-black text-[40px] text-gray-900 leading-none">
          Sedap<b className="text-hijau">.</b>
        </span>
        <span className="text-abu-muda font-semibold text-xs tracking-wide uppercase">
          Modern Admin Dashboard
        </span>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1">
        <ul className="space-y-2">
          {menus.map((item) => (
            <li 
              key={item.name}
              onClick={() => setActiveMenu(item.name)}
              className={`flex items-center p-4 rounded-xl cursor-pointer transition-all duration-300 group
                ${activeMenu === item.name 
                  ? "bg-hijau-muda text-hijau font-bold" 
                  : "text-abu-muda hover:bg-gray-50 hover:text-gray-700"}`}
            >
              <span className={`text-xl mr-4 ${activeMenu === item.name ? "text-hijau" : "text-abu-muda group-hover:text-gray-500"}`}>
                {item.icon}
              </span>
              <span className="text-sm">{item.name}</span>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer Sidebar (Card Promo) */}
      <div className="mt-10">
        <div className="bg-hijau p-6 rounded-3xl shadow-lg relative overflow-hidden mb-6">
          <p className="text-white text-xs font-medium relative z-10 mb-4 leading-relaxed">
            Please, organize your menus through button below!
          </p>
          <button className="bg-white text-gray-800 text-xs font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 w-full shadow-md relative z-10 hover:bg-gray-50 transition">
            <FaPlus className="text-[10px]" /> Add Menus
          </button>
          {/* Dekorasi Chef Hat (bisa pake icon atau img) */}
          <div className="absolute -right-2 -bottom-2 opacity-20 text-6xl text-white">
            <FaUtensils />
          </div>
        </div>
        
        <div className="text-center">
          <p className="font-bold text-gray-800 text-xs mb-1">Sedap Restaurant Admin Dashboard</p>
          <p className="text-abu-muda text-[10px]">© 2026 All Rights Reserved</p>
        </div>
      </div>
    </div>
  );
}