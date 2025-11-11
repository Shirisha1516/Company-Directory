import React from 'react'
import {
  Drawer, Box, Typography, Divider, List, ListItem,
  Button, IconButton, Autocomplete, TextField,
  Stack, FormControlLabel, Checkbox,
  Rating
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

export default function DrawerFilters({
  open, onClose,
  industry, onIndustryChange,
  industries = [],
  location, onLocationChange,
  locations = [],
  ratingFilters = {}, onRatingChange = () => {}
}) {
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 340, p: 2 }}>
       
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h6" fontWeight={700}>Filters</Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider sx={{ mb: 2 }} />

        <List sx={{ p: 0 }}>
        
          <ListItem sx={{ px: 0, mb: 2 }}>
            <Box width="100%">
              <Typography variant="caption" sx={{ mb: 0.5, display: 'block' }}>
                Filter by Industry
              </Typography>
              <Autocomplete
                multiple
                size="small"
                value={industry}
                onChange={(e, newValue) => onIndustryChange(newValue)}
                options={industries}
                getOptionLabel={(option) => option}
                renderInput={(params) => (
                  <TextField {...params} placeholder="Select industries..." />
                )}
              />
            </Box>
          </ListItem>

        
          <ListItem sx={{ px: 0, mb: 2 }}>
            <Box width="100%">
              <Typography variant="caption" sx={{ mb: 0.5, display: 'block' }}>
                Filter by Location
              </Typography>
              <Autocomplete
                multiple
                size="small"
                value={location}
                onChange={(e, newValue) => onLocationChange(newValue)}
                options={locations}
                getOptionLabel={(option) => option}
                renderInput={(params) => (
                  <TextField {...params} placeholder="Select locations..." />
                )}
              />
            </Box>
          </ListItem>

         
          <ListItem sx={{ px: 0, mb: 1 }}>
            <Box width="100%">
              <Typography variant="caption" sx={{ mb: 0.5, display: 'block' }}>
                Filter by Rating
              </Typography>
           
<Stack>
  {[5,4,3,2,1].map(star => (
     <FormControlLabel
      key={star}
      control={
        <Checkbox
          checked={!!ratingFilters[star]}
          onChange={() => onRatingChange(prev => ({ ...prev, [star]: !prev[star] }))}
          icon={<Rating value={star} readOnly size="small" sx={{ opacity: 0.35 }} />}
          checkedIcon={<Rating value={star} readOnly size="small" />}
        />
      }
      label=""
    />
  ))}
</Stack>

            </Box>
          </ListItem>

          
          <ListItem sx={{ px: 0, mt: 2 }}>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => {
                onIndustryChange([])
                onLocationChange([])
                onRatingChange({ 5:false, 4:false, 3:false, 2:false, 1:false })
              }}
            >
              Reset Filters
            </Button>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  )
}
