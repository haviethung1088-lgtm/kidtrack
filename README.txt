KidTrack – Starter PWA Identity Pack

Included:
- KidTrack_Visual_Identity_Board.png: full concept board with mascot logo, 12 feature-icon concepts, and sample mobile screens.
- KidTrack_AppIcon_Master_1024.png: square mascot app-icon master crop.
- icon-512.png and icon-192.png: common PWA manifest icon sizes.
- apple-touch-icon-180.png: iOS home-screen icon size.
- Additional small PNG sizes and favicon.

Important:
These are starter raster assets cropped/resized from the concept board, not individually redrawn production vectors.
Before release, consider commissioning/exporting clean standalone SVG/PNG artwork for each feature icon and checking the app icon mask/safe area on real iOS and Android devices.

Suggested manifest entries:
{
  "name": "KidTrack",
  "short_name": "KidTrack",
  "start_url": "/",
  "display": "standalone",
  "icons": [
    { "src": "/icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icons/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}

For iOS, add:
<link rel="apple-touch-icon" href="/icons/apple-touch-icon-180.png">
