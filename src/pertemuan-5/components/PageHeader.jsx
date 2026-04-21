export default function PageHeader() {
  return (
    <div className="flex items-center justify-between p-6">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <div className="flex items-center gap-2 mt-2 text-sm font-medium">
          <span className="text-gray-400">Dashboard</span>
          <span className="text-gray-400">/</span>
          <span className="text-gray-800">Overview</span>
        </div>
      </div>
      
      <div id="action-button">
                <button id="add-button" className="bg-hijau text-white px-6 py-3 rounded-xl font-bold shadow-md hover:bg-green-600 transition">
                    + Add New Data
                </button>
            </div>
    </div>
  );
}