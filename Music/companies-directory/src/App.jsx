import React, { useEffect, useMemo, useState } from 'react'
import { Container, Box, Grid, Typography, Button } from '@mui/material'

import HeaderBar from './components/HeaderBar'
import DrawerFilters from './components/DrawerFilters'
import FilterChips from './components/FilterChips'
import CompanyGrid from './components/CompanyGrid'
import LoadingDots from './components/LoadingDots'
const INITIAL_VISIBLE = 6
const LOAD_STEP = 6

export default function App() {

  const [companies, setCompanies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [query, setQuery] = useState('')
  const [sortBy, setSortBy] = useState('name-asc')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE)
  const [loadingMore, setLoadingMore] = useState(false)

 const [industry, setIndustry] = useState([]) 
const [location, setLocation] = useState([])
const [ratingFilters, setRatingFilters] = useState({
  5: false,
  4: false,
  3: false,
  2: false,
  1: false
})


  const [statusFilters, setStatusFilters] = useState({ Failed:false, Passed:false, Skipped:false, Error:false })

  useEffect(() => {
    setLoading(true)
    fetch('/companies.json')
      .then(res => { if (!res.ok) throw new Error('Failed to load'); return res.json() })
      .then(data => { setCompanies(data); setLoading(false) })
      .catch(err => { setError(err.message); setLoading(false) })
  }, [])

const industries = useMemo(
  () => Array.from(new Set(companies.map(c => c.industry).filter(Boolean))),
  [companies]
)

const locations = useMemo(
  () => Array.from(new Set(companies.map(c => c.location).filter(Boolean))),
  [companies]
)

  const filtered = useMemo(() => {
    console.log(ratingFilters)
    let out = companies.slice()
    if (query.trim()) {
      const q = query.toLowerCase()
      out = out.filter(c =>
        (c.name || '').toLowerCase().includes(q) ||
        (c.industry || '').toLowerCase().includes(q) ||
        (c.location || '').toLowerCase().includes(q)
      )
    }
   if (industry.length > 0)
  out = out.filter(c => industry.includes(c.industry))
if (location.length > 0)
  out = out.filter(c => location.includes(c.location))
 if (Object.values(ratingFilters).some(Boolean)) {
  console.log(ratingFilters)
    const selectedStars = Object.keys(ratingFilters)
      .filter(k => ratingFilters[k])
      .map(k => Number(k)) 

    out = out.filter(c => {
      const star = Math.floor(Number(c.rating) || 0) 
      return selectedStars.includes(star)
    })
  }

    if (sortBy === 'name-asc') out.sort((a,b) => a.name.localeCompare(b.name))
    else if (sortBy === 'name-desc') out.sort((a,b) => b.name.localeCompare(a.name))
    else if (sortBy === 'employees-asc') out.sort((a,b) => a.employees - b.employees)
    else if (sortBy === 'employees-desc') out.sort((a,b) => b.employees - a.employees)

    return out
  }, [companies, query, industry, location,ratingFilters, statusFilters, sortBy])

 
  useEffect(() => setVisibleCount(INITIAL_VISIBLE), [query, industry, location, statusFilters, sortBy])

  const visible = useMemo(() => filtered.slice(0, visibleCount), [filtered, visibleCount])
  const hasMore = visibleCount < filtered.length

  const handleLoadMore = () => {
    setLoadingMore(true)
    setTimeout(() => {
      setVisibleCount(prev => Math.min(prev + LOAD_STEP, filtered.length))
      setLoadingMore(false)
    }, 550)
  }

  const exportCsv = () => {
    const rows = filtered.map(c => [c.name, c.industry, c.location, c.employees, c.website])
    const header = ['Name','Industry','Location','Employees','Website']
    const csv = [header, ...rows].map(r => r.map(cell => `"${String(cell).replace(/"/g,'""')}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'companies.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleClearChip = (key) => {
  if (key === 'query') {
    setQuery('')
    return
  }

  if (key.startsWith('industry:')) {
    const value = key.split(':')[1]
    setIndustry(prev => prev.filter(v => v !== value))
    return
  }

  if (key.startsWith('location:')) {
    const value = key.split(':')[1]
    setLocation(prev => prev.filter(v => v !== value))
    return
  }

  if (key.startsWith('rating:')) {
    const value = key.split(':')[1]
    const num = Number(value)
    setRatingFilters(prev => ({ ...prev, [num]: false }))
    return
  }

 
  if (key.startsWith('status-')) {
    const st = key.split('-')[1]
    setStatusFilters(prev => ({ ...prev, [st]: false }))
    return
  }
}



const handleClearAll = () => {
  setQuery('')
  setIndustry([])
  setLocation([])
  setRatingFilters({ 1: false, 2: false, 3: false, 4: false, 5: false })
}


  return (
    <>
      <HeaderBar
        query={query} onQueryChange={setQuery}
        sortBy={sortBy} onSortByChange={setSortBy}
        onExport={exportCsv}
        onOpenFilters={() => setDrawerOpen(true)}
      />

      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Box sx={{ mb: 2 }}>
          <FilterChips
  query={query}
  industry={industry}
  location={location}
  ratingFilters={ratingFilters}
  onClear={handleClearChip}
  onClearAll={handleClearAll}
/>

        </Box>

        {loading && <LoadingDots text="Loading companies" size="large" />}


        {error && <Typography color="error">{error}</Typography>}

       {!loading && !error && filtered.length === 0 && (
  <Box
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    sx={{
      py: 8,
      opacity: 0.85,
      textAlign: 'center',
      color: 'text.secondary',
    }}
  >
    <Box
      component="img"
      src="../no-results.jpg" 
      alt="No results"
      sx={{
        width: 160,
        height: 'auto',
        mb: 2,
        opacity: 0.8,
      }}
    />
    <Typography variant="h6" fontWeight={600}>
      No companies found
    </Typography>
    <Typography variant="body2" sx={{ mt: 0.5 }}>
      Try adjusting your filters or search criteria.
    </Typography>
  </Box>
)}


        {!loading && !error && filtered.length > 0 && (
  <CompanyGrid companies={filtered} initialCount={8} loadStep={8} />
)}
      </Container>

      <DrawerFilters
  open={drawerOpen}
  onClose={() => setDrawerOpen(false)}
  industry={industry}
  onIndustryChange={setIndustry}
  industries={industries}
  location={location}
  onLocationChange={setLocation}
  locations={locations}
  ratingFilters={ratingFilters}
  onRatingChange={setRatingFilters}
/>

    </>
  )
}
