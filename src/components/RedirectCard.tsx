/**
 * @license
 * SPDX-License-Identifier: MIT
 */
import type { KeyValue, RedirectData } from '../types'; // Corrected path
import { useCopyToClipboard } from '../useCopyToClipboard'; // Corrected path
import ParamsGrid from './ParamsGrid'; // Corrected path
import DataBlock from './DataBlock'; // Corrected path

// Helper function to format query params as JSON string
const formatQueryParamsAsJson = (queryParams: KeyValue[]): string => {
  const jsonObj: {[key: string]: string} = {};
  queryParams.forEach(param => {
    jsonObj[param.key] = param.value;
  });
  return JSON.stringify(jsonObj, null, 2);
};

interface RedirectCardProps {
  data: RedirectData;
}

function RedirectCard({ data }: RedirectCardProps) {
  const [isParamsCopied, copyParamsJson] = useCopyToClipboard();

  const handleCopyParams = () => {
    copyParamsJson(formatQueryParamsAsJson(data.queryParams));
  };

  const formattedTimestamp = new Date(data.timestamp).toLocaleString();

  return (
    <article className="redirect-card" aria-labelledby={`redirect-card-heading-${data.id}`}>
      <h3 id={`redirect-card-heading-${data.id}`} className="card-timestamp">
        Logged: {formattedTimestamp}
      </h3>
      
      <DataBlock
        title="Full URL"
        dataId={`full-url-${data.id}`}
        content={data.fullUrl}
        copyButtonLabel="Copy URL"
        copiedButtonLabel="URL Copied!"
      />

      <section aria-labelledby={`query-params-heading-${data.id}`}>
        <h4 id={`query-params-heading-${data.id}`}>Query Parameters</h4>
        <ParamsGrid params={data.queryParams} />
        {data.queryParams.length > 0 && (
          <button
            onClick={handleCopyParams}
            aria-live="polite"
            aria-describedby={isParamsCopied ? `queryParams-${data.id}-copied-feedback` : undefined}
          >
            {isParamsCopied ? 'Params Copied! (JSON)' : 'Copy Params (JSON)'}
          </button>
        )}
        {isParamsCopied && <span id={`queryParams-${data.id}-copied-feedback`} className="visually-hidden">Query parameters copied to clipboard as JSON.</span>}
      </section>

      <DataBlock
        title="URL Fragment (Hash)"
        dataId={`fragment-${data.id}`}
        content={data.fragment}
        emptyContentMessage="No fragment found for this entry."
        copyButtonLabel="Copy Fragment"
        copiedButtonLabel="Fragment Copied!"
      />
    </article>
  );
}

export default RedirectCard;