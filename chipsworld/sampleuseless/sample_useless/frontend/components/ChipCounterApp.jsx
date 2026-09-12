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

export default function ChipCounterApp({ onBack }) {
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

      const backendUrl = (process.env.NEXT_PUBLIC_BACKEND_URL || "https://chipsworld.vercel.app").replace(/\/$/, "");

      const response = await fetch(`${backendUrl}/count`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ detail: "Server error" }));
        throw new Error(errorData.detail || `Backend returned status ${response.status}`);
      }

      const data = await response.json();

      const rawUrl = data.annotated_image_url;
      const formattedAnnotatedUrl = rawUrl
        ? (rawUrl.startsWith("data:") || rawUrl.startsWith("http") ? rawUrl : `${backendUrl}${rawUrl}`)
        : null;

      setCountResult({
        totalChips: data.count,
        status: data.status,
        message: data.message,
        annotatedImageUrl: formattedAnnotatedUrl,
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
        err.message || `Could not connect to backend at ${backendUrl}.`
      );
    } finally {
      setIsCounting(false);
    }
  };

  return (
    <div className="min-h-screen w-full relative bg-gradient-to-b from-amber-950 via-orange-900 to-amber-950 text-amber-50 overflow-hidden font-sans flex flex-col justify-between">
      {/* Symmetric Background Ambient Glowing Orbs (Top & Bottom) */}
      <div className="absolute top-[-10%] left-[-10%] w-[550px] h-[550px] rounded-full bg-amber-500/25 blur-[140px] pointer-events-none" />
      <div className="absolute top-[-10%] right-[-10%] w-[550px] h-[550px] rounded-full bg-orange-600/25 blur-[140px] pointer-events-none" />
      <div className="absolute top-[45%] left-[25%] w-[500px] h-[500px] rounded-full bg-red-600/20 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[550px] h-[550px] rounded-full bg-orange-600/25 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[550px] h-[550px] rounded-full bg-amber-500/25 blur-[140px] pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 w-full flex flex-col items-center">
        <Header onBack={onBack} />

        <main className="w-full max-w-5xl mx-auto px-4 py-6 flex flex-col gap-8">
          {/* Hero Tagline */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold mb-1 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-orange-400" />
              
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
             <br className="hidden sm:inline" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-orange-400 to-red-400">
                The Secret Society of Potato Chips
              </span>
            </h2>
            <p className="text-sm text-amber-100/90 font-medium">
              Upload any photo of potato chips to count population, annotate bounding boxes, and analyze real-time chip dynamics.
            </p>
          </div>

          {/* Form Card */}
          <div ref={dropzoneRef} className="w-full glass-card rounded-3xl p-6 sm:p-8 flex flex-col gap-6 shadow-2xl border-2 border-amber-500/30 bg-gradient-to-br from-amber-950/80 via-slate-950/90 to-orange-950/80">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              {/* Left Column: Image Upload */}
              <div className="flex flex-col gap-3">
                <span className="text-xs font-semibold text-amber-200 uppercase tracking-wider flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-amber-400" />
                  Step 1: Input Chips Image
                </span>
                <ImageUploader
                  imageFile={imagePreview?.file}
                  imagePreview={imagePreview}
                  onImageChange={handleImageChange}
                  onClearImage={handleClearImage}
                />
              </div>

              {/* Right Column: AI Chip Showcase & Action Button */}
              <div className="flex flex-col gap-6 justify-between h-full">
                <div className="flex flex-col gap-3">
                  <span className="text-xs font-semibold text-amber-200 uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-orange-400" />
                    Step 2: AI Chip Detection Preview
                  </span>

                  {/* Showcase Image replacing model details */}
                  <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border-2 border-amber-500/30 group hover:scale-[1.02] transition-transform duration-300">
                    <img
                      src="/images/chip_feelings_talk.jpg"
                      alt="AI Chip Detection & Feelings Showcase"
                      className="w-full h-48 sm:h-52 object-cover rounded-2xl"
                    />
                  </div>
                </div>

                {/* Count Chips CTA */}
                <div className="pt-2 flex flex-col gap-3">
                  <button
                    type="button"
                    onClick={handleCountChips}
                    disabled={!imagePreview || isCounting}
                    className={`w-full py-4 px-6 rounded-2xl font-black text-base flex items-center justify-center gap-3 shadow-xl transition-all duration-300 ${
                      !imagePreview || isCounting
                        ? "bg-slate-800 text-slate-500 cursor-not-allowed border border-white/5"
                        : "glass-button-primary text-slate-950 cursor-pointer hover:scale-[1.01] active:scale-[0.99] shadow-[0_0_30px_rgba(245,158,11,0.4)] border-2 border-amber-200"
                    }`}
                  >
                    {isCounting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" />
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
                    <p className="text-[11px] text-center text-amber-300/70 font-medium">
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
              <div className="mt-4 pt-6 border-t border-amber-500/20 flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <h3 className="text-lg font-bold text-white">AI Detection Complete</h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleResetAll}
                      className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 text-xs font-semibold flex items-center gap-1.5 border border-amber-500/30 transition-colors shadow-sm cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                      Reset & Upload Another Image
                    </button>

                  
                  </div>
                </div>

                {/* Response Message */}
                <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-500/30 text-xs text-amber-200 flex items-center gap-2">
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
                  <div className="relative rounded-2xl bg-slate-950 p-4 border border-amber-500/30 overflow-hidden flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-amber-300 flex items-center gap-2">
                        <Eye className="w-4 h-4 text-orange-400" /> Real OpenCV Bounding Box Overlay
                      </span>
                      <a
                        href={countResult.annotatedImageUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] font-semibold text-amber-300 hover:text-white underline flex items-center gap-1"
                      >
                        Open Full Image
                      </a>
                    </div>

                    <div className="relative w-full rounded-xl overflow-hidden bg-slate-900 flex items-center justify-center p-2 border border-amber-500/20">
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
                    className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 hover:from-amber-500/30 hover:to-orange-500/30 text-amber-100 text-xs font-bold flex items-center gap-2 border border-amber-500/30 shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4 text-amber-400" />
                    Reset & Upload Another Image
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="relative z-10 w-full py-6 text-center text-xs text-amber-300/80 border-t border-amber-500/30 mt-12 bg-amber-950/80 backdrop-blur-md">
        Chip Population Counter &copy; {new Date().getFullYear()} &bull; Powered by Next.js & FastAPI Grounding DINO
      </footer>
    </div>
  );
}
