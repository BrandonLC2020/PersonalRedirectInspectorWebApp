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
}

function AppHeader({ currentUri, historyLength, onClearHistory }: AppHeaderProps) {
  const [isUriCopied, copyUri] = useCopyToClipboard();

  const handleCopyUri = () => {
    copyUri(currentUri);
  };

  return (
    <header>
      <h1>Redirect History Inspector</h1>
      <p className="subtitle">View history of data passed to this page via URL.</p>

      <div className="current-uri-section">
        <h4>Currently Inspecting URI:</h4>
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

      {historyLength > 0 && (
        <button onClick={onClearHistory} className="clear-history-button" aria-label="Clear all redirect history">
          Clear History
        </button>
      )}
    </header>
  );
}

export default AppHeader;