/**
 * @license
 * SPDX-License-Identifier: MIT
 */
import { useCopyToClipboard } from '../useCopyToClipboard';
import { Box, Typography, Paper, Button } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';


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
            startIcon={<ContentCopyIcon />}
            aria-live="polite"
            aria-describedby={isCopied ? `${dataId}-copied-feedback` : undefined}
          >
            {isCopied ? copiedButtonLabel : copyButtonLabel}
          </Button>
          {isCopied && <span id={`${dataId}-copied-feedback`} className="visually-hidden">Content copied to clipboard.</span>}
        </>
      ) : (
        <Typography color="text.secondary">{emptyContentMessage}</Typography>
      )}
    </Box>
  );
}

export default DataBlock;