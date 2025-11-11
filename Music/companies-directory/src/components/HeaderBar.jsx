import React from 'react'
import {
  AppBar, Toolbar, IconButton, Typography, Box, TextField,
  InputAdornment, FormControl, Select, MenuItem, useMediaQuery,
  Button
} from '@mui/material'
import { FilterAlt, Search as SearchIcon } from '@mui/icons-material'
import { useTheme } from '@mui/material/styles'

export default function HeaderBar({ query, onQueryChange, sortBy, onSortByChange, onOpenFilters }) {
  const theme = useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <AppBar position="sticky" sx={{ bgcolor: '#1E2A5E', color: '#FFFFFF' }}>
      <Toolbar sx={{ flexDirection: isSmall ? 'column' : 'row', alignItems: isSmall ? 'flex-start' : 'center', gap: 2, py: isSmall ? 2 : 0 }}>
        
       
        <Box display="flex" alignItems="center" sx={{ flexGrow: 1 }}>
          <Box
            component="img"
            src="../../public/logo-3.png"
            alt="Logo"
            sx={{
              height: 50,
              width: 50,
              borderRadius: '8px',
              mr: 1.5,
              objectFit: 'contain'
            }}
          />
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            Companies Directory
          </Typography>
        </Box>

       
        <Box
          sx={{
            display: 'flex',
            flexDirection: isSmall ? 'column' : 'row',
            gap: 1.5,
            width: isSmall ? '100%' : 'auto',
            alignItems: isSmall ? 'stretch' : 'center'
          }}
        >
       
          <TextField
            size="small"
            fullWidth
            placeholder="Search companies, industry, location..."
            value={query}
            onChange={e => onQueryChange(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: '#FFFFFF' }} />
                </InputAdornment>
              )
            }}
            sx={{
              width: isSmall ? '100%' : 340,
              '& .MuiInputBase-input': { color: '#FFFFFF' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#FFFFFF' },
                '&:hover fieldset': { borderColor: '#FFFFFF' },
                '&.Mui-focused fieldset': { borderColor: '#FFFFFF' },
              },
              '& .MuiInputBase-input::placeholder': { color: '#FFFFFF', opacity: 0.8 },
            }}
          />

          <FormControl
            size="small"
            sx={{
              minWidth: 160,
              '& .MuiOutlinedInput-notchedOutline': { borderColor: '#FFFFFF' },
              '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#FFFFFF' },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#FFFFFF' },
              '& .MuiSelect-select': { color: '#FFFFFF' },
              '& .MuiSvgIcon-root': { color: '#FFFFFF' },
              width: isSmall ? '100%' : 'auto',
            }}
          >
            <Select value={sortBy} onChange={e => onSortByChange(e.target.value)}>
              <MenuItem value="name-asc">Name: A → Z</MenuItem>
              <MenuItem value="name-desc">Name: Z → A</MenuItem>
              <MenuItem value="employees-asc">Employees ↑</MenuItem>
              <MenuItem value="employees-desc">Employees ↓</MenuItem>
            </Select>
          </FormControl>

          
          {isSmall ? (
  <Button
    variant="outlined"
    onClick={onOpenFilters}
    startIcon={<FilterAlt />}
    sx={{
      color: '#FFFFFF',
      borderColor: '#FFFFFF',
      textTransform: 'none',
      '&:hover': {
        borderColor: '#FFFFFF',
        backgroundColor: 'rgba(255,255,255,0.1)',
      },
    }}
  >
    Filters
  </Button>
) : (
  <IconButton edge="end" onClick={onOpenFilters} sx={{ color: '#FFFFFF' }}>
    <FilterAlt />
  </IconButton>
)}

        </Box>
      </Toolbar>
    </AppBar>
  )
}
