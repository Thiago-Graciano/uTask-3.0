import { useCallback, useEffect, useState } from 'react'
import type { DropResult } from '@hello-pangea/dnd'
import toast from 'react-hot-toast'

import { api } from '../services/api'
import { reorderTasks } from '../utils/reorderTasks'
import type { MoveDirection, Task, TaskStatus } from '../types/task'

const STATUS_ORDER: TaskStatus[] = ['todo', 'doing', 'done']

export function useKanbanTasks() {
  const [tasks, setTasks] = useState<Task[]>([])

  const fetchTasks = useCallback(async () => {
    try {
      const { data } = await api.get<Task[]>('/tasks')
      setTasks(data)
    } catch {
      toast.error('Erro ao carregar tarefas')
    }
  }, [])

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  async function createTask(title: string, description: string) {
    if (!title.trim()) {
      toast.error('O título é obrigatório')
      return false
    }

    try {
      const todoTasks = tasks.filter((task) => task.status === 'todo')

      await api.post('/tasks', {
        title,
        description,
        order: todoTasks.length,
      })

      toast.success('Task criada!')
      fetchTasks()

      return true
    } catch {
      toast.error('Erro ao criar task')
      return false
    }
  }

  async function editTask(task: Task | null, title: string, description: string) {
    if (!task) return false

    if (!title.trim()) {
      toast.error('O título é obrigatório')
      return false
    }

    try {
      await api.patch(`/tasks/${task.id}`, {
        status: task.status,
        title,
        description,
      })

      toast.success('Task atualizada!')
      fetchTasks()

      return true
    } catch {
      toast.error('Erro ao atualizar task')
      return false
    }
  }

  async function deleteTask(taskId: string) {
    try {
      await api.delete(`/tasks/${taskId}`)

      toast.success('Task excluída!')
      fetchTasks()

      return true
    } catch {
      toast.error('Erro ao excluir task')
      return false
    }
  }

  async function moveTask(task: Task, direction: MoveDirection) {
    const currentIndex = STATUS_ORDER.indexOf(task.status)

    const newIndex =
      direction === 'reset'
        ? 0
        : direction === 'forward'
          ? currentIndex + 1
          : currentIndex - 1

    if (newIndex < 0 || newIndex >= STATUS_ORDER.length) {
      return
    }

    const newStatus = STATUS_ORDER[newIndex]

    const destinationTasks = tasks.filter((item) => item.status === newStatus)

    const newOrder = destinationTasks.length

    setTasks((prev) =>
      prev.map((item) =>
        item.id === task.id
          ? {
              ...item,
              status: newStatus,
              order: newOrder,
            }
          : item,
      ),
    )

    try {
      await api.patch(`/tasks/${task.id}`, {
        status: newStatus,
        order: newOrder,
      })
    } catch {
      toast.error('Erro ao mover task')
      fetchTasks()
    }
  }

  async function handleDragEnd(result: DropResult) {
    const reordered = reorderTasks(tasks, result)

    if (!reordered) return

    setTasks(reordered.updatedTasks)

    try {
      await api.put('/tasks/reorder', {
        tasks: reordered.tasksToUpdate.map((task) => ({
          id: task.id,
          status: task.status,
          order: task.order,
        })),
      })
    } catch {
      toast.error('Erro ao reordenar task')
      fetchTasks()
    }
  }

  return {
    tasks,
    fetchTasks,
    createTask,
    editTask,
    deleteTask,
    moveTask,
    handleDragEnd,
  }
}