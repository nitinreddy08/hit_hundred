import { useRef, useState, useEffect } from "react";
import { toPng } from "html-to-image";
import { Download, Share2, X, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
// import downloadIcon from "../images/download.png";

const ShareCard = ({ isOpen, onClose, dailyLog, profile, totalNutrition }) => {
  const cardRef = useRef(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [customBgImage, setCustomBgImage] = useState(null);
  const fileInputRef = useRef(null);
  const [cardScale, setCardScale] = useState(0.35);
  const [isDesktop, setIsDesktop] = useState(true);

  // Adjust card scale and detect desktop for mobile - Desktop stays at 0.35
  useEffect(() => {
    const updateScale = () => {
      const desktop = window.innerWidth >= 768;
      setIsDesktop(desktop);
      setCardScale(desktop ? 0.35 : 0.28);
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  if (!isOpen) return null;

  // Helper: resolve range {min,max} to midpoint, or number
  const resolveRequired = (req) => {
    if (req && typeof req === "object") {
      const min = Number(req.min ?? 0);
      const max = Number(req.max ?? min);
      if (Number.isFinite(min) && Number.isFinite(max)) return (min + max) / 2;
      return Number(min) || 0;
    }
    return Number(req) || 0;
  };

  // Calculate overall progress across calories, protein, carbs, fat, fiber, and creatine
  const calculateProgress = () => {
    if (!profile || !profile.macros || !totalNutrition) return 0;

    const targets = [
      {
        value: Number(totalNutrition?.calories) || 0,
        goal: resolveRequired(profile.macros?.calories),
      },
      {
        value: Number(totalNutrition?.protein) || 0,
        goal: resolveRequired(profile.macros?.protein),
      },
      {
        value: Number(totalNutrition?.carbs) || 0,
        goal: resolveRequired(profile.macros?.carbs),
      },
      {
        value: Number(totalNutrition?.fat) || 0,
        goal: resolveRequired(profile.macros?.fat),
      },
      {
        value: Number(totalNutrition?.fiber) || 0,
        goal: resolveRequired(profile.macros?.fiber),
      },
      {
        value: Number(totalNutrition?.creatine) || 0,
        goal: resolveRequired(profile.fats?.creatine),
      },
    ];

    const ratios = targets
      .map(({ value, goal }) => {
        if (!goal || goal <= 0) return null;
        const pct = (value / goal) * 100;
        if (!isFinite(pct)) return 0;
        return Math.max(0, Math.min(100, pct));
      })
      .filter((v) => v !== null);

    if (ratios.length === 0) return 0;

    const avg = ratios.reduce((sum, v) => sum + v, 0) / ratios.length;
    return Math.min(100, Math.round(avg));
  };

  const overallProgress = calculateProgress();
  const todayDate = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  // Handle custom background image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCustomBgImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Generate and download image
  const handleDownload = async () => {
    if (!cardRef.current) return;

    setIsGenerating(true);
    try {
      // Temporarily remove scale for export
      const originalTransform = cardRef.current.style.transform;
      cardRef.current.style.transform = "scale(1)";

      const dataUrl = await toPng(cardRef.current, {
        quality: 1.0,
        pixelRatio: 2,
        backgroundColor: customBgImage ? null : "#000000",
        width: 1080,
        height: 1350,
      });

      // Restore scale
      cardRef.current.style.transform = originalTransform;

      const link = document.createElement("a");
      link.download = `hit-hundred-${new Date().getTime()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Failed to generate image:", error);
      cardRef.current.style.transform = "scale(0.44)";
    } finally {
      setIsGenerating(false);
    }
  };

  // Share functionality
  const handleShare = async () => {
    if (!cardRef.current) return;

    setIsGenerating(true);
    try {
      // Temporarily remove scale for export
      const originalTransform = cardRef.current.style.transform;
      cardRef.current.style.transform = "scale(1)";

      const blob = await toPng(cardRef.current, {
        quality: 1.0,
        pixelRatio: 2,
        backgroundColor: "#000000",
        width: 1080,
        height: 1350,
      }).then((dataUrl) => {
        return fetch(dataUrl).then((res) => res.blob());
      });

      // Restore scale
      cardRef.current.style.transform = originalTransform;

      const file = new File([blob], "hit-hundred-stats.png", {
        type: "image/png",
      });

      if (navigator.share && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: "Hit Hundred - Nutrition Stats",
          text: `Hit ${overallProgress}% of my daily nutrition goals! 💪🔥`,
        });
      } else {
        // Fallback to download
        handleDownload();
      }
    } catch (error) {
      console.error("Failed to share:", error);
      cardRef.current.style.transform = "scale(0.44)";
      handleDownload(); // Fallback
    } finally {
      setIsGenerating(false);
    }
  };

  const getProgressEmoji = () => {
    if (overallProgress >= 90) return "🔥";
    if (overallProgress >= 70) return "💪";
    if (overallProgress >= 50) return "✨";
    return "logo"; // Special case for logo
  };

  const getProgressMessage = () => {
    if (overallProgress >= 90) return "Crushing it!";
    if (overallProgress >= 70) return "On track";
    if (overallProgress >= 50) return "Getting there";
    return "Keep going";
  };

  return (
    <div className="fixed inset-0 z-50 overflow-auto md:overflow-hidden bg-black/90 backdrop-blur-sm">
      {/* Modal Container - Mobile first: p-2, scales to p-6 on desktop */}
      <div className="flex min-h-full items-center justify-center p-2 md:p-6">
        <div className="relative bg-gradient-to-br from-slate-900 to-black rounded-xl md:rounded-3xl shadow-2xl max-w-5xl mx-auto w-full p-3 md:p-5">
          {/* Close Button - Mobile first: smaller, scales up on desktop */}
          <button
            onClick={onClose}
            className="absolute top-2 right-2 md:top-4 md:right-4 p-1.5 md:p-2 hover:bg-red-500/20 rounded-full transition-colors z-50"
          >
            <X className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </button>

          {/* Title - Hide on mobile, show on desktop (unchanged on desktop) */}
          <div className="mb-2 md:mb-3 hidden md:block">
            <h2 className="text-xl font-bold text-white mb-1">
              Share Your Progress
            </h2>
            <p className="text-xs text-gray-400">
              Download or share to social media
            </p>
          </div>

          {/* Main Content - Mobile: flex-col, Desktop: flex-row (unchanged on desktop) */}
          <div className="flex flex-col md:flex-row gap-3 md:gap-5 items-center md:items-start">
            {/* Card Preview - Mobile: full width with aspect ratio, Desktop: fixed size (RESTORED ORIGINAL) */}
            <div
              className="rounded-lg md:rounded-2xl overflow-hidden shadow-2xl flex-shrink-0"
              style={{
                width: isDesktop ? "380px" : "100%",
                height: isDesktop ? "475px" : "auto",
                aspectRatio: isDesktop ? "auto" : "4/5",
                maxHeight: isDesktop ? "475px" : "60vh",
              }}
            >
              {/* Shareable Card - Mobile: 0.28 scale, Desktop: 0.35 scale (desktop unchanged) */}
              <div
                ref={cardRef}
                className="relative bg-black overflow-hidden w-full h-full"
                style={{
                  width: "1080px",
                  height: "1350px",
                  transformOrigin: "top left",
                  transform: `scale(${cardScale})`,
                }}
              >
                {/* Custom Background Image or Gradient */}
                {customBgImage ? (
                  <>
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${customBgImage})` }}
                    />
                    {/* Dark overlay for text readability */}
                    <div className="absolute inset-0 bg-black/60" />
                  </>
                ) : (
                  <>
                    {/* Dynamic Gradient Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-black to-slate-900" />

                    {/* Accent Lines - Nike Style */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-500/10 to-transparent rounded-full blur-3xl" />
                  </>
                )}

                {/* Geometric Pattern Overlay */}
                <div
                  className="absolute inset-0 opacity-5"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.02) 35px, rgba(255,255,255,.02) 70px)",
                  }}
                />

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col justify-between p-16">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div>
                      <h1 className="text-8xl font-black text-white mb-4 tracking-tight leading-none">
                        {overallProgress}%
                      </h1>
                      <div className="flex items-center space-x-3">
                        <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                        <p className="text-2xl font-bold text-gray-300 uppercase tracking-widest">
                          {getProgressMessage().toUpperCase()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-6xl mb-2">
                        {/* Debug: Always show logo for testing */}
                        <Image
                          src="/logo.svg"
                          alt="Hit Hundred Logo"
                          width={96}
                          height={96}
                          className="h-24 w-auto"
                        />
                        {/* Original conditional logic - uncomment when logo is working */}
                        {/* {getProgressEmoji() === "logo" ? (
                          <Image
                            src={logoImage}
                            alt="Hit Hundred Logo"
                            width={64}
                            height={64}
                            className="h-16 w-auto brightness-0 invert object-contain"
                            style={{ objectFit: 'contain' }}
                          />
                        ) : (
                          getProgressEmoji()
                        )} */}
                      </div>
                    </div>
                  </div>

                  {/* Middle Section - Large Stats */}
                  <div className="space-y-8 my-12">
                    {/* Main Progress Bar - Strava Style */}
                    <div className="space-y-4">
                      <div className="flex items-end justify-between">
                        <span className="text-xl text-gray-400 uppercase tracking-wider font-semibold">
                          Nutrition Goal
                        </span>
                        <span className="text-3xl text-white font-bold">
                          {overallProgress}% Complete
                        </span>
                      </div>
                      <div className="h-4 bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full transition-all duration-1000"
                          style={{ width: `${overallProgress}%` }}
                        />
                      </div>
                    </div>

                    {/* Stats Grid - Premium Layout */}
                    <div className="grid grid-cols-2 gap-8 mt-16">
                      {/* Calories */}
                      <div className="space-y-3">
                        <p className="text-xl text-gray-500 uppercase tracking-wider font-semibold">
                          Calories
                        </p>
                        <div className="flex items-baseline space-x-3">
                          <span className="text-7xl font-black text-white">
                            {totalNutrition?.calories?.toFixed(0) || 0}
                          </span>
                          <span className="text-3xl text-gray-500 font-semibold">
                            / {profile?.macros?.calories || 0}
                          </span>
                        </div>
                        <div className="h-2 bg-gray-800 rounded-full overflow-hidden mt-4">
                          <div
                            className="h-full bg-blue-500 rounded-full"
                            style={{
                              width: `${Math.min(
                                (totalNutrition?.calories /
                                  profile?.macros?.calories) *
                                  100 || 0,
                                100
                              )}%`,
                            }}
                          />
                        </div>
                      </div>

                      {/* Protein */}
                      <div className="space-y-3">
                        <p className="text-xl text-gray-500 uppercase tracking-wider font-semibold">
                          Protein
                        </p>
                        <div className="flex items-baseline space-x-3">
                          <span className="text-7xl font-black text-white">
                            {totalNutrition?.protein?.toFixed(0) || 0}
                          </span>
                          <span className="text-3xl text-gray-500 font-semibold">
                            / {profile?.macros?.protein || 0} g
                          </span>
                        </div>
                        <div className="h-2 bg-gray-800 rounded-full overflow-hidden mt-4">
                          <div
                            className="h-full bg-green-500 rounded-full"
                            style={{
                              width: `${Math.min(
                                (totalNutrition?.protein /
                                  profile?.macros?.protein) *
                                  100 || 0,
                                100
                              )}%`,
                            }}
                          />
                        </div>
                      </div>

                      {/* Carbs */}
                      <div className="space-y-3">
                        <p className="text-xl text-gray-500 uppercase tracking-wider font-semibold">
                          Carbs
                        </p>
                        <div className="flex items-baseline space-x-3">
                          <span className="text-7xl font-black text-white">
                            {totalNutrition?.carbs?.toFixed(0) || 0}
                          </span>
                          <span className="text-3xl text-gray-500 font-semibold">
                            g
                          </span>
                        </div>
                        <div className="h-2 bg-gray-800 rounded-full overflow-hidden mt-4">
                          <div
                            className="h-full bg-purple-500 rounded-full"
                            style={{
                              width: `${Math.min(
                                (totalNutrition?.carbs /
                                  profile?.macros?.carbs) *
                                  100 || 0,
                                100
                              )}%`,
                            }}
                          />
                        </div>
                      </div>

                      {/* Fat */}
                      <div className="space-y-3">
                        <p className="text-xl text-gray-500 uppercase tracking-wider font-semibold">
                          Fat
                        </p>
                        <div className="flex items-baseline space-x-3">
                          <span className="text-7xl font-black text-white">
                            {totalNutrition?.fat?.toFixed(0) || 0}
                          </span>
                          <span className="text-3xl text-gray-500 font-semibold">
                            g
                          </span>
                        </div>
                        <div className="h-2 bg-gray-800 rounded-full overflow-hidden mt-4">
                          <div
                            className="h-full bg-orange-500 rounded-full"
                            style={{
                              width: `${Math.min(
                                (totalNutrition?.fat / profile?.macros?.fat) *
                                  100 || 0,
                                100
                              )}%`,
                            }}
                          />
                        </div>
                      </div>

                      {/* Fiber */}
                      <div className="space-y-3">
                        <p className="text-xl text-gray-500 uppercase tracking-wider font-semibold">
                          Fiber
                        </p>
                        <div className="flex items-baseline space-x-3">
                          <span className="text-7xl font-black text-white">
                            {totalNutrition?.fiber?.toFixed(0) || 0}
                          </span>
                          <span className="text-3xl text-gray-500 font-semibold">
                            g
                          </span>
                        </div>
                        <div className="h-2 bg-gray-800 rounded-full overflow-hidden mt-4">
                          <div
                            className="h-full bg-emerald-500 rounded-full"
                            style={{
                              width: `${Math.min(
                                ((totalNutrition?.fiber || 0) /
                                  resolveRequired(profile?.macros?.fiber)) *
                                  100 || 0,
                                100
                              )}%`,
                            }}
                          />
                        </div>
                      </div>

                      {/* Creatine */}
                      <div className="space-y-3">
                        <p className="text-xl text-gray-500 uppercase tracking-wider font-semibold">
                          Creatine
                        </p>
                        <div className="flex items-baseline space-x-3">
                          <span className="text-7xl font-black text-white">
                            {totalNutrition?.creatine?.toFixed(1) || 0}
                          </span>
                          <span className="text-3xl text-gray-500 font-semibold">
                            g
                          </span>
                        </div>
                        <div className="h-2 bg-gray-800 rounded-full overflow-hidden mt-4">
                          <div
                            className="h-full bg-pink-500 rounded-full"
                            style={{
                              width: `${Math.min(
                                ((totalNutrition?.creatine || 0) /
                                  resolveRequired(profile?.fats?.creatine)) *
                                  100 || 0,
                                100
                              )}%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Footer - Brand & Date */}
                  <div className="flex items-end justify-between pt-8 border-t border-gray-800">
                    <div className="flex flex-col items-start">
                      <div className="flex items-center mb-3">
                        <Image
                          src="/logo.svg"
                          alt="Hit Hundred Logo"
                          width={32}
                          height={32}
                          className="h-8 w-auto mr-3"
                        />
                        <h2 className="text-5xl font-black text-white tracking-tight">
                          HIT HUNDRED
                        </h2>
                      </div>
                      <p className="text-xl text-gray-400 font-semibold tracking-wide">
                        https://hithundred.netlify.app
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl text-gray-500 font-bold uppercase tracking-wider">
                        {todayDate}
                      </p>
                      <p className="text-lg text-gray-600 font-semibold mt-1">
                        100% Daily Goals
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons - Mobile: full width, Desktop: min-w-[224px] (unchanged) */}
            <div className="flex flex-col gap-2 md:gap-2.5 w-full md:min-w-[224px] md:w-auto">
              {/* Mobile: Show compact title, Desktop: Show full title (unchanged on desktop) */}
              <div className="mb-1 md:mb-1.5">
                <h3 className="text-sm md:text-base font-semibold text-white mb-0.5 md:mb-1">
                  Customize & Share
                </h3>
                <p className="text-[10px] md:text-xs text-gray-400 hidden md:block">
                  Add your photo or download to share
                </p>
              </div>

              {/* Custom Background Upload */}
              <label htmlFor="bg-upload" className="sr-only">
                Upload background image
              </label>
              <input
                ref={fileInputRef}
                id="bg-upload"
                name="backgroundUpload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />

              {/* Mobile: smaller padding/text, Desktop: unchanged */}
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isGenerating}
                className="flex items-center justify-center space-x-1 md:space-x-1.5 px-2.5 md:px-3 py-2 md:py-2.5 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 rounded-lg md:rounded-xl transition-all duration-200 disabled:opacity-50 border border-purple-500/40"
              >
                <ImageIcon className="w-3 h-3 md:w-3.5 md:h-3.5" />
                <span className="font-semibold text-[11px] md:text-xs">
                  {customBgImage ? "Change" : "Add Your Photo"}
                </span>
              </button>

              {customBgImage && (
                <button
                  onClick={() => setCustomBgImage(null)}
                  disabled={isGenerating}
                  className="flex items-center justify-center space-x-1 md:space-x-1.5 px-2.5 md:px-3 py-2 md:py-2.5 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg md:rounded-xl transition-all duration-200 disabled:opacity-50 border border-red-500/40"
                >
                  <X className="w-3 h-3 md:w-3.5 md:h-3.5" />
                  <span className="font-semibold text-[11px] md:text-xs">
                    Remove
                  </span>
                </button>
              )}

              <div className="border-t border-gray-700 my-1 md:my-1.5"></div>

              {/* Mobile: 2-column grid, Desktop: stacked (unchanged on desktop) */}
              <div className="grid grid-cols-2 md:grid-cols-1 gap-2 md:gap-2.5">
                {/* Download Button - Mobile: compact, Desktop: unchanged */}
                <button
                  onClick={handleDownload}
                  disabled={isGenerating}
                  className="flex items-center justify-center space-x-1 md:space-x-1.5 px-2.5 md:px-3 py-2 md:py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-lg md:rounded-xl transition-all duration-200 disabled:opacity-50 border border-white/20"
                >
                  <Download className="w-3 h-3 md:w-4 md:h-4" />
                  <span className="font-semibold text-[11px] md:text-sm">
                    <span className="md:inline">Download</span>
                    <span className="md:hidden">Save</span>
                  </span>
                </button>

                {/* Share Button - Mobile: compact, Desktop: unchanged */}
                <button
                  onClick={handleShare}
                  disabled={isGenerating}
                  className="flex items-center justify-center space-x-1 md:space-x-1.5 px-2.5 md:px-3 py-2 md:py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg md:rounded-xl transition-all duration-200 disabled:opacity-50 shadow-lg"
                >
                  <Share2 className="w-3 h-3 md:w-4 md:h-4" />
                  <span className="font-semibold text-[11px] md:text-sm">
                    Share
                  </span>
                </button>
              </div>

              {isGenerating && (
                <div className="mt-1 md:mt-1.5 text-center text-[10px] md:text-xs text-gray-400 animate-pulse">
                  Generating...
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareCard;
