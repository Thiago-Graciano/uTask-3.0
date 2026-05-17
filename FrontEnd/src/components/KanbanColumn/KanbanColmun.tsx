import { Droppable } from '@hello-pangea/dnd'

import TaskCard from '../TaskCard/TaskCard'

import type { MoveDirection, Task, TaskStatus } from '../../types/task'

import './KanbanColmun.css'

interface KanbanColumnData {
  key: TaskStatus
  label: string
}

interface KanbanColumnProps {
  column: KanbanColumnData
  columnIndex: number
  activeColumn: number
  tasks: Task[]
  theme: 'light' | 'dark'
  openMenuId: string | null
  expandedDescIds: string[]
  onAddTask: () => void
  onToggleMenu: (taskId: string) => void
  onToggleDescription: (taskId: string) => void
  onEdit: (task: Task) => void
  onDelete: (taskId: string) => void
  onMove: (task: Task, direction: MoveDirection) => void
}

function KanbanColumn({
  column,
  columnIndex,
  activeColumn,
  tasks,
  theme,
  openMenuId,
  expandedDescIds,
  onAddTask,
  onToggleMenu,
  onToggleDescription,
  onEdit,
  onDelete,
  onMove,
}: KanbanColumnProps) {
  return (
    <div
      className={`KanbanColumnRoot ${
        activeColumn === columnIndex ? 'KanbanColumnRootActive' : ''
      }`}
    >
      <div className="KanbanColumnHeader">
        <h2 className="KanbanColumnTitle">{column.label}</h2>

        {column.key === 'todo' && (
          <button className="KanbanColumnAddButton" type="button" onClick={onAddTask}>
            +
          </button>
        )}
      </div>

      <Droppable droppableId={column.key}>
        {(provided) => (
          <div
            className={`KanbanColumnContent ${theme}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {tasks.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                index={index}
                theme={theme}
                isMenuOpen={openMenuId === task.id}
                isDescriptionOpen={expandedDescIds.includes(task.id)}
                onToggleMenu={onToggleMenu}
                onToggleDescription={onToggleDescription}
                onEdit={onEdit}
                onDelete={onDelete}
                onMove={onMove}
              />
            ))}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}

export default KanbanColumn