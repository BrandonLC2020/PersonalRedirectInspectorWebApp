/**
 * @license
 * SPDX-License-Identifier: MIT
 */
import React from 'react';
import { useCopyToClipboard } from '../useCopyToClipboard';
import { Box, Typography, Paper, Button } from '@mui/material';
import { visuallyHidden } from '@mui/utils';

interface DataBlockProps {
  title: string;
  dataId: string;
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
    <Box component="section" aria-labelledby={`${dataId}-heading`}>
      <Typography variant="h6" component="h4" id={`${dataId}-heading`} gutterBottom>
        {title}
      </Typography>
      {content ? (
        <>
          <Paper component="pre" variant="outlined" sx={{ p: 1.5, bgcolor: 'grey.100', overflowX: 'auto', whiteSpace: 'pre-wrap', wordWrap: 'break-word', my: 1 }}>
            {content}
          </Paper>
          <Button
            size="small"
            variant="outlined"
            onClick={handleCopy}
            startIcon={<img src="/icons/content-copy.svg" alt="Copy icon" width="20" height="20" />}
            aria-live="polite"
            aria-describedby={isCopied ? `${dataId}-copied-feedback` : undefined}
          >
            {isCopied ? copiedButtonLabel : copyButtonLabel}
          </Button>
          {isCopied && <span id={`${dataId}-copied-feedback`} style={visuallyHidden}>Content copied to clipboard.</span>}
        </>
      ) : (
        <Typography color="text.secondary">{emptyContentMessage}</Typography>
      )}
    </Box>
  );
}

export default DataBlock;