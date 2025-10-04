import { useState, useEffect } from "react";
import {
  Edit2,
  Trash2,
  Plus,
  Minus,
  Clock,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { calculateNutrition } from "../data/foodDB";

const FoodList = ({ dailyLog, onUpdateQuantity, onRemoveFood }) => {
  const [editingId, setEditingId] = useState(null);
  const [editQuantity, setEditQuantity] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const mealTypes = [
    {
      value: "breakfast",
      label: "Breakfast",
      emoji: "🍳",
      color: "bg-yellow-100 border-yellow-200",
    },
    {
      value: "lunch",
      label: "Lunch",
      emoji: "🍱",
      color: "bg-green-100 border-green-200",
    },
    {
      value: "dinner",
      label: "Dinner",
      emoji: "🍽️",
      color: "bg-blue-100 border-blue-200",
    },
    {
      value: "snack",
      label: "Snack",
      emoji: "🍪",
      color: "bg-purple-100 border-purple-200",
    },
  ];

  const startEditing = (entry) => {
    setEditingId(entry.id);
    setEditQuantity(entry.quantity.toString());
  };

  const saveEdit = (id) => {
    const newQuantity = parseFloat(editQuantity);
    if (newQuantity > 0) {
      onUpdateQuantity(id, newQuantity);
    }
    setEditingId(null);
    setEditQuantity("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditQuantity("");
  };

  const adjustQuantity = (id, currentQuantity, delta) => {
    const newQuantity = Math.max(1, currentQuantity + delta);
    onUpdateQuantity(id, newQuantity);
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getMealTypeInfo = (mealType) => {
    return mealTypes.find((meal) => meal.value === mealType) || mealTypes[0];
  };

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

  // Calculate total calories and protein
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

  if (dailyLog.length === 0) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg border border-white/20 text-center">
        <div className="text-4xl md:text-5xl mb-2 md:mb-3">🍽️</div>
        <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-1.5">
          No foods logged yet
        </h3>
        <p className="text-gray-800 text-xs md:text-sm">
          Start by adding your first food item using the form above!
        </p>
      </div>
    );
  }

  // Show expanded view on desktop, collapsible on mobile
  const shouldShowContent = !isMobile || isExpanded;

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl md:rounded-2xl p-3 md:p-5 shadow-lg border border-white/20">
      <button
        onClick={() => isMobile && setIsExpanded(!isExpanded)}
        className={`w-full flex items-center justify-between mb-3 md:mb-5 ${
          isMobile ? "cursor-pointer" : "cursor-default"
        }`}
      >
        <h2 className="text-lg md:text-xl font-bold text-gray-800 flex items-center">
          <Clock className="w-4 md:w-5 h-4 md:h-5 mr-2 text-blue-600" />
          <span className="hidden md:inline">Today's Diet</span>
          <span className="md:hidden">Today</span>
          {isMobile && dailyLog.length > 0 && (
            <span className="ml-2 text-xs font-normal text-gray-600">
              ({dailyLog.length} {dailyLog.length === 1 ? "item" : "items"})
            </span>
          )}
        </h2>
        <div className="flex items-center gap-2 md:gap-5">
          <div className="text-right">
            <div className="text-base md:text-xl font-bold text-green-600">
              {totalCalories}
            </div>
            <div className="text-[10px] md:text-xs text-gray-600">Calories</div>
          </div>
          <div className="text-right">
            <div className="text-base md:text-xl font-bold text-purple-600">
              {totalProtein}g
            </div>
            <div className="text-[10px] md:text-xs text-gray-600">Protein</div>
          </div>
          {isMobile && dailyLog.length > 0 && (
            <div className="ml-2">
              {isExpanded ? (
                <ChevronUp className="w-5 h-5 text-gray-600" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-600" />
              )}
            </div>
          )}
        </div>
      </button>

      {shouldShowContent && (
        <div className="space-y-3 md:space-y-5">
          {mealTypes.map((meal) => {
            const entries = groupedLog[meal.value];
            if (entries.length === 0) return null;

            return (
              <div
                key={meal.value}
                className={`rounded-xl border-2 ${meal.color} p-3`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base font-semibold text-gray-800 flex items-center">
                    <span className="text-xl mr-1.5">{meal.emoji}</span>
                    {meal.label}
                  </h3>
                  <span className="text-xs text-gray-600 bg-white/60 px-1.5 py-0.5 rounded-full">
                    {entries.length} item{entries.length !== 1 ? "s" : ""}
                  </span>
                </div>

                <div className="space-y-2.5">
                  {entries.map((entry) => {
                    const nutrition = calculateNutrition(
                      entry.food,
                      entry.quantity
                    );
                    const isEditing = editingId === entry.id;

                    return (
                      <div
                        key={entry.id}
                        className="bg-white/60 backdrop-blur-sm rounded-lg p-3 border border-white/40"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="text-lg">{entry.food.emoji}</span>
                            <div>
                              <div className="font-medium text-gray-900 text-sm">
                                {entry.food.name}
                              </div>
                              <div className="text-xs text-gray-600">
                                {nutrition.calories.toFixed(0)} cal •{" "}
                                {nutrition.protein.toFixed(1)}g protein
                              </div>
                              <div className="text-xs text-gray-500 flex items-center">
                                <Clock className="w-2.5 h-2.5 mr-1" />
                                {formatTime(entry.timestamp)}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-1.5">
                            {/* Quantity Controls */}
                            <div className="flex items-center space-x-0.5">
                              <button
                                onClick={() =>
                                  adjustQuantity(entry.id, entry.quantity, -10)
                                }
                                className="p-0.5 hover:bg-gray-200 rounded-full transition-colors"
                              >
                                <Minus className="w-3.5 h-3.5 text-gray-600" />
                              </button>

                              {isEditing ? (
                                <div className="flex items-center space-x-0.5">
                                  <input
                                    type="number"
                                    value={editQuantity}
                                    onChange={(e) =>
                                      setEditQuantity(e.target.value)
                                    }
                                    onKeyDown={(e) => {
                                      if (e.key === "Enter") saveEdit(entry.id);
                                      if (e.key === "Escape") cancelEdit();
                                    }}
                                    className="w-14 px-1.5 py-0.5 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    autoFocus
                                  />
                                  <button
                                    onClick={() => saveEdit(entry.id)}
                                    className="p-0.5 text-green-600 hover:bg-green-100 rounded-full transition-colors"
                                  >
                                    <Plus className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={cancelEdit}
                                    className="p-0.5 text-red-600 hover:bg-red-100 rounded-full transition-colors"
                                  >
                                    <Minus className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              ) : (
                                <div className="flex items-center space-x-0.5">
                                  <span className="text-xs font-medium text-gray-700 min-w-[2.5rem] text-center">
                                    {entry.quantity}
                                    {entry.food.defaultUnit === "ml"
                                      ? "ml"
                                      : entry.food.defaultUnit === "piece"
                                      ? "U"
                                      : "g"}
                                  </span>
                                  <button
                                    onClick={() => startEditing(entry)}
                                    className="p-0.5 hover:bg-gray-200 rounded-full transition-colors"
                                  >
                                    <Edit2 className="w-3.5 h-3.5 text-gray-600" />
                                  </button>
                                </div>
                              )}

                              <button
                                onClick={() =>
                                  adjustQuantity(entry.id, entry.quantity, 10)
                                }
                                className="p-0.5 hover:bg-gray-200 rounded-full transition-colors"
                              >
                                <Plus className="w-3.5 h-3.5 text-gray-600" />
                              </button>
                            </div>

                            {/* Delete Button */}
                            <button
                              onClick={() => onRemoveFood(entry.id)}
                              className="p-0.5 text-red-600 hover:bg-red-100 rounded-full transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FoodList;
