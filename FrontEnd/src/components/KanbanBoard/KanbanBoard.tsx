import { DragDropContext } from '@hello-pangea/dnd'
import type { DropResult } from '@hello-pangea/dnd'

import NavigateBefore from '../../assets/navigate_before.svg'
import NavigateNext from '../../assets/navigate_next.svg'

import KanbanColumn from '../KanbanColumn/KanbanColmun'
import './KanbanBoard.css'
import type { MoveDirection, Task, TaskStatus } from '../../types/task'

interface KanbanBoardColumn {
  key: TaskStatus
  label: string
}

interface KanbanBoardProps {
  columns: KanbanBoardColumn[]
  tasks: Task[]
  theme: 'light' | 'dark'
  activeColumn: number
  openMenuId: string | null
  expandedDescIds: string[]
  onDragEnd: (result: DropResult) => void
  onPreviousColumn: () => void
  onNextColumn: () => void
  onAddTask: () => void
  onToggleMenu: (taskId: string) => void
  onToggleDescription: (taskId: string) => void
  onEdit: (task: Task) => void
  onDelete: (taskId: string) => void
  onMove: (task: Task, direction: MoveDirection) => void
}

function KanbanBoard({
  columns,
  tasks,
  theme,
  activeColumn,
  openMenuId,
  expandedDescIds,
  onDragEnd,
  onPreviousColumn,
  onNextColumn,
  onAddTask,
  onToggleMenu,
  onToggleDescription,
  onEdit,
  onDelete,
  onMove,
}: KanbanBoardProps) {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="KanbanBoardWrapper">
        <button
          className="MobileNavArrow"
          type="button"
          onClick={onPreviousColumn}
          disabled={activeColumn === 0}
        >
          <img
            src={NavigateBefore}
            alt="Coluna anterior"
            className="KanbanBoardMobileArrowIcon"
          />
        </button>

        <div className="KanbanBoard">
          {columns.map((column, columnIndex) => {
            const columnTasks = tasks
              .filter((task) => task.status === column.key)
              .sort((a, b) => a.order - b.order)

            return (
              <KanbanColumn
                key={column.key}
                column={column}
                columnIndex={columnIndex}
                activeColumn={activeColumn}
                tasks={columnTasks}
                theme={theme}
                openMenuId={openMenuId}
                expandedDescIds={expandedDescIds}
                onAddTask={onAddTask}
                onToggleMenu={onToggleMenu}
                onToggleDescription={onToggleDescription}
                onEdit={onEdit}
                onDelete={onDelete}
                onMove={onMove}
              />
            )
          })}
        </div>

        <button
          className="MobileNavArrow"
          type="button"
          onClick={onNextColumn}
          disabled={activeColumn === columns.length - 1}
        >
          <img
            src={NavigateNext}
            alt="Próxima coluna"
            className="KanbanBoardMobileArrowIcon"
          />
        </button>
      </div>

      <div className="MobileDots">
        {columns.map((column, index) => (
          <div
            key={column.key}
            className={`MobileDot ${activeColumn === index ? 'DotActive' : ''}`}
          />
        ))}
      </div>
    </DragDropContext>
  )
}

export default KanbanBoard