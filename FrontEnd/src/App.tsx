import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login/Login'
import Cadastro from './pages/Cadastro/Cadastro'
import Kanban from './pages/Kanban/Kanban'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/kanban" element={<Kanban />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App