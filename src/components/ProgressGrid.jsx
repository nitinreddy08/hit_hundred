import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Target,
  TrendingUp,
  Award,
} from "lucide-react";
import { calculateNutrition } from "../data/foodDB";
import { calculateRdaPercentage, getProgressColor } from "../data/rdaProfiles";

const ProgressGrid = ({ dailyLog, profile }) => {
  const [openDropdowns, setOpenDropdowns] = useState({
    macros: true, // Macronutrients open by default
    minerals: false,
    vitamins: false,
    fats: false,
  });

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

  const totalNutrition = calculateTotalNutrition();

  const resolveRequired = (req) => {
    if (req && typeof req === "object") {
      const min = Number(req.min ?? 0);
      const max = Number(req.max ?? min);
      if (Number.isFinite(min) && Number.isFinite(max)) {
        return (min + max) / 2;
      }
      return Number(min) || 0;
    }
    return Number(req) || 0;
  };

  const formatRequiredDisplay = (req) => {
    if (req && typeof req === "object") {
      const hasMin = Number.isFinite(req.min);
      const hasMax = Number.isFinite(req.max);
      if (hasMin && hasMax) return `${req.min}–${req.max}`;
      if (hasMin) return `${req.min}`;
      if (hasMax) return `${req.max}`;
    }
    return `${req}`;
  };

  // Calculate overall progress percentage
  const calculateOverallProgress = () => {
    const categories = ["macros", "minerals", "vitamins", "fats"];
    let totalPercentage = 0;
    let nutrientCount = 0;

    categories.forEach((category) => {
      Object.keys(profile[category]).forEach((nutrient) => {
        const consumed = totalNutrition[nutrient] || 0;
        const requiredResolved = resolveRequired(profile[category][nutrient]);
        const percentage = calculateRdaPercentage(consumed, requiredResolved);
        totalPercentage += Math.min(percentage, 100); // Cap at 100% for overall calculation
        nutrientCount++;
      });
    });

    return nutrientCount > 0 ? totalPercentage / nutrientCount : 0;
  };

  const overallProgress = calculateOverallProgress();

  const getProgressBarColor = (percentage) => {
    if (percentage >= 100) return "bg-green-500";
    if (percentage >= 75) return "bg-yellow-500";
    if (percentage >= 50) return "bg-orange-500";
    return "bg-red-500";
  };

  const getProgressTextColor = (percentage) => {
    if (percentage >= 100) return "text-green-600";
    if (percentage >= 75) return "text-yellow-600";
    if (percentage >= 50) return "text-orange-600";
    return "text-red-600";
  };

  const toggleDropdown = (categoryKey) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [categoryKey]: !prev[categoryKey],
    }));
  };

  const renderNutrientCard = (category, nutrient, label, unit, icon) => {
    const consumed = totalNutrition[nutrient] || 0;
    const required = profile[category][nutrient];
    const requiredResolved = resolveRequired(required);
    const percentage = calculateRdaPercentage(consumed, requiredResolved);
    const colorClass = getProgressColor(percentage);

    return (
      <div
        key={nutrient}
        className="bg-white/60 backdrop-blur-sm rounded-lg p-3 border border-white/40"
      >
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center space-x-2">
            <span className="text-base">{icon}</span>
            <span className="font-medium text-gray-800 text-sm">{label}</span>
          </div>
          <div
            className={`px-1.5 py-0.5 rounded-full text-xs font-semibold ${colorClass}`}
          >
            {percentage.toFixed(0)}%
          </div>
        </div>

        <div className="mb-1.5">
          <div className="flex justify-between text-xs text-gray-800 mb-1">
            <span>
              {consumed.toFixed(1)} {unit}
            </span>
            <span>
              {formatRequiredDisplay(required)} {unit}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div
              className={`h-1.5 rounded-full progress-bar ${getProgressBarColor(
                percentage
              )}`}
              style={{ width: `${Math.min(percentage, 100)}%` }}
            ></div>
          </div>
        </div>
      </div>
    );
  };

  const categories = [
    {
      key: "macros",
      title: "Macronutrients",
      icon: "🍽️",
      nutrients: [
        { key: "calories", label: "Calories", unit: "kcal", icon: "🔥" },
        { key: "protein", label: "Protein", unit: "g", icon: "💪" },
        { key: "carbs", label: "Carbohydrates", unit: "g", icon: "🌾" },
        { key: "fat", label: "Fat", unit: "g", icon: "🥑" },
        { key: "fiber", label: "Fiber", unit: "g", icon: "🌿" },
      ],
    },
    {
      key: "minerals",
      title: "Minerals",
      icon: "⚡",
      nutrients: [
        { key: "calcium", label: "Calcium", unit: "mg", icon: "🦴" },
        { key: "iron", label: "Iron", unit: "mg", icon: "🩸" },
        { key: "potassium", label: "Potassium", unit: "mg", icon: "🍌" },
        { key: "magnesium", label: "Magnesium", unit: "mg", icon: "⚙️" },
        { key: "zinc", label: "Zinc", unit: "mg", icon: "🔋" },
      ],
    },
    {
      key: "vitamins",
      title: "Vitamins",
      icon: "💊",
      nutrients: [
        { key: "vitaminA", label: "Vitamin A", unit: "mcg", icon: "🥕" },
        { key: "vitaminC", label: "Vitamin C", unit: "mg", icon: "🍊" },
        { key: "vitaminD", label: "Vitamin D", unit: "mcg", icon: "☀️" },
        { key: "vitaminE", label: "Vitamin E", unit: "mg", icon: "🌰" },
        { key: "vitaminK", label: "Vitamin K", unit: "mcg", icon: "🩹" },
      ],
    },
    {
      key: "fats",
      title: "Essential Fats",
      icon: "🐟",
      nutrients: [{ key: "omega3", label: "Omega-3", unit: "g", icon: "🐟" }],
    },
  ];

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl md:rounded-2xl p-3 md:p-5 shadow-lg border border-white/20">
      <div className="flex items-center justify-between mb-3 md:mb-5">
        <h2 className="text-lg md:text-xl font-bold text-gray-800 flex items-center">
          <Target className="w-4 md:w-5 h-4 md:h-5 mr-2 text-blue-600" />
          <span className="hidden md:inline">Progress Tracker</span>
          <span className="md:hidden">Progress</span>
        </h2>
        <div className="text-right">
          <div className="text-[10px] md:text-xs text-gray-800">
            Overall Progress
          </div>
          <div
            className={`text-xl md:text-2xl font-bold ${getProgressTextColor(
              overallProgress
            )}`}
          >
            {overallProgress.toFixed(0)}%
          </div>
        </div>
      </div>

      {/* Overall Progress Bar */}
      <div className="mb-4 md:mb-6">
        <div className="w-full bg-gray-200 rounded-full h-2 md:h-3 mb-2">
          <div
            className={`h-2 md:h-3 rounded-full progress-bar ${getProgressBarColor(
              overallProgress
            )}`}
            style={{ width: `${Math.min(overallProgress, 100)}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-[10px] md:text-xs text-gray-800">
          <span>0%</span>
          <span className="font-semibold">Target: 100%</span>
        </div>
      </div>

      {/* Nutrient Category Dropdowns */}
      <div className="space-y-3">
        {categories.map((category) => (
          <div
            key={category.key}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden"
          >
            {/* Dropdown Header */}
            <button
              onClick={() => toggleDropdown(category.key)}
              className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-2">
                <span className="text-xl">{category.icon}</span>
                <span className="text-base font-semibold text-gray-800">
                  {category.title}
                </span>
              </div>
              {openDropdowns[category.key] ? (
                <ChevronUp className="w-4 h-4 text-gray-500" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-500" />
              )}
            </button>

            {/* Dropdown Content */}
            {openDropdowns[category.key] && (
              <div className="px-3 pb-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {category.nutrients.map((nutrient) =>
                    renderNutrientCard(
                      category.key,
                      nutrient.key,
                      nutrient.label,
                      nutrient.unit,
                      nutrient.icon
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Achievement Badge */}
      {overallProgress >= 100 && (
        <div className="mt-5 p-3 bg-gradient-to-r from-yellow-100 to-orange-100 border border-yellow-200 rounded-xl">
          <div className="flex items-center space-x-2">
            <Award className="w-6 h-6 text-yellow-600" />
            <div>
              <div className="font-semibold text-yellow-800 text-sm">
                🎉 Congratulations!
              </div>
              <div className="text-xs text-yellow-700">
                You've hit 100% of your daily nutritional targets!
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Motivation Message */}
      {overallProgress < 100 && (
        <div className="mt-5 p-3 bg-blue-50 border border-blue-200 rounded-xl">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <div>
              <div className="font-semibold text-blue-800 text-sm">
                Keep going!
              </div>
              <div className="text-xs text-blue-700">
                You're {overallProgress.toFixed(0)}% of the way to hitting 100%
                of your RDA targets.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressGrid;
