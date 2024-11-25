import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './pages/Layout'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<h1>home</h1>}/>
        </Route>
    </Routes>
    </BrowserRouter>
  </StrictMode>,
)
