import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getItem } from '../api'

export default function ItemDetail() {
  const { id } = useParams()
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    async function load() {
      setLoading(true)
      setError(null)
      try {
        const res = await getItem(id)
        if (mounted) setItem(res.item)
      } catch (err) {
        if (mounted) setError(err.message)
      } finally {
        if (mounted) setLoading(false)
      }
    }
    load()
    return () => { mounted = false }
  }, [id])

  if (loading) return <p>Cargando...</p>
  if (error) return <p className="error">Error: {error}</p>
  if (!item) return <p>No se encontró el item</p>

  return (
    <section className="item-detail">
      {item.categories && (
        <div className="breadcrumb">
          {item.categories.join(" > ")}
          {item.title && ` > ${item.title}`}
        </div>
      )}
      <div className="detail-product">
        <img className="detail-product__image" src={item.picture} alt={item.title} />
        <div className="detail-product__info">
            <div className="info__condition">
                <div className="item-card__condition">{item.condition}</div>
                <div className="sold">Vendidos: {item.sold_quantity}</div>
            </div>
            <div className="info__details">
                <h1>{item.title}</h1>
                <div className="price">{formatPrice(item.price)}</div>
                {item.free_shipping && <div className="free-shipping">Envío gratis ⚡︎</div>}
                <a href='#'>Comprar</a>
            </div>
        </div>
        <div className="detail-product__description">
          <h3>Descripción</h3>
          <p>{item.description}</p>
        </div>
      </div>
    </section>
  )
}

function formatPrice(price) {
  try {
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency: price.currency }).format(price.amount)
  } catch (e) {
    return `${price.currency} ${price.amount}`
  }
}
