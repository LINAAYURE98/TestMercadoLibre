import React from 'react'
import { Link } from 'react-router-dom'

export default function ItemCard({ item }) {
  return (
    <article className="item-card">
      <Link to={`/items/${item.id}`} className="item-card__thumb">
        <img src={item.picture} title={item.title} />
      </Link>
      <div className="item-card__body">
        <div className="item-card__row">
          <strong className="item-card__price">{formatPrice(item.price)}</strong>
          <div className="item-card__condition">{item.condition}</div>
        </div>
        <Link to={`/items/${item.id}`} className="item-card__title">{item.title}</Link>
        {item.free_shipping && <span className="item-card__freeshipping" title="Envío gratis">Envio Gratis</span>}
      </div>
    </article>
  )
}

function formatPrice(price) {
  try {
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency: price.currency }).format(price.amount)
  } catch (e) {
    return `${price.currency} ${price.amount}`
  }
}
