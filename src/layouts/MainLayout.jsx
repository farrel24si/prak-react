import { Outlet } from "react-router-dom";

// Gunakan ../ untuk mundur satu folder, lalu masuk ke folder components
import Sidebar from "../components/Sidebar"; 
import Header from "../components/Header";

export default function MainLayout() {
    
    /* 
       PEMBUNGKUS LUAR (SIDEBAR + KONTEN)
       - flex: Membuat Sidebar dan area konten berjajar secara horizontal (kiri-kanan).
       - min-h-screen: Memastikan tinggi layout setidaknya setinggi layar monitor.
       - bg-gray-50: Memberi warna latar abu-abu sangat muda pada seluruh area dashboard.
    */
    return (
        <div className="flex min-h-screen bg-gray-50 font-barlow">
            
            {/* Sidebar akan tetap diam di sebelah kiri. */}
            <Sidebar />

            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                
                {/* Header akan tetap diam di bagian atas. */}
                <Header />

                {/* 
                   WADAH ISI HALAMAN DINAMIS
                   - flex-1: Mengambil sisa ruang di bawah Header.
                   - overflow-y-auto: Bagian paling penting! Hanya area isi halaman ini 
                     yang bisa di-scroll ke bawah jika datanya banyak.
                   - p-6: Memberi jarak (padding) agar konten tidak mepet ke pinggir layar.
                */}
                <div className="flex-1 overflow-y-auto p-6">
                    {/* Komponen Dashboard, Orders, atau Customers akan muncul di sini. */}
                    <Outlet />
                </div>
            </div>
        </div>
    );
}