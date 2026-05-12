import { useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import productsData from "../data/Product.json";

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filter Logic
  const filteredProducts = productsData.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Get unique categories for filter
  const categories = ["All", ...new Set(productsData.map(item => item.category))];

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto">
        
        <PageHeader title="Inventory Management" />

        {/* Statistik Ringkas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 mt-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-gray-500 text-sm">Total Produk</p>
            <h3 className="text-2xl font-bold text-gray-800">{productsData.length}</h3>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-gray-500 text-sm">Stok Rendah (&lt;10)</p>
            <h3 className="text-2xl font-bold text-red-500">
              {productsData.filter(p => p.stock < 10).length}
            </h3>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-gray-500 text-sm">Kategori</p>
            <h3 className="text-2xl font-bold text-emerald-600">{categories.length - 1}</h3>
          </div>
        </div>

        {/* Toolbar: Search & Filter */}
        <div className="bg-white p-4 rounded-t-2xl border border-gray-200 border-b-0 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="relative w-full md:w-96">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
              🔍
            </span>
            <input
              type="text"
              placeholder="Cari nama atau kode produk..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-xl leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2 w-full md:w-auto">
            <label className="text-sm text-gray-500 whitespace-nowrap">Filter Kategori:</label>
            <select 
              className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-xl focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2"
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Tabel Utama */}
        <div className="bg-white shadow-xl rounded-b-2xl overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="p-4 font-bold text-xs uppercase tracking-wider text-gray-500">Info Produk</th>
                  <th className="p-4 font-bold text-xs uppercase tracking-wider text-gray-500">Kategori & Brand</th>
                  <th className="p-4 font-bold text-xs uppercase tracking-wider text-gray-500 text-right">Harga</th>
                  <th className="p-4 font-bold text-xs uppercase tracking-wider text-gray-500 text-center">Status Stok</th>
                  <th className="p-4 font-bold text-xs uppercase tracking-wider text-gray-500 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((item) => (
                    <tr key={item.id} className="hover:bg-emerald-50/30 transition-colors group">
                      <td className="p-4">
                        <div className="flex flex-col">
                          <Link 
                            to={`/product/${item.id}`} 
                            className="font-bold text-gray-800 group-hover:text-emerald-600 transition-colors"
                          >
                            {item.title}
                          </Link>
                          <span className="text-xs font-mono text-gray-400 mt-1">{item.code}</span>
                        </div>
                      </td>
                      <td className="p-4 text-sm text-gray-600">
                        <div className="flex flex-col gap-1">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 w-fit">
                            {item.category}
                          </span>
                          <span className="text-gray-400 text-xs">{item.brand}</span>
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        <span className="text-sm font-bold text-gray-900">
                          Rp {item.price.toLocaleString('id-ID')}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-col items-center">
                          <div className="w-full bg-gray-200 rounded-full h-1.5 mb-1 max-w-[100px]">
                            <div 
                              className={`h-1.5 rounded-full ${item.stock < 10 ? 'bg-red-500' : 'bg-emerald-500'}`} 
                              style={{ width: `${Math.min(item.stock, 100)}%` }}
                            ></div>
                          </div>
                          <span className={`text-xs font-bold ${item.stock < 10 ? 'text-red-500' : 'text-emerald-600'}`}>
                            {item.stock} unit
                          </span>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <Link 
                          to={`/product/${item.id}`}
                          className="inline-flex items-center px-3 py-1.5 border border-emerald-500 text-xs font-medium rounded-lg text-emerald-500 hover:bg-emerald-500 hover:text-white transition-all shadow-sm"
                        >
                          Detail
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="p-10 text-center text-gray-400 italic">
                      Produk tidak ditemukan...
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-4 text-center text-gray-400 text-xs">
          Menampilkan {filteredProducts.length} dari {productsData.length} produk
        </div>
      </div>
    </div>
  );
}