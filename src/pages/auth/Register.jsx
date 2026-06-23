import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI } from "@/services/supabaseService";
import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";

export default function Register() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [formData, setFormData] = useState({
        full_name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (formData.password !== formData.confirmPassword) {
            setError("Password dan konfirmasi harus sama.");
            return;
        }

        setLoading(true);

        const { data, error: signError } = await authAPI.signUp({
            email: formData.email,
            password: formData.password,
            full_name: formData.full_name,
        });

        if (signError) {
            setError(signError.message || "Terjadi kesalahan pendaftaran.");
            setLoading(false);
            return;
        }

        setSuccess("Pendaftaran berhasil. Silakan login.");
        setLoading(false);
        navigate("/login");
    };

    return (
        <div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
                Create Your Account ✨
            </h2>

            {error && (
                <div className="bg-red-200 mb-5 p-5 text-sm font-light text-gray-600 rounded flex items-center border border-red-300">
                    <BsFillExclamationDiamondFill className="text-red-600 me-2 text-lg" />
                    {error}
                </div>
            )}
            {success && (
                <div className="bg-emerald-200 mb-5 p-5 text-sm font-light text-gray-600 rounded flex items-center border border-emerald-300">
                    {success}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="mb-5">
                    <label
                        htmlFor="full_name"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Full Name
                    </label>
                    <input
                        type="text"
                        id="full_name"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400"
                        placeholder="Your Name"
                        required
                    />
                </div>

                <div className="mb-5">
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Email Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400"
                        placeholder="you@example.com"
                        required
                    />
                </div>

                <div className="mb-5">
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400"
                        placeholder="********"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label
                        htmlFor="confirmPassword"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400"
                        placeholder="********"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"} text-white font-semibold py-2 px-4 rounded-lg transition duration-300`}
                >
                    {loading ? "Processing..." : "Register"}
                </button>
            </form>

            {/* Link ke Login */}
            <p className="text-center text-sm text-gray-500 mt-6">
                Sudah punya akun?{" "}
                <button
                    type="button"
                    onClick={() => navigate("/login")}
                    className="text-green-600 font-semibold hover:text-green-700 hover:underline transition-all"
                >
                    Login Sekarang
                </button>
            </p>
        </div>
    );
}
