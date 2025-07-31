/**
 * @license
 * SPDX-License-Identifier: MIT
 */
import React from 'react';
import { useCopyToClipboard } from '../useCopyToClipboard';
import { Box, Paper, TextField, Button, Stack, Chip, Typography } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import HeaderBanner from './HeaderBanner';

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
    if (autoInspectedUri) copyUri(autoInspectedUri);
  };

  const handleManualInspectClick = () => onInspectManualUrl(manualUrlInput);
  const handleSetDefaultUrlClick = () => onSetDefaultCustomUrl(defaultCustomUrlInputValue);

  return (
    <Box component="header">
      <HeaderBanner />

      <Stack spacing={2}>
        <Paper variant="outlined" sx={{ p: 2 }}>
          <Typography variant="h6" component="h2" sx={{ mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
            <img src="/icons/link.svg" alt="Link icon" width="24" height="24" /> Auto-Inspected URI
          </Typography>
          {autoInspectedUri ? (
            <>
              <Paper component="pre" variant="outlined" sx={{ p: 1.5, bgcolor: 'grey.100', overflowX: 'auto', whiteSpace: 'pre-wrap', wordWrap: 'break-word', my: 1 }}>
                {autoInspectedUri}
              </Paper>
              <Button
                size="small"
                variant="outlined"
                startIcon={<img src="/icons/content-copy.svg" alt="Copy icon" width="20" height="20" />}
                onClick={handleCopyUri}
                aria-live="polite"
              >
                {isUriCopied ? 'Copied!' : 'Copy URI'}
              </Button>
              {isUriCopied && <span style={visuallyHidden}>URI copied to clipboard.</span>}
            </>
          ) : (
            <Typography color="text.secondary">No URI auto-inspected yet.</Typography>
          )}
        </Paper>

        <Paper variant="outlined" sx={{ p: 2 }}>
          <Typography variant="h6" component="h2" sx={{ mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
            <img src="/icons/bookmark-add.svg" alt="Bookmark icon" width="24" height="24" /> Set Default Monitored URL
          </Typography>
          {currentDefaultUrlSet && (
            <Chip label={currentDefaultUrlSet} onDelete={() => onSetDefaultCustomUrl('')} sx={{ mb: 1.5 }} />
          )}
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
            <TextField
              fullWidth
              size="small"
              type="url"
              label="Default URL to monitor"
              value={defaultCustomUrlInputValue}
              onChange={(e) => onDefaultCustomUrlInputChange(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSetDefaultUrlClick()}
              placeholder="e.g., https://my-default.ngrok.app"
            />
            <Button
              variant="contained"
              onClick={handleSetDefaultUrlClick}
            >
              Set Default
            </Button>
          </Stack>
        </Paper>

        <Paper variant="outlined" sx={{ p: 2 }}>
          <Typography variant="h6" component="h2" sx={{ mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
            <img src="/icons/travel-explore.svg" alt="Explore icon" width="24" height="24" /> Manually Inspect URL
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
            <TextField
              fullWidth
              size="small"
              type="url"
              label="URL to inspect"
              value={manualUrlInput}
              onChange={(e) => onManualUrlInputChange(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleManualInspectClick()}
              placeholder="e.g., https://example.com/?param=value#hash"
            />
            <Button
              variant="contained"
              onClick={handleManualInspectClick}
            >
              Inspect URL
            </Button>
          </Stack>
        </Paper>
      </Stack>

      {historyLength > 0 && (
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            color="error"
            onClick={onClearHistory}
            startIcon={<img src="/icons/delete-forever.svg" alt="Delete icon" width="20" height="20" />}
            aria-label="Clear all redirect history"
          >
            Clear History ({historyLength})
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default AppHeader;