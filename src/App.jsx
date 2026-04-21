import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import "./assets/tailwind.css";
import Sidebar from './layouts/Sidebar';
import Header from './layouts/Header';
import Dashboard from './pages/Dashboard';
import { Route, Routes } from 'react-router-dom';
import Order from './pages/Order';
import Customers from './pages/Customers';
import NotFound from './pages/NotFound';

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
        <Route path="/order" element={<Order />} />
        <Route path="/customers" element={<Customers />} />
    </Routes>
      </div>
    </div>
  )
}

export default App
