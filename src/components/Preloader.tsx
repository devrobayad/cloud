import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { dataStore } from "../utils/dataStore";

interface PreloaderProps {
  onComplete?: () => void;
  key?: string | number;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [meta, setMeta] = useState(() => dataStore.getSiteMetadata());
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Listen for metadata changes
    const handleUpdate = () => {
      setMeta(dataStore.getSiteMetadata());
    };
    window.addEventListener("datastore-update", handleUpdate);
    return () => window.removeEventListener("datastore-update", handleUpdate);
  }, []);

  const preloaderEnabled = meta.preloaderEnabled !== false; // Default: true
  const preset = meta.preloaderPreset || "circle";
  const customLogo = meta.preloaderLogo;
  const duration = meta.preloaderDuration || 1200;

  // Simulate progress
  useEffect(() => {
    if (!preloaderEnabled) {
      if (onComplete) onComplete();
      return;
    }

    const intervalTime = duration / 100;
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 1;
      });
    }, intervalTime);

    const timeout = setTimeout(() => {
      setVisible(false);
      if (onComplete) {
        onComplete();
      }
    }, duration + 200); // Allow fadeout transition

    return () => {
      clearInterval(timer);
      clearTimeout(timeout);
    };
  }, [preloaderEnabled, duration, onComplete]);

  if (!preloaderEnabled || !visible) return null;

  // Custom logo or Fallback Initials
  const HeaderConfig = dataStore.getHeaderConfig();
  const logoToShow = customLogo || HeaderConfig.logoUrl;

  return (
    <div className="fixed inset-0 z-[10000] bg-slate-900 flex flex-col items-center justify-center text-white select-none transition-all duration-500 ease-in-out">
      
      {/* Decorative ambient backend gradients */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-indigo-600/10 blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-blue-600/10 blur-3xl" />

      {/* Main Container */}
      <div className="relative z-10 flex flex-col items-center justify-center max-w-sm w-full text-center px-6 space-y-6">
        
        {/* Logo container */}
        {logoToShow ? (
          <div className="relative flex items-center justify-center w-24 h-24 mb-2">
            <img 
              referrerPolicy="no-referrer"
              src={logoToShow} 
              alt="Preloader Logo" 
              className={`w-20 h-20 object-contain rounded-xl ${
                preset === "pulse" ? "animate-pulse" : ""
              }`}
            />
            {/* Premium Glowing Effect overlay */}
            <div className="absolute inset-0 bg-indigo-500/10 rounded-full blur-xl animate-pulse" />
          </div>
        ) : null}

        {/* Dynamic Preloader Animations */}
        <div className="flex items-center justify-center h-16">
          {preset === "circle" && (
            <div className="relative flex items-center justify-center">
              <Loader2 className="w-12 h-12 text-indigo-500 animate-spin" />
              <div className="absolute w-8 h-8 rounded-full border border-dashed border-blue-400 animate-spin [animation-direction:reverse]" />
            </div>
          )}

          {preset === "pulse" && (
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-indigo-500 animate-ping" />
              <span className="text-xs font-mono font-bold text-slate-400 tracking-wider">LOADING...</span>
            </div>
          )}

          {preset === "bars" && (
            <div className="flex items-end gap-1 h-8">
              <div className="w-1 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.1s] h-6" />
              <div className="w-1 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.2s] h-8" />
              <div className="w-1 bg-blue-400 rounded-full animate-bounce [animation-delay:0.3s] h-5" />
              <div className="w-1 bg-blue-500 rounded-full animate-bounce [animation-delay:0.4s] h-7" />
              <div className="w-1 bg-indigo-600 rounded-full animate-bounce [animation-delay:0.5s] h-4" />
            </div>
          )}

          {preset === "dots" && (
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-indigo-500 animate-bounce [animation-delay:-0.3s]" />
              <div className="w-3 h-3 rounded-full bg-blue-400 animate-bounce [animation-delay:-0.15s]" />
              <div className="w-3 h-3 rounded-full bg-indigo-400 animate-bounce" />
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
