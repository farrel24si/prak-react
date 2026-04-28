import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import "./assets/tailwind.css";

const Dashboard = React.lazy(() => import("./pages/Dashboard"))
const Customers = React.lazy(() => import("./pages/Customers"))
const Orders = React.lazy(() => import("./pages/Orders"))
const NotFound = React.lazy(() => import("./pages/NotFound"))
const ErrorPage = React.lazy(() => import("./pages/ErrorPage"))
const MainLayout = React.lazy(() => import("./layouts/MainLayout"))
const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"))
const Login = React.lazy(() => import("./pages/auth/login"))
const Register = React.lazy(() => import("./pages/auth/Register"))
const Forgot = React.lazy(() => import("./pages/auth/Forgot"))

// const login = React.lazy(() => import("./pages/auth/login'"))
// const Register = React.lazy(() => import("./pages/auth/Register'"))
// const Forgot = React.lazy(() => import("./pages/auth/Forgot'"))
// import Orders from './pages/Orders';
// import Customers from './pages/Customers';
// import NotFound from './pages/NotFound';
// import ErrorPage from './pages/ErrorPage';
// import MainLayout from './layouts/MainLayout';
// import AuthLayout from './layouts/AuthLayout';
// import Login from './pages/auth/login';
// import Register from './pages/auth/Register';
// import Forgot from './pages/auth/Forgot';

function App() {
  const [count, setCount] = useState(0)

  return (
 

    <Routes>
        <Route element={<MainLayout/>}>
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
        </Route>

        <Route element={<AuthLayout/>}>
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/forgot" element={<Forgot/>} />
        </Route>
    </Routes>

  )
}

export default App
