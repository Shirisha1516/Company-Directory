import React from 'react'
import {
  Card, CardContent, CardMedia, Box, Typography, Chip,
  Link, Stack, Rating, Button, Divider
} from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import BusinessIcon from '@mui/icons-material/Business'
import GroupIcon from '@mui/icons-material/Group'

export default function CompanyCard({ company }) {
  const { name, industry, location, employees, website, image, rating } = company
  const img = image || '/company-placeholder.png'

  return (
    <Card
      variant="outlined"
      sx={{
        height: 340,
        width: 260,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 2,
        boxShadow: 1,
        overflow: 'hidden',
        transition: 'transform .12s ease-in-out',
        '&:hover': { transform: 'translateY(-6px)', boxShadow: 4 },
      }}
    >
     
      <CardMedia
        component="img"
        height="140"
        image={img}
        alt={name}
        sx={{
          objectFit: 'cover',
          width: '100%',
        }}
      />

      <CardContent
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: 1,
        }}
      >
      
        <Box>
          <Typography variant="subtitle1" fontWeight={700} noWrap title={name}>
            {name}
          </Typography>

         
          <Stack direction="row" spacing={0.5} alignItems="center" flexWrap="wrap">
            <BusinessIcon fontSize="small" sx={{ color: 'blue' }} />
            <Typography variant="caption" color="text.secondary" noWrap>
              {industry}
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ mx: 0.5 }}>
              •
            </Typography>
            <LocationOnIcon fontSize="small" sx={{ color: 'red' }} />
            <Typography variant="caption" color="text.secondary" noWrap>
              {location}
            </Typography>
          </Stack>
        </Box>

        <Divider />

      
        <Stack direction="row" spacing={1} alignItems="center">
          <Rating value={rating || 0} precision={0.5} size="small" readOnly />
          <Typography variant="body2" color="text.secondary">
            ({rating ? rating.toFixed(1) : '0.0'})
          </Typography>

          <Stack direction="row" alignItems="center" sx={{ ml: 'auto' }}>
            <Chip
  icon={<GroupIcon fontSize="small" sx={{ color: 'inherit' }} />}
  label={`${employees}`}
  size="small"
  sx={{
    ml: 'auto',
    backgroundColor: '#B7E5CD',
    fontWeight: 500,
    borderRadius: '6px',       
    '& .MuiChip-icon': {
      marginLeft: '4px',        
      marginRight: '-4px',     
    },
  }}
/>

          </Stack>
        </Stack>

     
        <Box mt={1}>
          <Button
            size="small"
            variant="contained"
            component={Link}
            href={website}
            target="_blank"
            rel="noopener"
            sx={{
              backgroundColor: '#00809D',
              textTransform: 'none',
              '&:hover': { backgroundColor: '#006E87' },
            }}
          >
            Visit
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}
