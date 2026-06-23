import { useEffect, useMemo, useState } from "react";
import PageHeader from "../components/PageHeader";
import { useAuth } from "@/context/AuthContext";
import { orderAPI, productAPI, getDiscountPercentage } from "@/services/supabaseService";

export default function Orders() {
  const { user, profile } = useAuth();
  const { refreshProfile } = useAuth();
  const isAdmin = profile?.role === "admin";
  const [showForm, setShowForm] = useState(false);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    customerName: profile?.full_name || "",
    productId: "",
    quantity: "1",
    status: "Pending",
    orderDate: new Date().toISOString().slice(0, 10),
  });

  const loadOrders = async () => {
    if (isAdmin) {
      const { data } = await orderAPI.fetchOrders();
      setOrders(data || []);
    } else {
      if (!user?.id) return;
      const { data } = await orderAPI.fetchOrdersByUser(user.id);
      setOrders(data || []);
    }
  };

  const loadProducts = async () => {
    const { data, error: errorProducts } = await productAPI.fetchProducts();
    if (!errorProducts) {
      setProducts(data || []);
    }
  };

  useEffect(() => {
    loadOrders();
    loadProducts();
  }, [user?.id]);

  useEffect(() => {
    if (profile?.full_name) {
      setFormData((prev) => ({ ...prev, customerName: profile.full_name }));
    }
  }, [profile]);

  const selectedProduct = useMemo(
    () => products.find((product) => String(product.id) === String(formData.productId)),
    [products, formData.productId]
  );

  const quantity = Number(formData.quantity) || 1;
  const unitPrice = Number(selectedProduct?.price || 0);
  const totalPrice = unitPrice * quantity;
  const discountPercentage = getDiscountPercentage(profile?.loyalty_tier || "Bronze");
  const discountAmount = totalPrice * discountPercentage;
  const finalAmount = totalPrice - discountAmount;
  const loyaltyPoints = Math.floor(finalAmount / 10000);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSaveOrder = async () => {
    setError("");
    setSuccess("");

    if (!formData.productId) {
      setError("Pilih produk terlebih dahulu.");
      return;
    }

    if (!user) {
      setError("Akses pengguna tidak valid.");
      return;
    }

    setLoading(true);

    const payloadOrder = {
      user_id: user.id,
      customer_name: formData.customerName || profile?.full_name || user.email,
      status: "Pending",
      total_price: totalPrice,
      discount_percentage: discountPercentage * 100,
      discount_amount: discountAmount,
      final_amount: finalAmount,
      loyalty_tier: profile?.loyalty_tier || "Bronze",
      loyalty_points: loyaltyPoints,
      created_at: formData.orderDate,
    };

    const payloadItem = {
      product_id: Number(formData.productId),
      quantity,
      unit_price: unitPrice,
    };

    const { error: createError } = await orderAPI.createOrderWithItem(payloadOrder, payloadItem);
    if (createError) {
      setError(createError.message || "Gagal membuat order.");
      setLoading(false);
      return;
    }

    setSuccess("Order berhasil dibuat.");
    setShowForm(false);
    setFormData((prev) => ({ ...prev, productId: "", quantity: "1" }));
    await loadOrders();
    try {
      await refreshProfile?.();
    } catch (e) {
      console.warn("Failed to refresh profile:", e);
    }
    setLoading(false);
  };

  // Admin: proses pesanan (Pending → Completed atau Pending → Cancelled)
  const handleProcessOrder = async (orderId, newStatus) => {
    if (!window.confirm(`Proses pesanan ini menjadi "${newStatus}"?`)) return;
    setProcessing(true);
    setError("");
    setSuccess("");

    const { error: procError } = await orderAPI.processOrder(orderId, newStatus);
    if (procError) {
      setError(procError.message || "Gagal memproses pesanan.");
      setProcessing(false);
      return;
    }

    const statusLabel = newStatus === "Completed" ? "diterima" : "dibatalkan";
    setSuccess(`Pesanan berhasil ${statusLabel}.`);
    await loadOrders();
    try {
      await refreshProfile?.();
    } catch (e) {
      console.warn("Failed to refresh profile:", e);
    }
    setProcessing(false);
  };

  // Member: batalkan pesanan sendiri (Pending → Cancelled)
  const handleCancelOrder = async (orderId) => {
    if (!window.confirm("Batalkan pesanan ini?")) return;
    setProcessing(true);
    setError("");

    const { error: procError } = await orderAPI.processOrder(orderId, "Cancelled");
    if (procError) {
      setError(procError.message || "Gagal membatalkan pesanan.");
      setProcessing(false);
      return;
    }

    setSuccess("Pesanan berhasil dibatalkan.");
    await loadOrders();
    setProcessing(false);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50/50">
      <PageHeader
        title="Order List"
        breadcrumb={["Dashboard", "Orders"]}
      >
        {!isAdmin && (
          <button
            onClick={() => {
              setShowForm(!showForm);
              setError("");
              setSuccess("");
            }}
            className={`${showForm ? "bg-red-500 hover:bg-red-600" : "bg-biru hover:bg-blue-600"} text-white px-6 py-2 rounded-xl font-bold shadow-md transition`}
          >
            {showForm ? "Cancel" : "+ Add Order"}
          </button>
        )}
      </PageHeader>

      <div className="p-6">
        {/* Info Tier untuk Member */}
        {!isAdmin && profile && (
          <div className="mb-6 bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Loyalty Tier Anda</p>
              <p className="text-xl font-bold text-gray-800">{profile.loyalty_tier || "Bronze"}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Poin</p>
              <p className="text-xl font-bold text-emerald-600">{profile.points ?? 0}</p>
            </div>
          </div>
        )}

        {/* Form Tambah Order (hanya untuk member) */}
        {showForm && !isAdmin && (
          <div className="mb-6 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 animate-in fade-in slide-in-from-top-4">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Add New Order</h2>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded mb-4">{error}</div>
            )}
            {success && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 p-4 rounded mb-4">{success}</div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                placeholder="Customer Name"
                className="border p-2 rounded-lg outline-none focus:ring-2 focus:ring-biru"
              />
              <select
                name="productId"
                value={formData.productId}
                onChange={handleChange}
                className="border p-2 rounded-lg outline-none focus:ring-2 focus:ring-biru"
              >
                <option value="">Pilih Produk</option>
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.title} - Rp {Number(product.price).toLocaleString('id-ID')}
                  </option>
                ))}
              </select>
              <input
                type="number"
                name="quantity"
                min="1"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="Quantity"
                className="border p-2 rounded-lg outline-none focus:ring-2 focus:ring-biru"
              />
              <input
                type="date"
                name="orderDate"
                value={formData.orderDate}
                onChange={handleChange}
                className="border p-2 rounded-lg outline-none focus:ring-2 focus:ring-biru"
              />
              <div className="border p-4 rounded-2xl bg-gray-50">
                <p className="text-xs text-gray-500 mb-2">Summary</p>
                <p className="text-sm text-gray-700">Subtotal: Rp {totalPrice.toLocaleString('id-ID')}</p>
                <p className="text-sm text-gray-700">Diskon ({Math.round(discountPercentage * 100)}%): Rp {discountAmount.toLocaleString('id-ID')}</p>
                <p className="text-sm text-gray-700 font-bold">Total: Rp {finalAmount.toLocaleString('id-ID')}</p>
                <p className="text-sm text-gray-700">Poin akan didapat: {loyaltyPoints}</p>
              </div>
              <div className="md:col-span-2">
                <button
                  type="button"
                  onClick={handleSaveOrder}
                  disabled={loading}
                  className={`${loading ? "bg-gray-400" : "bg-hijau hover:bg-green-600"} text-white px-6 py-2 rounded-lg font-bold transition`}
                >
                  {loading ? "Saving..." : "Save Order"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Error/Success Global */}
        {error && !showForm && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl">{error}</div>
        )}
        {success && !showForm && (
          <div className="mb-4 bg-emerald-50 border border-emerald-200 text-emerald-700 p-4 rounded-xl">{success}</div>
        )}

        {/* Tabel Orders */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-800 font-bold">
              <tr>
                <th className="p-4">Order ID</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Date</th>
                <th className="p-4">Total</th>
                <th className="p-4">Status</th>
                {isAdmin && <th className="p-4 text-center">Aksi</th>}
                {!isAdmin && <th className="p-4 text-center">Batal</th>}
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={isAdmin ? 6 : 6} className="p-10 text-center text-gray-400 italic">
                    Belum ada pesanan.
                  </td>
                </tr>
              ) : (
                orders.map((order, idx) => (
                  <tr key={idx} className="border-t border-gray-100 hover:bg-gray-50">
                    <td className="p-4 font-semibold text-gray-800">{order.id}</td>
                    <td className="p-4">{order.customer_name}</td>
                    <td className="p-4">{new Date(order.created_at).toLocaleDateString()}</td>
                    <td className="p-4">Rp {Number(order.final_amount).toLocaleString('id-ID')}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        order.status === 'Completed' ? 'bg-green-100 text-green-700' : 
                        order.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 
                        'bg-red-100 text-red-700'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    {isAdmin && (
                      <td className="p-4 text-center">
                        {order.status === "Pending" && (
                          <div className="flex gap-2 justify-center">
                            <button
                              onClick={() => handleProcessOrder(order.id, "Completed")}
                              disabled={processing}
                              className="px-3 py-1.5 bg-green-500 text-white text-xs font-bold rounded-lg hover:bg-green-600 transition disabled:opacity-50"
                            >
                              Terima
                            </button>
                            <button
                              onClick={() => handleProcessOrder(order.id, "Cancelled")}
                              disabled={processing}
                              className="px-3 py-1.5 bg-red-500 text-white text-xs font-bold rounded-lg hover:bg-red-600 transition disabled:opacity-50"
                            >
                              Tolak
                            </button>
                          </div>
                        )}
                        {order.status !== "Pending" && (
                          <span className="text-gray-400 text-xs italic">
                            {order.status === "Completed" ? "Selesai" : "Dibatalkan"}
                          </span>
                        )}
                      </td>
                    )}
                    {!isAdmin && (
                      <td className="p-4 text-center">
                        {order.status === "Pending" && (
                          <button
                            onClick={() => handleCancelOrder(order.id)}
                            disabled={processing}
                            className="px-3 py-1.5 bg-red-500 text-white text-xs font-bold rounded-lg hover:bg-red-600 transition disabled:opacity-50"
                          >
                            Cancel
                          </button>
                        )}
                        {order.status !== "Pending" && (
                          <span className="text-gray-400 text-xs italic">
                            {order.status === "Completed" ? "Selesai" : "Dibatalkan"}
                          </span>
                        )}
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}