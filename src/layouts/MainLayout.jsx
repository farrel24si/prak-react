// Mengimpor Outlet untuk menampung konten halaman (Dashboard, Orders, dll).
import { Outlet } from "react-router-dom";
// Mengimpor komponen navigasi samping dan bilah atas.
import Sidebar from "./Sidebar"; 
import Header from "./Header";

export default function MainLayout() {
    return (
        /* 
           PEMBUNGKUS LUAR (SIDEBAR + KONTEN)
           - flex: Membuat Sidebar dan area konten berjajar secara horizontal (kiri-kanan).
           - min-h-screen: Memastikan tinggi layout setidaknya setinggi layar monitor.
           - bg-gray-50: Memberi warna latar abu-abu sangat muda pada seluruh area dashboard.
        */
        <div className="flex min-h-screen bg-gray-50 font-barlow">
            
            {/* Sidebar akan tetap diam di sebelah kiri. */}
            <Sidebar />

            /* 
               AREA KONTEN KANAN (HEADER + ISI HALAMAN)
               - flex-1: Mengambil sisa lebar layar yang tidak dipakai Sidebar[cite: 1].
               - flex-col: Mengatur Header dan konten agar bertumpuk secara vertikal (atas-bawah)[cite: 1].
               - h-screen: Mengunci tinggi area ini tepat setinggi layar.
               - overflow-hidden: Mencegah seluruh halaman ikut scroll saat konten terlalu panjang.
            */
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                
                {/* Header akan tetap diam di bagian atas[cite: 1]. */}
                <Header />

                /* 
                   WADAH ISI HALAMAN DINAMIS
                   - flex-1: Mengambil sisa ruang di bawah Header.
                   - overflow-y-auto: Bagian paling penting! Hanya area isi halaman ini 
                     yang bisa di-scroll ke bawah jika datanya banyak[cite: 1].
                   - p-6: Memberi jarak (padding) agar konten tidak mepet ke pinggir layar.
                */
                <div className="flex-1 overflow-y-auto p-6">
                    {/* Komponen Dashboard, Orders, atau Customers akan muncul di sini[cite: 1]. */}
                    <Outlet />
                </div>
            </div>
        </div>
    );
}