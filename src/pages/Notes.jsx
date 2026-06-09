import { useState, useEffect } from "react";
import { notesAPI } from "../services/notesAPI";

// Import Komponen Reusable UI
import { Badge } from "@/components/ui/badge"; 
import GenericTable from "@/components/GenericTable";
import AlertBox from "@/components/AlertBox";
import LoadingSpinner from "@/components/LoadingSpinner";
import EmptyState from "@/components/EmptyState";

// Import Icon untuk Aksi Hapus
import { AiFillDelete } from "react-icons/ai";

export default function Notes() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [notes, setNotes] = useState([]);
  const [dataForm, setDataForm] = useState({
    title: "",
    content: "",
    status: "To Do", // Nilai default
  });

  // Load data saat pertama kali komponen di-render
  useEffect(() => {
    loadNotes();
  }, []);

  // Memanggil fetchNotes beserta error/loading handling
  const loadNotes = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await notesAPI.fetchNotes();
      setNotes(data);
    } catch (err) {
      setError("Gagal memuat catatan");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusVariant = (status) => {
    switch (status) {
      case "Done":
        return "secondary";     
      case "On Progress":
        return "default";     
      case "To Do":
      default:
        return "outline";       
    }
  };

  // Handle perubahan nilai input form
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

  // Handle form submission untuk menambahkan catatan baru
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      await notesAPI.createNote(dataForm);
      setSuccess("Catatan berhasil ditambahkan!");

      // Kosongkan Form setelah Berhasil
      setDataForm({ title: "", content: "", status: "To Do" });

      // Hilangkan pesan Success setelah 3 detik
      setTimeout(() => setSuccess(""), 3000);

      // Panggil Ulang loadNotes untuk menyegarkan tampilan data
      loadNotes();
    } catch (err) {
      setError(`Terjadi kesalahan: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Handle untuk aksi hapus data catatan
  const handleDelete = async (id) => {
    const konfirmasi = confirm("Yakin ingin menghapus catatan ini?");
    if (!konfirmasi) return;

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      await notesAPI.deleteNote(id);
      setSuccess("Catatan berhasil dihapus!");
      
      setTimeout(() => setSuccess(""), 3000);

      // Refresh data setelah berhasil dihapus
      loadNotes();
    } catch (err) {
      setError(`Terjadi kesalahan saat menghapus: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Title Application */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Notes App</h2>
        <p className="text-sm text-gray-500">Pertemuan 13 - Integrasi Backend as a Service (Supabase)</p>
      </div>

      {/* Tampilan Alert Box */}
      {error && <AlertBox type="error">{error}</AlertBox>}
      {success && <AlertBox type="success">{success}</AlertBox>}

      {/* Form Card */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-10">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Tambah Catatan Baru
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            value={dataForm.title}
            placeholder="Judul catatan"
            onChange={handleChange}
            required
            disabled={loading}
            className="w-full p-3 bg-gray-50 rounded-2xl border border-gray-200 focus:outline-none
                        focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all
                        duration-200"
          />

          <textarea
            name="content"
            value={dataForm.content}
            placeholder="Isi catatan"
            onChange={handleChange}
            required
            rows="2"
            disabled={loading}
            className="w-full p-3 bg-gray-50 rounded-2xl border border-gray-200 focus:outline-none
                        focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all
                        duration-200 resize-none"
          />

          {/* Input Select untuk Status Catatan */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-600 px-1">Status Catatan</label>
            <select
              name="status"
              value={dataForm.status}
              onChange={handleChange}
              disabled={loading}
              className="w-full p-3 bg-gray-50 rounded-2xl border border-gray-200 focus:outline-none
                          focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all
                          duration-200 text-gray-700"
            >
              <option value="To Do">To Do</option>
              <option value="On Progress">On Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold
                        rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500
                        focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed
                        transition-all duration-200 shadow-lg text-center"
          >
            {loading ? "Mohon Tunggu..." : "Tambah Data"}
          </button>
        </form>
      </div>

      {/* Notes Table Section */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800">
            Daftar Catatan ({notes.length})
          </h3>
        </div>

        {/* State Conditional Rendering untuk UX */}
        {loading && <LoadingSpinner text="Memuat catatan..." />}

        {!loading && notes.length === 0 && !error && (
          <EmptyState text="Belum ada catatan. Tambah catatan pertama!" />
        )}

        {!loading && notes.length === 0 && error && (
          <EmptyState text="Terjadi Kesalahan. Coba lagi nanti." />
        )}

        {!loading && notes.length > 0 ? (
          <GenericTable
            columns={["#", "Judul", "Isi Catatan", "Status", "Aksi"]}
            data={notes}
            renderRow={(note, index) => (
              <>
                <td className="px-6 py-4 font-medium text-gray-700 w-12">
                  {index + 1}.
                </td>
                <td className="px-6 py-4 font-semibold text-emerald-600">
                  {note.title}
                </td>
                <td className="px-6 py-4 max-w-xs text-gray-600 truncate">
                  {note.content}
                </td>
                <td className="px-6 py-4">
                  <Badge variant={getStatusVariant(note.status)}>
                    {note.status || "To Do"}
                  </Badge>
                </td>
                <td className="px-6 py-4 text-center w-20">
                  <button
                    onClick={() => handleDelete(note.id)}
                    disabled={loading}
                    title="Hapus Catatan"
                    className="p-1 rounded-full hover:bg-red-50 transition-colors disabled:opacity-50"
                  >
                    <AiFillDelete className="text-red-400 text-2xl hover:text-red-600 transition-colors" />
                  </button>
                </td>
              </>
            )}
          />
        ) : null}
      </div>
    </div>
  );
}