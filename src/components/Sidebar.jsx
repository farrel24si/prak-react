import { BsBasket } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { MdSpaceDashboard } from "react-icons/md";
import { IoIosList } from "react-icons/io";
import { RiCustomerServiceFill } from "react-icons/ri";
import { FaPlus, FaCube } from "react-icons/fa";

export default function Sidebar() {
  // Fungsi styling untuk NavLink aktif
  const menuClass = ({ isActive }) =>
    `flex cursor-pointer items-center rounded-xl p-4 transition-all
    ${
      isActive
        ? "text-hijau bg-green-200 font-extrabold"
        : "text-gray-600 hover:text-hijau hover:bg-green-200 hover:font-extrabold"
    }`;

  return (
    <div className="flex min-h-screen w-80 flex-col bg-white p-10 shadow-lg border-r border-gray-100">
      {/* Logo Section */}
      <div className="flex flex-col">
        <span className="font-poppins text-[48px] font-bold text-gray-900 leading-tight">
          Sedap<b className="text-hijau">.</b>
        </span>
        <span className="font-semibold text-gray-400">
          Modern Admin Dashboard
        </span>
      </div>

      {/* List Menu Section */}
      <div className="mt-10 flex-1">
        <ul className="space-y-3">
          <li>
            <NavLink to="/" className={menuClass}>
              <MdSpaceDashboard className="mr-4 text-xl" /> Dashboard
            </NavLink>
          </li>

          <li>
            <NavLink to="/orders" className={menuClass}>
              <IoIosList className="mr-4 text-xl" /> Orders
            </NavLink>
          </li>

          <li>
            <NavLink to="/customers" className={menuClass}>
              <RiCustomerServiceFill className="mr-4 text-xl" /> Customers
            </NavLink>
          </li>

          {/* Components */}
          <li>
            <NavLink to="/components" className={menuClass}>
              <FaCube className="mr-4 text-xl" /> Components
            </NavLink>
          </li>

          {/* Products */}
          <li>
            <NavLink to="/product" className={menuClass}>
              <BsBasket className="mr-4 text-xl" /> Products
            </NavLink>
          </li>

          <li>
            <NavLink to="/fitur-xyz" className={menuClass}>
              <BsBasket className="mr-4 text-xl" /> Fitur Xyz
            </NavLink>
          </li>

          {/* Error Pages */}
          <li>
            <NavLink to="/error-400" className={menuClass}>
              <span className="mr-4 text-xl font-bold text-red-500">!</span>
              Error 400
            </NavLink>
          </li>

          <li>
            <NavLink to="/error-401" className={menuClass}>
              <span className="mr-4 text-xl font-bold text-red-500">!</span>
              Error 401
            </NavLink>
          </li>

          <li>
            <NavLink to="/error-403" className={menuClass}>
              <span className="mr-4 text-xl font-bold text-red-500">!</span>
              Error 403
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Footer Section */}
      <div className="mt-auto">
        <div className="bg-hijau px-4 py-6 rounded-md shadow-lg mb-10 flex items-center justify-between">
          <div className="text-white text-sm max-w-[180px]">
            <span className="block leading-snug mb-3">
              Please organize your menus through button below!
            </span>

            <div className="flex justify-center items-center p-2 bg-white rounded-md cursor-pointer hover:bg-gray-100 transition-colors">
              <span className="text-gray-600 flex items-center font-bold text-xs">
                <FaPlus className="mr-2" /> Add Menus
              </span>
            </div>
          </div>

          <img
            className="w-16 rounded-full ml-2 object-cover border-2 border-white"
            src="/img/image11.png"
            alt="footer avatar"
          />
        </div>

        <div className="space-y-1">
          <span className="font-bold text-gray-400 block text-sm">
            Sedap Restaurant Admin Dashboard
          </span>

          <p className="font-light text-gray-400 text-xs">
            &copy; 2026 All Right Reserved
          </p>
        </div>
      </div>
    </div>
  );
}