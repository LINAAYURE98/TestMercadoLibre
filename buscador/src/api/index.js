
export async function searchItems(q = '') {
  const res = await fetch(`/api/items?q=${encodeURIComponent(q)}`)
  if (!res.ok) throw new Error('Error fetching search results')
  return res.json()
}

export async function getItem(id) {
  const res = await fetch(`/api/items/${id}`)
  if (!res.ok) {
    if (res.status === 404) throw new Error('Item not found')
    throw new Error('Error fetching item')
  }
  return res.json()
}

export async function multiget(ids = []) {
  const res = await fetch('/api/items/multiget', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ids })
  })
  if (!res.ok) throw new Error('Error fetching items')
  return res.json()
}
