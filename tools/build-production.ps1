$ErrorActionPreference = "Stop"

Push-Location (Split-Path -Parent $PSScriptRoot)
try {
  $cachePath = Join-Path $env:TEMP "palacios-npm-cache"
  New-Item -ItemType Directory -Force $cachePath | Out-Null
  $env:npm_config_cache = $cachePath
  node tools/build-redesign.js
  node tools/generate-premium-landings.js
  python tools/build-responsive-images.py
  node tools/build-icon-subset.js
  npx.cmd --yes lightningcss-cli@1.30.1 assets/css/palacios-2026.css --output-file assets/css/palacios-2026.min.css --minify
  npx.cmd --yes lightningcss-cli@1.30.1 assets/css/palacios-motion.css --output-file assets/css/palacios-motion.min.css --minify
  npx.cmd --yes terser@5.44.0 assets/js/palacios-2026.js --compress --mangle --output assets/js/palacios-2026.min.js
  npx.cmd --yes terser@5.44.0 assets/js/palacios-motion.js --compress --mangle --output assets/js/palacios-motion.min.js
  node tools/build-experience-bundles.js
  npx.cmd --yes lightningcss-cli@1.30.1 domo/styles.css --output-file domo/domo.min.css --minify
  npx.cmd --yes terser@5.44.0 domo/script.js --compress --mangle --output domo/domo.min.js
  node tools/validate-site.js
} finally {
  Pop-Location
}
