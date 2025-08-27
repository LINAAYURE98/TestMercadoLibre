import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { searchItems } from '../api'
import ItemCard from '../components/ItemCard'

export default function SearchResults() {
  const [searchParams] = useSearchParams()
  const q = searchParams.get('search') || ''
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true

    async function load() {
      setLoading(true)
      setError(null)
      try {
        const res = await searchItems(q)
        if (mounted) setData(res)
      } catch (err) {
        if (mounted) setError(err.message)
      } finally {
        if (mounted) setLoading(false)
      }
    }

    if (q) load()
    else setData(null)

    return () => { mounted = false }
  }, [q])

  return (
    <section className="results">
      {q ? <h2>Resultados para “{q}”</h2> : <h2>Buscar productos</h2>}

      {loading && <p>Cargando...</p>}
      {error && <p className="error">Error: {error}</p>}

      {data && (
        <>
          {data.categories && <nav className="breadcrumb">{data.categories.join(' › ')}</nav>}
          {data.items.length > 0 ? (
            <div className="items-search">
              {data.items.map(item => <ItemCard key={item.id} item={item} />)}
            </div>
          ) : (
            <p className="no-results">Ups! No se encontraron resultados con tu búsqueda.</p>
          )}
        </>
      )}

    </section>
  )
}
