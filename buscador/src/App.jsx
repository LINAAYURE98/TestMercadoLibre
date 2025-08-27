import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import SearchResults from './pages/SearchResults'
import ItemDetail from './pages/ItemDetail'
import SearchBox from './components/SearchBox'

export default function App() {
  return (
    <div className="app">
      <header className="header">
        <div className='header-container'>
          <div className='header-business'>
              <h1 className="header-business__title">Mercado Libre</h1>
              <img className="header-business__logo" src="/assets/Logo-MercadoLibre.png"/>
          </div>
    
          <SearchBox />
        </div>
      </header>

      <main className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/items" replace />} />
          <Route path="/items" element={<SearchResults />} />
          <Route path="/items/:id" element={<ItemDetail />} />
        </Routes>
      </main>
    </div>
  )
}
