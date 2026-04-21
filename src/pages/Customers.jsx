import PageHeader from "../components/PageHeader";

export default function Customers() {
  // Jika stats kosong, kita bisa menampilkan pesan "No Data" atau mengisi data dummy
  const stats = []; 

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50/50">
      {/* WAJIB: Tambahkan props title */}
      <PageHeader title="Customers" />
      
      <div className="p-6">
        {stats.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((item) => (
               <div key={item.id}>{/* ... card content ... */}</div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 bg-white rounded-3xl border-2 border-dashed border-gray-200">
            <p className="text-gray-400 font-medium">No customers found. Click "Add New Customers" to start.</p>
          </div>
        )}
      </div>
    </div>
  );
}