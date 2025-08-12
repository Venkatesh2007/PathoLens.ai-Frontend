import React from "react";
import { GeneInformation } from "./components/gene-information";
import HomePage from "./pages/home";

export default function App() {
  const sampleGene = {
    symbol: "BRCA1",
    name: "Breast cancer type 1 susceptibility protein",
    description: "DNA repair associated gene",
    chrom: "17",
    gene_id: "672",
  };

  const sampleGeneBounds = {
    min: 43044294,
    max: 43125483,
  };

  const sampleGeneDetail = {
    organism: {
      scientificname: "Homo sapiens",
      commonname: "Human",
    },
    genomicinfo: [
      { strand: "-" }
    ],
    summary:
      "The BRCA1 gene provides instructions for making a protein that is involved in repairing damaged DNA. Mutations can increase the risk of breast and ovarian cancer.",
  };

  return (
    <>
    <HomePage />
    <div className="p-4">
      <GeneInformation
        gene={sampleGene}
        geneBounds={sampleGeneBounds}
        geneDetail={sampleGeneDetail}
      />
    </div>
    </>
  );
}
