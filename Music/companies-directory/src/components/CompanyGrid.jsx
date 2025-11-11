import React, { useEffect, useRef, useState } from 'react'
import { Grid, Box } from '@mui/material'
import CompanyCard from './companyCard'
import LoadingDots from './LoadingDots' 

export default function CompanyGrid({ companies = [], initialCount = 8, loadStep = 8 }) {
  const [visibleCount, setVisibleCount] = useState(initialCount)
  const [loadingMore, setLoadingMore] = useState(false)
  const sentinelRef = useRef(null)

 
  useEffect(() => {
    setVisibleCount(initialCount)
  }, [companies, initialCount])

  const visible = companies.slice(0, visibleCount)
  const hasMore = visibleCount < companies.length

 
  useEffect(() => {
    if (!hasMore) return
    const el = sentinelRef.current
    if (!el) return

    const io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setLoadingMore(true)
         
            const loadTimeout = setTimeout(() => {
              setVisibleCount(prev => Math.min(prev + loadStep, companies.length))
              setLoadingMore(false)
            }, 3000) 

            return () => clearTimeout(loadTimeout)
          }
        })
      },
      { root: null, rootMargin: '200px', threshold: 0.1 }
    )

    io.observe(el)
    return () => io.disconnect()
  }, [hasMore, loadStep, companies.length])

  return (
    <>
      <Grid container spacing={2}>
        {visible.map(c => (
          <Grid item xs={12} sm={6} md={3} key={c.id}>
            <CompanyCard company={c} />
          </Grid>
        ))}
      </Grid>

     
      <div ref={sentinelRef} style={{ height: 1, marginTop: 8 }} />

     
      {loadingMore && (
        <Box display="flex" justifyContent="center" mt={2}>
          <LoadingDots text="Loading more companies" size="large" />
        </Box>
      )}

      <Box height={24} />
    </>
  )
}
