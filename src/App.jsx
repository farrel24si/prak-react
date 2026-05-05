// Mengimpor React dan komponen Suspense. 
// Suspense wajib ada kalau kita pakai React.lazy() di bawah.
import React, { Suspense } from 'react';

// Routes: Komponen pembungkus utama untuk semua rute di aplikasi.
// Route: Komponen untuk mendefinisikan URL (path) dan halaman apa yang dimunculkan (element).
import { Routes, Route } from 'react-router-dom';

// === IMPORT LAYOUT ===
// Layout adalah "kerangka" halaman. 
import MainLayout from './layouts/MainLayout'; // Kerangka untuk halaman ber-sidebar
import AuthLayout from './layouts/AuthLayout'; // Kerangka untuk halaman form di tengah layar

// Import Komponen Loading yang akan muncul saat halaman sedang di-download
import Loading from './components/Loading';

// === IMPLEMENTASI LAZY LOADING ===
// React.lazy() digunakan agar file halaman (seperti Dashboard.jsx) 
// TIDAK didownload semua di awal saat user baru buka web.
// Halaman baru akan didownload SAAT user mengklik menu tersebut. 
// Ini bikin performa aplikasi jauh lebih cepat (tidak berat di awal).
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Orders = React.lazy(() => import('./pages/Orders'));
const Customers = React.lazy(() => import('./pages/Customers'));

// Menerapkan Lazy Loading untuk Pages Auth
const Login = React.lazy(() => import('./pages/auth/Login'));
const Register = React.lazy(() => import('./pages/auth/Register'));
const Forgot = React.lazy(() => import('./pages/auth/Forgot'));

// Menerapkan Lazy Loading untuk Error Pages
const NotFound = React.lazy(() => import('./pages/NotFound'));
const ErrorPage = React.lazy(() => import('./pages/ErrorPage'));

export default function App() {
  return (
    // <Suspense> adalah "jaring pengaman" untuk Lazy Loading.
    // Properti 'fallback' memberitahu React: "Tampilkan komponen <Loading /> ini 
    // selama halaman aslinya (misal: Dashboard) masih dalam proses download!"
    <Suspense fallback={<Loading />}>
      <Routes>
        
        {/* === KONSEP NESTED ROUTES: MAIN LAYOUT === */}
        {/* Route induk ini TIDAK PUNYA 'path', tapi punya 'element={<MainLayout/>}'.
            Artinya, semua Route anak di dalamnya akan dibungkus oleh MainLayout.
            Nantinya, halaman Dashboard/Orders/Customers akan masuk ke dalam tag <Outlet /> 
            yang ada di dalam file MainLayout.jsx. */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/customers" element={<Customers />} />
        </Route>

        {/* === KONSEP NESTED ROUTES: AUTH LAYOUT === */}
        {/* Sama seperti di atas, ini adalah Route induk untuk Layout Otentikasi.
            Halaman Login, Register, dan Forgot akan dirender ke dalam <Outlet /> 
            yang ada di file AuthLayout.jsx (sehingga posisinya ada di dalam kotak putih tengah layar). */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
        </Route>

        {/* === ERROR PAGES (TANPA LAYOUT) === */}
        {/* Perhatikan bahwa Route error ini berada DI LUAR Route MainLayout & AuthLayout.
            Kenapa? Karena halaman error biasanya didesain full-screen. 
            Kita tidak mau halaman error malah muncul di dalam kotak login 
            atau di sebelah sidebar. Jadi dia dibiarkan berdiri sendiri tanpa induk pembungkus. */}
        <Route path="/error-400" element={<ErrorPage code="400" description="Bad Request. Permintaan tidak dapat diproses oleh server." image="https://cdni.iconscout.com/illustration/premium/thumb/bad-request-4344458-3613886.png" />} />
        <Route path="/error-401" element={<ErrorPage code="401" description="Unauthorized. Kamu tidak memiliki akses ke halaman ini." image="https://cdni.iconscout.com/illustration/premium/thumb/unauthorized-access-4344456-3613884.png" />} />
        <Route path="/error-403" element={<ErrorPage code="403" description="Forbidden. Akses ke sumber daya ini ditolak." image="https://cdni.iconscout.com/illustration/premium/thumb/forbidden-4344457-3613885.png" />} />
        
        {/* Route dengan path="*" artinya "Tangkap semua URL yang tidak terdaftar di atas". 
            Ini adalah cara standar React Router untuk membuat halaman 404 Not Found. */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </Suspense>
  );
}