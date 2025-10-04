import { useState } from "react";
import { User, RotateCcw, Share2, Menu } from "lucide-react";

const Header = ({
  onProfileClick,
  onResetDay,
  onShareCard,
  selectedProfile,
}) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img
              src="/logo.svg"
              alt="Hit Hundred Logo"
              className="h-10 w-auto"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/logo.png";
              }}
            />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              HIT HUNDRED - Nutrition Tracker
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={onProfileClick}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <User className="w-4 h-4" />
              <span>{selectedProfile || "Profile"}</span>
            </button>

            <button
              onClick={onResetDay}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset Day</span>
            </button>

            <button
              onClick={onShareCard}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
            >
              <Share2 className="w-4 h-4" />
              <span>Share Card</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="md:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="md:hidden mt-4 pt-4 border-t border-gray-200">
            <div className="flex flex-col space-y-2">
              <button
                onClick={() => {
                  onProfileClick();
                  setShowMobileMenu(false);
                }}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <User className="w-4 h-4" />
                <span>{selectedProfile || "Profile"}</span>
              </button>

              <button
                onClick={() => {
                  onResetDay();
                  setShowMobileMenu(false);
                }}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset Day</span>
              </button>

              <button
                onClick={() => {
                  onShareCard();
                  setShowMobileMenu(false);
                }}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
              >
                <Share2 className="w-4 h-4" />
                <span>Share Card</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
