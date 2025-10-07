import { useState, useEffect, useRef } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import {
  AlertTriangle,
  Phone,
  Globe,
  MessageCircle,
  Clock,
  Mail,
} from "lucide-react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import AddFoodForm from "../components/AddFoodForm";
import FoodList from "../components/FoodList";
import ProgressGrid from "../components/ProgressGrid";
import MealSection from "../components/MealSection";
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

  // Refs to columns (for future use if we switch back to measuring)
  const leftColumnRef = useRef(null);
  const rightColumnRef = useRef(null);

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

  // Meal types for organizing food log
  const mealTypes = [
    {
      value: "breakfast",
      label: "Breakfast",
      emoji: "🍳",
      color: "meal-yellow",
    },
    {
      value: "lunch",
      label: "Lunch",
      emoji: "🍱",
      color: "meal-green",
    },
    {
      value: "dinner",
      label: "Dinner",
      emoji: "🍽️",
      color: "meal-blue",
    },
    {
      value: "snack",
      label: "Snack",
      emoji: "🍪",
      color: "meal-purple",
    },
  ];

  // Group daily log by meal type
  const groupByMealType = () => {
    const grouped = {};
    mealTypes.forEach((meal) => {
      grouped[meal.value] = dailyLog.filter(
        (entry) => entry.mealType === meal.value
      );
    });
    return grouped;
  };

  const groupedLog = groupByMealType();

  // Calculate total calories and protein for summary
  const totalCalories = dailyLog
    .reduce(
      (sum, entry) =>
        sum + calculateNutrition(entry.food, entry.quantity).calories,
      0
    )
    .toFixed(0);

  const totalProtein = dailyLog
    .reduce(
      (sum, entry) =>
        sum + calculateNutrition(entry.food, entry.quantity).protein,
      0
    )
    .toFixed(1);

  // Deterministic, professional packing based on estimated heights
  // Keeps all items on the left until it actually becomes taller than the right
  const estimateMealHeight = (entriesLength) => {
    const header = 64; // meal header height
    const entry = 64; // per-entry card height
    const padding = 24; // inner spacing
    return header + entriesLength * entry + padding;
  };

  const estimateAddFormHeight = 220; // typical height of AddFoodForm
  const estimateSummaryHeight = dailyLog.length > 0 ? 72 : 0;
  const estimateProgressHeight = 420; // typical ProgressGrid on desktop

  const mealSectionsWithData = mealTypes.filter(
    (meal) => groupedLog[meal.value].length > 0
  );

  let leftAccum = estimateAddFormHeight + estimateSummaryHeight;
  let rightAccum = estimateProgressHeight;
  const leftMealSections = [];
  const rightMealSections = [];

  mealSectionsWithData.forEach((meal) => {
    const entries = groupedLog[meal.value];
    const est = estimateMealHeight(entries.length);
    // Only move to right when left is taller by a cushion
    if (leftAccum <= rightAccum + 150) {
      leftMealSections.push(meal);
      leftAccum += est;
    } else {
      rightMealSections.push(meal);
      rightAccum += est;
    }
  });

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

      <HeroSection
        currentDate={currentDate}
        onShareCard={() => setShowShareCard(true)}
      />

      <main className="container mx-auto px-2 md:px-3 py-3 md:py-6 animate-fadeIn">
        {/* Mobile View - Keep original layout */}
        <div className="lg:hidden space-y-3 md:space-y-5">
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
          <ProgressGrid
            dailyLog={dailyLog}
            profile={rdaProfiles[selectedProfile]}
          />
        </div>

        {/* Desktop View - Height-Based Grid Layout */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div ref={leftColumnRef} className="space-y-5">
            {/* AddFoodForm - Always at top of left */}
            <AddFoodForm
              onAddFood={addFoodToLog}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
            />

            {/* Left Card: Summary + Left Meals */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-white/20">
              {/* Food Log Summary Header */}
              {dailyLog.length > 0 && (
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-lg font-bold text-gray-800 flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-blue-600" />
                    Today&apos;s Diet
                  </h2>
                  <div className="flex items-center gap-5">
                    <div className="text-right">
                      <div className="text-xl font-bold text-green-600">
                        {totalCalories}
                      </div>
                      <div className="text-xs text-gray-600">Calories</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-purple-600">
                        {totalProtein}g
                      </div>
                      <div className="text-xs text-gray-600">Protein</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Meal Sections for Left Column (inside the same border) */}
              <div className="space-y-3">
                {leftMealSections.map((meal) => {
                  const entries = groupedLog[meal.value];
                  return (
                    <div key={meal.value} data-meal-section>
                      <MealSection
                        meal={meal}
                        entries={entries}
                        onUpdateQuantity={updateFoodQuantity}
                        onRemoveFood={removeFoodFromLog}
                      />
                    </div>
                  );
                })}

                {/* Empty State (if no meals) */}
                {dailyLog.length === 0 && (
                  <div className="text-center py-6">
                    <div className="text-5xl mb-3">🍽️</div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1.5">
                      No foods logged yet
                    </h3>
                    <p className="text-gray-800 text-sm">
                      Start by adding your first food item using the form!
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div ref={rightColumnRef} className="space-y-5">
            {/* ProgressGrid - Always at top of right */}
            <ProgressGrid
              dailyLog={dailyLog}
              profile={rdaProfiles[selectedProfile]}
            />

            {/* Right Card: All overflow meals grouped together */}
            {rightMealSections.length > 0 && (
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-white/20">
                <div className="space-y-3">
                  {rightMealSections.map((meal) => {
                    const entries = groupedLog[meal.value];
                    return (
                      <div key={meal.value} data-meal-section>
                        <MealSection
                          meal={meal}
                          entries={entries}
                          onUpdateQuantity={updateFoodQuantity}
                          onRemoveFood={removeFoodFromLog}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
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
        onRequireProfile={() => {
          setShowProfileModal(true);
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
                  Are you sure you want to reset today&apos;s food log? This
                  action cannot be undone and will remove all logged foods for
                  today.
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

      {/* Footer - Professional & Minimal */}
      <footer className="bg-white/80 backdrop-blur-sm border-t border-gray-200 py-6 md:py-8 mt-8">
        <div className="container mx-auto px-3">
          {/* Main Content */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
            {/* Left - Developer */}
            <div className="text-center md:text-left">
              <p className="text-sm text-gray-600">
                Built by{" "}
                <a
                  href="https://nitinreddy.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-gray-800 hover:text-blue-600 transition-colors"
                >
                  Nitin Reddy
                </a>
              </p>
            </div>

            {/* Right - Contact */}
            <div className="flex items-center gap-2 flex-wrap justify-center md:justify-end">
              <a
                href="tel:+917382118118"
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all text-xs"
                title="Call"
              >
                <Phone className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">+91 7382118118</span>
              </a>

              <a
                href="mailto:nitinreddy.nv@gmail.com"
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all text-xs"
                title="Email"
              >
                <Mail className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Email</span>
              </a>

              <a
                href="https://nitinreddy.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all text-xs"
                title="Website"
              >
                <Globe className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Website</span>
              </a>

              <a
                href="https://wa.me/917382118118"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all text-xs"
                title="WhatsApp"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Chat</span>
              </a>
            </div>
          </div>

          {/* Bottom - Copyright */}
          <div className="text-center pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} Hit Hundred · All rights reserved
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
