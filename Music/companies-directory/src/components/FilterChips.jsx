import React from 'react'
import { Stack, Chip, Button, Typography } from '@mui/material'

export default function FilterChips({
  query,
  industry = [],
  location = [],
  ratingFilters = {},
  onClear = () => {},
  onClearAll = () => {}
}) {
  const chips = []


  if (query && String(query).trim() !== '') {
    chips.push({ key: 'query', label: `Search: "${query}"` })
  }

 
  if (Array.isArray(industry) && industry.length > 0) {
    industry.forEach((v) =>
      chips.push({ key: `industry:${v}`, label: `Industry: ${v}` })
    )
  }

  
  if (Array.isArray(location) && location.length > 0) {
    location.forEach((v) =>
      chips.push({ key: `location:${v}`, label: `Location: ${v}` })
    )
  }

 
 Object.entries(ratingFilters).forEach(([key, checked]) => {
  if (checked) {
    const n = Number(key)
    const stars = '★'.repeat(n)
    chips.push({ key: `rating:${n}`, label: stars })
  }
})


 
  if (chips.length === 0) {
    return (
      <Typography variant="body2" color="text.secondary">
       
      </Typography>
    )
  }

  return (
    <Stack
      direction="row"
      spacing={1}
      alignItems="center"
      flexWrap="wrap"
      useFlexGap
    >
      {chips.map((c) => (
        <Chip
          key={c.key}
          label={c.label}
          onDelete={() => onClear(c.key)}
          color="primary"
          variant="outlined"
        />
      ))}
      <Button size="small" onClick={onClearAll}>
        Clear all
      </Button>
    </Stack>
  )
}
