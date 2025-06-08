/**
 * @license
 * SPDX-License-Identifier: MIT
 */
import React from 'react';
import { useCopyToClipboard } from '../useCopyToClipboard';

interface AppHeaderProps {
  currentUri: string;
  historyLength: number;
  onClearHistory: () => void;
  manualUrlInput: string;
  onManualUrlInputChange: (value: string) => void;
  onInspectManualUrl: (url: string) => void;
}

function AppHeader({
  currentUri,
  historyLength,
  onClearHistory,
  manualUrlInput,
  onManualUrlInputChange,
  onInspectManualUrl
}: AppHeaderProps) {
  const [isUriCopied, copyUri] = useCopyToClipboard();

  const handleCopyUri = () => {
    copyUri(currentUri);
  };

  const handleManualInspectClick = () => {
    onInspectManualUrl(manualUrlInput);
  };
  
  const handleManualInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleManualInspectClick();
    }
  };

  return (
    <header>
      <h1>Redirect History Inspector</h1>
      <p className="subtitle">View history of data passed to this page via URL, or manually inspect any URL.</p>

      <div className="current-uri-section">
        <h4>Currently Inspecting Page URI:</h4>
        <pre className="code-block" aria-label="Current page URI">{currentUri}</pre>
        <button
          onClick={handleCopyUri}
          aria-live="polite"
          aria-describedby={isUriCopied ? "uri-copied-feedback" : undefined}
        >
          {isUriCopied ? 'Copied!' : 'Copy URI'}
        </button>
        {isUriCopied && <span id="uri-copied-feedback" className="visually-hidden">URI copied to clipboard.</span>}
      </div>

      <div className="manual-inspect-section">
        <h4 id="manual-inspect-heading">Manually Inspect URL:</h4>
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