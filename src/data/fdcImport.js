// USDA FoodData Central Importer (scaffold)
// Fetches authoritative nutrients and maps to our per-gram keys.

import { FOOD_DB } from "./foodDB";

const FDC_BASE_URL = "https://api.nal.usda.gov/fdc";

// Canonical keys we keep per gram
export const CANONICAL_KEYS = [
  "calories",
  "protein",
  "carbs",
  "fat",
  "omega3",
  "fiber",
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

// Nutrient name includes → canonical key + expected unit
// Note: FDC amounts are typically per 100 g for Foundation/Survey foods.
const NUTRIENT_NAME_MAP = [
  { contains: ["Energy"], key: "calories", unit: "kcal" },
  { contains: ["Protein"], key: "protein", unit: "g" },
  { contains: ["Carbohydrate, by difference"], key: "carbs", unit: "g" },
  {
    contains: ["Total lipid (fat)", "Fatty acids, total"],
    key: "fat",
    unit: "g",
  },
  {
    contains: ["Fatty acids, total polyunsaturated n-3"],
    key: "omega3",
    unit: "g",
  },
  { contains: ["Fiber, total dietary"], key: "fiber", unit: "g" },
  { contains: ["Vitamin A, RAE"], key: "vitaminA", unit: "mcg" },
  { contains: ["Vitamin C, total ascorbic acid"], key: "vitaminC", unit: "mg" },
  {
    contains: ["Vitamin D (D2 + D3)", "Vitamin D"],
    key: "vitaminD",
    unit: "mcg",
  },
  { contains: ["Vitamin E (alpha-tocopherol)"], key: "vitaminE", unit: "mg" },
  { contains: ["Vitamin K (phylloquinone)"], key: "vitaminK", unit: "mcg" },
  { contains: ["Calcium, Ca"], key: "calcium", unit: "mg" },
  { contains: ["Iron, Fe"], key: "iron", unit: "mg" },
  { contains: ["Magnesium, Mg"], key: "magnesium", unit: "mg" },
  { contains: ["Potassium, K"], key: "potassium", unit: "mg" },
  { contains: ["Zinc, Zn"], key: "zinc", unit: "mg" },
];

function pickCanonicalKey(nutrientName) {
  for (const m of NUTRIENT_NAME_MAP) {
    if (m.contains.some((c) => nutrientName.includes(c))) return m;
  }
  return null;
}

async function httpGetJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return await res.json();
}

export async function searchFdcFood(query, apiKey) {
  const url = `${FDC_BASE_URL}/v1/foods/search?api_key=${encodeURIComponent(
    apiKey
  )}&query=${encodeURIComponent(query)}&pageSize=5`;
  const data = await httpGetJson(url);
  const foods = data?.foods || [];
  if (foods.length === 0) return null;
  // Prefer foundation/srLegacy entries for stable per-100g composition
  foods.sort((a, b) => (a.dataType || "").localeCompare(b.dataType || ""));
  return foods[0];
}

export async function getFdcFoodDetails(fdcId, apiKey) {
  const url = `${FDC_BASE_URL}/v1/food/${fdcId}?api_key=${encodeURIComponent(
    apiKey
  )}`;
  return await httpGetJson(url);
}

function toPerGram(amountPer100g) {
  if (!Number.isFinite(amountPer100g)) return 0;
  return amountPer100g / 100;
}

export function extractPerGramFromFdc(details) {
  const perGram = Object.fromEntries(CANONICAL_KEYS.map((k) => [k, 0]));
  const nutrients = details?.foodNutrients || [];
  for (const n of nutrients) {
    const name = n?.nutrient?.name || n?.nutrientName || "";
    const match = pickCanonicalKey(name);
    if (!match) continue;
    const amount = n?.amount; // typically per 100 g for foundation/survey
    const valuePerGram = toPerGram(amount);
    // Special handling: Energy may be in kJ; prefer kcal where available
    if (match.key === "calories") {
      const unitName = n?.nutrient?.unitName || n?.unitName || "";
      if (unitName.toLowerCase() === "kj") continue; // skip kJ entries
    }
    if (Number.isFinite(valuePerGram)) perGram[match.key] = valuePerGram;
  }
  return perGram;
}

export function mergePerGramIntoFood(food, perGram, overwrite = false) {
  const merged = { ...(food.nutrients || {}) };
  for (const key of CANONICAL_KEYS) {
    const existing = merged[key];
    const incoming = perGram[key];
    if (overwrite) {
      merged[key] = Number.isFinite(incoming) ? incoming : existing ?? 0;
    } else {
      const hasValue = Number.isFinite(existing) && existing !== 0;
      if (!hasValue) merged[key] = Number.isFinite(incoming) ? incoming : 0;
    }
  }
  return { ...food, nutrients: merged };
}

export async function runFdcImport(
  apiKey,
  { overwrite = false, dryRun = true, delayMs = 250 } = {}
) {
  if (!apiKey) throw new Error("FDC API key is required");
  const updates = [];
  for (const food of FOOD_DB) {
    try {
      const q = food.name;
      const hit = await searchFdcFood(q, apiKey);
      if (!hit) continue;
      const details = await getFdcFoodDetails(hit.fdcId, apiKey);
      const perGram = extractPerGramFromFdc(details);
      const updatedFood = mergePerGramIntoFood(food, perGram, overwrite);
      updates.push({ name: food.name, perGram, updated: updatedFood });
      if (delayMs) await new Promise((r) => setTimeout(r, delayMs));
    } catch (e) {
      // ignore individual failures to allow batch to proceed
    }
  }
  if (dryRun) return { dryRun: true, updates };
  // Note: This is a scaffold. Persisting updates into source JSON is out of scope here.
  return { dryRun: false, updates };
}

// Convenience for local manual testing (uncomment to run in Node >=18)
// (async () => {
//   const apiKey = process.env.FDC_API_KEY;
//   if (!apiKey) return;
//   const result = await runFdcImport(apiKey, { overwrite: false, dryRun: true });
//   console.log("FDC import dry-run results:", result.updates.length);
// })();
