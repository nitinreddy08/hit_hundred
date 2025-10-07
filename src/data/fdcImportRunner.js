// Runner for USDA FoodData Central importer (dry-run by default)
// Usage:
//   set FDC_API_KEY=your_key && node src/data/fdcImportRunner.js

import { runFdcImport } from "./fdcImport";

async function main() {
  const apiKey = process.env.FDC_API_KEY;
  if (!apiKey) {
    console.error("FDC_API_KEY env var not set. Aborting.");
    process.exit(1);
  }

  const result = await runFdcImport(apiKey, {
    overwrite: false,
    dryRun: true,
    delayMs: 150,
  });

  const updates = result.updates || [];
  console.log(
    `FDC import dry-run complete. Candidate updates: ${updates.length}`
  );
  // Show a few samples for inspection
  for (const u of updates.slice(0, 5)) {
    console.log(
      "- ",
      u.name,
      Object.keys(u.perGram)
        .filter((k) => u.perGram[k])
        .slice(0, 8)
    );
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
