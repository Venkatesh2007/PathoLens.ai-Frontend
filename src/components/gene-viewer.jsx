import React from "react";
import { ArrowLeft } from "lucide-react";

export default function GeneViewer({ gene, geneId, onClose }) {
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
