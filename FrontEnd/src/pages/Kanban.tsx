// src/pages/Kanban.tsx
import Header from '../components/Header'
import Footer from '../components/Footer'
import FraseDoDia from '../components/FraseDoDia'
import './Kanban.css'

function Kanban() {
  return (
    <div className="KanbanContainer">
      {/* O Kanban usa o Header na versão "full" com o título uTask 3.0 */}
      <Header variant="full" />
      
      <main className="KanbanContent">
        <FraseDoDia />
        <h2>Área do Kanban em construção 🚧</h2>
      </main>

      <Footer />
    </div>
  )
}

export default Kanban;