import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { productAPI } from "../services/supabaseService";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formState, setFormState] = useState({
    title: "",
    code: "",
    category: "",
    brand: "",
    price: "",
    stock: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [saving, setSaving] = useState(false);

  const loadProducts = async () => {
    const { data, error } = await productAPI.fetchProducts();
    if (error) {
      setError(error.message || "Gagal memuat produk.");
      return;
    }
    setProducts(data || []);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const categories = useMemo(
    () => ["All", ...new Set(products.map((item) => item.category || "Other"))],
    [products]
  );

  const filteredProducts = products.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const resetForm = () => {
    setSelectedProduct(null);
    setIsEditMode(false);
    setFormState({
      title: "",
      code: "",
      category: "",
      brand: "",
      price: "",
      stock: "",
    });
    setError("");
    setSuccess("");
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const openCreateForm = () => {
    resetForm();
    setShowForm(true);
  };

  const openEditForm = (product) => {
    setSelectedProduct(product);
    setFormState({
      title: product.title,
      code: product.code,
      category: product.category,
      brand: product.brand,
      price: String(product.price),
      stock: String(product.stock),
    });
    setIsEditMode(true);
    setShowForm(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formState.title || !formState.code || !formState.category || !formState.brand) {
      setError("Semua field wajib diisi.");
      return;
    }

    const payload = {
      title: formState.title,
      code: formState.code,
      category: formState.category,
      brand: formState.brand,
      price: parseFloat(formState.price) || 0,
      stock: parseInt(formState.stock, 10) || 0,
    };

    setSaving(true);

    if (isEditMode && selectedProduct) {
      const { error } = await productAPI.updateProduct(selectedProduct.id, payload);
      if (error) {
        setError(error.message || "Gagal memperbarui produk.");
        setSaving(false);
        return;
      }
      setSuccess("Produk berhasil diperbarui.");
    } else {
      const { error } = await productAPI.createProduct(payload);
      if (error) {
        setError(error.message || "Gagal menambahkan produk.");
        setSaving(false);
        return;
      }
      setSuccess("Produk berhasil ditambahkan.");
    }

    await loadProducts();
    resetForm();
    setShowForm(false);
    setSaving(false);
  };

  const handleDelete = async (productId) => {
    if (!window.confirm("Hapus produk ini?")) {
      return;
    }

    const { error } = await productAPI.deleteProduct(productId);
    if (error) {
      setError(error.message || "Gagal menghapus produk.");
      return;
    }

    setSuccess("Produk berhasil dihapus.");
    await loadProducts();
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto">
        <PageHeader title="Inventory Management">
          <button
            onClick={openCreateForm}
            className="bg-hijau text-white px-6 py-2 rounded-xl font-bold shadow-md hover:bg-green-600 transition"
          >
            + Add Product
          </button>
        </PageHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 mt-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-gray-500 text-sm">Total Produk</p>
            <h3 className="text-2xl font-bold text-gray-800">{products.length}</h3>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-gray-500 text-sm">Stok Rendah (&lt;10)</p>
            <h3 className="text-2xl font-bold text-red-500">
              {products.filter((p) => p.stock < 10).length}
            </h3>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-gray-500 text-sm">Kategori</p>
            <h3 className="text-2xl font-bold text-emerald-600">{categories.length - 1}</h3>
          </div>
        </div>

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
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-2xl mb-6">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 p-4 rounded-2xl mb-6">
            {success}
          </div>
        )}

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
                          Rp {Number(item.price).toLocaleString('id-ID')}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-col items-center">
                          <div className="w-full bg-gray-200 rounded-full h-1.5 mb-1 max-w-25">
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
                      <td className="p-4 text-center space-x-2">
                        <button
                          type="button"
                          onClick={() => openEditForm(item)}
                          className="inline-flex items-center px-3 py-1.5 border border-emerald-500 text-xs font-medium rounded-lg text-emerald-500 hover:bg-emerald-500 hover:text-white transition-all shadow-sm"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(item.id)}
                          className="inline-flex items-center px-3 py-1.5 border border-red-500 text-xs font-medium rounded-lg text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm"
                        >
                          Hapus
                        </button>
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

        <div className="mt-4 text-center text-gray-400 text-xs">
          Menampilkan {filteredProducts.length} dari {products.length} produk
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
          <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl ring-1 ring-black/5">
            <div className="flex items-center justify-between border-b border-gray-100 p-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">{isEditMode ? "Edit Product" : "Add Product"}</h2>
                <p className="text-sm text-gray-500">
                  {isEditMode ? "Perbarui data produk." : "Tambahkan produk baru ke inventori."}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                Close
              </button>
            </div>
            <div className="p-6">
              <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSave}>
                <input
                  name="title"
                  value={formState.title}
                  onChange={handleChange}
                  placeholder="Product Title"
                  className="border p-3 rounded-2xl outline-none focus:ring-2 focus:ring-hijau"
                />
                <input
                  name="code"
                  value={formState.code}
                  onChange={handleChange}
                  placeholder="Product Code"
                  className="border p-3 rounded-2xl outline-none focus:ring-2 focus:ring-hijau"
                />
                <input
                  name="category"
                  value={formState.category}
                  onChange={handleChange}
                  placeholder="Category"
                  className="border p-3 rounded-2xl outline-none focus:ring-2 focus:ring-hijau"
                />
                <input
                  name="brand"
                  value={formState.brand}
                  onChange={handleChange}
                  placeholder="Brand"
                  className="border p-3 rounded-2xl outline-none focus:ring-2 focus:ring-hijau"
                />
                <input
                  name="price"
                  type="number"
                  value={formState.price}
                  onChange={handleChange}
                  placeholder="Price"
                  className="border p-3 rounded-2xl outline-none focus:ring-2 focus:ring-hijau"
                />
                <input
                  name="stock"
                  type="number"
                  value={formState.stock}
                  onChange={handleChange}
                  placeholder="Stock"
                  className="border p-3 rounded-2xl outline-none focus:ring-2 focus:ring-hijau"
                />
                <div className="md:col-span-2 flex flex-col sm:flex-row gap-3 justify-end">
                  <button
                    type="button"
                    onClick={() => { setShowForm(false); resetForm(); }}
                    className="w-full sm:w-auto bg-gray-200 text-gray-700 px-6 py-3 rounded-2xl hover:bg-gray-300 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className={`w-full sm:w-auto ${saving ? "bg-gray-400" : "bg-hijau hover:bg-green-600"} text-white px-6 py-3 rounded-2xl transition`}
                  >
                    {saving ? "Saving..." : isEditMode ? "Update Product" : "Create Product"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
