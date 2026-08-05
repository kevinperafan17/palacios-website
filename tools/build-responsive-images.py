from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parent.parent
BLOG_DIRECTORY = ROOT / "assets" / "img" / "blog"
SERVICES_DIRECTORY = ROOT / "assets" / "img" / "services"
CTA_IMAGE = ROOT / "assets" / "img" / "cta" / "cta-1.webp"
SOURCES = [
    *sorted(BLOG_DIRECTORY.glob("blog-details-*.webp")),
    *sorted(SERVICES_DIRECTORY.glob("*.webp")),
    CTA_IMAGE,
]
SOURCES = [
    path for path in SOURCES
    if not path.stem.endswith(("-640", "-1280", "-card-640", "-card-1024"))
]
CARD_SOURCES = [
    *sorted(SERVICES_DIRECTORY.glob("*.webp")),
    BLOG_DIRECTORY / "blog-details-innovacion-5.webp",
    BLOG_DIRECTORY / "blog-details-complementarios-3.webp",
    BLOG_DIRECTORY / "blog-details-complementarios.webp",
    CTA_IMAGE,
]
CARD_SOURCES = [path for path in CARD_SOURCES if "-card-" not in path.stem and not path.stem.endswith(("-640", "-1280"))]


def build_variant(source: Path, width: int) -> Path:
    destination = source.with_name(f"{source.stem}-{width}.webp")
    with Image.open(source) as image:
        target_width = min(width, image.width)
        target_height = round(image.height * target_width / image.width)
        resized = image.resize((target_width, target_height), Image.Resampling.LANCZOS)
        resized.save(destination, "WEBP", quality=82, method=6)
    return destination


def build_card_variant(source: Path, width: int) -> Path:
    destination = source.with_name(f"{source.stem}-card-{width}.webp")
    target_height = round(width / 1.22)
    with Image.open(source) as image:
        source_ratio = image.width / image.height
        if source_ratio > 1.22:
            crop_width = round(image.height * 1.22)
            left = (image.width - crop_width) // 2
            image = image.crop((left, 0, left + crop_width, image.height))
        else:
            crop_height = round(image.width / 1.22)
            top = (image.height - crop_height) // 2
            image = image.crop((0, top, image.width, top + crop_height))
        resized = image.resize((width, target_height), Image.Resampling.LANCZOS)
        resized.save(destination, "WEBP", quality=82, method=6)
    return destination


generated = []
for source_path in SOURCES:
    generated.extend(build_variant(source_path, width) for width in (640, 1280))

for directory in (BLOG_DIRECTORY, SERVICES_DIRECTORY, CTA_IMAGE.parent):
    for stale_variant in directory.glob("*-card-*.webp"):
        stale_variant.unlink()

for source_path in CARD_SOURCES:
    generated.extend(build_card_variant(source_path, width) for width in (640, 1024))

logo = ROOT / "assets" / "img" / "logo.webp"
generated.extend(build_variant(logo, width) for width in (64, 128))

total_size = sum(path.stat().st_size for path in generated)
print(f"Generated {len(generated)} responsive images ({total_size / 1024:.1f} KiB).")
