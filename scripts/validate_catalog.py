#!/usr/bin/env python3
# scripts/validate_catalog.py
"""Validate ResearchedNewLLMHardware JSON and JSONL catalog data.

The validator intentionally uses only the Python 3.12 standard library so it can
run locally and in GitHub Actions without dependency installation.
"""

from __future__ import annotations

import json
import sys
from collections import defaultdict
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
DATA_DIR = ROOT / "data"

REQUIRED_HARDWARE_FIELDS = ("id", "manufacturer", "product", "category", "status")


def load_json(path: Path) -> Any:
    """Load a JSON file and raise a descriptive error on invalid content."""
    try:
        with path.open("r", encoding="utf-8") as handle:
            return json.load(handle)
    except json.JSONDecodeError as exc:
        raise ValueError(
            f"{path.relative_to(ROOT)}:{exc.lineno}:{exc.colno}: invalid JSON: {exc.msg}"
        ) from exc


def validate_url_collection(value: Any, label: str, field: str) -> list[str]:
    """Validate URL collections used by both legacy and newer catalog records.

    Catalog files historically used two equivalent shapes:
    - a list of URL strings; or
    - a mapping of descriptive names to URL strings.

    Both are preserved because named mappings carry useful provenance while compact
    catalogs often only need an ordered list.
    """
    if value is None:
        return []

    if isinstance(value, list):
        if all(isinstance(url, str) and url.strip() for url in value):
            return []
        return [f"{label}: {field} list entries must be non-empty strings"]

    if isinstance(value, dict):
        if all(
            isinstance(name, str)
            and name.strip()
            and isinstance(url, str)
            and url.strip()
            for name, url in value.items()
        ):
            return []
        return [f"{label}: {field} mapping keys and values must be non-empty strings"]

    return [f"{label}: {field} must be a list of strings or a string-to-string mapping"]


def validate_hardware_record(record: Any, source: Path, index: int) -> list[str]:
    """Validate the minimum normalized shape of one hardware record."""
    errors: list[str] = []
    label = f"{source.relative_to(ROOT)} hardware[{index}]"

    if not isinstance(record, dict):
        return [f"{label}: expected object, got {type(record).__name__}"]

    for field in REQUIRED_HARDWARE_FIELDS:
        value = record.get(field)
        if not isinstance(value, str) or not value.strip():
            errors.append(f"{label}: missing or invalid required field {field!r}")

    pricing = record.get("pricing")
    if pricing is not None and not isinstance(pricing, list):
        errors.append(f"{label}: pricing must be a list when present")

    for url_field in ("vendor_urls", "source_urls"):
        errors.extend(validate_url_collection(record.get(url_field), label, url_field))

    return errors


def validate_json_catalogs() -> tuple[list[str], dict[str, list[str]]]:
    """Validate JSON files and collect hardware IDs across catalogs."""
    errors: list[str] = []
    id_sources: dict[str, list[str]] = defaultdict(list)

    for path in sorted(DATA_DIR.glob("*.json")):
        try:
            document = load_json(path)
        except ValueError as exc:
            errors.append(str(exc))
            continue

        if not isinstance(document, dict):
            errors.append(f"{path.relative_to(ROOT)}: top-level JSON value must be an object")
            continue

        hardware = document.get("hardware")
        if hardware is None:
            continue
        if not isinstance(hardware, list):
            errors.append(f"{path.relative_to(ROOT)}: hardware must be a list")
            continue

        for index, record in enumerate(hardware):
            errors.extend(validate_hardware_record(record, path, index))
            if isinstance(record, dict):
                hardware_id = record.get("id")
                if isinstance(hardware_id, str) and hardware_id.strip():
                    id_sources[hardware_id].append(str(path.relative_to(ROOT)))

    return errors, id_sources


def validate_jsonl_files() -> list[str]:
    """Validate every non-empty line in data/*.jsonl."""
    errors: list[str] = []

    for path in sorted(DATA_DIR.glob("*.jsonl")):
        with path.open("r", encoding="utf-8") as handle:
            for line_number, raw_line in enumerate(handle, start=1):
                line = raw_line.strip()
                if not line:
                    continue
                try:
                    value = json.loads(line)
                except json.JSONDecodeError as exc:
                    errors.append(
                        f"{path.relative_to(ROOT)}:{line_number}:{exc.colno}: "
                        f"invalid JSONL record: {exc.msg}"
                    )
                    continue
                if not isinstance(value, dict):
                    errors.append(
                        f"{path.relative_to(ROOT)}:{line_number}: JSONL record must be an object"
                    )
                    continue
                if path.name == "price-history.jsonl":
                    for field in ("hardware_id", "observed_at", "kind", "url"):
                        item = value.get(field)
                        if not isinstance(item, str) or not item.strip():
                            errors.append(
                                f"{path.relative_to(ROOT)}:{line_number}: missing {field!r}"
                            )

    return errors


def validate_duplicate_ids(id_sources: dict[str, list[str]]) -> list[str]:
    """Reject duplicate hardware IDs across normalized JSON catalogs."""
    errors: list[str] = []
    for hardware_id, sources in sorted(id_sources.items()):
        if len(sources) > 1:
            errors.append(
                f"duplicate hardware id {hardware_id!r} appears in: {', '.join(sources)}"
            )
    return errors


def main() -> int:
    """Run all catalog validation checks."""
    if not DATA_DIR.is_dir():
        print(f"ERROR: data directory not found: {DATA_DIR}", file=sys.stderr)
        return 2

    errors, id_sources = validate_json_catalogs()
    errors.extend(validate_jsonl_files())
    errors.extend(validate_duplicate_ids(id_sources))

    if errors:
        print("Catalog validation failed:", file=sys.stderr)
        for error in errors:
            print(f"- {error}", file=sys.stderr)
        return 1

    print(
        f"Catalog validation passed: {len(id_sources)} unique hardware IDs "
        f"across {len(list(DATA_DIR.glob('*.json')))} JSON catalogs."
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
