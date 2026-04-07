import frameworkData from "./framework.json";
import { useState } from "react";

export default function FrameworkList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

  const filteredFrameworks = frameworkData.filter((framework) => {
    const matchesSearch =
      framework.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      framework.description.toLowerCase().includes(searchTerm.toLowerCase())||
      framework.details.developer.toLowerCase().includes(searchTerm.toLowerCase())||
      framework.details.releaseYear.toString().includes(searchTerm);

    const matchesTag = selectedTag ? framework.tags.includes(selectedTag) : true;

    return matchesSearch && matchesTag;
  });

  const allTags = Array.from(new Set(frameworkData.flatMap((f) => f.tags)));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 p-8 relative">
      <div className="max-w-7xl mx-auto">
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>

        <div className="relative">
          <h1 className="text-5xl font-bold text-center mb-4">
            <span className="bg-gradient-to-r from-blue-700 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
              Tech Frameworks
            </span>
          </h1>
          <p className="text-blue-600/70 text-center mb-12">
            Discover the best frameworks for your next project
          </p>

          <div className="flex flex-col md:flex-row gap-4 mb-8 max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search framework..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 p-3 border border-blue-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 outline-none transition-all"
            />

            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="p-3 border border-blue-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 outline-none bg-white transition-all"
            >
              <option value="">All Tags</option>
              {allTags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </div>

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
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full border border-blue-200"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <a
                    href={item.details.officialWebsite}
                    className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-800 transition-all duration-200 group"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>Explore Website</span>
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>

          
        </div>
      </div>
    </div>
  );
}