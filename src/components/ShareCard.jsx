import { useRef, useState } from "react";
import { toPng } from "html-to-image";
import { Download, Share2, X, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
// import downloadIcon from "../images/download.png";
import logoImage from "../images/logo.png";

const ShareCard = ({ isOpen, onClose, dailyLog, profile, totalNutrition }) => {
  const cardRef = useRef(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [customBgImage, setCustomBgImage] = useState(null);
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  // Calculate overall progress
  const calculateProgress = () => {
    if (!profile || !totalNutrition) return 0;

    const macroProgress = [
      (totalNutrition.calories / profile.macros.calories) * 100,
      (totalNutrition.protein / profile.macros.protein) * 100,
      (totalNutrition.carbs / profile.macros.carbs) * 100,
      (totalNutrition.fat / profile.macros.fat) * 100,
    ];

    return Math.min(
      Math.round(
        macroProgress.reduce((a, b) => a + b, 0) / macroProgress.length
      ),
      100
    );
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
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/90 backdrop-blur-sm">
      {/* Modal Container */}
      <div className="flex min-h-full items-center justify-center p-6">
        <div className="relative bg-gradient-to-br from-slate-900 to-black rounded-3xl shadow-2xl max-w-5xl mx-auto p-5">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-red-500/20 rounded-full transition-colors z-50"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Title */}
          <div className="mb-3">
            <h2 className="text-xl font-bold text-white mb-1">
              Share Your Progress
            </h2>
            <p className="text-xs text-gray-400">
              Download or share to social media
            </p>
          </div>

          {/* Main Content - Side by Side Layout */}
          <div className="flex gap-5 items-start">
            {/* Card Preview - Left Side */}
            <div
              className="rounded-2xl overflow-hidden shadow-2xl flex-shrink-0"
              style={{ width: "380px", height: "475px" }}
            >
              {/* Shareable Card - Nike/Adidas/Strava Style */}
              <div
                ref={cardRef}
                className="relative bg-black overflow-hidden"
                style={{
                  width: "1080px",
                  height: "1350px",
                  transformOrigin: "top left",
                  transform: "scale(0.35)",
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
                        <div className="h-16 w-16 flex items-center justify-center overflow-hidden">
                          <Image
                            src={logoImage}
                            alt="Hit Hundred Logo"
                            width={80}
                            height={80}
                            className="brightness-0 invert object-contain"
                            style={{
                              objectFit: "contain",
                              maxWidth: "100%",
                              maxHeight: "100%",
                            }}
                          />
                        </div>
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
                            g
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
                    </div>
                  </div>

                  {/* Footer - Brand & Date */}
                  <div className="flex items-end justify-between pt-8 border-t border-gray-800">
                    <div className="flex flex-col items-start">
                      <div className="flex items-center mb-3">
                        <div className="h-16 w-16 flex items-center justify-center overflow-hidden mr-3">
                          <Image
                            src={logoImage}
                            alt="Hit Hundred"
                            width={64}
                            height={64}
                            className="brightness-0 invert object-contain"
                            style={{
                              objectFit: "contain",
                              maxWidth: "100%",
                              maxHeight: "100%",
                            }}
                          />
                        </div>
                        <h2 className="text-5xl font-black text-white tracking-tight">
                          HIT HUNDRED
                        </h2>
                      </div>
                      <p className="text-xl text-gray-500 font-semibold">
                        {dailyLog?.length || 0} FOODS LOGGED
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

            {/* Action Buttons - Right Side */}
            <div className="flex flex-col gap-2.5 min-w-[224px]">
              <div className="mb-1.5">
                <h3 className="text-base font-semibold text-white mb-1">
                  Customize & Share
                </h3>
                <p className="text-xs text-gray-400">
                  Add your photo or download to share
                </p>
              </div>

              {/* Custom Background Upload */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />

              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isGenerating}
                className="flex items-center justify-center space-x-1.5 px-3 py-2.5 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 rounded-xl transition-all duration-200 disabled:opacity-50 border border-purple-500/40"
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span className="font-semibold text-xs">
                  {customBgImage ? "Change Background" : "Add Your Photo"}
                </span>
              </button>

              {customBgImage && (
                <button
                  onClick={() => setCustomBgImage(null)}
                  disabled={isGenerating}
                  className="flex items-center justify-center space-x-1.5 px-3 py-2.5 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-xl transition-all duration-200 disabled:opacity-50 border border-red-500/40"
                >
                  <X className="w-3.5 h-3.5" />
                  <span className="font-semibold text-xs">
                    Remove Background
                  </span>
                </button>
              )}

              <div className="border-t border-gray-700 my-1.5"></div>

              {/* Download Button */}
              <button
                onClick={handleDownload}
                disabled={isGenerating}
                className="flex items-center justify-center space-x-1.5 px-3 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all duration-200 disabled:opacity-50 border border-white/20"
              >
                {/* <Image
                  src={downloadIcon}
                  alt="Download"
                  width={16}
                  height={16}
                  className="w-4 h-4"
                /> */}
                <Download className="w-4 h-4 hidden" />
                <span className="font-semibold text-sm">Download Image</span>
              </button>

              {/* Share Button */}
              <button
                onClick={handleShare}
                disabled={isGenerating}
                className="flex items-center justify-center space-x-1.5 px-3 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl transition-all duration-200 disabled:opacity-50 shadow-lg"
              >
                <Share2 className="w-4 h-4" />
                <span className="font-semibold text-sm">Share to Social</span>
              </button>

              {isGenerating && (
                <div className="mt-1.5 text-center text-xs text-gray-400 animate-pulse">
                  Generating high-quality image...
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
