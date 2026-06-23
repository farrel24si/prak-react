import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI } from "@/services/supabaseService";
import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";

export default function Login() {
    // === 1. HOOKS & STATE ===
    const navigate = useNavigate(); // Digunakan untuk navigasi antar halaman secara programmatik
    const [loading, setLoading] = useState(false); // State boolean untuk kontrol UI saat proses API
    const [error, setError] = useState(""); // State string untuk menampung pesan error dari server
    
    // State Object: Mengelompokkan input menjadi satu kesatuan agar lebih rapi
    const [dataForm, setDataForm] = useState({
        email: "",
        password: "",
    });

    // === 2. EVENT HANDLER (TWO-WAY BINDING) ===
    // Fungsi ini menangkap setiap ketikan user. 
    // Menggunakan [name]: value agar satu fungsi bisa menangani banyak input sekaligus.
    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setDataForm({
            ...dataForm, // Spread operator: Menjaga data lama agar tidak hilang
            [name]: value, // Computed property name: Update field yang sedang diketik
        });
    };

    // === 3. LOGIC INTEGRASI API ===
    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError("");

        const { data, error: authError } = await authAPI.signIn({
            email: dataForm.email,
            password: dataForm.password,
        });

        if (authError) {
            setError(authError.message || "Terjadi kesalahan autentikasi.");
            setLoading(false);
            return;
        }

        if (data?.session) {
            navigate("/");
        } else {
            setError("Login gagal. Silakan cek kembali data Anda.");
        }

        setLoading(false);
    };

    // === 4. CONDITIONAL RENDERING (UI LOGIC) ===
    // Menyimpan elemen JSX ke dalam variabel untuk ditampilkan jika syarat terpenuhi
    const errorInfo = error ? (
        <div className="bg-red-200 mb-5 p-5 text-sm font-light text-gray-600 rounded flex items-center border border-red-300">
            <BsFillExclamationDiamondFill className="text-red-600 me-2 text-lg" />
            {error}
        </div>
    ) : null;

    const loadingInfo = loading ? (
        <div className="bg-gray-200 mb-5 p-5 text-sm rounded flex items-center">
            <ImSpinner2 className="me-2 animate-spin text-lg" />
            Mohon Tunggu...
        </div>
    ) : null;

    return (
        <div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
                Welcome Back 👋
            </h2>

            {/* Menampilkan pesan error atau loading jika state-nya aktif */}
            {errorInfo}
            {loadingInfo}

            <form onSubmit={handleSubmit}>
                <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={dataForm.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-green-500 transition-all"
                        placeholder="you@example.com"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password" // 'name' harus sama dengan kunci di state dataForm
                        value={dataForm.password}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-green-500 transition-all"
                        placeholder="********"
                        required
                    />
                </div>
                
                {/* Tombol akan otomatis mati (disabled) jika sedang proses loading */}
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ${
                        loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600 shadow-md"
                    }`}
                >
                    {loading ? "Processing..." : "Login"}
                </button>
            </form>

            {/* Link ke Register */}
            <p className="text-center text-sm text-gray-500 mt-6">
                Belum punya akun?{" "}
                <button
                    type="button"
                    onClick={() => navigate("/register")}
                    className="text-green-600 font-semibold hover:text-green-700 hover:underline transition-all"
                >
                    Daftar Sekarang
                </button>
            </p>
        </div>
    );
}
