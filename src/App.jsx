// Mengimpor React dan komponen Suspense. 
// Suspense wajib ada kalau kita pakai React.lazy() di bawah.
import React, { Suspense } from 'react';

// Routes: Komponen pembungkus utama untuk semua rute di aplikasi.
// Route: Komponen untuk mendefinisikan URL (path) dan halaman apa yang dimunculkan (element).
import { Routes, Route } from 'react-router-dom';

// === IMPORT LAYOUT ===
// Layout adalah "kerangka" halaman. 
import MainLayout from './layouts/MainLayout'; 
import AuthLayout from './layouts/AuthLayout'; 

// Import Komponen Loading yang akan muncul saat halaman sedang di-download
import Loading from './components/Loading';

// === IMPLEMENTASI LAZY LOADING ===
<<<<<<< HEAD
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Orders = React.lazy(() => import('./pages/Orders'));
const Customers = React.lazy(() => import('./pages/Customers'));
// Tambahan: Halaman Components dari Modul 10
const ComponentsPage = React.lazy(() => import('./pages/Components'));
=======
// React.lazy() digunakan agar file halaman (seperti Dashboard.jsx) 
// TIDAK didownload semua di awal saat user baru buka web.
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Orders = React.lazy(() => import('./pages/Orders'));
const Customers = React.lazy(() => import('./pages/Customers'));
const Product = React.lazy(() => import('./pages/Product'));

// Mengaktifkan ProductDetail untuk halaman detail
const ProductDetail = React.lazy(() => import('./pages/ProductDetail'));
>>>>>>> c98595aafd704375b439871690eccd96974a0e92

// Menerapkan Lazy Loading untuk Pages Auth
const Login = React.lazy(() => import('./pages/auth/Login'));
const Register = React.lazy(() => import('./pages/auth/Register'));
const Forgot = React.lazy(() => import('./pages/auth/Forgot'));

// Menerapkan Lazy Loading untuk Error Pages
const NotFound = React.lazy(() => import('./pages/NotFound'));
const ErrorPage = React.lazy(() => import('./pages/ErrorPage'));

export default function App() {
  return (
<<<<<<< HEAD
=======
    // <Suspense> menampilkan fallback <Loading /> selama komponen sedang dimuat
>>>>>>> c98595aafd704375b439871690eccd96974a0e92
    <Suspense fallback={<Loading />}>
      <Routes>
        
        {/* === KONSEP NESTED ROUTES: MAIN LAYOUT === */}
        <Route element={<MainLayout />}>
<<<<<<< HEAD
          <Route path="/" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/customers" element={<Customers />} />
          {/* Rute baru untuk Halaman Komponen */}
          <Route path="/components" element={<ComponentsPage />} />
        </Route>
=======
  <Route path="/" element={<Dashboard />} />
  <Route path="/orders" element={<Orders />} />
  <Route path="/customers" element={<Customers />} />
  
  {/* DAFTAR PRODUK */}
  <Route path="/product" element={<Product />} />
  
  {/* DETAIL PRODUK - Samakan dengan Link di ProductsPage */}
  <Route path="/product/:id" element={<ProductDetail />} /> 
</Route>
>>>>>>> c98595aafd704375b439871690eccd96974a0e92

        {/* === KONSEP NESTED ROUTES: AUTH LAYOUT === */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
        </Route>

        {/* === ERROR PAGES (TANPA LAYOUT) === */}
        <Route path="/error-400" element={<ErrorPage code="400" description="Bad Request. Permintaan tidak dapat diproses oleh server." image="https://cdni.iconscout.com/illustration/premium/thumb/bad-request-4344458-3613886.png" />} />
        <Route path="/error-401" element={<ErrorPage code="401" description="Unauthorized. Kamu tidak memiliki akses ke halaman ini." image="https://cdni.iconscout.com/illustration/premium/thumb/unauthorized-access-4344456-3613884.png" />} />
        <Route path="/error-403" element={<ErrorPage code="403" description="Forbidden. Akses ke sumber daya ini ditolak." image="https://cdni.iconscout.com/illustration/premium/thumb/forbidden-4344457-3613885.png" />} />
        
<<<<<<< HEAD
        {/* Halaman 404 Not Found */}
=======
        {/* Tangkap semua URL yang tidak terdaftar */}
>>>>>>> c98595aafd704375b439871690eccd96974a0e92
        <Route path="*" element={<NotFound />} />

      </Routes>
    </Suspense>
  );
}