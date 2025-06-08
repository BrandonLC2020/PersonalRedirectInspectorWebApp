/**
 * @license
 * SPDX-License-Identifier: MIT
 */
import React from 'react';
import type { KeyValue } from '../types'; // Import types

interface ParamsGridProps {
  params: KeyValue[];
}

function ParamsGrid({ params }: ParamsGridProps) {
  if (params.length === 0) {
    return <p>No query parameters found for this entry.</p>;
  }

  return (
    <div className="params-grid" role="table" aria-label="Query Parameters">
      <div role="rowheader" className="grid-header">Key</div>
      <div role="rowheader" className="grid-header">Value</div>
      {params.map((param, index) => (
        <React.Fragment key={index}>
          <div role="cell" className="grid-cell key-cell">
            <pre className="code-block inline">{param.key}</pre>
          </div>
          <div role="cell" className="grid-cell value-cell">
            <pre className="code-block inline">{param.value}</pre>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}

export default ParamsGrid;