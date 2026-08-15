import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const skillName = "pm-source-to-test";
const skillRoot = path.join(repoRoot, "skills", skillName);
const skillPath = path.join(skillRoot, "SKILL.md");
const examplePath = path.join(skillRoot, "references", "support-draft-review.md");
const failures = [];

function fail(message) {
  failures.push(message);
}

const skill = await readFile(skillPath, "utf8").catch(() => "");
const example = await readFile(examplePath, "utf8").catch(() => "");
const frontmatterMatch = skill.match(/^---\n([\s\S]*?)\n---\n/);

if (!frontmatterMatch) {
  fail("SKILL.md is missing YAML frontmatter");
}

const frontmatter = frontmatterMatch?.[1] ?? "";
const nameMatch = frontmatter.match(/^name:\s*(.+)$/m);
const descriptionMatch = frontmatter.match(/^description:\s*(.+)$/m);
const compatibilityMatch = frontmatter.match(/^compatibility:\s*(.+)$/m);
const declaredName = nameMatch?.[1]?.trim() ?? "";
const description = descriptionMatch?.[1]?.trim() ?? "";
const compatibility = compatibilityMatch?.[1]?.trim() ?? "";

if (declaredName !== skillName) fail(`name must match ${skillName}`);
if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(declaredName)) {
  fail("name must use lowercase letters, numbers, and single hyphens");
}
if (declaredName.length < 1 || declaredName.length > 64) {
  fail("name must be between 1 and 64 characters");
}
if (!description || description.length > 1024) {
  fail("description must be between 1 and 1024 characters");
}
if (compatibility.length > 500) fail("compatibility must be at most 500 characters");

const body = frontmatterMatch ? skill.slice(frontmatterMatch[0].length) : skill;
if (body.split("\n").length > 500) fail("SKILL.md body must stay under 500 lines");
for (const heading of ["## When to use", "## Workflow", "## Output contract", "## Edge cases", "## Final check"]) {
  if (!body.includes(heading)) fail(`missing required section: ${heading}`);
}
if (/\b(?:TODO|TBD|FIXME)\b|fill in|similar to above/i.test(body)) {
  fail("SKILL.md contains a placeholder instruction");
}
if (!example.includes("fictional fixture") || !example.includes("## Not covered")) {
  fail("worked example must mark its evidence boundary");
}

if (failures.length) {
  console.error("Skill verification failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Skill verification passed: ${skillName}`);
console.log(`- SKILL.md: ${body.split("\n").length} body lines`);
console.log("- Frontmatter, required sections, example boundary, and placeholder scan: pass");
