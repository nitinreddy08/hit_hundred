import { useState } from "react";
import { User, RotateCcw, Share2, Menu } from "lucide-react";
import Image from "next/image";

const Header = ({
  onProfileClick,
  onResetDay,
  onShareCard,
  selectedProfile,
}) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <>
      {/* Mobile Menu Backdrop */}
      {showMobileMenu && (
        <div
          className="fixed inset-0 bg-black/80 z-40 md:hidden"
          onClick={() => setShowMobileMenu(false)}
        />
      )}

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

              <button
                onClick={onShareCard}
                className="flex items-center space-x-2 px-3 py-1.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 text-sm"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share Card</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Menu */}
          {showMobileMenu && (
            <div className="md:hidden mt-3 pt-3 border-t border-gray-200">
              <div className="flex flex-col space-y-1.5">
                <button
                  onClick={() => {
                    onProfileClick();
                    setShowMobileMenu(false);
                  }}
                  className="flex items-center space-x-2 px-3 py-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors text-sm"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>{selectedProfile || "Profile"}</span>
                </button>

                <button
                  onClick={() => {
                    onResetDay();
                    setShowMobileMenu(false);
                  }}
                  className="flex items-center space-x-2 px-3 py-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors text-sm"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Day</span>
                </button>

                <button
                  onClick={() => {
                    onShareCard();
                    setShowMobileMenu(false);
                  }}
                  className="flex items-center space-x-2 px-3 py-1.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 text-sm"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share Card</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
