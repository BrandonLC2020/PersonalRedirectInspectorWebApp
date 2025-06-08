
# Redirect URI Inspector

The Redirect URI Inspector is a web-based tool designed to help developers inspect and understand the data passed to a page via its URL. This is particularly useful when working with OAuth 2.0 flows, SAML assertions, or any scenario where a page acts as a redirect target and needs to process query parameters or URL fragments.

The application captures the full URL, breaks down query parameters into key-value pairs, and displays the URL fragment (hash). It maintains a history of visited URIs (with their parsed data) using the browser's `localStorage`, allowing you to see a log of redirects over time. Users can also set a default URL to be monitored automatically or manually inspect any specific URL on demand.

## Features

*   **URL Parsing:** Displays the full URL, a list of query parameters, and the URL fragment for inspected URIs.
*   **Automated Inspection:**
    *   By default, inspects the application's own `window.location.href` when it loads or changes.
    *   **Configurable Default Monitored URL:** Users can set a persistent "default monitored URL". If set, and the application is opened without its own query parameters or fragment, this default URL will be inspected instead.
*   **Manual URL Inspection:** Allows users to input any URL directly into the application for immediate parsing and addition to the history.
*   **History Tracking:** Stores a history of unique redirect entries (from automated or manual inspections) in `localStorage`.
*   **Reverse Chronological Order:** Shows the most recent entry at the top.
*   **Clear History:** Option to clear all stored redirect history.
*   **Copy to Clipboard:**
    *   Copy the auto-inspected URI.
    *   Copy the full URL of any historical entry.
    *   Copy all query parameters of an entry as a JSON object.
    *   Copy the URL fragment of an entry.
*   **Responsive Design:** Adapts to various screen sizes for easy viewing on desktop and mobile.
*   **No Backend Needed:** Purely a client-side application.
*   **Zero-Config Development:** Utilizes import maps and `esm.sh` for easy dependency management without a complex build setup for basic running, and Parcel for development.

## How it Works

When the page is loaded or its own URL changes:
1.  The application determines the URL to inspect:
    *   It first checks `window.location.href`.
    *   If `window.location.href` has significant query parameters or a fragment, this URL is chosen for inspection.
    *   If `window.location.href` is "plain" (no significant query/fragment) AND a default custom URL has been set by the user (and stored in `localStorage`), that default custom URL is chosen for inspection.
    *   Otherwise (plain `window.location.href` and no default custom URL), the plain `window.location.href` is used.
2.  The chosen URL is parsed: its query string is broken into key-value pairs, and its fragment is extracted.
3.  A new entry containing this data, along with a timestamp, is created for the chosen URL.
4.  This entry is added to a list of historical entries, which is then saved to `localStorage`.
5.  To avoid redundant entries from auto-inspection, a new record is only added if its content (full URL, query params, fragment) differs from the most recently logged entry.
6.  The history is displayed, with the latest entry appearing first.

**Manual Inspection:**
*   Users can input any URL into the "Manually Inspect Specific URL" field.
*   Upon submission, this URL is parsed, and a new entry is created and added to the history, regardless of the auto-inspection logic.

## Tech Stack

*   **React 19:** For building the user interface. (Loaded via `esm.sh` CDN through import maps)
*   **TypeScript:** For type safety and improved developer experience.
*   **HTML5 & CSS3:** For structure and styling.
*   **Parcel:** Recommended for local development to handle TypeScript/JSX transpilation and provide a dev server.

## File Structure

```
.
├── LICENSE                     # Project license file
├── README.md                   # This file
├── index.css                   # Global styles for the application
├── index.html                  # Main HTML entry point
├── index.tsx                   # Main application component (App) and React DOM rendering
├── metadata.json               # Project metadata (not directly used by the running app)
├── RedirectCard.tsx            # React component to display a single redirect entry
└── src/
    ├── components/
    │   ├── AppHeader.tsx       # Component for the main application header
    │   ├── DataBlock.tsx       # Reusable component for displaying data + copy button
    │   ├── ParamsGrid.tsx      # Component to display query parameters in a grid
    │   └── componentStyles.css # CSS file for component-specific styles (optional)
    ├── types.ts                # Shared TypeScript type definitions
    └── useCopyToClipboard.ts   # Custom React hook for clipboard functionality
```

## How to Run Locally

To run this application on your local machine, you'll need Node.js and npm installed. Parcel is recommended as a simple development server that handles the necessary transformations.

1.  **Prerequisites:**
    *   Ensure you have [Node.js](https://nodejs.org/) (which includes npm) installed.

2.  **Navigate to Project Directory:**
    Open your terminal or command prompt and change to the directory where you've saved these project files.

3.  **Run with Parcel:**
    Execute the following command in your terminal:
    ```bash
    npx parcel index.html
    ```
    *   `npx` will download and run Parcel if you don't have it installed globally.
    *   Parcel will automatically:
        *   Transpile the TypeScript/JSX files (`.tsx`) into JavaScript.
        *   Start a local development server (usually at `http://localhost:1234`).
        *   Open the application in your default web browser.

4.  **View the App:**
    If it doesn't open automatically, navigate to the URL provided by Parcel in your browser (e.g., `http://localhost:1234`).

## How to Use

1.  **Automatic Inspection (as Redirect Target):**
    *   Navigate to the application's URL in your browser.
    *   To test its functionality as a redirect target, append query parameters and a URL fragment to its *own* URL. For example, if Parcel serves the app at `http://localhost:1234`, you could navigate to:
        `http://localhost:1234/?name=JohnDoe&status=active&id=123#profileDetails`
    *   The application will display the full URL, the parsed query parameters (`name`, `status`, `id`), and the fragment (`#profileDetails`). This visit will be logged.

2.  **Set/Clear Default Monitored URL:**
    *   In the header, find the "Set Default Monitored URL" section.
    *   Enter a complete URL (e.g., your ngrok URL, `https://your-service.ngrok.io/callback`) into the input field and click "Set as Default".
    *   If a default URL is set, and you open the Redirect Inspector *without* any query parameters or hash in its own URL (e.g., just `http://localhost:1234/`), it will automatically inspect your specified default URL.
    *   The currently set default URL will be displayed. You can clear it using the "Clear Default" button.

3.  **Manually Inspect a Specific URL:**
    *   In the header, find the "Manually Inspect Specific URL" section.
    *   Enter any full URL you wish to examine into the input field (e.g., `https://example.com/login?token=abc&session=xyz#data`).
    *   Click "Inspect URL". The components of this URL will be parsed and added to the history.

4.  **Viewing History:**
    *   All inspected entries (automatic, default, or manual) appear in the history list below the header.
    *   The most recent entry is at the top.

5.  **Using "Copy" Buttons:**
    *   Each data block (Auto-Inspected URI, Full URL in cards, Query Params, Fragment) has a "Copy" button to easily copy the respective data to your clipboard.

6.  **Clearing History:**
    *   Use the "Clear History" button in the header to remove all logged entries from `localStorage` and the display.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
