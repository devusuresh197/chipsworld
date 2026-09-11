"use client";

import React, { useRef, useState } from "react";
import { UploadCloud, Image as ImageIcon, X, CheckCircle2, Sparkles, RefreshCw, ZoomIn } from "lucide-react";

// Built-in sample high-resolution microchip demonstration images
const SAMPLE_IMAGES = [
  {
    name: "Microcontroller Board Array",
    url: "/images/WhatsApp Image 2026-09-12 at 3.16.10 AM.jpeg",
    size: "2.4 MB",
  },
  {
    name: "Wafer Silicon Die Chips",
    url: "/images/WhatsApp Image 2026-09-12 at 3.12.46 AM.jpeg",
    size: "1.8 MB",
  },
  {
    name: "Integrated Circuit Assembly",
    url: "/images/potato.png",
    size: "3.1 MB",
  },
];

export default function ImageUploader({ imageFile, imagePreview, onImageChange, onClearImage }) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      processFile(file);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      processFile(file);
    }
  };

  const processFile = (file) => {
    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file (PNG, JPG, WEBP, etc.)");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      onImageChange({
        file: file,
        previewUrl: e.target.result,
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
      });
    };
    reader.readAsDataURL(file);
  };

  const handleSelectSample = (sample) => {
    onImageChange({
      file: null,
      previewUrl: sample.url,
      name: sample.name,
      size: sample.size,
    });
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept="image/*"
        className="hidden"
      />

      {!imagePreview ? (
        <div className="flex flex-col gap-3">
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`w-full min-h-[260px] rounded-2xl glass-card cursor-pointer p-6 flex flex-col items-center justify-center text-center transition-all duration-300 group ${
              isDragging
                ? "border-amber-400 bg-amber-950/40 ring-4 ring-amber-500/20 scale-[1.01]"
                : "hover:border-amber-500/60 hover:bg-slate-900/60"
            }`}
          >
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-amber-500/20 transition-all duration-300">
              <UploadCloud className="w-8 h-8 text-amber-400 group-hover:text-amber-300" />
            </div>

            <h3 className="text-base font-semibold text-white mb-1">
              <b><u>Adhyam chips count cheyyam</u></b>
            </h3>
            

            <button
              type="button"
              className="px-4 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-500/40 text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
            >
              <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
              Browse Local File
            </button>
          </div>

          {/* Sample Preset Images Trigger */}
          <div className="flex flex-col gap-2">
            <span className="text-[11px] font-semibold text-amber-200/80 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-orange-400" /> Or pick a sample chip photo to test:
            </span>
            <div className="grid grid-cols-3 gap-2">
              {SAMPLE_IMAGES.map((sample, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectSample(sample)}
                  className="group relative rounded-xl overflow-hidden border border-amber-500/20 hover:border-amber-400/60 h-16 flex items-end p-2 transition-all duration-200"
                >
                  <img
                    src={sample.url}
                    alt={sample.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 brightness-75 group-hover:brightness-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <span className="relative z-10 text-[10px] font-medium text-amber-100 line-clamp-1 text-left">
                    {sample.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Image Preview State */
        <div className="relative rounded-2xl glass-card p-4 overflow-hidden flex flex-col gap-3 group border border-amber-500/30">
          <div className="relative w-full h-64 sm:h-72 rounded-xl overflow-hidden bg-slate-950 flex items-center justify-center border border-amber-500/20">
            <img
              src={imagePreview.previewUrl}
              alt="Selected Chip Preview"
              className="max-h-full max-w-full object-contain rounded-lg shadow-xl"
            />
            
            <button
              type="button"
              onClick={onClearImage}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-900/80 hover:bg-rose-600/80 text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all duration-200 shadow-lg cursor-pointer"
              title="Remove image"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-amber-500/20 flex items-center gap-2 text-xs text-emerald-400 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Image Loaded</span>
            </div>
          </div>

          <div className="flex items-center justify-between px-1">
            <div className="truncate">
              <p className="text-sm font-semibold text-white truncate max-w-xs">{imagePreview.name}</p>
              <p className="text-[11px] text-amber-200/70">File size: {imagePreview.size}</p>
            </div>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 text-xs font-semibold flex items-center gap-1.5 border border-amber-500/30 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3 h-3 text-amber-400" />
              Replace
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
