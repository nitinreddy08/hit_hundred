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
      protein: 130, // g (optimal for fitness/muscle building)
      carbs: 325, // g (45-65% of calories)
      fat: 83, // g (25-35% of calories)
      fiber: 38, // g
    },
    minerals: {
      calcium: 1000, // mg
      iron: 8, // mg
      potassium: 3500, // mg
      zinc: 11, // mg
    },
    vitamins: {
      vitaminA: 900, // mcg RAE
      vitaminC: 90, // mg
      vitaminD: 15, // mcg
      vitaminE: 15, // mg
    },
    fats: {
      omega3: 1.6, // g
    },
  },
  FEMALE_ADULT: {
    name: "Active Female Adult",
    age: "19-50",
    gender: "Female",
    activity: "Active",
    macros: {
      calories: 2000, // kcal
      protein: 92, // g (optimal for fitness/muscle building)
      carbs: 260, // g (45-65% of calories)
      fat: 67, // g (25-35% of calories)
      fiber: 25, // g
    },
    minerals: {
      calcium: 1000, // mg
      iron: 18, // mg (higher due to menstruation)
      potassium: 2600, // mg
      zinc: 8, // mg
    },
    vitamins: {
      vitaminA: 700, // mcg RAE
      vitaminC: 75, // mg
      vitaminD: 15, // mcg
      vitaminE: 15, // mg
    },
    fats: {
      omega3: 1.1, // g
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
