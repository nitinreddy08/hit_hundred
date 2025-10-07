import { useState, useRef, useEffect } from "react";
import {
  Search,
  Plus,
  Heart,
  Star,
  X,
  ShoppingCart,
  Trash2,
} from "lucide-react";
import { searchFoods, calculateNutrition, getFoodByName } from "../data/foodDB";

const AddFoodForm = ({ onAddFood, favorites, onToggleFavorite }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [selectedItems, setSelectedItems] = useState([]); // Cart for adding items
  const [showValidation, setShowValidation] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const placeholderLines = [
    "eg: 🥚 Egg",
    "eg: 🍗 Chicken",
    "eg: 🥣 Oats",
    "eg: 🥛 Milk",
    "eg: 🍌 Banana",
    "eg: 🧀 Paneer",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholderLines.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Removed unit info since we're always in cart mode

  const getDefaultMealType = () => {
    const hour = new Date().getHours();
    if (hour < 11) return "breakfast"; // 00:00 - 10:59
    if (hour < 16) return "lunch"; // 11:00 - 15:59
    if (hour < 19) return "snack"; // 16:00 - 18:59
    return "dinner"; // 19:00 - 23:59
  };

  const [mealType, setMealType] = useState(getDefaultMealType);
  const [showDropdown, setShowDropdown] = useState(false);
  const [suggestionsPinned, setSuggestionsPinned] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const searchRef = useRef(null);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside search or dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      const inSearch =
        searchRef.current && searchRef.current.contains(e.target);
      const inDropdown =
        dropdownRef.current && dropdownRef.current.contains(e.target);
      if (!inSearch && !inDropdown) {
        setShowDropdown(false);
        setSelectedIndex(-1);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Curated suggestion pools by meal type
  const MEAL_SUGGESTION_POOLS = {
    breakfast: [
      "Egg (Whole, Large)",
      "Oats (Dry)",
      "Greek Yogurt (Plain)",
      "Banana (Medium)",
      "Whole Milk",
      "Paneer (Indian Cottage Cheese)",
      "Almonds",
      "Brown Rice (Cooked)",
    ],
    lunch: [
      "Chicken Breast (Grilled)",
      "Brown Rice (Cooked)",
      "Dal (Mixed Lentils)",
      "Chapati/Roti (Whole Wheat)",
      "Spinach (Cooked)",
      "Curd (Dahi)",
      "Salmon (Cooked)",
      "Kidney Beans (Rajma)",
    ],
    dinner: [
      "Chicken Breast (Grilled)",
      "Salmon (Cooked)",
      "Quinoa (Cooked)",
      "Broccoli (Cooked)",
      "Paneer (Indian Cottage Cheese)",
      "Ragi Roti (Finger Millet)",
      "Tofu (Firm)",
      "Moong Dal (Cooked)",
    ],
    snack: [
      "Protein Bar (Generic)",
      "Walnuts",
      "Dates (Seedless)",
      "Peanut Butter",
      "Cottage Cheese (Low-Fat)",
      "Popcorn (Air-Popped)",
      "Hummus",
      "Apple (Medium)",
    ],
  };

  const pickRandom = (arr, n) => {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy.slice(0, n);
  };

  const getMealSuggestions = (meal) => {
    const pool = MEAL_SUGGESTION_POOLS[meal] || MEAL_SUGGESTION_POOLS.breakfast;
    const names = pickRandom(pool, 5);
    const foods = names.map((name) => getFoodByName(name)).filter(Boolean);
    return foods;
  };

  // Search foods when query changes
  useEffect(() => {
    if (searchQuery.length > 0) {
      const results = searchFoods(searchQuery);
      setSearchResults(results.slice(0, 8)); // Limit to 8 results
      setShowDropdown(true);
      setSelectedIndex(-1);
    } else {
      // If empty query, show curated suggestions by meal type when focused
      if (
        document.activeElement === searchRef.current &&
        (selectedItems.length === 0 || suggestionsPinned)
      ) {
        const suggestions = getMealSuggestions(mealType);
        setSearchResults(suggestions);
        setShowDropdown(true);
        setSelectedIndex(-1);
      } else {
        setSearchResults([]);
        setShowDropdown(false);
      }
    }
  }, [searchQuery]);

  // When meal type changes and input is empty/focused, refresh suggestions
  useEffect(() => {
    if (
      searchQuery.length === 0 &&
      document.activeElement === searchRef.current &&
      (selectedItems.length === 0 || suggestionsPinned)
    ) {
      const suggestions = getMealSuggestions(mealType);
      setSearchResults(suggestions);
      setShowDropdown(true);
      setSelectedIndex(-1);
    }
  }, [mealType]);

  // If items exist in cart and query is empty, hide suggestions and dropdown
  useEffect(() => {
    if (
      selectedItems.length > 0 &&
      searchQuery.length === 0 &&
      !suggestionsPinned
    ) {
      setSearchResults([]);
      setShowDropdown(false);
      setSelectedIndex(-1);
    }
  }, [selectedItems, searchQuery, suggestionsPinned]);

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
    // Always add to cart instead of selecting
    addToCart(food);
  };

  const addToCart = (food) => {
    const newItem = {
      id: Date.now() + Math.random(),
      food: food,
      quantity: "", // Empty quantity - user must enter it
    };

    setSelectedItems((prev) => [...prev, newItem]);
    setSearchQuery("");
  };

  const removeFromCart = (itemId) => {
    setSelectedItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const updateCartQuantity = (itemId, newQuantity) => {
    setSelectedItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedItems.length === 0) return;

    // Check for empty quantities
    const emptyItems = selectedItems.filter(
      (item) => !item.quantity || item.quantity <= 0
    );

    if (emptyItems.length > 0) {
      setShowValidation(true);
      // Remove validation after 2 seconds
      setTimeout(() => setShowValidation(false), 2000);
      return;
    }

    selectedItems.forEach((item) => {
      onAddFood(item.food, item.quantity, mealType);
    });

    setSelectedItems([]);
    setSearchQuery("");
    setShowValidation(false);
  };

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
              onFocus={() => {
                if (
                  searchQuery.length === 0 &&
                  (selectedItems.length === 0 || suggestionsPinned)
                ) {
                  const suggestions = getMealSuggestions(mealType);
                  setSearchResults(suggestions);
                  setShowDropdown(true);
                  setSelectedIndex(-1);
                  setSuggestionsPinned(true);
                } else {
                  setShowDropdown(true);
                }
              }}
              placeholder={placeholderLines[placeholderIndex]}
              className="w-full pl-8 pr-3 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-black text-sm"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
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
              {searchQuery.length === 0 &&
                (selectedItems.length === 0 || suggestionsPinned) && (
                  <div className="px-2.5 py-1 flex items-center justify-between text-[10px] text-gray-700 bg-gray-50 border-b border-gray-200 sticky top-0">
                    <span>Suggestions</span>
                    <button
                      type="button"
                      className="text-gray-500 hover:text-gray-700"
                      onClick={() => {
                        setSuggestionsPinned(false);
                        setShowDropdown(false);
                        setSelectedIndex(-1);
                      }}
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
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
                      className="p-0.5 pr-2.5 rounded-full transition-colors "
                    >
                      {isFavorite(food) ? (
                        <Heart className="w-4 h-4 text-red-500 fill-current" />
                      ) : (
                        <Heart className="w-4 h-4 text-gray-400" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(food);
                      }}
                      className="flex items-center space-x-1 px-2 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-xs"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Selected Items Cart */}
        {selectedItems.length > 0 && (
          <div className="bg-green-50 rounded-xl p-3 border border-green-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-green-800 flex items-center">
                Selected Items ({selectedItems.length})
              </h3>
              <button
                type="button"
                onClick={() => setShowClearConfirm(true)}
                className="text-red-500 hover:text-red-700 text-xs"
              >
                Clear All
              </button>
            </div>
            <div className="space-y-2">
              {selectedItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between bg-white rounded-lg p-2"
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{item.food.emoji}</span>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">
                        {item.food.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {item.food.category}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      value={item.quantity}
                      placeholder="Qty"
                      onChange={(e) =>
                        updateCartQuantity(
                          item.id,
                          e.target.value === ""
                            ? ""
                            : parseInt(e.target.value) || ""
                        )
                      }
                      min="1"
                      className={`w-16 px-2 py-1 text-xs border rounded focus:ring-1 focus:ring-blue-500 text-black placeholder-gray-400 transition-all duration-200 ${
                        showValidation && (!item.quantity || item.quantity <= 0)
                          ? "border-red-500 bg-red-50 shake"
                          : "border-gray-300"
                      }`}
                    />
                    <span className="text-xs text-gray-500">
                      {item.food.defaultUnit === "ml"
                        ? "ml"
                        : item.food.defaultUnit === "piece"
                        ? "U"
                        : "g"}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="p-1 text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Serving Sizes - Removed since we're always in cart mode */}

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
          disabled={selectedItems.length === 0}
          className="w-full py-3 btn-premium text-base disabled:opacity-50 disabled:cursor-not-allowed ripple"
        >
          Add All to {mealTypes.find((m) => m.value === mealType)?.label} (
          {selectedItems.length} items)
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

      {/* Clear All confirmation popup */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowClearConfirm(false)}
          />
          <div className="relative bg-white rounded-xl shadow-2xl p-4 w-[90%] max-w-sm border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-900 mb-1">
              Clear all selected items?
            </h3>
            <p className="text-xs text-gray-600 mb-3">
              This removes all items from the cart.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="px-3 py-1.5 text-xs rounded-lg border border-gray-300 hover:bg-gray-50 text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setSelectedItems([]);
                  setShowClearConfirm(false);
                }}
                className="px-3 py-1.5 text-xs rounded-lg bg-red-600 text-white hover:bg-red-700"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddFoodForm;
