import { Outlet } from "react-router-dom";
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

export default function MainLayout(){
    return (
        <div className="flex min-h-screen bg-gray-50 font-barlow">
      <Sidebar />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Header />
        <Outlet/>
      </div>
    </div>
    )
}