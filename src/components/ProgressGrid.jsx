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
  const [activeTab, setActiveTab] = useState("macros");

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

  // Calculate overall progress percentage
  const calculateOverallProgress = () => {
    const categories = ["macros", "minerals", "vitamins", "fats"];
    let totalPercentage = 0;
    let nutrientCount = 0;

    categories.forEach((category) => {
      Object.keys(profile[category]).forEach((nutrient) => {
        const consumed = totalNutrition[nutrient] || 0;
        const required = profile[category][nutrient];
        const percentage = calculateRdaPercentage(consumed, required);
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

  const renderNutrientCard = (category, nutrient, label, unit, icon) => {
    const consumed = totalNutrition[nutrient] || 0;
    const required = profile[category][nutrient];
    const percentage = calculateRdaPercentage(consumed, required);
    const colorClass = getProgressColor(percentage);

    return (
      <div
        key={nutrient}
        className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-white/40"
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <span className="text-lg">{icon}</span>
            <span className="font-medium text-gray-800">{label}</span>
          </div>
          <div
            className={`px-2 py-1 rounded-full text-xs font-semibold ${colorClass}`}
          >
            {percentage.toFixed(0)}%
          </div>
        </div>

        <div className="mb-2">
          <div className="flex justify-between text-sm text-gray-800 mb-1">
            <span>
              {consumed.toFixed(1)} {unit}
            </span>
            <span>
              {required} {unit}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full progress-bar ${getProgressBarColor(
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
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <Target className="w-6 h-6 mr-2 text-blue-600" />
          Progress Tracker
        </h2>
        <div className="text-right">
          <div className="text-sm text-gray-800">Overall Progress</div>
          <div
            className={`text-3xl font-bold ${getProgressTextColor(
              overallProgress
            )}`}
          >
            {overallProgress.toFixed(0)}%
          </div>
        </div>
      </div>

      {/* Overall Progress Bar */}
      <div className="mb-8">
        <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
          <div
            className={`h-4 rounded-full progress-bar ${getProgressBarColor(
              overallProgress
            )}`}
            style={{ width: `${Math.min(overallProgress, 100)}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-sm text-gray-800">
          <span>0%</span>
          <span className="font-semibold">Target: 100%</span>
        </div>
      </div>

      {/* Nutrient Category Tabs */}
      <div className="mb-6">
        <div className="flex gap-2 overflow-x-auto">
          {categories.map((category) => (
            <button
              key={category.key}
              onClick={() => setActiveTab(category.key)}
              className={`flex items-center space-x-1 px-4 py-2.5 rounded-lg font-semibold text-base transition-all duration-200 whitespace-nowrap ${
                activeTab === category.key
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <span>{category.icon}</span>
              <span>{category.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Active Category Content */}
      <div className="bg-white rounded-xl p-4 border border-gray-200">
        {categories
          .filter((cat) => cat.key === activeTab)
          .map((category) => (
            <div key={category.key}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          ))}
      </div>

      {/* Achievement Badge */}
      {overallProgress >= 100 && (
        <div className="mt-6 p-4 bg-gradient-to-r from-yellow-100 to-orange-100 border border-yellow-200 rounded-xl">
          <div className="flex items-center space-x-3">
            <Award className="w-8 h-8 text-yellow-600" />
            <div>
              <div className="font-semibold text-yellow-800">
                🎉 Congratulations!
              </div>
              <div className="text-sm text-yellow-700">
                You've hit 100% of your daily nutritional targets!
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Motivation Message */}
      {overallProgress < 100 && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
          <div className="flex items-center space-x-3">
            <TrendingUp className="w-6 h-6 text-blue-600" />
            <div>
              <div className="font-semibold text-blue-800">Keep going!</div>
              <div className="text-sm text-blue-700">
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
