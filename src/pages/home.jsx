import { useEffect, useState } from "react";
import { getAvailableGenomes } from "../utils/genome-api";

export default function HomePage() {
  const [genomes, setGenomes] = useState([]);
  const [selectedGenome, setSelectedGenome] = useState("hg38");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenomeChange = (e) => {
    setSelectedGenome(e.target.value);
  };

  useEffect(() => {
    const fetchGenomes = async () => {
      try {
        setIsLoading(true);
        const data = await getAvailableGenomes();
        if (data.genomes && data.genomes["Human"]) {
          setGenomes(data.genomes["Human"]);
        }
      } catch (err) {
        setError("Failed to load genome data");
      } finally {
        setIsLoading(false);
      }
    };
    fetchGenomes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-6 py-4 flex items-center gap-3">
          <div className="relative">
            <h1 className="text-2xl font-bold tracking-wide text-[#0a66c2]">
              EVO<span className="text-orange-500">2</span>
            </h1>
            <div className="absolute -bottom-1 left-0 h-[3px] w-14 bg-orange-500 rounded-full"></div>
          </div>
          <span className="text-base font-light text-gray-600">
            Variant Analysis
          </span>
        </div>
      </header>

      {/* Main */}
      <main className="container mx-auto px-6 py-8">
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-200">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-gray-800">
              Genome Assembly
            </h2>
            <span className="px-3 py-1 rounded-full bg-blue-50 text-[#0a66c2] text-xs font-medium">
              Organism: Human
            </span>
          </div>

          {/* Dropdown */}
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Genome Assembly
          </label>
          <select
            value={selectedGenome}
            onChange={handleGenomeChange}
            disabled={isLoading}
            className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0a66c2] transition"
          >
            <option value="">
              {isLoading ? "Loading genomes..." : "Select genome assembly"}
            </option>
            {genomes.map((genome) => (
              <option key={genome.id} value={genome.id}>
                {genome.id} - {genome.name}
                {genome.active ? " (active)" : ""}
              </option>
            ))}
          </select>

          {/* Source Info */}
          {selectedGenome && !isLoading && (
            <p className="mt-3 text-sm text-gray-600 italic">
              Source:{" "}
              {
                genomes.find((genome) => genome.id === selectedGenome)
                  ?.sourceName
              }
            </p>
          )}

          {/* Error */}
          {error && (
            <p className="mt-4 text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">
              {error}
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
