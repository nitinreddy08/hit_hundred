import { validateFoodDatabase } from "./foodDB.js";

const problems = validateFoodDatabase();
if (problems.length === 0) {
  console.log("OK: All foods have complete numeric per-gram nutrient keys.");
  process.exit(0);
}

console.log(`Found ${problems.length} issues`);
// Print first 50 for brevity
for (const p of problems.slice(0, 50)) {
  console.log(`${p.name} → ${p.nutrient}: ${String(p.value)}`);
}
process.exit(0);
