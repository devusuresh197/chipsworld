"use client";

import React, { useState, useRef } from "react";
import Header from "./Header";
import ImageUploader from "./ImageUploader";
import PopulationCard from "./PopulationCard";
import ChipUniverse from "./ChipUniverse";
import ChipGossipNetwork from "./ChipGossipNetwork";
import ChipBook from "./ChipBook";
import ChipFeed from "./ChipFeed";
import { fireConfetti } from "@/utils/confetti";
import { Cpu, CheckCircle2, AlertTriangle, ArrowRight, ShieldCheck, Layers, Eye, RotateCcw, Sparkles } from "lucide-react";

export default function ChipCounterApp() {
  const [imagePreview, setImagePreview] = useState(null);
  const [isCounting, setIsCounting] = useState(false);
  const [countResult, setCountResult] = useState(null);
  const [error, setError] = useState(null);

  const dropzoneRef = useRef(null);

  const handleImageChange = (data) => {
    setImagePreview(data);
    setCountResult(null);
    setError(null);
  };

  const handleClearImage = () => {
    setImagePreview(null);
    setCountResult(null);
    setError(null);
  };

  const handleResetAll = () => {
    setImagePreview(null);
    setCountResult(null);
    setError(null);
    if (dropzoneRef.current) {
      dropzoneRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleCountChips = async () => {
    if (!imagePreview) return;

    setIsCounting(true);
    setCountResult(null);
    setError(null);

    try {
      const formData = new FormData();

      // Check if imagePreview has a raw File or if we need to convert preset image URL to blob
      if (imagePreview.file) {
        formData.append("file", imagePreview.file);
      } else if (imagePreview.previewUrl) {
        const blobRes = await fetch(imagePreview.previewUrl);
        const blob = await blobRes.blob();
        const file = new File([blob], imagePreview.name || "chip_sample.jpg", { type: blob.type || "image/jpeg" });
        formData.append("file", file);
      } else {
        throw new Error("No image file provided.");
      }

      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

      const response = await fetch(`${backendUrl}/count`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ detail: "Server error" }));
        throw new Error(errorData.detail || `Backend returned status ${response.status}`);
      }

      const data = await response.json();

      setCountResult({
        totalChips: data.count,
        status: data.status,
        message: data.message,
        annotatedImageUrl: data.annotated_image_url ? `${backendUrl}${data.annotated_image_url}` : null,
        chips: data.chips || [],
        boxes: data.boxes || [],
        scores: data.scores || [],
        image_size: data.image_size,
      });

      // Fire celebratory confetti cannon explosion!
      fireConfetti();

    } catch (err) {
      console.error("FastAPI Backend Error:", err);
      setError(
        err.message || "Could not connect to FastAPI backend. Make sure uvicorn is running on http://localhost:8000."
      );
    } finally {
      setIsCounting(false);
    }
  };

  return (
    <div className="min-h-screen w-full relative flex flex-col justify-between overflow-hidden">
      {/* Background ambient lighting orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full glow-orb-blue pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full glow-orb-purple pointer-events-none" />
      <div className="absolute top-[40%] right-[15%] w-[350px] h-[350px] rounded-full bg-indigo-600/10 blur-[90px] pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 w-full flex flex-col items-center">
        <Header />

        <main className="w-full max-w-5xl mx-auto px-4 py-6 flex flex-col gap-8">
          {/* Hero Tagline */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-1 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>AI Grounding DINO Object Detector</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Automated Potato Chip <br className="hidden sm:inline" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">
                Population Counter & Visual Network
              </span>
            </h2>
            <p className="text-sm text-slate-300">
              Upload any photo of potato chips to count population, annotate bounding boxes, and analyze real-time chip dynamics.
            </p>
          </div>

          {/* Form Card */}
          <div ref={dropzoneRef} className="w-full glass-card rounded-3xl p-6 sm:p-8 flex flex-col gap-6 shadow-2xl border border-white/15">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              {/* Left Column: Image Upload */}
              <div className="flex flex-col gap-3">
                <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-indigo-400" />
                  Step 1: Input Chip Image
                </span>
                <ImageUploader
                  imageFile={imagePreview?.file}
                  imagePreview={imagePreview}
                  onImageChange={handleImageChange}
                  onClearImage={handleClearImage}
                />
              </div>

              {/* Right Column: AI Model Settings & Action Button */}
              <div className="flex flex-col gap-6 justify-between h-full">
                <div className="flex flex-col gap-6">
                  <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                    Step 2: Model Configuration
                  </span>

                  {/* Operational Settings Card */}
                  <div className="rounded-2xl bg-slate-900/40 p-4 border border-white/5 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">Model Engine:</span>
                      <span className="text-indigo-300 font-semibold">IDEA-Research/grounding-dino-base</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">Backend Status:</span>
                      <span className="text-emerald-400 font-semibold">http://localhost:8000</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">Prompt:</span>
                      <span className="text-emerald-400 font-semibold">"potato chip."</span>
                    </div>
                  </div>
                </div>

                {/* Count Chips CTA */}
                <div className="pt-2 flex flex-col gap-3">
                  <button
                    type="button"
                    onClick={handleCountChips}
                    disabled={!imagePreview || isCounting}
                    className={`w-full py-4 px-6 rounded-2xl font-bold text-base flex items-center justify-center gap-3 shadow-xl transition-all duration-300 ${
                      !imagePreview || isCounting
                        ? "bg-slate-800 text-slate-500 cursor-not-allowed border border-white/5"
                        : "glass-button-primary text-white cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
                    }`}
                  >
                    {isCounting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Running Grounding DINO Model...</span>
                      </>
                    ) : (
                      <>
                        <Cpu className="w-5 h-5" />
                        <span>Count Chips</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  {!imagePreview && (
                    <p className="text-[11px] text-center text-slate-400">
                      Upload or select a sample image above to start counting.
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Error Message Display */}
            {error && (
              <div className="mt-4 p-4 rounded-2xl bg-rose-950/40 border border-rose-500/30 text-rose-200 text-xs flex items-start gap-3 animate-in fade-in duration-200">
                <AlertTriangle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-semibold text-rose-300">Backend Connection Failure</p>
                  <p className="text-rose-200/90">{error}</p>
                </div>
              </div>
            )}

            {/* Real Detection Results Section */}
            {countResult && (
              <div className="mt-4 pt-6 border-t border-white/10 flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <h3 className="text-lg font-bold text-white">AI Detection Complete</h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleResetAll}
                      className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 border border-white/10 transition-colors shadow-sm cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-indigo-400" />
                      Reset & Upload Another Image
                    </button>

                    <span className="text-xs text-indigo-300 bg-indigo-950/60 px-3 py-1.5 rounded-xl border border-indigo-500/30 font-medium">
                      Grounding DINO Model Inference
                    </span>
                  </div>
                </div>

                {/* Response Message */}
                <div className="p-3.5 rounded-xl bg-indigo-950/30 border border-indigo-500/20 text-xs text-indigo-200 flex items-center gap-2">
                  <span className="font-medium">{countResult.message}</span>
                </div>

                {/* Animated Population Results Card */}
                <PopulationCard
                  count={countResult.totalChips}
                />

                {/* Chip Universe Animated Dashboard */}
                <ChipUniverse
                  chips={countResult.chips}
                />

                {/* Chip Gossip Network (ChipNet) Live Social Feed */}
                <ChipGossipNetwork
                  chips={countResult.chips}
                  imageSize={countResult.image_size}
                />

                {/* ChipBook Social Media Directory Feed */}
                <ChipBook chips={countResult.chips} />

                {/* ChipFeed X/Instagram Social Timeline */}
                <ChipFeed chips={countResult.chips} />

                {/* OpenCV Real Annotated Image Display */}
                {countResult.annotatedImageUrl && (
                  <div className="relative rounded-2xl bg-slate-950 p-4 border border-emerald-500/30 overflow-hidden flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-emerald-400 flex items-center gap-2">
                        <Eye className="w-4 h-4" /> Real OpenCV Bounding Box Overlay
                      </span>
                      <a
                        href={countResult.annotatedImageUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] font-medium text-indigo-300 hover:text-white underline flex items-center gap-1"
                      >
                        Open Full Image
                      </a>
                    </div>

                    <div className="relative w-full rounded-xl overflow-hidden bg-slate-900 flex items-center justify-center p-2 border border-white/10">
                      <img
                        src={countResult.annotatedImageUrl}
                        alt="OpenCV Annotated Chip Detection Result"
                        className="max-h-[500px] w-auto object-contain rounded-lg shadow-2xl"
                      />
                    </div>
                  </div>
                )}

                {/* Bottom Reset Button */}
                <div className="flex justify-center pt-2">
                  <button
                    type="button"
                    onClick={handleResetAll}
                    className="px-6 py-3 rounded-2xl bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 text-white text-xs font-bold flex items-center gap-2 border border-white/10 shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4 text-indigo-400" />
                    Reset & Upload Another Image
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="relative z-10 w-full py-6 text-center text-xs text-slate-400 border-t border-white/5 mt-12 bg-slate-950/60 backdrop-blur-md">
        Chip Population Counter &copy; {new Date().getFullYear()} &bull; Powered by Next.js 15 & FastAPI Grounding DINO
      </footer>
    </div>
  );
}
