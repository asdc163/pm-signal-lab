import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const failures = [];

function fail(message) {
  failures.push(message);
}

async function readFirstExisting(paths) {
  for (const candidate of paths) {
    const contents = await readFile(candidate, "utf8").catch(() => "");
    if (contents) return contents;
  }
  return "";
}

const skillEntries = await readdir(path.join(repoRoot, "skills"), { withFileTypes: true });
const skillNames = skillEntries
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();

if (skillNames.length === 0) {
  fail("skills/ must contain at least one skill directory");
}

for (const skillName of skillNames) {
  const skillRoot = path.join(repoRoot, "skills", skillName);
  const skillPath = path.join(skillRoot, "SKILL.md");
  const skill = await readFile(skillPath, "utf8").catch(() => "");
  const examplePaths = [
    path.join(skillRoot, "examples", "first-run.md"),
    path.join(skillRoot, "references", "support-draft-review.md"),
  ];
  const example = await readFirstExisting(examplePaths);
  const frontmatterMatch = skill.match(/^---\n([\s\S]*?)\n---\n/);

  if (!frontmatterMatch) {
    fail(`${skillName}: SKILL.md is missing YAML frontmatter`);
  }

  const frontmatter = frontmatterMatch?.[1] ?? "";
  const nameMatch = frontmatter.match(/^name:\s*(.+)$/m);
  const descriptionMatch = frontmatter.match(/^description:\s*(.+)$/m);
  const compatibilityMatch = frontmatter.match(/^compatibility:\s*(.+)$/m);
  const declaredName = nameMatch?.[1]?.trim() ?? "";
  const description = descriptionMatch?.[1]?.trim() ?? "";
  const compatibility = compatibilityMatch?.[1]?.trim() ?? "";

  if (declaredName !== skillName) fail(`${skillName}: name must match directory name`);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(declaredName)) {
    fail(`${skillName}: name must use lowercase letters, numbers, and single hyphens`);
  }
  if (declaredName.length < 1 || declaredName.length > 64) {
    fail(`${skillName}: name must be between 1 and 64 characters`);
  }
  if (!description || description.length > 1024) {
    fail(`${skillName}: description must be between 1 and 1024 characters`);
  }
  if (compatibility.length > 500) fail(`${skillName}: compatibility must be at most 500 characters`);

  const body = frontmatterMatch ? skill.slice(frontmatterMatch[0].length) : skill;
  if (body.split("\n").length > 500) fail(`${skillName}: SKILL.md body must stay under 500 lines`);
  for (const heading of ["## When to use", "## Workflow", "## Output contract", "## Edge cases", "## Final check"]) {
    if (!body.includes(heading)) fail(`${skillName}: missing required section: ${heading}`);
  }
  if (/\b(?:TODO|TBD|FIXME)\b|fill in|similar to above/i.test(body)) {
    fail(`${skillName}: SKILL.md contains a placeholder instruction`);
  }
  if (!example.includes("fictional fixture") || !example.includes("## Not covered")) {
    fail(`${skillName}: worked example must mark its evidence boundary`);
  }
}

if (failures.length) {
  console.error("Skill verification failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Skill verification passed: ${skillNames.join(", ")}`);
console.log(`- Checked ${skillNames.length} skill package(s)`);
console.log("- Frontmatter, required sections, example boundary, line budget, and placeholder scan: pass");
