import { useState } from "react";
import { X, Check, User, Activity } from "lucide-react";
import { rdaProfiles } from "../data/rdaProfiles";

const ProfileSelector = ({
  isOpen,
  onClose,
  selectedProfile,
  onSelectProfile,
}) => {
  const [hoveredProfile, setHoveredProfile] = useState(null);

  if (!isOpen) return null;

  const profiles = Object.entries(rdaProfiles).map(([key, profile]) => ({
    key,
    ...profile,
  }));

  const handleProfileSelect = (profileKey) => {
    onSelectProfile(profileKey);
    onClose();
  };

  const formatNutrientValue = (value, unit) => {
    if (unit === "kcal") return value.toLocaleString();
    if (unit === "mg" || unit === "mcg") return value.toLocaleString();
    return value.toString();
  };

  const getUnit = (nutrient) => {
    if (nutrient === "calories") return "kcal";
    if (
      ["calcium", "iron", "potassium", "zinc", "magnesium"].includes(nutrient)
    )
      return "mg";
    if (["vitaminA", "vitaminD", "vitaminK"].includes(nutrient)) return "mcg";
    if (
      [
        "vitaminC",
        "vitaminE",
        "protein",
        "carbs",
        "fat",
        "fiber",
        "omega3",
      ].includes(nutrient)
    )
      return "g";
    return "";
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-3 md:p-4">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/80 transition-opacity"
          onClick={onClose}
        />

        {/* Modal - 15% smaller: max-w-3xl instead of max-w-4xl */}
        <div className="relative bg-white rounded-xl md:rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header - 15% smaller padding and text */}
          <div className="flex items-center justify-between p-3 md:p-5 border-b border-gray-200">
            <h2 className="text-base md:text-xl font-bold text-gray-800 flex items-center">
              <User className="w-4 md:w-5 h-4 md:h-5 mr-2 text-blue-600" />
              <span className="hidden md:inline">Select Your Profile</span>
              <span className="md:hidden">Profile</span>
            </h2>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Content - 15% smaller padding */}
          <div className="p-3 md:p-5">
            {/* Disclaimer moved to hero section */}
            <div className="mb-3 md:mb-4 p-2.5 md:p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-[10px] md:text-xs text-gray-600 leading-relaxed text-left">
                <span className="font-semibold text-gray-700">Disclaimer:</span>{" "}
                This app is designed for general use, with goal intakes set for
                individuals without any underlying medical conditions. If you
                have any medical conditions or specific dietary needs, please
                consult a healthcare professional before using this app and
                tailor your nutrition goals accordingly.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5">
              {profiles.map((profile) => (
                <div
                  key={profile.key}
                  className={`relative border-2 rounded-lg md:rounded-xl p-3 md:p-5 cursor-pointer transition-all duration-200 ${
                    selectedProfile === profile.key
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                  onClick={() => handleProfileSelect(profile.key)}
                  onMouseEnter={() => setHoveredProfile(profile.key)}
                  onMouseLeave={() => setHoveredProfile(null)}
                >
                  {/* Selection Indicator */}
                  {selectedProfile === profile.key && (
                    <div className="absolute top-3 right-3 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}

                  {/* Profile Header */}
                  <div className="mb-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-2xl">
                          {profile.gender.toLowerCase() === "male"
                            ? "👨"
                            : "👩"}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-base md:text-lg font-bold text-gray-800">
                          {profile.name}
                        </h3>
                        <p className="text-xs text-gray-600">
                          {profile.age} • {profile.gender} • {profile.activity}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Nutritional Requirements */}
                  <div className="space-y-3">
                    {/* Macros */}
                    <div>
                      <h4 className="text-xs font-semibold text-gray-700 mb-1.5 flex items-center">
                        <span className="text-base mr-1.5">🍽️</span>
                        Macronutrients
                      </h4>
                      <div className="grid grid-cols-2 gap-1.5 text-xs">
                        <div className="flex justify-between">
                          <span className="text-gray-800">Calories:</span>
                          <span className="font-medium text-gray-800">
                            {formatNutrientValue(
                              profile.macros.calories,
                              "kcal"
                            )}{" "}
                            kcal,
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-800">Protein:</span>
                          <span className="font-medium text-gray-800">
                            {profile.macros.protein} g
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-800">Carbs:</span>
                          <span className="font-medium text-gray-800">
                            {typeof profile.macros.carbs === "object"
                              ? `${profile.macros.carbs.min}–${profile.macros.carbs.max}`
                              : profile.macros.carbs}{" "}
                            g,
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-800">Fat:</span>
                          <span className="font-medium text-gray-800">
                            {typeof profile.macros.fat === "object"
                              ? `${profile.macros.fat.min}–${profile.macros.fat.max}`
                              : profile.macros.fat}{" "}
                            g
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-800">Fiber:</span>
                          <span className="font-medium text-gray-800">
                            {typeof profile.macros.fiber === "object"
                              ? `${profile.macros.fiber.min}–${profile.macros.fiber.max}`
                              : profile.macros.fiber}{" "}
                            g,
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Minerals */}
                    <div>
                      <h4 className="text-xs font-semibold text-gray-700 mb-1.5 flex items-center">
                        <span className="text-base mr-1.5">⚡</span>
                        Minerals
                      </h4>
                      <div className="grid grid-cols-2 gap-1.5 text-xs">
                        <div className="flex justify-between">
                          <span className="text-gray-800">Calcium:</span>
                          <span className="font-medium text-gray-800">
                            {formatNutrientValue(
                              profile.minerals.calcium,
                              "mg"
                            )}{" "}
                            mg,
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-800">Iron:</span>
                          <span className="font-medium text-gray-800">
                            {profile.minerals.iron} mg,
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-800">Potassium:</span>
                          <span className="font-medium text-gray-800">
                            {formatNutrientValue(
                              profile.minerals.potassium,
                              "mg"
                            )}{" "}
                            mg,
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-800">Magnesium:</span>
                          <span className="font-medium text-gray-800">
                            {formatNutrientValue(
                              profile.minerals.magnesium,
                              "mg"
                            )}{" "}
                            mg,
                          </span>
                        </div>
                        <div className="flex justify-between text-gray-800">
                          <span className="text-gray-800">Zinc:</span>
                          <span className="font-medium">
                            {profile.minerals.zinc} mg,
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Vitamins */}
                    <div>
                      <h4 className="text-xs font-semibold text-gray-700 mb-1.5 flex items-center">
                        <span className="text-base mr-1.5">💊</span>
                        Vitamins
                      </h4>
                      <div className="grid grid-cols-2 gap-1.5 text-xs">
                        <div className="flex justify-between">
                          <span className="text-gray-800">Vitamin A:</span>
                          <span className="font-medium text-gray-800">
                            {formatNutrientValue(
                              profile.vitamins.vitaminA,
                              "mcg"
                            )}{" "}
                            mcg,
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-800">Vitamin C:</span>
                          <span className="font-medium text-gray-800">
                            {profile.vitamins.vitaminC} mg,
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-800">Vitamin D:</span>
                          <span className="font-medium text-gray-800">
                            {profile.vitamins.vitaminD} mcg,
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-800">Vitamin E:</span>
                          <span className="font-medium text-gray-800">
                            {profile.vitamins.vitaminE} mg,
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-800">Vitamin K:</span>
                          <span className="font-medium text-gray-800">
                            {profile.vitamins.vitaminK} mcg,
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Essential Fats */}
                    <div>
                      <h4 className="text-xs font-semibold text-gray-700 mb-1.5 flex items-center">
                        <span className="text-base mr-1.5">🐟</span>
                        Essential Fats
                      </h4>
                      <div className="text-xs">
                        <div className="flex justify-between">
                          <span className="text-gray-800">Omega-3:</span>
                          <span className="font-medium text-gray-800">
                            {typeof profile.fats.omega3 === "object"
                              ? `${profile.fats.omega3.min}–${profile.fats.omega3.max}`
                              : profile.fats.omega3}{" "}
                            g,
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Hover Effect */}
                  {hoveredProfile === profile.key &&
                    selectedProfile !== profile.key && (
                      <div className="absolute inset-0 border-2 border-blue-300 rounded-xl pointer-events-none"></div>
                    )}
                </div>
              ))}
            </div>

            {/* Info Section */}
            {/* <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <h3 className="font-semibold text-blue-800 mb-2">
                About RDA Profiles
              </h3>
              <p className="text-sm text-blue-700">
                These profiles are based on Recommended Dietary Allowances (RDA)
                for active adults. The values represent daily nutritional
                targets to maintain optimal health and energy levels. Choose the
                profile that best matches your demographic and activity level.
              </p>
            </div> */}
          </div>

          {/* Disclaimer moved above; footer removed */}
        </div>
      </div>
    </div>
  );
};

export default ProfileSelector;
