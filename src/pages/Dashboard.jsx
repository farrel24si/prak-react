import { useEffect, useState } from "react";
import { FaShoppingCart, FaTruck, FaBan, FaDollarSign } from "react-icons/fa";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { orderAPI } from "@/services/supabaseService";
import { useAuth } from "@/context/AuthContext";

export default function Dashboard() {
  const { user, profile } = useAuth();
  const isAdmin = profile?.role === "admin";
  const [stats, setStats] = useState([
    { id: 1, label: "Total Orders", value: "0", icon: <FaShoppingCart />, color: "bg-hijau", trend: "Loading..." },
    { id: 2, label: "Total Delivered", value: "0", icon: <FaTruck />, color: "bg-biru", trend: "Loading..." },
    { id: 3, label: "Total Canceled", value: "0", icon: <FaBan />, color: "bg-merah", trend: "Loading..." },
    { id: 4, label: isAdmin ? "Total Revenue" : "Total Spent", value: "Rp0", icon: <FaDollarSign />, color: "bg-black", trend: "Loading..." },
  ]);
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    const loadStats = async () => {
      let data;
      if (isAdmin) {
        const res = await orderAPI.fetchDashboardStats();
        data = res.data;
      } else {
        if (!user?.id) return;
        const res = await orderAPI.fetchDashboardStatsByUser(user.id);
        data = res.data;
      }

      if (data) {
        const amount = isAdmin ? data.totalRevenue : data.totalSpent;
        setStats([
          { id: 1, label: "Total Orders", value: String(data.totalOrders), icon: <FaShoppingCart />, color: "bg-hijau", trend: "Semua pesanan" },
          { id: 2, label: "Total Delivered", value: String(data.totalDelivered), icon: <FaTruck />, color: "bg-biru", trend: "Selesai" },
          { id: 3, label: "Total Canceled", value: String(data.totalCanceled), icon: <FaBan />, color: "bg-merah", trend: "Dibatalkan" },
          { id: 4, label: isAdmin ? "Total Revenue" : "Total Spent", value: `Rp${Number(amount || 0).toLocaleString('id-ID')}`, icon: <FaDollarSign />, color: "bg-black", trend: isAdmin ? "Pendapatan" : "Pengeluaran" },
        ]);
      }
    };

    const loadRecentOrders = async () => {
      if (isAdmin) {
        const { data } = await orderAPI.fetchRecentOrders(5);
        setRecentOrders(data || []);
      } else {
        if (!user?.id) return;
        const { data } = await orderAPI.fetchRecentOrdersByUser(user.id, 5);
        setRecentOrders(data || []);
      }
    };

    loadStats();
    loadRecentOrders();
  }, [user?.id, isAdmin]);

  const getStatusBadge = (status) => {
    const base = "px-3 py-1 rounded-full text-xs font-bold";
    if (status === "Completed") return `${base} bg-green-100 text-green-700`;
    if (status === "Pending") return `${base} bg-yellow-100 text-yellow-700`;
    return `${base} bg-red-100 text-red-700`;
  };

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50/50">
      <PageHeader />
      
      {/* Stat Cards */}
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

      {/* Recent Orders Section */}
      <div className="px-6 pb-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-800">
              {isAdmin ? "Recent Orders" : "Pesanan Terbaru"}
            </h2>
            <Link
              to="/orders"
              className="text-xs font-bold text-hijau hover:text-green-700 transition-colors"
            >
              Lihat Semua &rarr;
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-50 text-gray-800 font-bold">
                <tr>
                  <th className="p-4">Order ID</th>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Total</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="p-8 text-center text-gray-400 italic">
                      Belum ada pesanan.
                    </td>
                  </tr>
                ) : (
                  recentOrders.map((order, idx) => (
                    <tr key={idx} className="border-t border-gray-100 hover:bg-gray-50">
                      <td className="p-4 font-semibold text-gray-800">{order.id}</td>
                      <td className="p-4">{order.customer_name}</td>
                      <td className="p-4">{new Date(order.created_at).toLocaleDateString()}</td>
                      <td className="p-4">Rp {Number(order.final_amount).toLocaleString('id-ID')}</td>
                      <td className="p-4">
                        <span className={getStatusBadge(order.status)}>{order.status}</span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}