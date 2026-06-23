import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { productAPI } from "@/services/supabaseService";

export default function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        productAPI.fetchProductById(id)
            .then(({ data, error }) => {
                if (error) {
                    setError(error.message || "Produk tidak dapat dimuat.");
                } else {
                    setProduct(data);
                }
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center h-screen gap-4">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
                <p className="text-gray-500 animate-pulse">Memuat detail produk...</p>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="p-4 max-w-lg mx-auto mt-10">
                <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg text-center shadow">
                    <p className="font-bold text-lg mb-1">Ups! Terjadi Kesalahan</p>
                    <p className="text-sm">{error || "Produk tidak ditemukan."}</p>
                    <button
                        onClick={() => navigate('/product')}
                        className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 text-sm"
                    >
                        Kembali ke Daftar
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
            <div className="max-w-6xl mx-auto">
                <button
                    onClick={() => navigate('/product')}
                    className="flex items-center gap-2 text-gray-600 hover:text-emerald-600 transition-colors mb-6 group"
                >
                    <span className="group-hover:-translate-x-1 transition-transform">&larr;</span>
                    Kembali ke Daftar Produk
                </button>

                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 flex flex-col md:flex-row">
                    <div className="md:w-1/2 bg-gray-100 p-8 flex items-center justify-center border-b md:border-b-0 md:border-r border-gray-200">
                        <img
                            src={product.thumbnail || "/img/image11.png"}
                            alt={product.title}
                            className="rounded-2xl w-full max-h-96 object-contain mix-blend-multiply transform hover:scale-105 transition-transform duration-500"
                        />
                    </div>

                    <div className="md:w-1/2 p-8 md:p-12 flex flex-col">
                        <div className="flex justify-between items-center mb-3">
                            <span className="bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-emerald-100">
                                {product.category}
                            </span>
                            <div className="flex items-center gap-1.5 text-amber-500">
                                <span className="text-lg">⭐</span>
                                <span className="font-bold text-gray-700">{product.rating?.toFixed?.(1) ?? "-"}</span>
                                <span className="text-sm text-gray-400">(Supabase)</span>
                            </div>
                        </div>

                        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2 leading-tight">
                            {product.title}
                        </h1>
                        <p className="text-gray-500 text-lg mb-6">
                            by <span className="font-semibold text-gray-700">{product.brand}</span>
                        </p>

                        <div className="bg-gray-50 rounded-xl p-5 border border-gray-100 mb-6">
                            <p className="text-sm text-gray-500 mb-1">Harga Estimasi (IDR)</p>
                            <p className="text-4xl font-extrabold text-emerald-600">
                                Rp {Number(product.price || 0).toLocaleString('id-ID')}
                            </p>
                        </div>

                        <div className="mb-8 flex-grow">
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Deskripsi</h3>
                            <p className="text-gray-600 leading-relaxed text-base">
                                {product.description || "Tidak ada deskripsi tersedia."}
                            </p>
                        </div>

                        <div className="border-t border-gray-100 pt-6 mt-auto flex items-center justify-between gap-4">
                            <div>
                                <p className="text-sm text-gray-500">Stok Tersedia</p>
                                <p className={`text-xl font-bold ${product.stock < 10 ? 'text-red-600' : 'text-gray-900'}`}>
                                    {product.stock ?? 0} <span className="text-gray-400 font-normal text-base">pcs</span>
                                </p>
                            </div>
                            <button className="flex-grow md:flex-grow-0 bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-emerald-700 transition-colors shadow-md shadow-emerald-100 active:scale-95 transition-transform">
                                Tambah ke Keranjang
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-10 bg-white p-6 rounded-2xl shadow border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Informasi Tambahan</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div className="bg-gray-50 p-3 rounded-lg">ID Produk: <span className="font-mono font-bold text-emerald-700">{product.id}</span></div>
                        <div className="bg-gray-50 p-3 rounded-lg">Harga: <span className="font-bold">Rp {Number(product.price || 0).toLocaleString('id-ID')}</span></div>
                        <div className="bg-gray-50 p-3 rounded-lg">SKU: <span className="font-mono">{product.code ?? `PRD-${product.id}`}</span></div>
                        <div className="bg-gray-50 p-3 rounded-lg">Rating: <span className="font-bold">{product.rating ?? "-"}</span></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
