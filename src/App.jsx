import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import "./assets/tailwind.css";
import Sidebar from './layouts/Sidebar';
import Header from './layouts/Header';
import Dashboard from './pages/Dashboard';
import { Route, Routes } from 'react-router-dom';
import Orders from './pages/Orders';
import Customers from './pages/Customers';
import NotFound from './pages/NotFound';
import ErrorPage from './pages/ErrorPage';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="flex min-h-screen bg-gray-50 font-barlow">
      <Sidebar />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Header />

        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/customers" element={<Customers />} />

          <Route path="*" element={<ErrorPage code="404" description="Halaman yang kamu cari tidak ditemukan atau sudah dipindahkan." image="https://cdni.iconscout.com/illustration/premium/thumb/error-404-4344461-3613889.png" />} />
          <Route path="/error-400" element={<ErrorPage code="400" description="Bad Request. Permintaan tidak dapat diproses oleh server." image="https://cdni.iconscout.com/illustration/premium/thumb/bad-request-4344458-3613886.png" />} />
          <Route path="/error-401" element={<ErrorPage code="401" description="Unauthorized. Kamu tidak memiliki akses ke halaman ini." image="https://cdni.iconscout.com/illustration/premium/thumb/unauthorized-access-4344456-3613884.png" />} />
          <Route path="/error-403" element={<ErrorPage code="403" description="Forbidden. Akses ke sumber daya ini ditolak." image="https://cdni.iconscout.com/illustration/premium/thumb/forbidden-4344457-3613885.png" />} />

          <Route path="/" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} /> {/* <-- ganti nama komponen ini */}
          <Route path="/customers" element={<Customers />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
