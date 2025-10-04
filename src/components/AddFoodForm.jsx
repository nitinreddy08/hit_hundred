import { useState, useRef, useEffect } from "react";
import { Search, Plus, Heart, Star, X } from "lucide-react";
import { searchFoods, calculateNutrition } from "../data/foodDB";

const AddFoodForm = ({ onAddFood, favorites, onToggleFavorite }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [quantity, setQuantity] = useState(""); // Empty until food selected

  // Get the appropriate unit and default quantity for the selected food
  const getUnitInfo = () => {
    if (!selectedFood) return { unit: "g", label: "grams", default: 100 };

    const unit = selectedFood.defaultUnit || "g";

    if (unit === "ml") {
      return { unit: "ml", label: "milliliters", default: 250 };
    } else if (unit === "piece") {
      // Check if it's a protein powder (should be measured in scoops)
      const isProteinPowder =
        selectedFood.name.toLowerCase().includes("protein") &&
        selectedFood.name.toLowerCase().includes("powder");
      const label = isProteinPowder ? "scoops" : "pieces";
      return { unit: "piece", label: label, default: 1 };
    } else {
      return { unit: "g", label: "grams", default: 100 };
    }
  };

  const unitInfo = getUnitInfo();

  // Auto-detect meal type based on current time
  const getDefaultMealType = () => {
    const hour = new Date().getHours();

    if (hour >= 6 && hour < 11) {
      return "breakfast"; // 6 AM - 11 AM
    } else if (hour >= 11 && hour < 16) {
      return "lunch"; // 11 AM - 4 PM
    } else if (hour >= 16 && hour < 19) {
      return "snack"; // 4 PM - 7 PM
    } else {
      return "dinner"; // 7 PM - 6 AM
    }
  };

  const [mealType, setMealType] = useState(getDefaultMealType());
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const searchRef = useRef(null);
  const dropdownRef = useRef(null);

  // Search foods when query changes
  useEffect(() => {
    if (searchQuery.length > 0 && !selectedFood) {
      const results = searchFoods(searchQuery);
      setSearchResults(results.slice(0, 8)); // Limit to 8 results
      setShowDropdown(true);
      setSelectedIndex(-1);
    } else {
      setSearchResults([]);
      setShowDropdown(false);
    }
  }, [searchQuery, selectedFood]);

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (!showDropdown) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < searchResults.length - 1 ? prev + 1 : 0
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : searchResults.length - 1
        );
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < searchResults.length) {
          handleFoodSelect(searchResults[selectedIndex]);
        }
        break;
      case "Escape":
        setShowDropdown(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleFoodSelect = (food) => {
    setSelectedFood(food);
    setSearchQuery(food.name);
    setShowDropdown(false);
    setSelectedIndex(-1);

    // Set appropriate default quantity based on food type
    const unit = food.defaultUnit || "g";
    if (unit === "ml") {
      setQuantity(food.defaultQuantity || 250);
    } else if (unit === "piece") {
      setQuantity(food.defaultQuantity || 1);
    } else {
      setQuantity(food.defaultQuantity || 100);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validQuantity =
      typeof quantity === "number" ? quantity : parseInt(quantity, 10);
    if (selectedFood && validQuantity > 0) {
      onAddFood(selectedFood, validQuantity, mealType);
      setSelectedFood(null);
      setSearchQuery("");
      setQuantity(""); // Reset to empty
    }
  };

  // Dynamic quick serving sizes based on food type
  const getQuickServingSizes = () => {
    if (!selectedFood) return [25, 50, 100, 150, 200];

    const unit = selectedFood.defaultUnit || "g";
    if (unit === "ml") {
      return [100, 200, 250, 500]; // ml for liquids
    } else if (unit === "piece") {
      return [1, 2, 3, 4]; // pieces for countable items
    } else {
      return [25, 50, 100, 150, 200]; // grams for solid foods
    }
  };

  const quickServingSizes = getQuickServingSizes();

  const mealTypes = [
    { value: "breakfast", label: "Breakfast", emoji: "🍳" },
    { value: "lunch", label: "Lunch", emoji: "🍱" },
    { value: "dinner", label: "Dinner", emoji: "🍽️" },
    { value: "snack", label: "Snack", emoji: "🍪" },
  ];

  const isFavorite = (food) => {
    return favorites.some((fav) => fav.name === food.name);
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl md:rounded-2xl p-3 md:p-5 shadow-lg border border-white/20">
      <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-3 md:mb-5 flex items-center">
        <Plus className="w-4 md:w-5 h-4 md:h-5 mr-2 text-blue-600" />
        Add Food
      </h2>

      <form onSubmit={handleSubmit} className="space-y-3 md:space-y-5">
        {/* Food Search */}
        <div className="relative">
          <label className="block text-xs font-medium text-black mb-1.5">
            Search Food
          </label>
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-black w-4 h-4" />
            <input
              ref={searchRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setShowDropdown(true)}
              placeholder="Search for foods..."
              className="w-full pl-8 pr-3 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-black text-sm"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedFood(null);
                  setShowDropdown(false);
                }}
                className="absolute right-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Search Dropdown */}
          {showDropdown && searchResults.length > 0 && (
            <div
              ref={dropdownRef}
              className="absolute z-10 w-full mt-1.5 bg-white border border-gray-200 rounded-xl shadow-lg max-h-52 overflow-y-auto"
            >
              {searchResults.map((food, index) => (
                <div
                  key={food.name}
                  className={`flex items-center justify-between p-2.5 hover:bg-gray-50 cursor-pointer ${
                    index === selectedIndex ? "bg-blue-50" : ""
                  } ${index === 0 ? "rounded-t-xl" : ""} ${
                    index === searchResults.length - 1 ? "rounded-b-xl" : ""
                  }`}
                  onClick={() => handleFoodSelect(food)}
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{food.emoji}</span>
                    <div>
                      <div className="font-medium text-black text-sm">
                        {food.name}
                      </div>
                      <div className="text-xs text-black">{food.category}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(food);
                      }}
                      className="p-0.5 hover:bg-gray-200 rounded-full transition-colors"
                    >
                      {isFavorite(food) ? (
                        <Heart className="w-3.5 h-3.5 text-red-500 fill-current" />
                      ) : (
                        <Heart className="w-3.5 h-3.5 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Selected Food Display */}
        {selectedFood && (
          <div className="bg-blue-50 rounded-xl p-3 border border-blue-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-lg">{selectedFood.emoji}</span>
                <div>
                  <div className="font-medium text-black text-sm">
                    {selectedFood.name}
                  </div>
                  <div className="text-xs text-black">
                    {selectedFood.category} •{" "}
                    {selectedFood.nutrition.calories.toFixed(1)} cal/g
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSelectedFood(null);
                  setQuantity("");
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Quantity Input */}
        <div>
          <label className="block text-xs font-medium text-black mb-1.5">
            Quantity{selectedFood && ` (${unitInfo.label})`}
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="number"
              value={quantity}
              placeholder={selectedFood ? "" : "Select a food first"}
              disabled={!selectedFood}
              onChange={(e) => {
                const value = e.target.value;
                if (value === "") {
                  setQuantity("");
                } else {
                  const numValue = parseInt(value, 10);
                  if (!isNaN(numValue) && numValue > 0) {
                    setQuantity(numValue);
                  }
                }
              }}
              onBlur={(e) => {
                if (
                  selectedFood &&
                  (e.target.value === "" || quantity === "")
                ) {
                  setQuantity(unitInfo.default);
                }
              }}
              min="1"
              max="10000"
              className="text-black flex-1 px-3 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed text-sm"
            />
            {selectedFood && (
              <span className="text-black font-medium text-sm">
                {unitInfo.unit}
              </span>
            )}
          </div>

          {/* Quick Serving Sizes */}
          {selectedFood && (
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => {
                  setQuantity("");
                  document.querySelector('input[type="number"]')?.focus();
                }}
                className="px-2.5 py-1 text-xs rounded-lg border border-purple-300 bg-purple-50 text-purple-700 hover:bg-purple-100 transition-colors font-medium"
              >
                Custom
              </button>
              {quickServingSizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setQuantity(size)}
                  className={`px-2.5 py-1 text-xs rounded-lg border transition-colors ${
                    quantity === size
                      ? "bg-blue-500 text-white border-blue-500"
                      : "bg-white text-black border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {size}
                  {unitInfo.unit}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Meal Type Selection */}
        <div>
          <label className="block text-xs font-medium text-black mb-1.5">
            Meal Type
          </label>
          <div className="grid grid-cols-2 gap-1.5">
            {mealTypes.map((meal) => (
              <button
                key={meal.value}
                type="button"
                onClick={() => setMealType(meal.value)}
                className={`flex items-center justify-center space-x-1 md:space-x-1.5 p-2 md:p-2.5 rounded-lg md:rounded-xl border transition-all duration-200 ${
                  mealType === meal.value
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-white text-black border-gray-300 hover:bg-gray-50"
                }`}
              >
                <span className="text-sm md:text-base">{meal.emoji}</span>
                <span className="font-medium text-xs md:text-sm">
                  {meal.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!selectedFood || quantity <= 0}
          className="w-full py-3 btn-premium text-base disabled:opacity-50 disabled:cursor-not-allowed ripple"
        >
          Add to {mealTypes.find((m) => m.value === mealType)?.label}
        </button>
      </form>

      {/* Favorites Section */}
      {favorites.length > 0 && (
        <div className="mt-5 pt-5 border-t border-gray-200">
          <h3 className="text-base font-semibold text-black mb-2.5 flex items-center">
            <Star className="w-4 h-4 mr-1.5 text-yellow-500" />
            Favorites
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {favorites.slice(0, 5).map((food) => (
              <button
                key={food.name}
                onClick={() => handleFoodSelect(food)}
                className="flex items-center space-x-1.5 px-2.5 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <span className="text-base">{food.emoji}</span>
                <span className="text-xs font-medium text-black">
                  {food.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AddFoodForm;
