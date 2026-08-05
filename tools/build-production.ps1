$ErrorActionPreference = "Stop"

Push-Location (Split-Path -Parent $PSScriptRoot)
try {
  node tools/build-redesign.js
  node tools/generate-premium-landings.js
  python tools/build-responsive-images.py
  node tools/build-icon-subset.js
  npx.cmd --yes lightningcss-cli@1.30.1 assets/css/palacios-2026.css --output-file assets/css/palacios-2026.min.css --minify
  npx.cmd --yes terser@5.44.0 assets/js/palacios-2026.js --compress --mangle --output assets/js/palacios-2026.min.js
  node tools/validate-site.js
} finally {
  Pop-Location
}
