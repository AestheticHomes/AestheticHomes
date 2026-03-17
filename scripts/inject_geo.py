#!/usr/bin/env python3
"""
Geo-Entity Image Injector for Local SEO
---------------------------------------
This script batch-injects EXIF GPS metadata (Latitude and Longitude)
into all JPEG/JPG images within a target directory.

Usage:
1. pip install -U piexif
2. Place all project images to be uploaded to Google Business Profile into a folder (e.g., ./images-to-tag)
3. Run: python inject_geo.py ./images-to-tag

Coordinates default to Aesthetic Homes Chennai HQ.
"""

import os
import sys
import argparse
from typing import Tuple

try:
    import piexif
except ImportError:
    print("Error: 'piexif' library is required.")
    print("Run: pip install piexif")
    sys.exit(1)


def to_deg(value: float, loc: list) -> Tuple[Tuple[Tuple[int, int], ...], bytes]:
    """Convert decimal coordinates to degrees, minutes, and seconds EXIF format."""
    if value < 0:
        loc_value = loc[0]
    elif value > 0:
        loc_value = loc[1]
    else:
        loc_value = loc[0]

    abs_value = abs(value)
    deg = int(abs_value)
    t1 = (abs_value - deg) * 60
    _min = int(t1)
    sec = round((t1 - _min) * 60 * 10000)

    return ((deg, 1), (_min, 1), (sec, 10000)), loc_value.encode()


def inject_gps(image_path: str, lat: float, lng: float) -> bool:
    """Inject GPS EXIF data into a single image."""
    try:
        # Load existing exif data if present, otherwise create empty
        exif_dict = {"0th": {}, "Exif": {}, "GPS": {}, "1st": {}, "thumbnail": None}
        try:
            exif_dict.update(piexif.load(image_path))
        except piexif.InvalidImageDataError:
            print(f"  [WARN] Not a supported EXIF file type, skipping: {image_path}")
            return False
        except Exception as e:
            # It might just not have EXIF data yet, we can create it.
            pass

        # Convert coordinates
        lat_deg, lat_ref = to_deg(lat, ["S", "N"])
        lng_deg, lng_ref = to_deg(lng, ["W", "E"])

        # Create GPS dictionary
        gps_ifd = {
            piexif.GPSIFD.GPSVersionID: (2, 0, 0, 0),
            piexif.GPSIFD.GPSLatitudeRef: lat_ref,
            piexif.GPSIFD.GPSLatitude: lat_deg,
            piexif.GPSIFD.GPSLongitudeRef: lng_ref,
            piexif.GPSIFD.GPSLongitude: lng_deg,
        }

        exif_dict["GPS"] = gps_ifd

        # Dump and insert
        exif_bytes = piexif.dump(exif_dict)
        piexif.insert(exif_bytes, image_path)
        return True

    except Exception as e:
        print(f"  [ERROR] Failed to process {image_path}: {e}")
        return False


def main():
    parser = argparse.ArgumentParser(description="Batch inject GPS EXIF data into local images.")
    parser.add_argument("directory", help="Target directory containing JPG/JPEG images.")
    # Defaults set to Chennai Coordinates for Aesthetic Homes
    parser.add_argument("--lat", type=float, default=13.0569, help="Latitude (default: 13.0569 N)")
    parser.add_argument("--lng", type=float, default=80.2211, help="Longitude (default: 80.2211 E)")
    
    args = parser.parse_args()
    
    target_dir = args.directory

    if not os.path.exists(target_dir):
        print(f"Error: Directory '{target_dir}' does not exist.")
        sys.exit(1)

    print(f"Scanning '{target_dir}' for JPEG images...")
    print(f"Target GEO: [{args.lat}, {args.lng}]")
    
    success_count = 0
    fail_count = 0
    
    for filename in os.listdir(target_dir):
        if filename.lower().endswith(('.jpg', '.jpeg')):
            file_path = os.path.join(target_dir, filename)
            print(f"Processing: {filename}")
            if inject_gps(file_path, args.lat, args.lng):
                success_count += 1
            else:
                fail_count += 1

    print("\n--- Summary ---")
    print(f"Successfully tagged: {success_count} images")
    print(f"Failed or skipped: {fail_count} images")


if __name__ == "__main__":
    main()
