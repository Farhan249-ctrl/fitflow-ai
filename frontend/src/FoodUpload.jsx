import { useState } from "react";

export default function FoodUpload() {
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const handleAnalyze = () => {
    console.log("Analyzing food image...");
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <h2 className="text-xl font-semibold text-slate-900 mb-2">
        Food Upload
      </h2>

      <p className="text-slate-500 text-sm mb-6">
        Upload a photo of your meal and let FitFlow AI analyze it.
      </p>

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="block w-full text-sm border border-slate-200 rounded-lg p-3"
      />

      {previewUrl && (
        <img
          src={previewUrl}
          alt="preview"
          className="mt-4 rounded-lg max-h-64"
        />
      )}

      <button
        onClick={handleAnalyze}
        disabled={!previewUrl}
        className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
      >
        Analyze Food
      </button>
    </div>
  );
}