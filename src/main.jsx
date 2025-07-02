import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import App from './App.jsx'
import Layout from './routes/Layout'
import DetailView from './routes/DetailView'
import NotFound from './routes/NotFound.jsx'

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index={true} element={<App />} />
                    <Route path="coinDetails/:symbol" element={<DetailView />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </StrictMode>
)