"""Build responsive WebP copies of photos-src/*.jpg into public/photos/.

Run after adding or changing a photo:  python3 scripts/optimize_photos.py
Writes lib/photo-manifest.json with each photo's size and available widths.
"""
import json
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "photos-src"
OUT = ROOT / "public" / "photos"
WIDTHS = [480, 640, 800, 1200]

OUT.mkdir(parents=True, exist_ok=True)
for old in OUT.glob("*.webp"):
    old.unlink()

manifest = {}
for path in sorted(SRC.glob("*.jpg")):
    im = Image.open(path).convert("RGB")
    w, h = im.size
    widths = [x for x in WIDTHS if x < w] + [min(w, WIDTHS[-1])]
    widths = sorted(set(widths))
    for tw in widths:
        th = round(h * tw / w)
        im.resize((tw, th), Image.LANCZOS).save(OUT / f"{path.stem}-{tw}.webp", "WEBP", quality=68, method=6)
    manifest[path.stem] = {"width": w, "height": h, "widths": widths}
    print(path.stem, widths)

(ROOT / "lib" / "photo-manifest.json").write_text(json.dumps(manifest, indent=2) + "\n")
