export async function getAvailableGenomes() {
    //this is the url to fetch all the genomes from this url
  const apiUrl = "https://api.genome.ucsc.edu/list/ucscGenomes";
  //getting the data from the above url
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error("Failed to fetch genome list from UCSC API");
  }

  //getting the json data
  const genomeData = await response.json();
  if (!genomeData.ucscGenomes) {
    throw new Error("UCSC API error: missing ucscGenomes");
  }

  //getting only the specific genome data
  const genomes = genomeData.ucscGenomes;
  
  //creating a map for the above data so that the all the details about the specific organism will be displayed
  const structuredGenomes = {};

  


  //creating a map
  for (const genomeId in genomes) {
    //getting the every genome info on the basis of the genome id
    const genomeInfo = genomes[genomeId];
    const organism = genomeInfo.organism || "Other";

    //create a empty array if the organism not present in map
    if (!structuredGenomes[organism]) {
      structuredGenomes[organism] = [];
    }

    //if it is present in the map push the details mentioned belowed
    structuredGenomes[organism].push({
      id: genomeId,
      name: genomeInfo.description || genomeId,
      sourceName: genomeInfo.sourceName || genomeId,
      active: !!genomeInfo.active,
    });
  }

  //we are reuturning the map data
  return { genomes: structuredGenomes };
  //consists of {
    // organism: details about the genome id , genome description , sourceName and status--this could be array because for the same organism we may get  the different genes
    // }
}


// Function to get chromosomes for a specific genome from UCSC API
export async function getGenomeChromosomes(genomeId) {
  // Construct the API URL with the given genome ID
  const apiUrl = `https://api.genome.ucsc.edu/list/chromosomes?genome=${genomeId}`;

  // Fetch data from the UCSC API
  const response = await fetch(apiUrl);

  // If the response is not OK, throw an error
  if (!response.ok) {
    throw new Error("Failed to fetch chromosome list from UCSC API");
  }

  // Parse the JSON data from the API
  const chromosomeData = await response.json();

  // If chromosomes key is missing in the response, throw an error
  if (!chromosomeData.chromosomes) {
    throw new Error("UCSC API error: missing chromosomes");
  }

  // Initialize an empty array to store chromosome objects
  const chromosomes = [];

  // Loop through each chromosome entry returned by the API
  for (const chromId in chromosomeData.chromosomes) {
    // Skip chromosome IDs containing "_", "Un", or "random"
    if (
      chromId.includes("_") ||
      chromId.includes("Un") ||
      chromId.includes("random")
    ) {
      continue;
    }

    // Push chromosome object with name and size into the array
    chromosomes.push({
      name: chromId,
      size: chromosomeData.chromosomes[chromId],
    });
  }

  // Sort chromosomes in order: chr1, chr2, ..., chrX, chrY
  chromosomes.sort((a, b) => {
    // Remove "chr" prefix to compare numbers
    const anum = a.name.replace("chr", "");
    const bnum = b.name.replace("chr", "");

    // Check if both are numeric
    const isNumA = /^\d+$/.test(anum);
    const isNumB = /^\d+$/.test(bnum);

    // Sort numerically if both are numbers
    if (isNumA && isNumB) return Number(anum) - Number(bnum);

    // Ensure numeric chromosomes come before letter ones
    if (isNumA) return -1;
    if (isNumB) return 1;

    // For letters (X, Y), sort alphabetically
    return anum.localeCompare(bnum);
  });

  // Return the sorted chromosomes in an object
  return { chromosomes };
}

export async function searchGenes(query, genome) {
    // URL to fetch genes from NCBI
    const url = "https://clinicaltables.nlm.nih.gov/api/ncbi_genes/v3/search";

    // Adding params to the URL
    const params = new URLSearchParams({
        terms: query,
        df: "chromosome,symbol,description,map_location,type_of_gene",
        ef: "chromosome,symbol,description,map_location,type_of_gene,GenomicInfo,GeneID",
    });

    // Complete URL by combining both URL and params
    const response = await fetch(`${url}?${params}`);

    // Throws error if failed to fetch data from the API
    if (!response.ok) {
        throw new Error("NCBI API Error");
    }

    // Data contains the related gene by giving the ?terms=value
    const data = await response.json();

    // Results array
    const results = [];

    if (data[0] > 0) {
        // Contains null or values at index 2, in that value it contains GeneID
        const fieldMap = data[2];
        const geneIds = fieldMap.GeneId || [];

        // We will fetch max 10 or complete data present in the data[]
        for (let i = 0; i < Math.min(10, data[0]); ++i) {
            // Safety check to avoid out-of-bounds
            if (i < data[3].length) {
                try {
                    const display = data[3][i];
                    let chrom = display[0];
                    if (chrom && !chrom.startsWith("chr")) {
                        chrom = `chr${chrom}`;
                    }
                    results.push({
                        symbol: display[2],
                        name: display[3],
                        chrom: chrom,
                        description: display[3],
                        gene_id: geneIds[i] || "",
                    });
                } catch {
                    continue;
                }
            }
        }
    }

    return { query, genome, results };
}

export async function fetchGeneDetails(geneId) {
    try {
        const detailurl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=gene&id=${geneId}&retmode=json`;
        const detailsResponse = await fetch(detailurl);

        if (!detailsResponse.ok) {
            console.error(`Failed to fetch gene details: ${detailsResponse.statusText}`);
            return { geneDetails: null, geneBounds: null, initalRange: null };
        }

        const detailData = await detailsResponse.json();

        if (detailData.result && detailData.result[geneId]) {
            const detail = detailData.result[geneId];

            if (detail.genomicinfo && detail.genomicinfo.length > 0) {
                const info = detail.genomicinfo[0];

                const minPos = Math.min(info.chrstart, info.chrstop);
                const maxPos = Math.max(info.chrstart, info.chrstop);
                const bounds = { min: minPos, max: maxPos };

                const genesize = maxPos - minPos;
                const seqstart = minPos;
                const seqEnd = genesize > 10000 ? minPos + 10000 : maxPos;
                const range = { start: seqstart, end: seqEnd };

                return { geneDetails: detail, geneBounds: bounds, initalRange: range };
            }
        }

        return { geneDetails: null, geneBounds: null, initalRange: null };
    } catch (err) {
        return { geneDetails: null, geneBounds: null, initalRange: null };
    }
}
