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

// Import Route Guard untuk proteksi route
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

// Import Komponen Loading yang akan muncul saat halaman sedang di-download
import Loading from './components/Loading';
import FiturXyz from './pages/FiturXyz';

// === IMPLEMENTASI LAZY LOADING ===
// React.lazy() digunakan agar file halaman (seperti Dashboard.jsx) 
// TIDAK didownload semua di awal saat user baru buka web.
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Orders = React.lazy(() => import('./pages/Orders'));
const Customers = React.lazy(() => import('./pages/Customers'));
const Notes = React.lazy(() => import('./pages/Notes'));

// Tambahan: Halaman Components dari Modul 10
const ComponentsPage = React.lazy(() => import('./pages/Components'));

// Halaman Produk & Detail Produk
const Product = React.lazy(() => import('./pages/Product'));
const ProductDetail = React.lazy(() => import('./pages/ProductDetail'));

// Menerapkan Lazy Loading untuk Pages Auth
const Login = React.lazy(() => import('./pages/auth/Login'));
const Register = React.lazy(() => import('./pages/auth/Register'));
const Forgot = React.lazy(() => import('./pages/auth/Forgot'));

// Menerapkan Lazy Loading untuk Error Pages
const NotFound = React.lazy(() => import('./pages/NotFound'));
const ErrorPage = React.lazy(() => import('./pages/ErrorPage'));

export default function App() {
  return (
    // <Suspense> menampilkan fallback <Loading /> selama komponen sedang dimuat
    <Suspense fallback={<Loading />}>
      <Routes>
        
        {/* === KONSEP NESTED ROUTES: MAIN LAYOUT UNTUK AUTHENTIKASI (MEMBER + ADMIN) === */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/fitur-xyz" element={<FiturXyz />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/components" element={<ComponentsPage />} />
          </Route>
        </Route>

        {/* === KONSEP NESTED ROUTES: ADMIN ONLY (PRODUCT, CUSTOMERS) === */}
        <Route element={<AdminRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/product" element={<Product />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/customers" element={<Customers />} />
          </Route>
        </Route>

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
        
        {/* Halaman 404 Not Found / Tangkap semua URL yang tidak terdaftar */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </Suspense>
  );
}