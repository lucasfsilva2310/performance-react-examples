import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="home" element={<Home />} />
        <Route path="/" element={<h1>Hello World</h1>} />
      </Routes>
    </div>
  )
}

export default App
