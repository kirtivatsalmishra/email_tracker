# Email Tracker Chrome Extension

A Chrome extension that helps you track email opens and interactions.

## Features

- Track email opens using tracking pixels
- Toggle tracking on/off
- View statistics of tracked emails and opens
- Works with Gmail (can be extended to other email providers)

## Setup

1. Clone this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the extension directory

## Development

The extension consists of the following files:

- `manifest.json`: Extension configuration
- `popup.html`: Extension popup UI
- `popup.js`: Popup functionality
- `background.js`: Background processes
- `content.js`: Email page interactions

## Important Notes

1. You'll need to set up a tracking server to handle the tracking pixel requests
2. Replace `http://localhost:3000/track.png` in `content.js` with your actual tracking server URL
3. The extension currently supports Gmail, but can be extended to support other email providers

## Security Considerations

- The extension only tracks emails when enabled
- All data is stored locally in Chrome's storage
- No personal email content is accessed or stored

## Future Improvements

- Add support for more email providers
- Implement more detailed tracking statistics
- Add email link click tracking
- Add export functionality for tracking data