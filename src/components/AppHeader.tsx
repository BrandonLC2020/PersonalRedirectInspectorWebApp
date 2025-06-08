/**
 * @license
 * SPDX-License-Identifier: MIT
 */
import React from 'react';
import { useCopyToClipboard } from '../useCopyToClipboard';
import HeaderBanner from './HeaderBanner'; // Import the new banner component

interface AppHeaderProps {
  autoInspectedUri: string;
  historyLength: number;
  onClearHistory: () => void;
  manualUrlInput: string;
  onManualUrlInputChange: (value: string) => void;
  onInspectManualUrl: (url: string) => void;
  defaultCustomUrlInputValue: string;
  onDefaultCustomUrlInputChange: (value: string) => void;
  onSetDefaultCustomUrl: (url: string) => void;
  currentDefaultUrlSet: string;
}

function AppHeader({
  autoInspectedUri,
  historyLength,
  onClearHistory,
  manualUrlInput,
  onManualUrlInputChange,
  onInspectManualUrl,
  defaultCustomUrlInputValue,
  onDefaultCustomUrlInputChange,
  onSetDefaultCustomUrl,
  currentDefaultUrlSet
}: AppHeaderProps) {
  const [isUriCopied, copyUri] = useCopyToClipboard();

  const handleCopyUri = () => {
    if (autoInspectedUri) {
      copyUri(autoInspectedUri);
    }
  };

  const handleManualInspectClick = () => {
    onInspectManualUrl(manualUrlInput);
  };
  
  const handleManualInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleManualInspectClick();
    }
  };

  const handleSetDefaultUrlClick = () => {
    onSetDefaultCustomUrl(defaultCustomUrlInputValue);
  };

  const handleDefaultUrlInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSetDefaultUrlClick();
    }
  };
  
  const handleClearDefaultUrlClick = () => {
    onDefaultCustomUrlInputChange(''); // Clear input field as well
    onSetDefaultCustomUrl(''); // Pass empty string to handler for clearing
  };


  return (
    <header>
      {/* Use the new HeaderBanner component */}
      <HeaderBanner />

      <div className="current-uri-section">
        <h4>Auto-Inspected URI:</h4>
        {autoInspectedUri ? (
          <>
            <pre className="code-block" aria-label="Automatically inspected URI">{autoInspectedUri}</pre>
            <button
              onClick={handleCopyUri}
              aria-live="polite"
              aria-describedby={isUriCopied ? "uri-copied-feedback" : undefined}
            >
              {isUriCopied ? 'Copied!' : 'Copy URI'}
            </button>
            {isUriCopied && <span id="uri-copied-feedback" className="visually-hidden">URI copied to clipboard.</span>}
          </>
        ) : (
          <p>No URI auto-inspected yet. This will update on page load or if a default URL is set.</p>
        )}
      </div>
      
      <div className="manual-inspect-section">
        <h4 id="default-url-heading">Set Default Monitored URL:</h4>
        {currentDefaultUrlSet && (
          <p className="current-default-info">Currently set to: <code className="code-block inline small">{currentDefaultUrlSet}</code></p>
        )}
        <div className="manual-inspect-controls">
          <input
            type="url"
            value={defaultCustomUrlInputValue}
            onChange={(e) => onDefaultCustomUrlInputChange(e.target.value)}
            onKeyDown={handleDefaultUrlInputKeyDown}
            placeholder="e.g., https://my-default.ngrok.app"
            aria-labelledby="default-url-heading"
            aria-label="URL to set as default for monitoring"
            className="manual-url-input"
          />
          <button onClick={handleSetDefaultUrlClick} className="inspect-url-button">
            Set as Default
          </button>
           {currentDefaultUrlSet && (
            <button onClick={handleClearDefaultUrlClick} className="clear-default-button">
              Clear Default
            </button>
          )}
        </div>
      </div>

      <div className="manual-inspect-section">
        <h4 id="manual-inspect-heading">Manually Inspect Specific URL:</h4>
        <div className="manual-inspect-controls">
          <input
            type="url"
            value={manualUrlInput}
            onChange={(e) => onManualUrlInputChange(e.target.value)}
            onKeyDown={handleManualInputKeyDown}
            placeholder="e.g., https://example.com/?param=value#hash"
            aria-labelledby="manual-inspect-heading"
            aria-label="URL to inspect manually" 
            className="manual-url-input"
          />
          <button onClick={handleManualInspectClick} className="inspect-url-button">
            Inspect URL
          </button>
        </div>
      </div>

      {historyLength > 0 && (
        <button onClick={onClearHistory} className="clear-history-button" aria-label="Clear all redirect history">
          Clear History ({historyLength})
        </button>
      )}
    </header>
  );
}

export default AppHeader;