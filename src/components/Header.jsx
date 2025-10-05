import { useState, useEffect } from "react";
import { User, RotateCcw, Share2 } from "lucide-react";
import Image from "next/image";

const Header = ({
  onProfileClick,
  onResetDay,
  onShareCard,
  selectedProfile,
}) => {
  const [scrollIndex, setScrollIndex] = useState(0);
  const shareOptions = ["Share Card", "Download"];

  useEffect(() => {
    const interval = setInterval(() => {
      setScrollIndex((prev) => (prev + 1) % shareOptions.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [shareOptions.length]);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-3 py-2 md:py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2 md:space-x-3">
            <Image
              src="/logo.svg"
              alt="Hit Hundred Logo"
              width={32}
              height={32}
              className="h-6 md:h-8 w-auto"
            />
            <h1 className="text-sm md:text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              <span className="hidden md:inline">
                HIT HUNDRED - Nutrition Tracker
              </span>
              <span className="md:hidden">HIT HUNDRED</span>
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-3">
            <button
              onClick={onProfileClick}
              className="flex items-center space-x-2 px-3 py-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors text-sm"
            >
              <User className="w-3.5 h-3.5" />
              <span>{selectedProfile || "Profile"}</span>
            </button>

            <button
              onClick={onResetDay}
              className="flex items-center space-x-2 px-3 py-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors text-sm"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Day</span>
            </button>

            {/* Desktop Share Button with Scrolling Text */}
            <button
              onClick={onShareCard}
              className="flex items-center space-x-2 px-3 py-1.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 text-sm overflow-hidden"
            >
              <Share2 className="w-3.5 h-3.5 flex-shrink-0" />
              <div className="overflow-hidden h-5 w-20">
                <div
                  className="transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateY(-${scrollIndex * 1.25}rem)` }}
                >
                  {shareOptions.map((option, index) => (
                    <div
                      key={index}
                      className="text-sm font-medium h-5 flex items-center justify-center whitespace-nowrap"
                    >
                      {option}
                    </div>
                  ))}
                </div>
              </div>
            </button>
          </div>

          {/* Mobile Navigation - Icon Only Buttons */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Reset Day Button */}
            <button
              onClick={onResetDay}
              className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              title="Reset Day"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Profile Selector Button */}
            <button
              onClick={onProfileClick}
              className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              title="Profile"
            >
              <User className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
