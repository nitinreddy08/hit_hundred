import { useState, useEffect } from "react";
import { Calendar, Share2 } from "lucide-react";

const HeroSection = ({ currentDate, onShareCard }) => {
  const [scrollIndex, setScrollIndex] = useState(0);
  const shareOptions = ["Share Card", "Download"];

  useEffect(() => {
    const interval = setInterval(() => {
      setScrollIndex((prev) => (prev + 1) % shareOptions.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [shareOptions.length]);

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <section className="py-2 px-3 border-b border-gray-200/50">
      <div className="container mx-auto">
        {/* Mobile View */}
        <div className="md:hidden flex items-center justify-between gap-3">
          {/* Date Display */}
          <div className="flex items-center space-x-1.5 flex-1 min-w-0">
            <Calendar className="w-3.5 h-3.5 text-gray-600 flex-shrink-0" />
            <span className="text-[11px] text-gray-800 font-medium truncate">
              {formatDate(currentDate)}
            </span>
          </div>

          {/* Share Button with Scrolling Text */}
          <button
            onClick={onShareCard}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 active:scale-95 transition-all duration-200 shadow-sm hover:shadow-md flex-shrink-0"
            aria-label="Share progress"
          >
            <Share2 className="w-3.5 h-3.5 flex-shrink-0" />
            <div className="overflow-hidden h-4 w-20">
              <div
                className="transition-transform duration-500 ease-in-out"
                style={{ transform: `translateY(-${scrollIndex * 1}rem)` }}
              >
                {shareOptions.map((option, index) => (
                  <div
                    key={index}
                    className="text-xs font-medium h-4 flex items-center justify-center whitespace-nowrap"
                  >
                    {option}
                  </div>
                ))}
              </div>
            </div>
          </button>
        </div>

        {/* Desktop View */}
        <div className="hidden md:flex flex-row items-center justify-between">
          {/* Date Display */}
          <div className="flex items-center space-x-1.5">
            <Calendar className="w-3.5 h-3.5 text-gray-600" />
            <span className="text-xs text-gray-800 font-medium">
              {formatDate(currentDate)}
            </span>
          </div>

          {/* Status */}
          <div className="flex items-center space-x-1.5 text-gray-700">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs">Hit 100% of your daily RDA targets</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
