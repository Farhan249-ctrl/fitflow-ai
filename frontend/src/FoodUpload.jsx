import { useState } from "react";

export default function FoodUpload({ onAnalysis }) {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [file, setFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setError(null);
    const url = URL.createObjectURL(selectedFile);
    setPreviewUrl(url);
    if (onAnalysis) onAnalysis(null);
  };

  const handleAnalyze = async () => {
    if (!file || isAnalyzing) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setIsAnalyzing(true);
      setError(null);

      const response = await fetch("http://127.0.0.1:8000/analyze-food", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to analyze food. Please try again.");
      }

      const data = await response.json();
      if (onAnalysis) onAnalysis(data);
    } catch (err) {
      console.error("Error:", err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const disabled = !file || isAnalyzing;

  return (
    <section className="group flex flex-col rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md md:p-6">
      <header className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
            AI Food Scanner
          </p>
          <p className="mt-1 text-sm text-slate-600">
            Upload a meal photo and let FitFlow AI decode its nutrition.
          </p>
        </div>
      </header>

      {/* Upload area */}
      <label className="group/zone relative flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50/80 px-4 py-8 text-center transition hover:border-blue-400 hover:bg-blue-50/40">
        <div className="flex flex-col items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600 shadow-sm">
            <span className="text-xl">📷</span>
          </div>
          <div className="space-y-0.5">
            <p className="text-sm font-medium text-slate-800">
              Drop your meal photo here
            </p>
            <p className="text-xs text-slate-500">
              or <span className="font-semibold text-blue-600">click to browse</span> from your device
            </p>
            <p className="text-[11px] text-slate-400">
              JPEG, PNG up to 10MB
            </p>
          </div>
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        />
      </label>

      {/* Preview */}
      {previewUrl && (
        <div className="mt-5 space-y-2 animate-fade-in">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-medium text-slate-700">Preview</span>
            <span>{file?.name}</span>
          </div>
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-900/90">
            <img
              src={previewUrl}
              alt="Food preview"
              className="max-h-72 w-full object-cover transition-transform duration-300 group-hover:scale-[1.01]"
            />
          </div>
        </div>
      )}

      {/* Error message */}
      {error && (
        <p className="mt-3 rounded-lg bg-rose-50 px-3 py-2 text-xs text-rose-700 ring-1 ring-rose-100">
          {error}
        </p>
      )}

      {/* Analyze button */}
      <button
        onClick={handleAnalyze}
        disabled={disabled}
        className={`mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-150
          hover:-translate-y-0.5 hover:shadow-lg hover:bg-blue-700
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-100
          disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-600 disabled:shadow-none disabled:transform-none`}
      >
        {isAnalyzing && (
          <span className="inline-flex h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
        )}
        <span>{isAnalyzing ? "Analyzing meal..." : "Analyze Food"}</span>
      </button>
    </section>
  );
}