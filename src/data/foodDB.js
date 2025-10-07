export const FOOD_CATEGORIES = {
  DAIRY: "Dairy & Eggs",
  PROTEIN: "Protein & Meat",
  GRAINS: "Grains & Cereals",
  LEGUMES: "Legumes & Beans",
  VEGETABLES: "Vegetables",
  FRUITS: "Fruits",
  NUTS_SEEDS: "Nuts & Seeds",
  BEVERAGES: "Beverages",
  SNACKS: "Snacks & Others",
  SOUTH_INDIAN: "South Indian Foods",
};

// Common serving sizes for user convenience
export const SERVING_SIZES = {
  "Egg (Whole, Large)": [
    { label: "1 large egg", grams: 50 },
    { label: "2 eggs", grams: 100 },
    { label: "3 eggs", grams: 150 },
  ],
  "Egg Omelette": [{ label: "1 omelette (1 egg)", grams: 60 }],
  "Chicken Breast (Grilled)": [
    { label: "Small breast (3 oz)", grams: 85 },
    { label: "Medium breast (5 oz)", grams: 140 },
    { label: "Large breast (8 oz)", grams: 225 },
  ],
  "Brown Rice (Cooked)": [
    { label: "1/2 cup", grams: 100 },
    { label: "1 cup", grams: 195 },
  ],

  // === Gym-focused additions ===
  // Rotis / flatbreads
  "Chapati/Roti (Whole Wheat)": [
    { label: "1 roti", grams: 40 },
    { label: "2 rotis", grams: 80 },
    { label: "3 rotis", grams: 120 },
  ],
  "Phulka (Oil-Free Roti)": [
    { label: "1 phulka", grams: 25 },
    { label: "2 phulkas", grams: 50 },
    { label: "3 phulkas", grams: 75 },
  ],
  "Jowar Roti (Sorghum)": [
    { label: "1 roti", grams: 60 },
    { label: "2 rotis", grams: 120 },
  ],
  "Bajra Roti (Pearl Millet)": [
    { label: "1 roti", grams: 60 },
    { label: "2 rotis", grams: 120 },
  ],
  "Ragi Roti (Finger Millet)": [
    { label: "1 roti", grams: 60 },
    { label: "2 rotis", grams: 120 },
  ],

  // Carbs
  "Basmati Rice (Cooked)": [
    { label: "1/2 cup", grams: 90 },
    { label: "1 cup", grams: 180 },
  ],
  "Dalia (Broken Wheat, Cooked)": [
    { label: "1/2 cup", grams: 100 },
    { label: "1 cup", grams: 200 },
  ],
  "Poha (Cooked)": [
    { label: "1 cup", grams: 120 },
    { label: "1.5 cups", grams: 180 },
  ],

  // Protein powders
  "Whey Protein Powder": [
    { label: "1 scoop", grams: 30 },
    { label: "2 scoops", grams: 60 },
  ],
  "Whey Isolate Powder": [
    { label: "1 scoop", grams: 30 },
    { label: "2 scoops", grams: 60 },
  ],
  "Pea Protein Powder": [
    { label: "1 scoop", grams: 30 },
    { label: "2 scoops", grams: 60 },
  ],
  "Casein Protein Powder": [
    { label: "1 scoop", grams: 30 },
    { label: "2 scoops", grams: 60 },
  ],
  "Creatine Monohydrate": [
    { label: "1 scoop", grams: 5 },
    { label: "2 scoops", grams: 10 },
  ],

  // Veg protein
  "Soya Chunks (Dry)": [
    { label: "2 tbsp (dry)", grams: 20 },
    { label: "1/2 cup (dry)", grams: 50 },
  ],
  "Soya Chunks (Boiled)": [
    { label: "1/2 cup", grams: 75 },
    { label: "1 cup", grams: 150 },
  ],
  "Sprouted Moong (Raw)": [
    { label: "1/2 cup", grams: 50 },
    { label: "1 cup", grams: 100 },
  ],

  // Utility
  "Protein Bar (Generic)": [{ label: "1 bar", grams: 60 }],
  "Dates (Seedless)": [
    { label: "1 date", grams: 10 },
    { label: "5 dates", grams: 50 },
  ],
  "Ghee (Cow)": [
    { label: "1 tsp", grams: 5 }, // density-aware conversion handles ml→g
    { label: "1 tbsp", grams: 15 },
  ],
};

// All nutritional values are PER 1 GRAM
export const FOOD_DB = [
  // DAIRY & EGGS
  {
    name: "Egg (Whole, Large)",
    category: FOOD_CATEGORIES.DAIRY,
    emoji: "🥚",
    defaultUnit: "piece",
    defaultQuantity: 1,
    pieceWeight: 50, // 1 egg = 50g
    nutrients: {
      calories: 1.4,
      protein: 0.12,
      carbs: 0.012,
      fat: 0.1,
      calcium: 0.56,
      iron: 0.018,
      vitaminA: 1.5,
      vitaminD: 0.022,
      vitaminE: 0.002,
      vitaminK: 0.0003,
      zinc: 0.014,
    },
  },
  {
    name: "Egg Omelette",
    category: FOOD_CATEGORIES.DAIRY,
    emoji: "🍳",
    defaultUnit: "piece",
    defaultQuantity: 1,
    pieceWeight: 60, // 1 omelette = 60g (1 egg)
    nutrients: {
      calories: 1.45,
      protein: 0.12,
      carbs: 0.01,
      fat: 0.11,
      calcium: 0.55,
      iron: 0.018,
    },
  },
  {
    name: "Egg Whites (Large)",
    category: FOOD_CATEGORIES.DAIRY,
    emoji: "🥚",
    defaultUnit: "g",
    nutrients: {
      calories: 0.52,
      protein: 0.11,
      carbs: 0.007,
      fat: 0.002,
      calcium: 0.06,
    },
  },
  {
    name: "Egg White Omelette",
    category: FOOD_CATEGORIES.DAIRY,
    emoji: "🍳",
    defaultUnit: "g",
    nutrients: {
      calories: 0.52,
      protein: 0.11,
      carbs: 0.007,
      fat: 0.002,
      calcium: 0.06,
    },
  },
  {
    name: "Egg Bhurji (Scrambled)",
    category: FOOD_CATEGORIES.DAIRY,
    emoji: "🍳",
    defaultUnit: "g",
    nutrients: {
      calories: 1.68,
      protein: 0.125,
      carbs: 0.025,
      fat: 0.13,
      calcium: 0.58,
    },
  },
  {
    name: "Whole Milk",
    category: FOOD_CATEGORIES.DAIRY,
    emoji: "🥛",
    defaultUnit: "ml",
    nutrients: {
      calories: 0.61,
      protein: 0.032,
      carbs: 0.048,
      fat: 0.033,
      calcium: 1.13,
      vitaminD: 0.005,
      vitaminA: 0.46,
      vitaminK: 0.0004,
      magnesium: 0.11,
      potassium: 1.5,
    },
  },
  {
    name: "Skim Milk",
    category: FOOD_CATEGORIES.DAIRY,
    emoji: "🥛",
    defaultUnit: "ml",
    nutrients: {
      calories: 0.34,
      protein: 0.034,
      carbs: 0.05,
      fat: 0.001,
      calcium: 1.22,
      vitaminD: 0.005,
    },
  },
  {
    name: "Greek Yogurt (Plain)",
    category: FOOD_CATEGORIES.DAIRY,
    emoji: "🥣",
    defaultUnit: "g",
    nutrients: {
      calories: 0.59,
      protein: 0.1,
      carbs: 0.036,
      fat: 0.004,
      calcium: 1.1,
      vitaminA: 0.002,
      vitaminK: 0.002,
      magnesium: 0.11,
    },
  },
  {
    name: "Hung Curd (Low-Fat)",
    category: FOOD_CATEGORIES.DAIRY,
    emoji: "🥣",
    defaultUnit: "g",
    nutrients: {
      calories: 0.58,
      protein: 0.09,
      carbs: 0.045,
      fat: 0.01,
      calcium: 1.2,
      vitaminA: 0.002,
      vitaminK: 0.002,
      magnesium: 0.11,
    },
  },
  {
    name: "Curd (Dahi)",
    category: FOOD_CATEGORIES.DAIRY,
    emoji: "🥛",
    defaultUnit: "g",
    nutrients: {
      calories: 0.6,
      protein: 0.035,
      carbs: 0.047,
      fat: 0.041,
      calcium: 1.21,
      vitaminA: 0.002,
      vitaminK: 0.002,
      magnesium: 0.11,
    },
  },
  {
    name: "Buttermilk (Chaas)",
    category: FOOD_CATEGORIES.DAIRY,
    emoji: "🥛",
    defaultUnit: "ml",
    nutrients: {
      calories: 0.4,
      protein: 0.033,
      carbs: 0.049,
      fat: 0.009,
      calcium: 1.16,
      vitaminA: 0.001,
      vitaminK: 0.001,
      magnesium: 0.11,
    },
  },
  {
    name: "Paneer (Indian Cottage Cheese)",
    category: FOOD_CATEGORIES.DAIRY,
    emoji: "🧈",
    defaultUnit: "g",
    nutrients: {
      calories: 2.65,
      protein: 0.18,
      carbs: 0.06,
      fat: 0.2,
      calcium: 4.8,
      vitaminA: 1.95,
      magnesium: 0.23,
      zinc: 0.012,
    },
  },
  {
    name: "Paneer (Low-Fat)",
    category: FOOD_CATEGORIES.DAIRY,
    emoji: "🧀",
    defaultUnit: "g",
    nutrients: {
      calories: 1.95,
      protein: 0.22,
      carbs: 0.04,
      fat: 0.1,
      calcium: 3.8,
      magnesium: 0.23,
      zinc: 0.012,
    },
  },
  {
    name: "Paneer Bhurji (Low Oil)",
    category: FOOD_CATEGORIES.DAIRY,
    emoji: "🍳",
    defaultUnit: "g",
    nutrients: {
      calories: 2.1,
      protein: 0.16,
      carbs: 0.045,
      fat: 0.14,
      calcium: 2.5,
    },
  },
  {
    name: "Cheddar Cheese",
    category: FOOD_CATEGORIES.DAIRY,
    emoji: "🧀",
    defaultUnit: "g",
    nutrients: {
      calories: 4.0,
      protein: 0.233,
      carbs: 0.013,
      fat: 0.333,
      calcium: 6.67,
      vitaminA: 3.17,
    },
  },
  {
    name: "Mozzarella Cheese",
    category: FOOD_CATEGORIES.DAIRY,
    emoji: "🧀",
    defaultUnit: "g",
    nutrients: {
      calories: 2.83,
      protein: 0.2,
      carbs: 0.02,
      fat: 0.21,
      calcium: 4.77,
    },
  },
  {
    name: "Cottage Cheese (Low-Fat)",
    category: FOOD_CATEGORIES.DAIRY,
    emoji: "🧀",
    defaultUnit: "g",
    nutrients: {
      calories: 0.72,
      protein: 0.12,
      carbs: 0.032,
      fat: 0.01,
      calcium: 0.83,
    },
  },

  // PROTEIN & MEAT
  {
    name: "Chicken Breast (Grilled)",
    category: FOOD_CATEGORIES.PROTEIN,
    emoji: "🍗",
    defaultUnit: "g",
    nutrients: {
      calories: 1.65,
      protein: 0.31,
      carbs: 0,
      fat: 0.036,
      iron: 0.005,
      potassium: 2.56,
      magnesium: 0.29,
      zinc: 0.004,
    },
  },
  {
    name: "Chicken Tikka (Breast, Grilled)",
    category: FOOD_CATEGORIES.PROTEIN,
    emoji: "🍗",
    defaultUnit: "g",
    nutrients: {
      calories: 1.6,
      protein: 0.29,
      carbs: 0.01,
      fat: 0.04,
    },
  },
  {
    name: "Chicken Thigh (Skinless)",
    category: FOOD_CATEGORIES.PROTEIN,
    emoji: "🍗",
    defaultUnit: "g",
    nutrients: {
      calories: 2.09,
      protein: 0.26,
      carbs: 0,
      fat: 0.11,
      iron: 0.009,
    },
  },
  {
    name: "Turkey Breast",
    category: FOOD_CATEGORIES.PROTEIN,
    emoji: "🦃",
    defaultUnit: "g",
    nutrients: {
      calories: 1.35,
      protein: 0.3,
      carbs: 0,
      fat: 0.007,
      iron: 0.007,
    },
  },
  {
    name: "Salmon (Cooked)",
    category: FOOD_CATEGORIES.PROTEIN,
    emoji: "🐟",
    defaultUnit: "g",
    nutrients: {
      calories: 2.06,
      protein: 0.22,
      carbs: 0,
      fat: 0.13,
      omega3: 0.023,
      vitaminD: 0.11,
      potassium: 3.63,
      magnesium: 0.29,
      zinc: 0.004,
    },
  },
  {
    name: "Rohu Fish (Cooked)",
    category: FOOD_CATEGORIES.PROTEIN,
    emoji: "🐟",
    defaultUnit: "g",
    nutrients: {
      calories: 1.2,
      protein: 0.2,
      carbs: 0,
      fat: 0.03,
      omega3: 0.006,
    },
  },
  {
    name: "Tuna (Canned in Water)",
    category: FOOD_CATEGORIES.PROTEIN,
    emoji: "🐟",
    defaultUnit: "g",
    nutrients: {
      calories: 1.16,
      protein: 0.26,
      carbs: 0,
      fat: 0.008,
      omega3: 0.003,
      potassium: 3.27,
      magnesium: 0.3,
      zinc: 0.004,
    },
  },
  {
    name: "Prawns (Cooked)",
    category: FOOD_CATEGORIES.PROTEIN,
    emoji: "🦐",
    defaultUnit: "g",
    nutrients: {
      calories: 0.99,
      protein: 0.24,
      carbs: 0.002,
      fat: 0.003,
      iron: 0.005,
      omega3: 0.003,
    },
  },
  {
    name: "Fish Curry (Average)",
    category: FOOD_CATEGORIES.PROTEIN,
    emoji: "🐟",
    defaultUnit: "g",
    nutrients: {
      calories: 1.35,
      protein: 0.18,
      carbs: 0.05,
      fat: 0.08,
      omega3: 0.015,
    },
  },
  {
    name: "Beef (Lean Ground, Cooked)",
    category: FOOD_CATEGORIES.PROTEIN,
    emoji: "🥩",
    defaultUnit: "g",
    nutrients: {
      calories: 2.5,
      protein: 0.26,
      carbs: 0,
      fat: 0.15,
      iron: 0.027,
      zinc: 0.063,
    },
  },
  {
    name: "Pork Chop (Lean)",
    category: FOOD_CATEGORIES.PROTEIN,
    emoji: "🥓",
    defaultUnit: "g",
    nutrients: {
      calories: 2.06,
      protein: 0.28,
      carbs: 0,
      fat: 0.097,
      iron: 0.007,
    },
  },
  {
    name: "Mutton (Lean)",
    category: FOOD_CATEGORIES.PROTEIN,
    emoji: "🍖",
    defaultUnit: "g",
    nutrients: {
      calories: 2.58,
      protein: 0.25,
      carbs: 0,
      fat: 0.17,
      iron: 0.019,
      zinc: 0.042,
    },
  },
  {
    name: "Whey Protein Powder",
    category: FOOD_CATEGORIES.PROTEIN,
    emoji: "💪",
    defaultUnit: "piece",
    pieceWeight: 30, // 1 scoop = 30g
    defaultQuantity: 1,
    nutrients: {
      calories: 3.87,
      protein: 0.774,
      carbs: 0.097,
      fat: 0.048,
      calcium: 4.84,
      magnesium: 1.0,
      potassium: 1.6,
      zinc: 0.01,
    },
  },
  {
    name: "Whey Isolate Powder",
    category: FOOD_CATEGORIES.PROTEIN,
    emoji: "💪",
    defaultUnit: "piece",
    pieceWeight: 30, // 1 scoop = 30g
    defaultQuantity: 1,
    nutrients: {
      calories: 3.7,
      protein: 0.9,
      carbs: 0.02,
      fat: 0.01,
      calcium: 3.5,
      magnesium: 0.6,
      potassium: 1.2,
    },
  },
  {
    name: "Pea Protein Powder",
    category: FOOD_CATEGORIES.PROTEIN,
    emoji: "💪",
    defaultUnit: "piece",
    pieceWeight: 30, // 1 scoop = 30g
    defaultQuantity: 1,
    nutrients: {
      calories: 3.9,
      protein: 0.8,
      carbs: 0.06,
      fat: 0.07,
      iron: 0.03,
      zinc: 0.01,
    },
  },
  {
    name: "Casein Protein Powder",
    category: FOOD_CATEGORIES.PROTEIN,
    emoji: "💪",
    defaultUnit: "piece",
    pieceWeight: 30, // 1 scoop = 30g
    defaultQuantity: 1,
    nutrients: {
      calories: 3.6,
      protein: 0.77,
      carbs: 0.07,
      fat: 0.03,
      calcium: 1.2,
      magnesium: 0.7,
    },
  },
  {
    name: "Creatine Monohydrate",
    category: FOOD_CATEGORIES.PROTEIN,
    emoji: "💊",
    defaultUnit: "piece",
    pieceWeight: 5, // 1 scoop = 5g
    defaultQuantity: 1,
    nutrients: {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      creatine: 1.0,
    },
  },
  {
    name: "Protein Bar (Generic)",
    category: FOOD_CATEGORIES.PROTEIN,
    emoji: "🍫",
    defaultUnit: "g",
    nutrients: {
      calories: 3.5,
      protein: 0.3,
      carbs: 0.35,
      fat: 0.1,
      fiber: 0.08,
    },
  },

  // GRAINS & CEREALS
  {
    name: "Brown Rice (Cooked)",
    category: FOOD_CATEGORIES.GRAINS,
    emoji: "🍚",
    defaultUnit: "g",
    nutrients: {
      calories: 1.12,
      protein: 0.026,
      carbs: 0.235,
      fat: 0.009,
      fiber: 0.018,
      iron: 0.004,
      magnesium: 0.13,
    },
  },
  {
    name: "White Rice (Cooked)",
    category: FOOD_CATEGORIES.GRAINS,
    emoji: "🍚",
    defaultUnit: "g",
    nutrients: {
      calories: 1.3,
      protein: 0.027,
      carbs: 0.28,
      fat: 0.003,
      fiber: 0.004,
      magnesium: 0.12,
    },
  },
  {
    name: "Basmati Rice (Cooked)",
    category: FOOD_CATEGORIES.GRAINS,
    emoji: "🍚",
    defaultUnit: "g",
    nutrients: {
      calories: 1.21,
      protein: 0.026,
      carbs: 0.26,
      fat: 0.002,
      fiber: 0.003,
    },
  },
  {
    name: "Dalia (Broken Wheat, Cooked)",
    category: FOOD_CATEGORIES.GRAINS,
    emoji: "🥣",
    defaultUnit: "g",
    nutrients: {
      calories: 1.15,
      protein: 0.035,
      carbs: 0.25,
      fat: 0.005,
      fiber: 0.04,
    },
  },
  {
    name: "Poha (Cooked)",
    category: FOOD_CATEGORIES.GRAINS,
    emoji: "🥣",
    defaultUnit: "g",
    nutrients: {
      calories: 1.3,
      protein: 0.026,
      carbs: 0.27,
      fat: 0.012,
      fiber: 0.01,
      iron: 0.015,
    },
  },
  {
    name: "Quinoa (Cooked)",
    category: FOOD_CATEGORIES.GRAINS,
    emoji: "🌾",
    defaultUnit: "g",
    nutrients: {
      calories: 1.2,
      protein: 0.044,
      carbs: 0.21,
      fat: 0.019,
      fiber: 0.028,
      iron: 0.015,
    },
  },
  {
    name: "Oats (Cooked)",
    category: FOOD_CATEGORIES.GRAINS,
    emoji: "🥣",
    defaultUnit: "g",
    nutrients: {
      calories: 0.71,
      protein: 0.025,
      carbs: 0.12,
      fat: 0.015,
      fiber: 0.017,
      iron: 0.009,
    },
  },
  {
    name: "Oats (Dry)",
    category: FOOD_CATEGORIES.GRAINS,
    emoji: "🥣",
    defaultUnit: "g",
    nutrients: {
      calories: 3.89,
      protein: 0.136,
      carbs: 0.663,
      fat: 0.069,
      fiber: 0.106,
      iron: 0.047,
      magnesium: 2.7,
    },
  },
  {
    name: "Whole Wheat Bread",
    category: FOOD_CATEGORIES.GRAINS,
    emoji: "🍞",
    defaultUnit: "g",
    nutrients: {
      calories: 2.86,
      protein: 0.143,
      carbs: 0.5,
      fat: 0.036,
      fiber: 0.071,
      iron: 0.032,
      magnesium: 0.25,
      zinc: 0.003,
    },
  },
  {
    name: "White Bread",
    category: FOOD_CATEGORIES.GRAINS,
    emoji: "🍞",
    defaultUnit: "g",
    nutrients: {
      calories: 2.68,
      protein: 0.082,
      carbs: 0.5,
      fat: 0.036,
      fiber: 0.029,
      magnesium: 0.11,
    },
  },
  {
    name: "Multigrain Bread",
    category: FOOD_CATEGORIES.GRAINS,
    emoji: "🍞",
    defaultUnit: "g",
    nutrients: {
      calories: 2.65,
      protein: 0.13,
      carbs: 0.43,
      fat: 0.042,
      fiber: 0.075,
      magnesium: 0.27,
    },
  },
  {
    name: "Whole Wheat Pasta (Cooked)",
    category: FOOD_CATEGORIES.GRAINS,
    emoji: "🍝",
    defaultUnit: "g",
    nutrients: {
      calories: 1.24,
      protein: 0.05,
      carbs: 0.26,
      fat: 0.005,
      fiber: 0.035,
      iron: 0.013,
      magnesium: 0.18,
    },
  },
  {
    name: "Sweet Potato (Baked)",
    category: FOOD_CATEGORIES.GRAINS,
    emoji: "🍠",
    defaultUnit: "g",
    nutrients: {
      calories: 0.9,
      protein: 0.02,
      carbs: 0.21,
      fat: 0.002,
      fiber: 0.033,
      vitaminA: 9.61,
      vitaminC: 0.2,
      potassium: 4.75,
      magnesium: 0.25,
      vitaminE: 0.002,
      vitaminK: 0.001,
    },
  },
  {
    name: "Potato (Baked with Skin)",
    category: FOOD_CATEGORIES.GRAINS,
    emoji: "🥔",
    defaultUnit: "g",
    nutrients: {
      calories: 0.93,
      protein: 0.025,
      carbs: 0.21,
      fat: 0.001,
      fiber: 0.022,
      vitaminC: 0.13,
      potassium: 5.35,
    },
  },

  // LEGUMES & BEANS
  {
    name: "Lentils (Cooked)",
    category: FOOD_CATEGORIES.LEGUMES,
    emoji: "🫘",
    defaultUnit: "g",
    nutrients: {
      calories: 1.16,
      protein: 0.09,
      carbs: 0.2,
      fat: 0.004,
      fiber: 0.08,
      iron: 0.033,
      potassium: 3.69,
      magnesium: 0.36,
      zinc: 0.003,
      vitaminK: 0.005,
    },
  },
  {
    name: "Dal (Mixed Lentils)",
    category: FOOD_CATEGORIES.LEGUMES,
    emoji: "🍲",
    defaultUnit: "g",
    nutrients: {
      calories: 1.05,
      protein: 0.087,
      carbs: 0.18,
      fat: 0.015,
      fiber: 0.075,
      iron: 0.03,
      magnesium: 0.28,
      zinc: 0.002,
    },
  },
  {
    name: "Chickpeas (Cooked)",
    category: FOOD_CATEGORIES.LEGUMES,
    emoji: "🫘",
    defaultUnit: "g",
    nutrients: {
      calories: 1.64,
      protein: 0.089,
      carbs: 0.27,
      fat: 0.026,
      fiber: 0.076,
      iron: 0.029,
      magnesium: 0.48,
      zinc: 0.003,
      potassium: 2.91,
    },
  },
  {
    name: "Black Beans (Cooked)",
    category: FOOD_CATEGORIES.LEGUMES,
    emoji: "🫘",
    defaultUnit: "g",
    nutrients: {
      calories: 1.32,
      protein: 0.089,
      carbs: 0.24,
      fat: 0.005,
      fiber: 0.087,
      iron: 0.021,
      magnesium: 0.7,
      zinc: 0.009,
    },
  },
  {
    name: "Kidney Beans (Rajma)",
    category: FOOD_CATEGORIES.LEGUMES,
    emoji: "🫘",
    defaultUnit: "g",
    nutrients: {
      calories: 1.27,
      protein: 0.087,
      carbs: 0.228,
      fat: 0.005,
      fiber: 0.064,
      iron: 0.029,
      potassium: 4.03,
      magnesium: 0.45,
      zinc: 0.003,
    },
  },
  {
    name: "Moong Dal (Cooked)",
    category: FOOD_CATEGORIES.LEGUMES,
    emoji: "🍲",
    defaultUnit: "g",
    nutrients: {
      calories: 1.05,
      protein: 0.07,
      carbs: 0.19,
      fat: 0.004,
      fiber: 0.077,
      iron: 0.015,
      magnesium: 0.48,
      zinc: 0.002,
    },
  },
  {
    name: "Soya Chunks (Dry)",
    category: FOOD_CATEGORIES.LEGUMES,
    emoji: "🫘",
    defaultUnit: "g",
    nutrients: {
      calories: 3.45,
      protein: 0.52,
      carbs: 0.33,
      fat: 0.01,
      fiber: 0.13,
    },
  },
  {
    name: "Soya Chunks (Boiled)",
    category: FOOD_CATEGORIES.LEGUMES,
    emoji: "🫘",
    defaultUnit: "g",
    nutrients: {
      calories: 1.15,
      protein: 0.16,
      carbs: 0.09,
      fat: 0.005,
      fiber: 0.065,
    },
  },
  {
    name: "Sprouted Moong (Raw)",
    category: FOOD_CATEGORIES.LEGUMES,
    emoji: "🌱",
    defaultUnit: "g",
    nutrients: {
      calories: 0.3,
      protein: 0.03,
      carbs: 0.06,
      fat: 0.002,
      fiber: 0.018,
    },
  },
  {
    name: "Sattu Flour (Roasted Bengal Gram)",
    category: FOOD_CATEGORIES.LEGUMES,
    emoji: "🥣",
    defaultUnit: "g",
    nutrients: {
      calories: 3.8,
      protein: 0.22,
      carbs: 0.58,
      fat: 0.07,
      fiber: 0.18,
    },
  },
  {
    name: "Tofu (Firm)",
    category: FOOD_CATEGORIES.LEGUMES,
    emoji: "🧈",
    defaultUnit: "g",
    nutrients: {
      calories: 1.44,
      protein: 0.17,
      carbs: 0.03,
      fat: 0.09,
      calcium: 3.5,
      iron: 0.027,
    },
  },
  {
    name: "Edamame (Cooked)",
    category: FOOD_CATEGORIES.LEGUMES,
    emoji: "🫛",
    defaultUnit: "g",
    nutrients: {
      calories: 1.22,
      protein: 0.11,
      carbs: 0.1,
      fat: 0.05,
      fiber: 0.05,
      iron: 0.023,
    },
  },
  {
    name: "Peanut Butter",
    category: FOOD_CATEGORIES.LEGUMES,
    emoji: "🥜",
    defaultUnit: "g",
    nutrients: {
      calories: 5.94,
      protein: 0.25,
      carbs: 0.219,
      fat: 0.5,
      fiber: 0.063,
    },
  },
  {
    name: "Soybean (Cooked)",
    category: FOOD_CATEGORIES.LEGUMES,
    emoji: "🫘",
    defaultUnit: "g",
    nutrients: {
      calories: 1.73,
      protein: 0.169,
      carbs: 0.099,
      fat: 0.09,
      fiber: 0.06,
      iron: 0.088,
    },
  },

  // VEGETABLES
  {
    name: "Broccoli (Cooked)",
    category: FOOD_CATEGORIES.VEGETABLES,
    emoji: "🥦",
    defaultUnit: "g",
    nutrients: {
      calories: 0.35,
      protein: 0.024,
      carbs: 0.07,
      fat: 0.004,
      fiber: 0.033,
      vitaminC: 0.65,
      calcium: 0.4,
      iron: 0.007,
      vitaminK: 1.41,
    },
  },
  {
    name: "Spinach (Cooked)",
    category: FOOD_CATEGORIES.VEGETABLES,
    emoji: "🥬",
    defaultUnit: "g",
    nutrients: {
      calories: 0.23,
      protein: 0.03,
      carbs: 0.038,
      fat: 0.003,
      fiber: 0.024,
      vitaminA: 4.69,
      vitaminC: 0.098,
      calcium: 1.36,
      iron: 0.036,
      potassium: 4.66,
      vitaminK: 4.93,
    },
  },
  {
    name: "Carrots (Raw)",
    category: FOOD_CATEGORIES.VEGETABLES,
    emoji: "🥕",
    defaultUnit: "g",
    nutrients: {
      calories: 0.41,
      protein: 0.009,
      carbs: 0.1,
      fat: 0.002,
      fiber: 0.028,
      vitaminA: 8.35,
      potassium: 3.2,
    },
  },
  {
    name: "Tomato (Raw)",
    category: FOOD_CATEGORIES.VEGETABLES,
    emoji: "🍅",
    defaultUnit: "g",
    nutrients: {
      calories: 0.18,
      protein: 0.009,
      carbs: 0.039,
      fat: 0.002,
      fiber: 0.012,
      vitaminC: 0.14,
      potassium: 2.37,
    },
  },
  {
    name: "Bell Pepper (Raw)",
    category: FOOD_CATEGORIES.VEGETABLES,
    emoji: "🫑",
    defaultUnit: "g",
    nutrients: {
      calories: 0.31,
      protein: 0.01,
      carbs: 0.06,
      fat: 0.003,
      fiber: 0.021,
      vitaminC: 1.28,
      vitaminA: 1.57,
    },
  },
  {
    name: "Cucumber (Raw)",
    category: FOOD_CATEGORIES.VEGETABLES,
    emoji: "🥒",
    defaultUnit: "g",
    nutrients: {
      calories: 0.15,
      protein: 0.007,
      carbs: 0.036,
      fat: 0.001,
      fiber: 0.005,
      vitaminC: 0.028,
    },
  },
  {
    name: "Cauliflower (Cooked)",
    category: FOOD_CATEGORIES.VEGETABLES,
    emoji: "🥦",
    defaultUnit: "g",
    nutrients: {
      calories: 0.23,
      protein: 0.018,
      carbs: 0.041,
      fat: 0.005,
      fiber: 0.023,
      vitaminC: 0.44,
      vitaminK: 0.016,
    },
  },
  {
    name: "Cabbage (Raw)",
    category: FOOD_CATEGORIES.VEGETABLES,
    emoji: "🥬",
    defaultUnit: "g",
    nutrients: {
      calories: 0.25,
      protein: 0.013,
      carbs: 0.058,
      fat: 0.001,
      fiber: 0.025,
      vitaminC: 0.37,
      vitaminK: 0.082,
    },
  },
  {
    name: "Beans (Green, Cooked)",
    category: FOOD_CATEGORIES.VEGETABLES,
    emoji: "🫛",
    defaultUnit: "g",
    nutrients: {
      calories: 0.35,
      protein: 0.019,
      carbs: 0.079,
      fat: 0.001,
      fiber: 0.033,
      vitaminC: 0.12,
      vitaminK: 0.014,
      magnesium: 0.25,
    },
  },
  {
    name: "Beetroot (Cooked)",
    category: FOOD_CATEGORIES.VEGETABLES,
    emoji: "🥬",
    defaultUnit: "g",
    nutrients: {
      calories: 0.44,
      protein: 0.017,
      carbs: 0.1,
      fat: 0.002,
      fiber: 0.02,
      iron: 0.008,
      vitaminK: 0.002,
      magnesium: 0.23,
    },
  },
  {
    name: "Okra/Bhindi (Cooked)",
    category: FOOD_CATEGORIES.VEGETABLES,
    emoji: "🫛",
    defaultUnit: "g",
    nutrients: {
      calories: 0.33,
      protein: 0.019,
      carbs: 0.074,
      fat: 0.001,
      fiber: 0.032,
      calcium: 0.77,
      vitaminK: 0.031,
      magnesium: 0.57,
    },
  },
  {
    name: "Mushrooms (Cooked)",
    category: FOOD_CATEGORIES.VEGETABLES,
    emoji: "🍄",
    defaultUnit: "g",
    nutrients: {
      calories: 0.28,
      protein: 0.022,
      carbs: 0.053,
      fat: 0.005,
      fiber: 0.022,
      vitaminD: 0.003,
      potassium: 3.56,
      vitaminK: 0.0004,
      magnesium: 0.09,
    },
  },

  // FRUITS
  {
    name: "Apple (Medium)",
    category: FOOD_CATEGORIES.FRUITS,
    emoji: "🍎",
    defaultUnit: "g",
    nutrients: {
      calories: 0.52,
      protein: 0.003,
      carbs: 0.138,
      fat: 0.002,
      fiber: 0.024,
      vitaminC: 0.046,
      vitaminK: 0.002,
    },
  },
  {
    name: "Banana (Medium)",
    category: FOOD_CATEGORIES.FRUITS,
    emoji: "🍌",
    defaultUnit: "g",
    nutrients: {
      calories: 0.89,
      protein: 0.011,
      carbs: 0.229,
      fat: 0.003,
      fiber: 0.026,
      potassium: 3.58,
      vitaminC: 0.085,
      magnesium: 0.27,
    },
  },
  {
    name: "Orange (Medium)",
    category: FOOD_CATEGORIES.FRUITS,
    emoji: "🍊",
    defaultUnit: "g",
    nutrients: {
      calories: 0.47,
      protein: 0.009,
      carbs: 0.118,
      fat: 0.001,
      fiber: 0.024,
      vitaminC: 0.53,
      calcium: 0.4,
    },
  },
  {
    name: "Papaya",
    category: FOOD_CATEGORIES.FRUITS,
    emoji: "🍈",
    defaultUnit: "g",
    nutrients: {
      calories: 0.43,
      protein: 0.005,
      carbs: 0.109,
      fat: 0.003,
      fiber: 0.017,
      vitaminC: 0.61,
      vitaminA: 0.47,
    },
  },
  {
    name: "Watermelon",
    category: FOOD_CATEGORIES.FRUITS,
    emoji: "🍉",
    defaultUnit: "g",
    nutrients: {
      calories: 0.3,
      protein: 0.006,
      carbs: 0.076,
      fat: 0.002,
      fiber: 0.004,
      vitaminC: 0.081,
      vitaminA: 0.005,
    },
  },
  {
    name: "Mango",
    category: FOOD_CATEGORIES.FRUITS,
    emoji: "🥭",
    defaultUnit: "g",
    nutrients: {
      calories: 0.6,
      protein: 0.008,
      carbs: 0.15,
      fat: 0.004,
      fiber: 0.016,
      vitaminC: 0.36,
      vitaminA: 0.54,
      vitaminK: 0.004,
    },
  },
  {
    name: "Pomegranate",
    category: FOOD_CATEGORIES.FRUITS,
    emoji: "🍇",
    defaultUnit: "g",
    nutrients: {
      calories: 0.83,
      protein: 0.017,
      carbs: 0.187,
      fat: 0.012,
      fiber: 0.04,
      vitaminC: 0.1,
      vitaminK: 0.016,
    },
  },
  {
    name: "Grapes",
    category: FOOD_CATEGORIES.FRUITS,
    emoji: "🍇",
    defaultUnit: "g",
    nutrients: {
      calories: 0.69,
      protein: 0.007,
      carbs: 0.18,
      fat: 0.002,
      fiber: 0.009,
      vitaminC: 0.032,
      vitaminK: 0.015,
    },
  },
  {
    name: "Strawberries",
    category: FOOD_CATEGORIES.FRUITS,
    emoji: "🍓",
    defaultUnit: "g",
    nutrients: {
      calories: 0.32,
      protein: 0.007,
      carbs: 0.077,
      fat: 0.003,
      fiber: 0.02,
      vitaminC: 0.59,
      vitaminK: 0.002,
    },
  },
  {
    name: "Blueberries",
    category: FOOD_CATEGORIES.FRUITS,
    emoji: "🫐",
    defaultUnit: "g",
    nutrients: {
      calories: 0.57,
      protein: 0.007,
      carbs: 0.14,
      fat: 0.003,
      fiber: 0.024,
      vitaminC: 0.097,
      vitaminK: 0.019,
    },
  },
  {
    name: "Avocado",
    category: FOOD_CATEGORIES.FRUITS,
    emoji: "🥑",
    defaultUnit: "g",
    nutrients: {
      calories: 1.6,
      protein: 0.02,
      carbs: 0.09,
      fat: 0.15,
      fiber: 0.07,
      potassium: 4.85,
      vitaminK: 0.021,
      magnesium: 0.29,
    },
  },

  // South India common fruits (per gram)
  {
    name: "Guava",
    category: FOOD_CATEGORIES.FRUITS,
    emoji: "🥝",
    defaultUnit: "g",
    nutrients: {
      calories: 0.68,
      protein: 0.026,
      carbs: 0.145,
      fat: 0.004,
      fiber: 0.053,
      vitaminC: 2.28,
      vitaminA: 0.031,
      potassium: 4.17,
    },
  },
  {
    name: "Sapota (Chikoo)",
    category: FOOD_CATEGORIES.FRUITS,
    emoji: "🥮",
    defaultUnit: "g",
    nutrients: {
      calories: 0.83,
      protein: 0.004,
      carbs: 0.2,
      fat: 0.013,
      fiber: 0.054,
      vitaminC: 0.014,
      potassium: 1.93,
      vitaminA: 0.002,
    },
  },
  {
    name: "Jackfruit (Ripe)",
    category: FOOD_CATEGORIES.FRUITS,
    emoji: "🍈",
    defaultUnit: "g",
    nutrients: {
      calories: 0.95,
      protein: 0.018,
      carbs: 0.234,
      fat: 0.003,
      fiber: 0.015,
      vitaminC: 0.134,
      potassium: 3.03,
      vitaminA: 0.005,
    },
  },
  {
    name: "Custard Apple (Sitaphal)",
    category: FOOD_CATEGORIES.FRUITS,
    emoji: "🍏",
    defaultUnit: "g",
    nutrients: {
      calories: 0.94,
      protein: 0.017,
      carbs: 0.238,
      fat: 0.003,
      fiber: 0.044,
      vitaminC: 0.192,
      potassium: 2.82,
    },
  },
  {
    name: "Pineapple",
    category: FOOD_CATEGORIES.FRUITS,
    emoji: "🍍",
    defaultUnit: "g",
    nutrients: {
      calories: 0.5,
      protein: 0.005,
      carbs: 0.133,
      fat: 0.001,
      fiber: 0.014,
      vitaminC: 0.479,
      potassium: 1.09,
      vitaminA: 0.003,
    },
  },
  {
    name: "Muskmelon (Cantaloupe)",
    category: FOOD_CATEGORIES.FRUITS,
    emoji: "🍈",
    defaultUnit: "g",
    nutrients: {
      calories: 0.34,
      protein: 0.008,
      carbs: 0.084,
      fat: 0.002,
      fiber: 0.009,
      vitaminC: 0.368,
      vitaminA: 0.169,
      potassium: 1.67,
    },
  },
  {
    name: "Amla (Indian Gooseberry)",
    category: FOOD_CATEGORIES.FRUITS,
    emoji: "🫒",
    defaultUnit: "g",
    nutrients: {
      calories: 0.44,
      protein: 0.007,
      carbs: 0.104,
      fat: 0.001,
      fiber: 0.046,
      vitaminC: 4.45,
      potassium: 1.98,
    },
  },
  {
    name: "Jamun (Java Plum)",
    category: FOOD_CATEGORIES.FRUITS,
    emoji: "🫐",
    defaultUnit: "g",
    nutrients: {
      calories: 0.6,
      protein: 0.006,
      carbs: 0.156,
      fat: 0.002,
      fiber: 0.006,
      vitaminC: 0.185,
      potassium: 1.56,
    },
  },
  {
    name: "Lychee",
    category: FOOD_CATEGORIES.FRUITS,
    emoji: "🍒",
    defaultUnit: "g",
    nutrients: {
      calories: 0.66,
      protein: 0.008,
      carbs: 0.169,
      fat: 0.004,
      fiber: 0.015,
      vitaminC: 0.718,
      potassium: 1.71,
      vitaminA: 0.001,
    },
  },
  {
    name: "Star Fruit (Carambola)",
    category: FOOD_CATEGORIES.FRUITS,
    emoji: "⭐",
    defaultUnit: "g",
    nutrients: {
      calories: 0.31,
      protein: 0.01,
      carbs: 0.065,
      fat: 0.003,
      fiber: 0.028,
      vitaminC: 0.34,
      potassium: 1.33,
      vitaminA: 0.003,
    },
  },

  // NUTS & SEEDS
  {
    name: "Almonds",
    category: FOOD_CATEGORIES.NUTS_SEEDS,
    emoji: "🌰",
    defaultUnit: "g",
    nutrients: {
      calories: 5.86,
      protein: 0.214,
      carbs: 0.214,
      fat: 0.5,
      fiber: 0.125,
      calcium: 2.71,
      iron: 0.036,
      magnesium: 2.68,
      zinc: 0.031,
      vitaminE: 0.256,
    },
  },
  {
    name: "Walnuts",
    category: FOOD_CATEGORIES.NUTS_SEEDS,
    emoji: "🌰",
    defaultUnit: "g",
    nutrients: {
      calories: 6.61,
      protein: 0.154,
      carbs: 0.139,
      fat: 0.661,
      fiber: 0.068,
      omega3: 0.089,
      magnesium: 1.58,
      zinc: 0.031,
      vitaminE: 0.207,
    },
  },
  {
    name: "Cashews",
    category: FOOD_CATEGORIES.NUTS_SEEDS,
    emoji: "🥜",
    defaultUnit: "g",
    nutrients: {
      calories: 5.61,
      protein: 0.186,
      carbs: 0.307,
      fat: 0.443,
      fiber: 0.032,
      iron: 0.068,
    },
  },
  {
    name: "Peanuts (Roasted)",
    category: FOOD_CATEGORIES.NUTS_SEEDS,
    emoji: "🥜",
    defaultUnit: "g",
    nutrients: {
      calories: 5.85,
      protein: 0.259,
      carbs: 0.165,
      fat: 0.499,
      fiber: 0.085,
      iron: 0.025,
    },
  },
  {
    name: "Chia Seeds",
    category: FOOD_CATEGORIES.NUTS_SEEDS,
    emoji: "🌾",
    defaultUnit: "g",
    nutrients: {
      calories: 4.86,
      protein: 0.167,
      carbs: 0.42,
      fat: 0.31,
      fiber: 0.344,
      omega3: 0.178,
      calcium: 6.31,
    },
  },
  {
    name: "Flax Seeds (Ground)",
    category: FOOD_CATEGORIES.NUTS_SEEDS,
    emoji: "🌾",
    defaultUnit: "g",
    nutrients: {
      calories: 5.34,
      protein: 0.183,
      carbs: 0.29,
      fat: 0.423,
      fiber: 0.273,
      omega3: 0.227,
    },
  },
  {
    name: "Sunflower Seeds",
    category: FOOD_CATEGORIES.NUTS_SEEDS,
    emoji: "🌻",
    defaultUnit: "g",
    nutrients: {
      calories: 5.84,
      protein: 0.208,
      carbs: 0.2,
      fat: 0.514,
      fiber: 0.089,
      vitaminE: 0.35,
    },
  },
  {
    name: "Pumpkin Seeds",
    category: FOOD_CATEGORIES.NUTS_SEEDS,
    emoji: "🎃",
    defaultUnit: "g",
    nutrients: {
      calories: 5.59,
      protein: 0.3,
      carbs: 0.143,
      fat: 0.488,
      fiber: 0.063,
      iron: 0.088,
      zinc: 0.079,
    },
  },

  // BEVERAGES
  {
    name: "Coffee (Black)",
    category: FOOD_CATEGORIES.BEVERAGES,
    emoji: "☕",
    defaultUnit: "ml",
    nutrients: {
      calories: 0.01,
      protein: 0.001,
      carbs: 0,
      fat: 0,
    },
  },
  {
    name: "Green Tea",
    category: FOOD_CATEGORIES.BEVERAGES,
    emoji: "🍵",
    defaultUnit: "ml",
    nutrients: {
      calories: 0.01,
      protein: 0,
      carbs: 0,
      fat: 0,
    },
  },
  {
    name: "Orange Juice (Fresh)",
    category: FOOD_CATEGORIES.BEVERAGES,
    emoji: "🧃",
    defaultUnit: "ml",
    nutrients: {
      calories: 0.45,
      protein: 0.007,
      carbs: 0.104,
      fat: 0.002,
      vitaminC: 0.5,
      potassium: 2.0,
      magnesium: 0.1,
      vitaminA: 0.01,
    },
  },
  {
    name: "Almond Milk (Unsweetened)",
    category: FOOD_CATEGORIES.BEVERAGES,
    emoji: "🥛",
    defaultUnit: "ml",
    nutrients: {
      calories: 0.15,
      protein: 0.004,
      carbs: 0.006,
      fat: 0.011,
      calcium: 1.2,
      vitaminD: 0.001,
      vitaminE: 0.002,
    },
  },
  {
    name: "Coconut Water",
    category: FOOD_CATEGORIES.BEVERAGES,
    emoji: "🥥",
    defaultUnit: "ml",
    nutrients: {
      calories: 0.19,
      protein: 0.007,
      carbs: 0.037,
      fat: 0.002,
      potassium: 2.5,
      magnesium: 0.25,
    },
  },
  {
    name: "Lemon Water",
    category: FOOD_CATEGORIES.BEVERAGES,
    emoji: "🍋",
    defaultUnit: "ml",
    nutrients: {
      calories: 0.11,
      protein: 0.002,
      carbs: 0.034,
      fat: 0,
      vitaminC: 0.27,
    },
  },

  // SNACKS & OTHERS
  {
    name: "Dark Chocolate (70-85%)",
    category: FOOD_CATEGORIES.SNACKS,
    emoji: "🍫",
    defaultUnit: "g",
    nutrients: {
      calories: 5.98,
      protein: 0.079,
      carbs: 0.458,
      fat: 0.428,
      fiber: 0.108,
      iron: 0.119,
      magnesium: 0.23,
      zinc: 0.013,
      vitaminE: 0.103,
    },
  },
  {
    name: "Honey",
    category: FOOD_CATEGORIES.SNACKS,
    emoji: "🍯",
    defaultUnit: "g",
    nutrients: {
      calories: 3.04,
      protein: 0.003,
      carbs: 0.824,
      fat: 0,
      potassium: 0.52,
    },
  },
  {
    name: "Dates (Seedless)",
    category: FOOD_CATEGORIES.SNACKS,
    emoji: "🍯",
    defaultUnit: "g",
    nutrients: {
      calories: 2.77,
      protein: 0.019,
      carbs: 0.75,
      fat: 0.003,
      fiber: 0.07,
      potassium: 6.96,
      magnesium: 0.35,
      vitaminK: 0.003,
    },
  },
  {
    name: "Olive Oil",
    category: FOOD_CATEGORIES.SNACKS,
    emoji: "🫒",
    defaultUnit: "ml",
    nutrients: {
      calories: 8.84,
      protein: 0,
      carbs: 0,
      fat: 1.0,
      vitaminE: 0.143,
    },
  },
  {
    name: "Coconut Oil",
    category: FOOD_CATEGORIES.SNACKS,
    emoji: "🥥",
    defaultUnit: "ml",
    nutrients: {
      calories: 8.62,
      protein: 0,
      carbs: 0,
      fat: 1.0,
    },
  },
  {
    name: "Ghee (Cow)",
    category: FOOD_CATEGORIES.SNACKS,
    emoji: "🧈",
    defaultUnit: "ml",
    nutrients: {
      calories: 8.84,
      protein: 0,
      carbs: 0,
      fat: 1.0,
    },
  },
  {
    name: "Hummus",
    category: FOOD_CATEGORIES.SNACKS,
    emoji: "🫒",
    defaultUnit: "g",
    nutrients: {
      calories: 1.67,
      protein: 0.067,
      carbs: 0.167,
      fat: 0.1,
      fiber: 0.05,
      iron: 0.02,
      magnesium: 0.24,
      zinc: 0.01,
    },
  },
  {
    name: "Popcorn (Air-Popped)",
    category: FOOD_CATEGORIES.SNACKS,
    emoji: "🍿",
    defaultUnit: "g",
    nutrients: {
      calories: 3.87,
      protein: 0.13,
      carbs: 0.777,
      fat: 0.044,
      fiber: 0.145,
      magnesium: 0.36,
    },
  },

  // SOUTH INDIAN FOODS (trimmed to gym-relevant sides only)
  {
    name: "Sambar (Lentil Soup)",
    category: FOOD_CATEGORIES.SOUTH_INDIAN,
    emoji: "🍲",
    defaultUnit: "g",
    nutrients: {
      calories: 0.44,
      protein: 0.024,
      carbs: 0.086,
      fat: 0.005,
      fiber: 0.025,
      iron: 0.008,
    },
  },
  {
    name: "Rasam (Tomato Soup)",
    category: FOOD_CATEGORIES.SOUTH_INDIAN,
    emoji: "🍲",
    defaultUnit: "ml",
    nutrients: {
      calories: 0.25,
      protein: 0.012,
      carbs: 0.05,
      fat: 0.003,
      vitaminC: 0.08,
    },
  },

  // === Gym-focused additions ===
  // Rotis (kept under GRAINS above via additions to SERVING_SIZES)
  {
    name: "Chapati/Roti (Whole Wheat)",
    category: FOOD_CATEGORIES.GRAINS,
    emoji: "🫓",
    defaultUnit: "g",
    nutrients: {
      calories: 2.95, // ~120 kcal/40g
      protein: 0.075,
      carbs: 0.5,
      fat: 0.075,
      fiber: 0.07,
      magnesium: 0.35,
    },
  },
  {
    name: "Phulka (Oil-Free Roti)",
    category: FOOD_CATEGORIES.GRAINS,
    emoji: "🫓",
    defaultUnit: "g",
    nutrients: {
      calories: 2.68,
      protein: 0.075,
      carbs: 0.55,
      fat: 0.02,
      fiber: 0.06,
      magnesium: 0.35,
    },
  },
  {
    name: "Jowar Roti (Sorghum)",
    category: FOOD_CATEGORIES.GRAINS,
    emoji: "🫓",
    defaultUnit: "g",
    nutrients: {
      calories: 2.9,
      protein: 0.09,
      carbs: 0.55,
      fat: 0.03,
      fiber: 0.08,
      magnesium: 1.37,
    },
  },
  {
    name: "Bajra Roti (Pearl Millet)",
    category: FOOD_CATEGORIES.GRAINS,
    emoji: "🫓",
    defaultUnit: "g",
    nutrients: {
      calories: 3.25,
      protein: 0.11,
      carbs: 0.55,
      fat: 0.05,
      fiber: 0.08,
      magnesium: 1.89,
    },
  },
  {
    name: "Ragi Roti (Finger Millet)",
    category: FOOD_CATEGORIES.GRAINS,
    emoji: "🫓",
    defaultUnit: "g",
    nutrients: {
      calories: 2.75,
      protein: 0.07,
      carbs: 0.55,
      fat: 0.025,
      fiber: 0.09,
      calcium: 0.35,
      magnesium: 1.37,
    },
  },
];

// --- Helper functions ---

// Ensure every food exposes the full per-gram nutrient key set
const ALL_NUTRIENT_KEYS = [
  "calories",
  "protein",
  "carbs",
  "fat",
  "omega3",
  "fiber",
  "creatine",
  "vitaminA",
  "vitaminC",
  "vitaminD",
  "vitaminE",
  "vitaminK",
  "calcium",
  "iron",
  "magnesium",
  "potassium",
  "zinc",
];

function normalizeNutrients(nutrients = {}) {
  const normalized = {};
  for (const key of ALL_NUTRIENT_KEYS) {
    normalized[key] = Number.isFinite(nutrients[key]) ? nutrients[key] : 0;
  }
  // Also keep any additional existing keys not in the canonical list
  for (const [k, v] of Object.entries(nutrients)) {
    if (!(k in normalized)) normalized[k] = v;
  }
  return normalized;
}

// Development-time validator: ensures each food has all nutrient keys and numeric values
export function validateFoodDatabase() {
  const problems = [];
  FOOD_DB.forEach((food) => {
    const n = normalizeNutrients(food.nutrients);
    ALL_NUTRIENT_KEYS.forEach((k) => {
      const v = n[k];
      if (!Number.isFinite(v)) {
        problems.push({ name: food.name, nutrient: k, value: v });
      }
    });
  });
  return problems;
}

export function searchFoods(query, limit = 10) {
  if (!query) return FOOD_DB.slice(0, limit);
  const lowerQuery = query.toLowerCase();
  const results = FOOD_DB.filter((food) =>
    food.name.toLowerCase().includes(lowerQuery)
  ).slice(0, limit);

  // Convert to legacy format for component compatibility
  return results.map((food) => ({
    name: food.name,
    category: food.category,
    emoji: food.emoji,
    servingSize: getDefaultServingSize(food),
    nutrition: normalizeNutrients(food.nutrients),
    defaultUnit: food.defaultUnit,
    defaultQuantity: food.defaultQuantity,
    pieceWeight: food.pieceWeight,
  }));
}

export function getFoodsByCategory(category) {
  return FOOD_DB.filter((food) => food.category === category);
}

export function getFoodByName(name) {
  const food = FOOD_DB.find((food) => food.name === name);
  if (!food) return null;

  // Convert to legacy format for component compatibility
  return {
    name: food.name,
    category: food.category,
    emoji: food.emoji,
    servingSize: getDefaultServingSize(food),
    nutrition: normalizeNutrients(food.nutrients),
    defaultUnit: food.defaultUnit,
    defaultQuantity: food.defaultQuantity,
    pieceWeight: food.pieceWeight,
  };
}

export function getServingSizes(foodName) {
  return SERVING_SIZES[foodName] || [];
}

// Helper function to get default serving size
function getDefaultServingSize(food) {
  const servingSizes = getServingSizes(food.name);
  if (servingSizes.length > 0) {
    return servingSizes[0].label;
  }
  if (food.defaultUnit === "piece" && food.pieceWeight) {
    return `1 piece (~${food.pieceWeight}g)`;
  }
  if (food.defaultUnit === "g" || food.defaultUnit === "ml") {
    return `100${food.defaultUnit}`;
  }
  return "100g";
}

// Density map for more accurate ml → g conversion (fallback = 1)
const DENSITY_BY_NAME = {
  "Olive Oil": 0.91,
  "Coconut Oil": 0.92,
  "Ghee (Cow)": 0.91,
  Honey: 1.42,
  "Whole Milk": 1.03,
  "Skim Milk": 1.035,
  "Buttermilk (Chaas)": 1.03,
  "Almond Milk (Unsweetened)": 1.01,
  "Orange Juice (Fresh)": 1.04,
  "Lemon Water": 1.0,
  "Coconut Water": 1.0,
};

// Calculate nutrition for a given quantity
export function calculateNutrition(food, quantity) {
  if (!food) return {};
  const nutrients = food.nutrition || food.nutrients;
  if (!nutrients) return {};

  // Convert quantity to grams based on unit type
  let quantityInGrams = quantity;
  const unit = food.defaultUnit || "g";

  if (unit === "piece" && food.pieceWeight) {
    quantityInGrams = quantity * food.pieceWeight;
  } else if (unit === "ml") {
    const density = DENSITY_BY_NAME[food.name] ?? 1;
    quantityInGrams = quantity * density;
  }

  const result = {};
  for (const [nutrient, valuePerGram] of Object.entries(nutrients)) {
    result[nutrient] = valuePerGram * quantityInGrams;
  }
  return result;
}

// Legacy compatibility - keeping the old structure for existing components
export const foodDatabase = FOOD_DB.reduce((acc, food) => {
  acc[food.name.toLowerCase().replace(/\s+/g, "-")] = {
    name: food.name,
    category: food.category,
    emoji: food.emoji,
    servingSize: getDefaultServingSize(food),
    nutrition: normalizeNutrients(food.nutrients),
    defaultUnit: food.defaultUnit,
    defaultQuantity: food.defaultQuantity,
    pieceWeight: food.pieceWeight,
  };
  return acc;
}, {});
