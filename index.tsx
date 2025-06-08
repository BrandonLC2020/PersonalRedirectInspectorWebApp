/**
 * @license
 * SPDX-License-Identifier: MIT
 */
import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Main styles
import './src/components/componentStyles.css'; // Component-specific styles (if any)

import RedirectCard from './RedirectCard';
import AppHeader from './src/components/AppHeader'; // Corrected path
import type { RedirectData } from './src/types'; // Corrected path

const LOCAL_STORAGE_KEY = 'redirectHistory';

function App() {
  const [history, setHistory] = useState<RedirectData[]>([]);
  const pageUrl = window.location.href; // Get it once

  useEffect(() => {
    const storedHistoryString = localStorage.getItem(LOCAL_STORAGE_KEY);
    const loadedHistory: RedirectData[] = storedHistoryString ? JSON.parse(storedHistoryString) : [];

    const searchParams = new URLSearchParams(window.location.search);
    const currentQueryParams = [];
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
    }
  };

  return (
    <div className="container">
      <AppHeader
        currentUri={pageUrl}
        historyLength={history.length}
        onClearHistory={handleClearHistory}
      />

      <main>
        {history.length === 0 ? (
          <p className="empty-history-message">
            No redirects recorded yet. New redirects to this page will appear here automatically.
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