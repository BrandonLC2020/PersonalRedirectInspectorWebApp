/**
 * @license
 * SPDX-License-Identifier: MIT
 */
import React from 'react';
import type { KeyValue } from '../types';
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Typography,
  Box,
} from '@mui/material';

interface ParamsGridProps {
  params: KeyValue[];
}

function ParamsGrid({ params }: ParamsGridProps) {
  if (params.length === 0) {
    return <Typography color="text.secondary">No query parameters found for this entry.</Typography>;
  }

  return (
    <TableContainer component={Paper} variant="outlined">
      <Table size="small" aria-label="Query Parameters">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold' }}>Key</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {params.map((param, index) => (
            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                <Box
                  component="pre"
                  sx={{
                    fontFamily: 'monospace',
                    m: 0,
                    p: '2px 6px',
                    bgcolor: 'grey.200',
                    borderRadius: 1,
                    display: 'inline-block',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-all',
                  }}
                >
                  {param.key}
                </Box>
              </TableCell>
              <TableCell>
                <Box
                  component="pre"
                  sx={{
                    fontFamily: 'monospace',
                    m: 0,
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-all',
                  }}
                >
                  {param.value}
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ParamsGrid;
