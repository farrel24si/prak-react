// Import Outlet dari react-router-dom. 
// Outlet ini adalah 'komponen lubang' yang fungsinya buat nampung 
// komponen anak (Login, Register, Forgot) di dalam kerangka layout ini.
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
    return (
        /* 
           BAGIAN 1: BACKGROUND & LAYOUT UTAMA (TAILWIND)
           - min-h-screen: Minimal tinggi layar adalah 100% tinggi monitor (supaya background ga kepotong).
           - flex: Mengaktifkan mode Flexbox.
           - items-center: Membuat konten di dalamnya rata tengah secara VERTIKAL (atas-bawah).
           - justify-center: Membuat konten di dalamnya rata tengah secara HORIZONTAL (kiri-kanan).
           - bg-gray-100: Memberi warna abu-abu muda pada background seluruh layar.
        */
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            
            /* 
               BAGIAN 2: KOTAK PUTIH (WRAPPER FORM)
               - bg-white: Memberi warna putih pada kotak login.
               - p-8: Memberi padding (jarak dalam) sebesar 2rem di semua sisi.
               - rounded-2xl: Membuat sudut kotak jadi sangat melengkung (elegan).
               - shadow-md: Memberi efek bayangan halus supaya kotak terlihat melayang.
               - w-full max-w-md: Lebar kotak otomatis 100%, tapi tidak boleh lebih lebar dari ukuran 'medium' (sekitar 448px).
            */
            <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
                
                {/* LOGO BRAND */}
                <div className="flex items-center justify-center mb-6">
                    <h1 className="text-4xl font-poppins font-extrabold text-gray-800">
                        <span className="text-black">Sedap</span>
                        {/* Memberi aksen titik warna hijau sesuai brand */}
                        <span className="text-green-500">.</span>
                    </h1>
                </div>

                /* 
                   BAGIAN 3: TEMPAT KONTEN DINAMIS
                   Inilah bagian paling penting! Tag <Outlet/> ini akan otomatis berubah jadi 
                   halaman Login, Register, atau Forgot tergantung URL yang sedang dibuka.
                   Isinya nanti bakal "masuk" ke sini tanpa ngerusak logo atau footer.
                */
                <Outlet/>

                {/* FOOTER STATIS */}
                <p className="text-center text-sm text-gray-500 mt-6">
                    © 2025 Sedap Restaurant Admin Dashboard. All rights
                    reserved.
                </p>
            </div>
        </div>
    )
}
