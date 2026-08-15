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
  assert(title === "PM Signal Lab — Product signals to decisions", `Unexpected title: ${title ?? "missing"}`);
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
    "Keep the source in frame",
    "Review docket",
    "No claim travels without its source.",
    "Open pilot note",
    "This is a field note, not a validation result.",
  ];
  const forbiddenStrings = ["What needs your attention", "context-stats"];
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
