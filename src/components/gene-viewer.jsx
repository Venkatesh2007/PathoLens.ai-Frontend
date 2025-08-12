import React from "react";
import { ArrowLeft } from "lucide-react";

export default function GeneViewer({
  gene,
  geneId,
  onClose
}) {
  const [geneDetails, setGeneDetails] = useState(null);
  const [geneBounds, setGeneBounds] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [startPosition, setStartPosition] = useState("");
  const [endPosition, setEndPosition] = useState("");

  useEffect(() => {
    const initializeGeneData = async () => {
        setIsLoading(true);
        setError(null);
        setGeneDetails(null);
        setStartPosition("");
        setEndPosition("");

        if (!gene.gene_id) {
            setError("Gene ID is missing, cannot fetch details");
            setIsLoading(false);
            return;
        }

        try {
            const { geneDetails, geneBounds, initalRange } = await fetchGeneDetails(gene.gene_id);

            setGeneDetails(geneDetails);
            setGeneBounds(geneBounds);

            if (initalRange) {
                setStartPosition(String(initalRange.start));
                setEndPosition(String(initalRange.end));
                // Fetch gene sequence
            }
        } catch {
            setError("Failed to load gene information. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };
    initializeGeneData();
  }, [gene, genomeId]);

  return (
    <div className="space-y-6">
      <button
        onClick={onClose}
        className="flex items-center rounded-md px-3 py-1.5 text-sm font-medium text-[#3c4f3d] transition hover:bg-[#e9eeea]/70"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to results
      </button>
    </div>
  );
}
