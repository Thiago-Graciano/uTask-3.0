import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import { useTheme } from '../../contexts/ThemeContext'
import { useKanbanTasks } from '../../hooks/useKanbanTasks'

import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import FraseDoDia from '../../components/FraseDoDia/FraseDoDia'
import TaskModal from '../../components/TaskModal/TaskModal'
import KanbanBoard from '../../components/KanbanBoard/KanbanBoard'

import type { MoveDirection, Task, TaskStatus } from '../../types/task'

import './Kanban.css'

const COLUMNS: Array<{ key: TaskStatus; label: string }> = [
  { key: 'todo', label: 'A fazer' },
  { key: 'doing', label: 'Em andamento' },
  { key: 'done', label: 'Feito' },
]

function Kanban() {
  const { theme } = useTheme()
  const navigate = useNavigate()

  const {
    tasks,
    createTask,
    editTask,
    deleteTask,
    moveTask,
    handleDragEnd,
  } = useKanbanTasks()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newDescription, setNewDescription] = useState('')

  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [editTitle, setEditTitle] = useState('')
  const [editDescription, setEditDescription] = useState('')

  const [openMenuId, setOpenMenuId] = useState<string | null>(null)
  const [expandedDescIds, setExpandedDescIds] = useState<string[]>([])
  const [activeColumn, setActiveColumn] = useState(0)

  useEffect(() => {
    const token = localStorage.getItem('@uTask:token')

    if (!token) {
      navigate('/')
    }
  }, [navigate])

  const handleCreateTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const created = await createTask(newTitle, newDescription)

    if (created) {
      setNewTitle('')
      setNewDescription('')
      setIsModalOpen(false)
    }
  }

  const handleEditTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const updated = await editTask(editingTask, editTitle, editDescription)

    if (updated) {
      setEditingTask(null)
    }
  }

  const handleDelete = async (taskId: string) => {
    const deleted = await deleteTask(taskId)

    if (deleted) {
      setOpenMenuId(null)
    }
  }

  const handleMove = (task: Task, direction: MoveDirection) => {
    moveTask(task, direction)
  }

  const handleOpenEdit = (task: Task) => {
    setEditingTask(task)
    setEditTitle(task.title)
    setEditDescription(task.description || '')
    setOpenMenuId(null)
  }

  const toggleMenu = (taskId: string) => {
    setOpenMenuId((prev) => (prev === taskId ? null : taskId))
  }

  const toggleDescription = (taskId: string) => {
    setExpandedDescIds((prev) =>
      prev.includes(taskId)
        ? prev.filter((id) => id !== taskId)
        : [...prev, taskId],
    )
  }

  return (
    <div className={`KanbanPage ${theme}`}>
      <Toaster position="top-right" />

      <Header variant="full" />

      <main className="KanbanMain">
        <div className="fraseDoDia">
          <FraseDoDia />
        </div>

        <KanbanBoard
          columns={COLUMNS}
          tasks={tasks}
          theme={theme}
          activeColumn={activeColumn}
          openMenuId={openMenuId}
          expandedDescIds={expandedDescIds}
          onDragEnd={handleDragEnd}
          onPreviousColumn={() => setActiveColumn((prev) => Math.max(0, prev - 1))}
          onNextColumn={() =>
            setActiveColumn((prev) => Math.min(COLUMNS.length - 1, prev + 1))
          }
          onAddTask={() => setIsModalOpen(true)}
          onToggleMenu={toggleMenu}
          onToggleDescription={toggleDescription}
          onEdit={handleOpenEdit}
          onDelete={handleDelete}
          onMove={handleMove}
        />
      </main>

      <Footer />

      {isModalOpen && (
        <TaskModal
          title="Nova Task"
          titleValue={newTitle}
          descriptionValue={newDescription}
          submitLabel="Criar task"
          onTitleChange={setNewTitle}
          onDescriptionChange={setNewDescription}
          onSubmit={handleCreateTask}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      {editingTask && (
        <TaskModal
          title="Editar Task"
          titleValue={editTitle}
          descriptionValue={editDescription}
          submitLabel="Salvar alterações"
          onTitleChange={setEditTitle}
          onDescriptionChange={setEditDescription}
          onSubmit={handleEditTask}
          onClose={() => setEditingTask(null)}
        />
      )}
    </div>
  )
}

export default Kanban