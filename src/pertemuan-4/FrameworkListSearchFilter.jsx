import frameworkData from "./framework.json";
import { useState } from "react";

export default function FrameworkListSearchFilter() {
  // Inisialisasi DataForm
  const [dataForm, setDataForm] = useState({
    searchTerm: "",
    selectedTag: "",
    searchDev: "",
  });

  // Inisialisasi Handle perubahan nilai input form
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

  // Filter logic - menggunakan dataForm.searchTerm dan dataForm.selectedTag
  const _searchTerm = dataForm.searchTerm.toLowerCase();
  const filteredFrameworks = frameworkData.filter((framework) => {
    const matchesSearch =
      framework.name.toLowerCase().includes(_searchTerm) ||
      framework.description.toLowerCase().includes(_searchTerm) ||
      framework.details.developer.toLowerCase().includes(_searchTerm) ||
      framework.details.releaseYear.toString().includes(_searchTerm);

    const matchesTag = dataForm.selectedTag
      ? framework.tags.includes(dataForm.selectedTag)
      : true;

    return matchesSearch && matchesTag;
  });
  // Get unique tags
  const allTags = Array.from(new Set(frameworkData.flatMap((f) => f.tags)));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 p-8 relative">
      <div className="max-w-7xl mx-auto">
        {/* Decorative elements */}
        <div className="fixed top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse pointer-events-none"></div>
        <div className="fixed bottom-20 right-10 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000 pointer-events-none"></div>
        
        <div className="relative">
          <h1 className="text-5xl font-bold text-center mb-4">
            <span className="bg-gradient-to-r from-blue-700 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
              Tech Frameworks
            </span>
          </h1>
          <p className="text-blue-600/70 text-center mb-8">
            Discover the best frameworks for your next project
          </p>

          {/* Search & Filter Section */}
          <div className="mb-8 max-w-2xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Input */}
              <div className="flex-1 relative">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  name="searchTerm"
                  placeholder="Search by name, description, developer, or year..."
                  value={dataForm.searchTerm}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-white/80 backdrop-blur-sm border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all text-gray-700 placeholder:text-blue-300"
                />
              </div>

              {/* Tag Filter Dropdown */}
              <div className="relative md:w-64">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                </svg>
                <select
                  name="selectedTag"
                  value={dataForm.selectedTag}
                  onChange={handleChange}
                  className="w-full pl-10 pr-10 py-3 bg-white/80 backdrop-blur-sm border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all appearance-none cursor-pointer text-gray-700"
                >
                  <option value="">All Tags</option>
                  {allTags.map((tag) => (
                    <option key={tag} value={tag}>
                      #{tag}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Results Counter */}
            <div className="text-center mt-3">
              <p className="text-sm text-blue-500/70">
                Showing {filteredFrameworks.length} of {frameworkData.length} frameworks
              </p>
            </div>
          </div>

          {/* Framework Grid */}
          {filteredFrameworks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredFrameworks.map((item) => (
                <div
                  key={item.id}
                  className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-blue-100"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h2 className="text-2xl font-bold text-blue-900">
                        {item.name}
                      </h2>
                      <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full text-white text-xs font-semibold shadow-sm">
                        {item.details.releaseYear}
                      </span>
                    </div>

                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {item.description}
                    </p>

                    <div className="mb-4 flex items-center gap-2">
                      <div className="w-1 h-6 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full"></div>
                      <p className="text-gray-700 text-sm">
                        <span className="font-semibold text-blue-800">Developer</span> • {item.details.developer}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-5">
                      {item.tags.map((tag, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setDataForm({
                              ...dataForm,
                              selectedTag: tag,
                            });
                          }}
                          className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full border border-blue-200 hover:bg-blue-100 hover:scale-105 transition-all duration-200 cursor-pointer"
                        >
                          #{tag}
                        </button>
                      ))}
                    </div>

                    <a
                      href={item.details.officialWebsite}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-800 transition-all duration-200 group/link"
                    >
                      <span>Explore Website</span>
                      <svg className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-20 bg-white/50 backdrop-blur-sm rounded-2xl border border-blue-100">
              <svg className="w-24 h-24 mx-auto mb-4 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-2xl font-bold text-blue-800 mb-2">No frameworks found</h3>
              <p className="text-blue-600/70">Try adjusting your search or filter</p>
              <button
                onClick={() => {
                  setDataForm({
                    searchTerm: "",
                    selectedTag: "",
                    searchDev: "",
                  });
                }}
                className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}