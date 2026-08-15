const hostedUrl = new URL(process.env.HOSTED_URL ?? "https://asdc163.github.io/pm-signal-lab/");

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

async function readResponse(url, label) {
  const response = await fetch(url, { redirect: "follow" });
  const body = await response.text();
  assert(response.ok, `${label} returned HTTP ${response.status}`);
  return { response, body };
}

try {
  const page = await readResponse(hostedUrl, "Hosted demo HTML");
  const language = page.body.match(/<html[^>]*\slang=["']([^"']+)["']/i)?.[1] ?? null;
  const title = page.body.match(/<title>([^<]+)<\/title>/i)?.[1]?.trim() ?? null;
  const assetPaths = [
    ...page.body.matchAll(/(?:src|href)=["']([^"']*assets\/index-[^"']+\.(?:js|css))["']/g),
  ].map((match) => match[1]);
  const assets = [...new Set(assetPaths)].map((assetPath) => new URL(assetPath, page.response.url));

  assert(page.response.url === hostedUrl.toString(), `Hosted demo redirected to ${page.response.url}`);
  assert(language === "en-US", `Expected lang=en-US, received ${language ?? "missing"}`);
  assert(title === "PM Signal Lab — Field notes for product decisions", `Unexpected title: ${title ?? "missing"}`);
  assert(assets.some((asset) => asset.pathname.endsWith(".js")), "No hashed JavaScript asset was found");
  assert(assets.some((asset) => asset.pathname.endsWith(".css")), "No hashed CSS asset was found");

  const assetReports = [];
  const assetBodies = [];
  for (const asset of assets) {
    const result = await readResponse(asset, `Hosted asset ${asset.pathname}`);
    assetReports.push({ path: asset.pathname, status: result.response.status, contentType: result.response.headers.get("content-type") });
    assetBodies.push({ path: asset.pathname, body: result.body });
  }

  const javascript = assetBodies.find((asset) => asset.path.endsWith(".js"))?.body ?? "";
  const requiredStrings = [
    "Start with a source line",
    "Write down one line from the work",
    "Support draft review",
    "Case record",
    "No source line yet",
    "Keep the source in frame",
    "Sample note",
    "Support draft review: deciding what to test next",
    "support draft",
    "support-draft review flow",
    "support-draft worksheet",
    "Case subject",
    "support draft",
    "fictional worksheet",
    "Evaluation review",
    "source or freshness",
    "copy is not resolution",
    "Local fixture only",
    "Open the sample worksheet",
    "Question on the desk",
    "This session",
    "Last action below",
    "No usable claims yet",
    "Back to Collect",
    "Next mark",
    "No claim travels without its source.",
    "Open pilot note",
    "This is a field note, not a validation result.",
    "Evidence workpaper",
    "Public preview · refresh clears the sheet",
  ];
  const forbiddenStrings = [
    "From one product signal to one testable decision",
    "Write down the line you can defend",
    "What does this line actually support?",
    "Load sample data",
    "Signal review: deciding what to test next",
    "AI support copilot: deciding what to test next",
    "Check what this line supports",
    "Sheet state",
    "support copilot",
    "assistant draft",
    "AI support-copilot pack",
    "support-copilot review flow",
    "Product evidence worksheet",
    "Put a product signal back next to its source",
    "Put one traceable line on the desk",
    "Start with the source. Decide what to test.",
    "What needs your attention",
    "context-stats",
    "Evidence desk / local preview",
    "Public preview 0.1 · refresh resets it",
    "Current worksheet",
    "Working file",
    "Activity recorded",
    "No activity yet",
    "Load data in Collect",
    "Back to Verify",
    "Current work",
    "Sample signal",
    "Desk note",
    "Session record",
    "Review docket",
    "Evidence desk / hosted demo",
    "Hosted demo 0.1 · refresh resets it",
    "Put one signal on the desk",
    "Bring in one source line",
    "Data boundary",
    "refresh resets it",
  ];
  for (const text of requiredStrings) {
    assert(javascript.includes(text), `Current hosted JavaScript is missing: ${text}`);
  }
  for (const text of forbiddenStrings) {
    assert(!javascript.includes(text), `Stale hosted JavaScript still contains: ${text}`);
  }

  const report = {
    checked_at_utc: new Date().toISOString(),
    url: page.response.url,
    status: page.response.status,
    language,
    title,
    cache_control: page.response.headers.get("cache-control"),
    assets: assetReports,
    required_strings: requiredStrings,
    forbidden_strings_absent: forbiddenStrings,
    checks: {
      canonical_https: page.response.url.startsWith("https://"),
      html_ok: page.response.ok,
      assets_ok: assetReports.every((asset) => asset.status === 200),
      current_copy_present: requiredStrings.every((text) => javascript.includes(text)),
      stale_copy_absent: forbiddenStrings.every((text) => !javascript.includes(text)),
    },
  };

  console.log(JSON.stringify(report, null, 2));
} catch (error) {
  console.error(`Hosted demo verification failed: ${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = 1;
}
