
# Redirect URI Inspector

The Redirect URI Inspector is a web-based tool designed to help developers inspect and understand the data passed to a page via its URL. This is particularly useful when working with OAuth 2.0 flows, SAML assertions, or any scenario where a page acts as a redirect target and needs to process query parameters or URL fragments.

The application captures the full URL, breaks down query parameters into key-value pairs, and displays the URL fragment (hash). It maintains a history of visited URIs (with their parsed data) using the browser's `localStorage`, allowing you to see a log of redirects over time.

## Features

*   **URL Parsing:** Displays the full URL, a list of query parameters, and the URL fragment.
*   **History Tracking:** Stores a history of unique redirect entries in `localStorage`.
*   **Reverse Chronological Order:** Shows the most recent redirect at the top.
*   **Clear History:** Option to clear all stored redirect history.
*   **Copy to Clipboard:**
    *   Copy the currently inspected URI.
    *   Copy the full URL of any historical entry.
    *   Copy all query parameters of an entry as a JSON object.
    *   Copy the URL fragment of an entry.
*   **Responsive Design:** Adapts to various screen sizes for easy viewing on desktop and mobile.
*   **No Backend Needed:** Purely a client-side application.
*   **Zero-Config Development:** Utilizes import maps and `esm.sh` for easy dependency management without a complex build setup for basic running, and Parcel for development.

## How it Works

When the page is loaded:
1.  It reads `window.location.href`, `window.location.search`, and `window.location.hash`.
2.  It parses the query string into a list of key-value pairs.
3.  A new entry containing this data, along with a timestamp, is created.
4.  This entry is added to a list of historical entries, which is then saved to `localStorage`.
5.  To avoid redundant entries, a new record is only added if its full URL differs from the most recently logged URL.
6.  The history is displayed, with the latest entry appearing first.

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

1.  Navigate to the application's URL in your browser.
2.  To test its functionality, append query parameters and a URL fragment to the URL. For example, if Parcel serves the app at `http://localhost:1234`, you could navigate to:
    `http://localhost:1234/?name=JohnDoe&status=active&id=123#profileDetails`
3.  The application will display the full URL, the parsed query parameters (`name`, `status`, `id`), and the fragment (`#profileDetails`).
4.  This visit will be logged in the history.
5.  If you visit again with different parameters or a different fragment, a new entry will be added to the top of the history list.
6.  Use the "Copy" buttons to copy specific pieces of information to your clipboard.
7.  Use the "Clear History" button in the header to remove all logged entries.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
