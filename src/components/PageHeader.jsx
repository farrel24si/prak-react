export default function PageHeader({ title = "Dashboard" }) { // Destructuring + Default Value
  return (
    <div id="pageheader-container" className="flex items-center justify-between p-4 bg-white/50 backdrop-blur-sm">
      <div id="pageheader-left" className="flex flex-col">
        <span id="page-title" className="text-3xl font-semibold text-gray-900">
          {title}
        </span>
        <div id="breadcrumb-links" className="flex items-center font-medium space-x-2 mt-2">
          <span id="breadcrumb-home" className="text-gray-500">Dashboard</span>
          <span id="breadcrumb-separator" className="text-gray-500">/</span>
          <span id="breadcrumb-current" className="text-hijau">{title}</span> 
          {/* Sedikit improvisasi: warna hijau pada breadcrumb aktif */}
        </div>
      </div>

      <div id="action-button">
        <button 
          id="add-button" 
          className="bg-hijau text-white px-6 py-3 rounded-xl font-bold shadow-md hover:bg-green-600 transition transform active:scale-95"
        >
          + Add New {title}
        </button>
      </div>
    </div>
  );
}