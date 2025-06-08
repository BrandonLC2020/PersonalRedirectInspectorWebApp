/**
 * @license
 * SPDX-License-Identifier: MIT
 */
import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css'; // Main styles
// import './src/components/componentStyles.css'; // Component-specific styles (if any)

import RedirectCard from './RedirectCard';
import AppHeader from './src/components/AppHeader'; // Corrected path
import type { KeyValue, RedirectData } from './src/types'; // Corrected path

const LOCAL_STORAGE_KEY = 'redirectHistory';

function App() {
  const [history, setHistory] = useState<RedirectData[]>([]);
  const [manualUrlInput, setManualUrlInput] = useState<string>('');
  const pageUrl = window.location.href; // Get it once

  useEffect(() => {
    const storedHistoryString = localStorage.getItem(LOCAL_STORAGE_KEY);
    const loadedHistory: RedirectData[] = storedHistoryString ? JSON.parse(storedHistoryString) : [];

    const searchParams = new URLSearchParams(window.location.search);
    const currentQueryParams: KeyValue[] = [];
    for (const [key, value] of searchParams) {
        currentQueryParams.push({ key, value });
    }
    
    const currentFragment = window.location.hash;
    const currentTimestamp = Date.now();

    const newRedirectEntry: RedirectData = {
      id: currentTimestamp.toString(),
      timestamp: currentTimestamp,
      fullUrl: pageUrl, // Use cached pageUrl
      queryParams: currentQueryParams,
      fragment: currentFragment,
    };

    if (loadedHistory.length === 0 || loadedHistory[0].fullUrl !== newRedirectEntry.fullUrl) {
      const updatedHistory = [newRedirectEntry, ...loadedHistory];
      setHistory(updatedHistory);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedHistory));
    } else {
      setHistory(loadedHistory);
    }
  }, [pageUrl]); // Add pageUrl to dependency array if its change should trigger effect

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear all redirect history? This action cannot be undone.')) {
      setHistory([]);
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      // Also clear manual input if desired, though not strictly necessary
      // setManualUrlInput(''); 
    }
  };

  const handleInspectManualUrl = (urlToInspect: string) => {
    if (!urlToInspect.trim()) {
      alert('Please enter a URL to inspect.');
      return;
    }

    let parsedUrl;
    try {
      parsedUrl = new URL(urlToInspect);
    } catch (error) {
      console.error('Invalid URL entered:', error);
      alert('The entered URL is invalid. Please check and try again.\nMake sure it includes the protocol (e.g., http:// or https://).');
      return;
    }

    const fullUrl = parsedUrl.href;
    const queryParams: KeyValue[] = [];
    parsedUrl.searchParams.forEach((value, key) => {
      queryParams.push({ key, value });
    });
    const fragment = parsedUrl.hash;
    const currentTimestamp = Date.now();

    const newRedirectEntry: RedirectData = {
      id: currentTimestamp.toString(),
      timestamp: currentTimestamp,
      fullUrl,
      queryParams,
      fragment,
    };

    setHistory(prevHistory => {
      // Avoid adding if it's an exact duplicate of the most recent entry
      if (prevHistory.length > 0 && prevHistory[0].fullUrl === newRedirectEntry.fullUrl) {
        // Optionally, you could provide feedback that it's a duplicate or re-log with new timestamp
        // For now, just don't add if identical to the very last one.
        // If you want to allow re-logging identical URLs, remove this check.
        const updatedHistoryWithPotentialDuplicate = [newRedirectEntry, ...prevHistory];
         localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedHistoryWithPotentialDuplicate));
        return updatedHistoryWithPotentialDuplicate;
      }
      const updatedHistory = [newRedirectEntry, ...prevHistory];
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedHistory));
      return updatedHistory;
    });
    setManualUrlInput(''); // Clear input after successful inspection
  };


  return (
    <div className="container">
      <AppHeader
        currentUri={pageUrl}
        historyLength={history.length}
        onClearHistory={handleClearHistory}
        manualUrlInput={manualUrlInput}
        onManualUrlInputChange={setManualUrlInput}
        onInspectManualUrl={handleInspectManualUrl}
      />

      <main>
        {history.length === 0 ? (
          <p className="empty-history-message">
            No redirects recorded yet. New redirects to this page will appear here automatically, or you can manually inspect a URL using the input above.
          </p>
        ) : (
          <div className="history-list" aria-live="polite">
            {history.map(redirect => (
              <RedirectCard key={redirect.id} data={redirect} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error('Failed to find the root element');
}