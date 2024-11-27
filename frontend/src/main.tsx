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
          <Route path='list' element={<Listing/>} />
          <Route path='search' element={<Listing searchOn/>} />
          <Route path='order' element={<Listing orderOn/>} />
          <Route path='pages' element={<Listing pagesOn/>} />
          <Route path='delete' element={<Listing deleteOn/>} />
          <Route path='switch' element={<Listing switchOn/>} />
          <Route path='edit' element={<Listing editOn/>} />
          <Route path='plusminus' element={<Listing plusMinusOn/>} />
        </Route>
    </Routes>
    </BrowserRouter>
  </StrictMode>,
)
