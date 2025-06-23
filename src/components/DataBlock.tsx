/**
 * @license
 * SPDX-License-Identifier: MIT
 */
import { useCopyToClipboard } from '../useCopyToClipboard';

interface DataBlockProps {
  title: string;
  dataId: string; // For ARIA labels and unique IDs
  content: string | null | undefined;
  emptyContentMessage?: string;
  copyButtonLabel?: string;
  copiedButtonLabel?: string;
}

function DataBlock({
  title,
  dataId,
  content,
  emptyContentMessage = "No data available.",
  copyButtonLabel = "Copy",
  copiedButtonLabel = "Copied!"
}: DataBlockProps) {
  const [isCopied, copyContent] = useCopyToClipboard();

  const handleCopy = () => {
    if (content) {
      copyContent(content);
    }
  };

  return (
    <section aria-labelledby={`${dataId}-heading`}>
      <h4 id={`${dataId}-heading`}>{title}</h4>
      {content ? (
        <>
          <pre className="code-block" aria-label={`${title} value`}>{content}</pre>
          <button
            onClick={handleCopy}
            aria-live="polite"
            aria-describedby={isCopied ? `${dataId}-copied-feedback` : undefined}
          >
            {isCopied ? copiedButtonLabel : copyButtonLabel}
          </button>
          {isCopied && <span id={`${dataId}-copied-feedback`} className="visually-hidden">Content copied to clipboard.</span>}
        </>
      ) : (
        <p>{emptyContentMessage}</p>
      )}
    </section>
  );
}

export default DataBlock;