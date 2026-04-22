import { useState } from "react";
import PageHeader from "../components/PageHeader";
import { customersData } from "../data/DummyData";

export default function Customers() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50/50">
      <PageHeader 
        title="Customers" 
        breadcrumb={["Dashboard", "Customers"]}
      >
        <button 
          onClick={() => setShowForm(!showForm)}
          className={`${showForm ? "bg-red-500 hover:bg-red-600" : "bg-hijau hover:bg-green-600"} text-white px-6 py-2 rounded-xl font-bold shadow-md transition`}
        >
          {showForm ? "Cancel" : "+ Add Customer"}
        </button>
      </PageHeader>
      
      <div className="p-6">
        {/* Formulir Add Customer */}
        {showForm && (
          <div className="mb-6 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 animate-in fade-in slide-in-from-top-4">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Add New Customer</h2>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Customer Name" className="border p-2 rounded-lg outline-none focus:ring-2 focus:ring-hijau" />
              <input type="email" placeholder="Email Address" className="border p-2 rounded-lg outline-none focus:ring-2 focus:ring-hijau" />
              <input type="text" placeholder="Phone Number" className="border p-2 rounded-lg outline-none focus:ring-2 focus:ring-hijau" />
              <select className="border p-2 rounded-lg outline-none focus:ring-2 focus:ring-hijau">
                <option value="Bronze">Bronze</option>
                <option value="Silver">Silver</option>
                <option value="Gold">Gold</option>
              </select>
              <div className="md:col-span-2">
                <button type="button" className="bg-biru text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-600">Save Customer</button>
              </div>
            </form>
          </div>
        )}

        {/* Tabel Data JSON */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-800 font-bold">
              <tr>
                <th className="p-4">Customer ID</th>
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Loyalty</th>
              </tr>
            </thead>
            <tbody>
              {customersData.map((cust, idx) => (
                <tr key={idx} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="p-4 font-semibold text-gray-800">{cust.id}</td>
                  <td className="p-4">{cust.name}</td>
                  <td className="p-4">{cust.email}</td>
                  <td className="p-4">{cust.phone}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${cust.loyalty === 'Gold' ? 'bg-kuning text-white' : cust.loyalty === 'Silver' ? 'bg-gray-300 text-gray-800' : 'bg-orange-200 text-orange-800'}`}>
                      {cust.loyalty}
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