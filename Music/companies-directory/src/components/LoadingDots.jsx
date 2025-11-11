import React from 'react'
import { Box, Typography } from '@mui/material'

export default function LoadingDots({ text = 'Loading', size = 'medium' }) {

  const dotAnim = {
    '@keyframes bounce': {
      '0%': { transform: 'translateY(0)', opacity: 0.25 },
      '50%': { transform: 'translateY(-6px)', opacity: 1 },
      '100%': { transform: 'translateY(0)', opacity: 0.25 },
    }
  }

  const dotStyle = {
    width: size === 'large' ? 12 : 8,
    height: size === 'large' ? 12 : 8,
    borderRadius: '50%',
    bgcolor: 'text.primary',
    display: 'inline-block',
    mx: 0.5,
  }

  return (
    <Box
      role="status"
      aria-live="polite"
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 6 }}
    >
      <Typography variant={size === 'large' ? 'h6' : 'body1'} sx={{ mb: 1 }}>
        {text}
        <Typography component="span" sx={{ color: 'text.secondary' }}> . . .</Typography>
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ ...dotAnim }}>
          <Box sx={{ ...dotStyle, animation: 'bounce 900ms infinite ease-in-out', animationDelay: '0ms' }} />
        </Box>
        <Box sx={{ ...dotAnim }}>
          <Box sx={{ ...dotStyle, animation: 'bounce 900ms infinite ease-in-out', animationDelay: '150ms' }} />
        </Box>
        <Box sx={{ ...dotAnim }}>
          <Box sx={{ ...dotStyle, animation: 'bounce 900ms infinite ease-in-out', animationDelay: '300ms' }} />
        </Box>
      </Box>
    </Box>
  )
}
