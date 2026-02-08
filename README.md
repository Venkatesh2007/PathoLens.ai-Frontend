# PathoLens.ai Frontend (EVO2 Variant Analysis)

## 🧬 Project Overview
PathoLens.ai is a comprehensive genomic analysis platform designed to visualize gene sequences and predict the pathogenicity of Single Nucleotide Variants (SNVs) using advanced AI models. The frontend provides an immersive 3D introduction and a powerful dashboard for researchers to browse genomes, search for specific genes, and perform real-time variant analysis.

## ✨ Key Features
- **Immersive 3D Landing Page**: A scroll-driven storytelling experience explaining DNA concepts using `Three.js` and `GSAP`.
- **Genome Browsing**: Support for multiple genome assemblies (e.g., hg38, hg19) sourced directly from UCSC Genome Browser.
- **Gene Search**: Integrated integration with NCBI APIs to find specific genes (e.g., BRCA1) and mapped to chromosomal locations.
- **Sequence Visualization**: Interactive DNA sequence viewer with color-coded nucleotides and navigation slider.
- **AI-Powered Analysis**: Real-time prediction of variant pathogenicity (Benign vs. Pathogenic) using a custom inference backend hosted on Modal.
- **ClinVar Integration**: Automatic retrieval and cross-referencing of known clinical variants from the ClinVar database.

## 🛠️ Technology Stack
- **Framework**: React 18, Vite
- **Styling**: Tailwind CSS, Radix UI Primitives
- **Animations & 3D**: 
  - `@react-three/fiber` (React wrapper for Three.js)
  - `@react-three/drei` (Helpers for R3F)
  - `GSAP` (ScrollTrigger animations)
  - `Framer Motion` (UI transitions)
- **State Management**: React Hooks (`useState`, `useEffect`, `useContext`)
- **Routing**: `react-router-dom`

## 📁 Project Structure

```bash
src/
├── components/           # Reusable UI components
│   ├── ui/               # Basic atomic components (buttons, inputs - likely shadcn/ui inspired)
│   ├── gene-viewer.jsx   # Main container for gene analysis views
│   ├── gene-sequence.jsx # Renders the ATGC sequence string with interactions
│   ├── variant-analysis.jsx # Interface for AI prediction input/output
│   ├── known-variants.jsx # Displays ClinVar data
│   └── SplashScreen.jsx  # Initial loading animation
├── pages/
│   ├── landingPage.jsx   # The 3D scroll experience
│   └── home.jsx          # The main dashboard application
├── utils/
│   ├── genome-api.js     # Centralized API service (UCSC, NCBI, Custom Backend)
│   └── coloring-utils.jsx # Helpers for DNA color coding
└── App.jsx               # Main router and layout configuration
```

## 🚀 Getting Started

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Start Development Server**
    ```bash
    npm run dev
    ```

3.  **Build for Production**
    ```bash
    npm run build
    ```

## 🔗 APIs & Integrations
This project connects to several external services:
1.  **UCSC Genome Browser API**: Fetches active genomes, chromosomal data, and raw DNA sequences.
2.  **NCBI Entrez API (E-utilities)**: Used for searching gene symbols and fetching metadata/ClinVar records.
3.  **Custom Modal.run Backend**: Hosting the EVO2 deep learning model for variant effect prediction.