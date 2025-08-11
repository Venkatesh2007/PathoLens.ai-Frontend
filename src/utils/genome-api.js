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
