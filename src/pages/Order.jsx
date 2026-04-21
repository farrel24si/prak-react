import PageHeader from "../components/PageHeader";

export default function Order() {
  return (
    <div className="flex-1 overflow-y-auto bg-gray-50/50">
      {/* WAJIB: Tambahkan props title */}
      <PageHeader title="Orders" />
      
      <div className="p-6 text-center">
        <div className="bg-white p-10 rounded-3xl shadow-sm">
          <h3 className="text-gray-800 font-bold text-xl">Order List is Empty</h3>
          <p className="text-gray-400">You don't have any active orders right now.</p>
        </div>
      </div>
    </div>
  );
}