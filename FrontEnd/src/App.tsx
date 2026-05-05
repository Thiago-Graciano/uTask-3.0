// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Cadastro from './pages/Cadastro'
import Kanban from './pages/Kanban'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        {/* Nova Rota para o Kanban */}
        <Route path="/kanban" element={<Kanban />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App