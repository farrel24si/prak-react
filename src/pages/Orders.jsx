import { useState } from "react";
import PageHeader from "../components/PageHeader";
import { ordersData } from "../data/DummyData";

export default function Orders() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50/50">
      <PageHeader 
        title="Order List" 
        breadcrumb={["Dashboard", "Orders"]}
      >
        <button 
          onClick={() => setShowForm(!showForm)}
          className={`${showForm ? "bg-red-500 hover:bg-red-600" : "bg-biru hover:bg-blue-600"} text-white px-6 py-2 rounded-xl font-bold shadow-md transition`}
        >
          {showForm ? "Cancel" : "+ Add Order"}
        </button>
      </PageHeader>
      
      <div className="p-6">
        {/* Formulir Add Order */}
        {showForm && (
          <div className="mb-6 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 animate-in fade-in slide-in-from-top-4">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Add New Order</h2>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Customer Name" className="border p-2 rounded-lg outline-none focus:ring-2 focus:ring-biru" />
              <input type="number" placeholder="Total Price" className="border p-2 rounded-lg outline-none focus:ring-2 focus:ring-biru" />
              <input type="date" className="border p-2 rounded-lg outline-none focus:ring-2 focus:ring-biru" />
              <select className="border p-2 rounded-lg outline-none focus:ring-2 focus:ring-biru">
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
              <div className="md:col-span-2">
                <button type="button" className="bg-hijau text-white px-6 py-2 rounded-lg font-bold hover:bg-green-600">Save Order</button>
              </div>
            </form>
          </div>
        )}

        {/* Tabel Data JSON */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-800 font-bold">
              <tr>
                <th className="p-4">Order ID</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Date</th>
                <th className="p-4">Total Price</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {ordersData.map((order, idx) => (
                <tr key={idx} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="p-4 font-semibold text-gray-800">{order.id}</td>
                  <td className="p-4">{order.customerName}</td>
                  <td className="p-4">{order.orderDate}</td>
                  <td className="p-4">Rp {Number(order.totalPrice).toLocaleString()}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${order.status === 'Completed' ? 'bg-green-100 text-green-700' : order.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}