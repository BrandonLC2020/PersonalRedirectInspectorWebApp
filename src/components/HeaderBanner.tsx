/**
 * @license
 * SPDX-License-Identifier: MIT
 */

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// CORRECTED IMPORT: Destructure the 'default' export from the imported object and rename it to AppIcon.
import { default as AppIcon } from './app-icon.svg?react';

function HeaderBanner() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        p: 2,
        background: 'linear-gradient(to right, #F8F9FA, #E9ECEF)',
        marginBottom: '2rem',
        borderRadius: 1,
      }}
    >
      {/* This will now render correctly because AppIcon holds the component */}
      <AppIcon
        style={{
          width: '100px',
          height: '100px',
          marginRight: '20px',
        }}
      />

      <Box>
        <Typography variant="h3" component="h1" fontWeight="bold" color="#212529">
          Redirect URI Inspector
        </Typography>
        <Typography variant="h6" component="p" color="#495057">
          Inspect, Debug, and Log URL Data
        </Typography>
      </Box>
    </Box>
  );
}

export default HeaderBanner;