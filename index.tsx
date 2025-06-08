/**
 * @license
 * SPDX-License-Identifier: MIT
 */
import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Main styles
import './src/components/componentStyles.css'; // Component-specific styles (if any)

import RedirectCard from './RedirectCard';
import AppHeader from './src/components/AppHeader';
import type { KeyValue, RedirectData } from './src/types';

const LOCAL_STORAGE_KEY = 'redirectHistory';
const DEFAULT_CUSTOM_URL_KEY = 'defaultCustomMonitorUrl';

function App() {
  const [history, setHistory] = useState<RedirectData[]>([]);
  const [manualUrlInput, setManualUrlInput] = useState<string>('');
  
  const [defaultCustomUrl, setDefaultCustomUrl] = useState<string>(() => {
    return localStorage.getItem(DEFAULT_CUSTOM_URL_KEY) || '';
  });
  const [inputValueForDefaultUrl, setInputValueForDefaultUrl] = useState<string>(defaultCustomUrl);
  const [mainInspectedUrl, setMainInspectedUrl] = useState<string>('');

  const pageUrl = window.location.href; // Browser's current URL

  useEffect(() => {
    const storedHistoryString = localStorage.getItem(LOCAL_STORAGE_KEY);
    const loadedHistory: RedirectData[] = storedHistoryString ? JSON.parse(storedHistoryString) : [];

    let urlToParse: string;

    const currentWindowUrlObj = new URL(pageUrl);
    const hasMeaningfulQuery = currentWindowUrlObj.searchParams.toString() !== '';
    const hasMeaningfulHash = currentWindowUrlObj.hash !== '' && currentWindowUrlObj.hash !== '#';

    if (!hasMeaningfulQuery && !hasMeaningfulHash && defaultCustomUrl) {
      try {
        new URL(defaultCustomUrl); // Validate
        urlToParse = defaultCustomUrl;
      } catch (e) {
        console.warn("Invalid default custom URL, falling back to browser's URL:", defaultCustomUrl, e);
        urlToParse = pageUrl;
      }
    } else {
      urlToParse = pageUrl;
    }

    setMainInspectedUrl(urlToParse);

    let parsedUrlForEntry;
    try {
      parsedUrlForEntry = new URL(urlToParse);
    } catch (error) {
      console.error('Failed to parse URL for entry:', urlToParse, error);
      // If parsing fails (e.g. invalid defaultCustomUrl that somehow passed initial check, or malformed pageUrl)
      // We should not proceed to add to history or set it as mainInspectedUrl (already set though)
      // Perhaps clear mainInspectedUrl or set a specific error state?
      // For now, if urlToParse is bad, we just don't add to history.
      if (history.length === 0 && loadedHistory.length > 0) { // If history is empty but loaded some
          setHistory(loadedHistory); // ensure UI reflects loaded history if current parse fails
      }
      return; 
    }
    
    const entryQueryParams: KeyValue[] = [];
    parsedUrlForEntry.searchParams.forEach((value, key) => {
      entryQueryParams.push({ key, value });
    });
    const entryFragment = parsedUrlForEntry.hash;
    const currentTimestamp = Date.now();

    const newRedirectEntry: RedirectData = {
      id: currentTimestamp.toString(),
      timestamp: currentTimestamp,
      fullUrl: parsedUrlForEntry.href,
      queryParams: entryQueryParams,
      fragment: entryFragment,
    };

    // Add to history if it's different from the most recent entry
    if (loadedHistory.length === 0 || 
        loadedHistory[0].fullUrl !== newRedirectEntry.fullUrl ||
        JSON.stringify(loadedHistory[0].queryParams) !== JSON.stringify(newRedirectEntry.queryParams) ||
        loadedHistory[0].fragment !== newRedirectEntry.fragment
    ) {
      const updatedHistory = [newRedirectEntry, ...loadedHistory];
      setHistory(updatedHistory);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedHistory));
    } else if (history.length === 0 && loadedHistory.length > 0) {
      // If new entry is identical to last, but current history state is empty (e.g. initial load)
      setHistory(loadedHistory);
    } else if (history.length === 0 && loadedHistory.length === 0 && newRedirectEntry.fullUrl) {
      // If everything is empty and we have a valid new entry (e.g. first ever load with default)
      const updatedHistory = [newRedirectEntry];
      setHistory(updatedHistory);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedHistory));
    }


  }, [pageUrl, defaultCustomUrl]); // Re-run if browser URL or default custom URL changes

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear all redirect history? This action cannot be undone.')) {
      setHistory([]);
      localStorage.removeItem(LOCAL_STORAGE_KEY);
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
      console.error('Invalid URL entered for manual inspection:', error);
      alert('The entered URL for manual inspection is invalid. Please check and try again.\nMake sure it includes the protocol (e.g., http:// or https://).');
      return;
    }

    const newRedirectEntry: RedirectData = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      fullUrl: parsedUrl.href,
      queryParams: Array.from(parsedUrl.searchParams.entries()).map(([key, value]) => ({ key, value })),
      fragment: parsedUrl.hash,
    };

    setHistory(prevHistory => {
      const updatedHistory = [newRedirectEntry, ...prevHistory];
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedHistory));
      return updatedHistory;
    });
    setManualUrlInput('');
  };

  const handleSetDefaultCustomUrl = (newUrl: string) => {
    const trimmedUrl = newUrl.trim();
    if (trimmedUrl === '') {
      localStorage.removeItem(DEFAULT_CUSTOM_URL_KEY);
      setDefaultCustomUrl('');
      // setInputValueForDefaultUrl(''); // Input is controlled by its own state now
      alert('Default monitored URL cleared.');
      return;
    }
    try {
      new URL(trimmedUrl); // Validate
      localStorage.setItem(DEFAULT_CUSTOM_URL_KEY, trimmedUrl);
      setDefaultCustomUrl(trimmedUrl);
      alert('Default monitored URL set successfully.');
    } catch (error) {
      alert('Invalid URL for default. Please enter a valid URL including the protocol (e.g., http:// or https://).');
    }
  };

  return (
    <div className="container">
      <AppHeader
        autoInspectedUri={mainInspectedUrl}
        historyLength={history.length}
        onClearHistory={handleClearHistory}
        manualUrlInput={manualUrlInput}
        onManualUrlInputChange={setManualUrlInput}
        onInspectManualUrl={handleInspectManualUrl}
        defaultCustomUrlInputValue={inputValueForDefaultUrl}
        onDefaultCustomUrlInputChange={setInputValueForDefaultUrl}
        onSetDefaultCustomUrl={handleSetDefaultCustomUrl}
        currentDefaultUrlSet={defaultCustomUrl}
      />

      <main>
        {history.length === 0 ? (
          <p className="empty-history-message">
            No redirects recorded yet. New redirects to this page will appear here automatically.
            You can also set a default URL to monitor or manually inspect a URL using the inputs above.
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
