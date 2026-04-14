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
      
      <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3 cursor-pointer hover:bg-gray-50 transition">
        <div className="bg-blue-50 p-2 rounded-lg text-biru">
          <input type="date" className="bg-transparent outline-none text-xs font-bold uppercase" defaultValue="2026-04-14" />
        </div>
        <span className="text-xs font-bold text-gray-500 pr-2">Filter Periode</span>
      </div>
    </div>
  );
}