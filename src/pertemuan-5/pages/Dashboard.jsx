import { FaShoppingCart, FaTruck, FaBan, FaDollarSign } from "react-icons/fa";
import PageHeader from "../components/PageHeader";

export default function Dashboard() {
  const stats = [
    { id: 1, label: "Total Orders", value: "75", icon: <FaShoppingCart />, color: "bg-hijau", trend: "4% (30 days)" },
    { id: 2, label: "Total Delivered", value: "357", icon: <FaTruck />, color: "bg-biru", trend: "4% (30 days)" },
    { id: 3, label: "Total Canceled", value: "65", icon: <FaBan />, color: "bg-merah", trend: "25% (30 days)" },
    { id: 4, label: "Total Revenue", value: "$128", icon: <FaDollarSign />, color: "bg-black", trend: "12% (30 days)" },
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50/50">
      <PageHeader />
      
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((item) => (
          <div key={item.id} className="bg-white p-6 rounded-[2rem] shadow-sm hover:shadow-md transition-all flex items-center gap-5 border border-gray-50">
            <div className={`${item.color} p-4 rounded-3xl text-white text-2xl shadow-inner`}>
              {item.icon}
            </div>
            <div className="flex flex-col">
              <span className="text-3xl font-black text-gray-800">{item.value}</span>
              <span className="text-gray-400 text-xs font-semibold">{item.label}</span>
              <span className="text-[10px] text-gray-300 mt-1">{item.trend}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Tempat untuk Improvisasi 3 (Customer Review) nanti di sini */}
    </div>
  );
}