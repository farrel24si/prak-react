import { useParams, useNavigate } from "react-router-dom"; // Tambahkan useNavigate
import { useEffect, useState } from "react";
import axios from "axios";

export default function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate(); // Hook untuk navigasi
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true); // State untuk loading

    useEffect(() => {
        setLoading(true);
        axios
            .get(`https://dummyjson.com/products/${id}`)
            .then((response) => {
                setProduct(response.data);
                setLoading(false);
            })
            .catch((err) => {
                // Axios menangkap error response dengan lebih detail
                setError(err.response?.data?.message || err.message);
                setLoading(false);
            });
    }, [id]);

    // Tampilan saat Loading
    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center h-screen gap-4">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
                <p className="text-gray-500 animate-pulse">Memuat detail produk...</p>
            </div>
        );
    }

    // Tampilan saat Error
    if (error) {
        return (
            <div className="p-4 max-w-lg mx-auto mt-10">
                <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg text-center shadow">
                    <p className="font-bold text-lg mb-1">Ups! Terjadi Kesalahan</p>
                    <p className="text-sm">{error}</p>
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

    // Tampilan Utama saat Data Berhasil Dimuat
    return (
        <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
            <div className="max-w-6xl mx-auto">
                
                {/* Tombol Kembali */}
                <button 
                    onClick={() => navigate('/product')}
                    className="flex items-center gap-2 text-gray-600 hover:text-emerald-600 transition-colors mb-6 group"
                >
                    <span className="group-hover:-translate-x-1 transition-transform">&larr;</span> 
                    Kembali ke Daftar Produk
                </button>

                {/* Kartu Detail Produk */}
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 flex flex-col md:flex-row">
                    
                    {/* Bagian Kiri: Gambar Produk */}
                    <div className="md:w-1/2 bg-gray-100 p-8 flex items-center justify-center border-b md:border-b-0 md:border-r border-gray-200">
                        <img
                            src={product.thumbnail}
                            alt={product.title}
                            className="rounded-2xl w-full max-h-96 object-contain mix-blend-multiply transform hover:scale-105 transition-transform duration-500"
                        />
                    </div>

                    {/* Bagian Kanan: Informasi Produk */}
                    <div className="md:w-1/2 p-8 md:p-12 flex flex-col">
                        
                        {/* Header: Kategori & Rating */}
                        <div className="flex justify-between items-center mb-3">
                            <span className="bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-emerald-100">
                                {product.category}
                            </span>
                            <div className="flex items-center gap-1.5 text-amber-500">
                                <span className="text-lg">⭐</span>
                                <span className="font-bold text-gray-700">{product.rating.toFixed(1)}</span>
                                <span className="text-sm text-gray-400">(DummyJSON)</span>
                            </div>
                        </div>

                        {/* Judul & Brand */}
                        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2 leading-tight">
                            {product.title}
                        </h1>
                        <p className="text-gray-500 text-lg mb-6">
                            by <span className="font-semibold text-gray-700">{product.brand}</span>
                        </p>

                        {/* Harga */}
                        <div className="bg-gray-50 rounded-xl p-5 border border-gray-100 mb-6">
                            <p className="text-sm text-gray-500 mb-1">Harga Estimasi (IDR)</p>
                            <p className="text-4xl font-extrabold text-emerald-600">
                                {/* Asumsi kurs $1 = Rp15.000 untuk DummyJSON, pakai toLocaleString agar ada titik ribuan */}
                                Rp {(product.price * 15000).toLocaleString('id-ID')}
                            </p>
                        </div>

                        {/* Deskripsi */}
                        <div className="mb-8 flex-grow">
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Deskripsi</h3>
                            <p className="text-gray-600 leading-relaxed text-base">
                                {product.description}
                            </p>
                        </div>

                        {/* Footer Kartu: Stok & Aksi */}
                        <div className="border-t border-gray-100 pt-6 mt-auto flex items-center justify-between gap-4">
                            <div>
                                <p className="text-sm text-gray-500">Stok Tersedia</p>
                                <p className={`text-xl font-bold ${product.stock < 10 ? 'text-red-600' : 'text-gray-900'}`}>
                                    {product.stock} <span className="text-gray-400 font-normal text-base">pcs</span>
                                </p>
                            </div>
                            <button className="flex-grow md:flex-grow-0 bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-emerald-700 transition-colors shadow-md shadow-emerald-100 active:scale-95 transition-transform">
                                Tambah ke Keranjang
                            </button>
                        </div>
                    </div>
                </div>

                {/* Opsional: Bagian Metadata Tambahan */}
                <div className="mt-10 bg-white p-6 rounded-2xl shadow border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Informasi Tambahan (DummyData)</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div className="bg-gray-50 p-3 rounded-lg">ID Produk: <span className="font-mono font-bold text-emerald-700">{product.id}</span></div>
                        <div className="bg-gray-50 p-3 rounded-lg">Diskon: <span className="font-bold">{product.discountPercentage}%</span></div>
                        <div className="bg-gray-50 p-3 rounded-lg">SKU: <span className="font-mono">DBJ-{product.id}</span></div>
                        <div className="bg-gray-50 p-3 rounded-lg">Berat Estimasi: <span className="font-bold">1.2 kg</span></div>
                    </div>
                </div>

            </div>
        </div>
    );
}