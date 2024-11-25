import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './pages/Layout'
import Listing from './components/Listing'
import { NewData } from './pages/NewData'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<h1>Home</h1>} />
          <Route path='new' element={<NewData/>} />
          <Route path='list' element={<Listing searchOn orderOn pagesOn/>} />
        </Route>
    </Routes>
    </BrowserRouter>
  </StrictMode>,
)
