import React, { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

export default function SearchBox() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const qInitial = searchParams.get('search') || ''
  const [value, setValue] = useState(qInitial)

  function onSubmit(e) {
    e.preventDefault()
    const trimmed = value.trim()
    if (!trimmed) return navigate('/items')
    navigate(`/items?search=${encodeURIComponent(trimmed)}`)
  }

  return (
    <form className="searchbox" onSubmit={onSubmit}>
      <input className='searchbox-input'
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Buscar productos..."
        aria-label="Buscar productos"
      />
      <button type="submit" className='searchbox-button'><img src='/assets/icon_search.png'/></button>
    </form>
  )
}
