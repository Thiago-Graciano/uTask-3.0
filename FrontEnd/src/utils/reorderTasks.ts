import type { DropResult } from '@hello-pangea/dnd'
import type { Task } from '../types/task'

export function reorderTasks(tasks: Task[], result: DropResult) {
  const { destination, source, draggableId } = result

  if (!destination) {
    return null
  }

  if (
    destination.droppableId === source.droppableId &&
    destination.index === source.index
  ) {
    return null
  }

  const sourceStatus = source.droppableId as Task['status']
  const destinationStatus = destination.droppableId as Task['status']

  const movingTask = tasks.find(task => task.id === draggableId)

  if (!movingTask) {
    return null
  }

  const sourceTasks = tasks
    .filter(task => task.status === sourceStatus)
    .sort((a, b) => a.order - b.order)

  const destinationTasks = tasks
    .filter(task => task.status === destinationStatus)
    .sort((a, b) => a.order - b.order)

  let tasksToUpdate: Task[] = []

  if (sourceStatus === destinationStatus) {
    const reorderedTasks = [...sourceTasks]

    const [removedTask] = reorderedTasks.splice(source.index, 1)

    reorderedTasks.splice(destination.index, 0, removedTask)

    tasksToUpdate = reorderedTasks.map((task, index) => ({
      ...task,
      order: index,
    }))
  } else {
    const newSourceTasks = sourceTasks
      .filter(task => task.id !== draggableId)
      .map((task, index) => ({
        ...task,
        order: index,
      }))

    const newDestinationTasks = [...destinationTasks]

    newDestinationTasks.splice(destination.index, 0, {
      ...movingTask,
      status: destinationStatus,
    })

    const reorderedDestinationTasks = newDestinationTasks.map((task, index) => ({
      ...task,
      status: destinationStatus,
      order: index,
    }))

    tasksToUpdate = [...newSourceTasks, ...reorderedDestinationTasks]
  }

  const updatedTasks = tasks.map(task => {
    const updatedTask = tasksToUpdate.find(item => item.id === task.id)

    return updatedTask || task
  })

  return {
    updatedTasks,
    tasksToUpdate,
  }
}