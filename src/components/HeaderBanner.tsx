/**
 * @license
 * SPDX-License-Identifier: MIT
 */
import React from 'react';
import { Box, Typography } from '@mui/material';

function HeaderBanner() {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        p: { xs: 2, sm: 3 },
        mb: 4,
        background: 'linear-gradient(90deg, #F8F9FA 0%, #E9ECEF 100%)',
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Box sx={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img src="public/icons/app-icon.svg" alt="Redirect URI Inspector Logo" width="120" height="120" />
      </Box>
      <Box sx={{ ml: { xs: 2, sm: 3 } }}>
        <Typography 
          variant="h4" 
          component="h1" 
          fontWeight="bold" 
          color="#212529"
          sx={{ typography: { xs: 'h5', sm: 'h4' } }}
        >
          Redirect URI Inspector
        </Typography>
        <Typography 
          variant="subtitle1" 
          component="p" 
          color="#495057"
          sx={{ typography: { xs: 'body1', sm: 'subtitle1' } }}
        >
          Inspect, Debug, and Log URL Data
        </Typography>
      </Box>
    </Box>
  );
}

export default HeaderBanner;