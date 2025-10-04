import { useState, useEffect } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { AlertTriangle } from "lucide-react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import AddFoodForm from "../components/AddFoodForm";
import FoodList from "../components/FoodList";
import ProgressGrid from "../components/ProgressGrid";
import ProfileSelector from "../components/ProfileSelector";
import WelcomeModal from "../components/WelcomeModal";
import ShareCard from "../components/ShareCard";
import { foodDatabase, calculateNutrition } from "../data/foodDB";
import { rdaProfiles } from "../data/rdaProfiles";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedProfile, setSelectedProfile] = useState("MALE_ADULT");
  const [dailyLog, setDailyLog] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showShareCard, setShowShareCard] = useState(false);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedProfile = localStorage.getItem("hh-user-profile");
    const savedFavorites = localStorage.getItem("hh-favorites");
    const today = new Date().toISOString().split("T")[0];
    const savedDailyLog = localStorage.getItem(`hh-day-log-${today}`);

    if (savedProfile) setSelectedProfile(savedProfile);
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
    if (savedDailyLog) setDailyLog(JSON.parse(savedDailyLog));

    // Show welcome modal for first-time users
    const hasSeenWelcome = localStorage.getItem("hh-welcome-seen");
    if (!hasSeenWelcome) {
      setShowWelcomeModal(true);
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("hh-user-profile", selectedProfile);
  }, [selectedProfile]);

  useEffect(() => {
    localStorage.setItem("hh-favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    localStorage.setItem(`hh-day-log-${today}`, JSON.stringify(dailyLog));
  }, [dailyLog]);

  const addFoodToLog = (food, quantity, mealType) => {
    const newEntry = {
      id: Date.now(),
      food: food,
      quantity: quantity,
      mealType: mealType,
      timestamp: new Date().toISOString(),
    };
    setDailyLog((prev) => [...prev, newEntry]);
  };

  const updateFoodQuantity = (id, newQuantity) => {
    setDailyLog((prev) =>
      prev.map((entry) =>
        entry.id === id ? { ...entry, quantity: newQuantity } : entry
      )
    );
  };

  const removeFoodFromLog = (id) => {
    setDailyLog((prev) => prev.filter((entry) => entry.id !== id));
  };

  const toggleFavorite = (food) => {
    setFavorites((prev) => {
      const isFavorite = prev.some((fav) => fav.name === food.name);
      if (isFavorite) {
        return prev.filter((fav) => fav.name !== food.name);
      } else {
        return [...prev, food];
      }
    });
  };

  const resetDay = () => {
    setDailyLog([]);
  };

  const handleResetClick = () => {
    setShowResetConfirm(true);
  };

  const handleResetConfirm = () => {
    resetDay();
    setShowResetConfirm(false);
  };

  const handleResetCancel = () => {
    setShowResetConfirm(false);
  };

  // Calculate total nutrition from daily log
  const calculateTotalNutrition = () => {
    return dailyLog.reduce((total, entry) => {
      const nutrition = calculateNutrition(entry.food, entry.quantity);
      Object.keys(nutrition).forEach((nutrient) => {
        total[nutrient] = (total[nutrient] || 0) + nutrition[nutrient];
      });
      return total;
    }, {});
  };

  return (
    <div
      className={`${geistSans.className} ${geistMono.className} min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100`}
    >
      <Header
        onProfileClick={() => setShowProfileModal(true)}
        onResetDay={handleResetClick}
        onShareCard={() => setShowShareCard(true)}
        selectedProfile={rdaProfiles[selectedProfile]?.name}
      />

      <HeroSection currentDate={currentDate} />

      <main className="container mx-auto px-4 py-8 animate-fadeIn">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            <AddFoodForm
              onAddFood={addFoodToLog}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
            />
            <FoodList
              dailyLog={dailyLog}
              onUpdateQuantity={updateFoodQuantity}
              onRemoveFood={removeFoodFromLog}
            />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <ProgressGrid
              dailyLog={dailyLog}
              profile={rdaProfiles[selectedProfile]}
            />
          </div>
        </div>
      </main>

      <ProfileSelector
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        selectedProfile={selectedProfile}
        onSelectProfile={setSelectedProfile}
      />

      <WelcomeModal
        isOpen={showWelcomeModal}
        onClose={() => {
          setShowWelcomeModal(false);
          localStorage.setItem("hh-welcome-seen", "true");
        }}
      />

      <ShareCard
        isOpen={showShareCard}
        onClose={() => setShowShareCard(false)}
        dailyLog={dailyLog}
        profile={rdaProfiles[selectedProfile]}
        totalNutrition={calculateTotalNutrition()}
      />

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 transition-opacity"
            onClick={handleResetCancel}
          />

          {/* Modal */}
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full mx-auto">
              {/* Header */}
              <div className="p-6 pb-4">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Reset Day
                  </h3>
                </div>
                <p className="text-gray-600">
                  Are you sure you want to reset today's food log? This action
                  cannot be undone and will remove all logged foods for today.
                </p>
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-3 p-6 pt-4 border-t border-gray-200">
                <button
                  onClick={handleResetCancel}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleResetConfirm}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Yes, Reset Day
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
