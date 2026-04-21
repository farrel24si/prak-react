import { Link } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6 text-center">
      {/* Icon Ilustrasi */}
      <div className="bg-red-100 p-6 rounded-full mb-6">
        <FaExclamationTriangle className="text-6xl text-red-500" />
      </div>

      {/* Teks Pesan Error */}
      <h1 className="text-9xl font-black text-gray-200">404</h1>
      <h2 className="text-3xl font-bold text-gray-800 mt-4">Oops! Page Not Found</h2>
      <p className="text-gray-500 mt-2 max-w-md">
        Sepertinya halaman yang kamu cari tidak ada atau telah dipindahkan. 
        Mari kembali ke jalur yang benar.
      </p>

      {/* Tombol Kembali */}
      <Link
        to="/"
        className="mt-8 bg-hijau text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:bg-green-600 transition-all transform hover:scale-105"
      >
        Back to Dashboard
      </Link>

      {/* Footer Kecil */}
      <p className="mt-12 text-gray-400 text-xs font-medium">
        Sedap Restaurant Admin Dashboard &copy; 2025
      </p>
    </div>
  );
}