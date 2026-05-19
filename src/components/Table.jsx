export default function Table({ headers, children }) {
  return (
    <div className="overflow-x-auto rounded-xl shadow-sm border border-gray-200">
      <table className="w-full text-left text-sm text-gray-600">
        <thead className="bg-gray-100 text-gray-800 font-bold">
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="px-4 py-3 border-b">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {children}
        </tbody>
      </table>
    </div>
  );
}