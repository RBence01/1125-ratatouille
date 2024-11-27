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
<<<<<<< HEAD
          <Route path='list' element={<Listing searchOn orderOn pagesOn/>} />
=======
          <Route path='list' element={<Listing/>} />
          <Route path='search' element={<Listing searchOn/>} />
          <Route path='order' element={<Listing orderOn/>} />
          <Route path='pages' element={<Listing pagesOn/>} />
          <Route path='delete' element={<Listing deleteOn/>} />
>>>>>>> 1c52b19a1579f340dc0323c906ce2571a73978c9
        </Route>
    </Routes>
    </BrowserRouter>
  </StrictMode>,
)
