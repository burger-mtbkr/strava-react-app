const fs = require('node:fs');
const path = require('node:path');

const coveragePath = path.resolve(__dirname, '../e2e/critical-flows.json');
const raw = fs.readFileSync(coveragePath, 'utf8');
const data = JSON.parse(raw);

const total = data.flows.length;
const automated = data.flows.filter((flow) => flow.automated).length;
const percent = total === 0 ? 0 : Math.round((automated / total) * 100);
const required = data.requiredCoveragePercent ?? 60;

process.stdout.write(
  `Critical flow coverage: ${automated}/${total} (${percent}%). Required: ${required}%.\n`,
);

if (percent < required) {
  process.stderr.write('Critical flow coverage gate failed.\n');
  process.exit(1);
}
