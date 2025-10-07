// RDA (Recommended Dietary Allowance) profiles for different demographics
// Values are daily requirements for active adults

export const rdaProfiles = {
  MALE_ADULT: {
    name: "Active Male Adult",
    age: "19-50",
    gender: "Male",
    activity: "Active",
    macros: {
      calories: 2500, // kcal
      protein: 135, // g
      carbs: { min: 300, max: 350 }, // g
      fat: { min: 70, max: 80 }, // g
      fiber: { min: 30, max: 35 }, // g
    },
    minerals: {
      calcium: 1000, // mg
      iron: 17, // mg
      magnesium: 400, // mg
      potassium: 3500, // mg
      zinc: 11, // mg
    },
    vitamins: {
      vitaminA: 900, // mcg RAE
      vitaminC: 90, // mg
      vitaminD: 15, // mcg
      vitaminE: 15, // mg
      vitaminK: 120, // mcg
    },
    fats: {
      omega3: { min: 2, max: 3 }, // g
      creatine: { min: 3, max: 5 }, // g (maintenance range)
    },
  },
  FEMALE_ADULT: {
    name: "Active Female Adult",
    age: "19-50",
    gender: "Female",
    activity: "Active",
    macros: {
      calories: 2000, // kcal
      protein: 92, // g
      carbs: { min: 250, max: 300 }, // g
      fat: { min: 60, max: 70 }, // g
      fiber: { min: 25, max: 30 }, // g
    },
    minerals: {
      calcium: 1000, // mg
      iron: 18, // mg
      magnesium: 310, // mg
      potassium: 3500, // mg
      zinc: 8, // mg
    },
    vitamins: {
      vitaminA: 700, // mcg RAE
      vitaminC: 75, // mg
      vitaminD: 15, // mcg
      vitaminE: 15, // mg
      vitaminK: 90, // mcg
    },
    fats: {
      omega3: { min: 2, max: 3 }, // g
      creatine: { min: 3, max: 5 }, // g (maintenance range)
    },
  },
};

// Helper function to get nutrient value from profile
export const getNutrientValue = (profile, category, nutrient) => {
  return profile[category]?.[nutrient] || 0;
};

// Helper function to calculate percentage of RDA
export const calculateRdaPercentage = (consumed, required) => {
  if (required === 0) return 0;
  return Math.min((consumed / required) * 100, 200); // Cap at 200% for display
};

// Helper function to get color based on percentage
export const getProgressColor = (percentage) => {
  if (percentage >= 100) return "text-green-600 bg-green-100";
  if (percentage >= 75) return "text-yellow-600 bg-yellow-100";
  if (percentage >= 50) return "text-orange-600 bg-orange-100";
  return "text-red-600 bg-red-100";
};
