import { useState } from 'react'
import { Draggable } from '@hello-pangea/dnd'

import type { MoveDirection, Task } from '../../types/task'

import LixoDarkMode from '../../assets/delete_outline.svg'
import LixoLightMode from '../../assets/delete_outline_lightMode.svg'
import EditTask from '../../assets/editIcon.svg'

import MoreVert from '../../assets/more_vert.svg'
import MoreVertBranco from '../../assets/more_vert_branco.svg'
import MoreVertAzul from '../../assets/more_vert_azul.svg'

import NavigateBefore from '../../assets/navigate_before.svg'
import NavigateNextBranco from '../../assets/navigate_next_branco.svg'
import NavigateNextCinza from '../../assets/navigate_next_cinza.svg'
import NavigateBeforeBranco from '../../assets/navigate_before_24dp_FAFAFA.svg'

import ReplayBranco from '../../assets/replay_branco.svg'
import ReplayCinza from '../../assets/replay_cinza.svg'

import './TaskCard.css'

interface TaskCardProps {
  task: Task
  index: number
  theme: 'light' | 'dark'
  isMenuOpen: boolean
  isDescriptionOpen: boolean
  onToggleMenu: (taskId: string) => void
  onToggleDescription: (taskId: string) => void
  onEdit: (task: Task) => void
  onDelete: (taskId: string) => void
  onMove: (task: Task, direction: MoveDirection) => void
}

function TaskCard({
  task,
  index,
  theme,
  isMenuOpen,
  isDescriptionOpen,
  onToggleMenu,
  onToggleDescription,
  onEdit,
  onDelete,
  onMove,
}: TaskCardProps) {
  const [isMenuHovered, setIsMenuHovered] = useState(false)

  const deleteIcon = theme === 'dark' ? LixoLightMode : LixoDarkMode

  const menuIcon =
    isMenuOpen || isMenuHovered
      ? MoreVertAzul
      : theme === 'dark'
        ? MoreVertBranco
        : MoreVert

  const nextIcon = theme === 'dark' ? NavigateNextCinza : NavigateNextBranco
  const replayIcon = theme === 'dark' ? ReplayCinza : ReplayBranco

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          className={`TaskCardRoot ${theme}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div className="TaskCardHeader" {...provided.dragHandleProps}>
            <strong
              className={`TaskCardTitle ${
                task.status === 'done' ? 'TaskCardTitleDone' : ''
              }`}
            >
              {task.title}
            </strong>

            <div className="TaskCardMenuWrapper">
              <button
                className="TaskCardMenuButton"
                type="button"
                onClick={() => onToggleMenu(task.id)}
                onMouseEnter={() => setIsMenuHovered(true)}
                onMouseLeave={() => setIsMenuHovered(false)}
              >
                <img src={menuIcon} alt="Abrir menu da task" />
              </button>

              {isMenuOpen && (
                <div className={`TaskCardDropdownMenu ${theme}`}>
                  <button
                    className="TaskCardEditButton"
                    type="button"
                    onClick={() => onEdit(task)}
                  >
                    <img src={EditTask} alt="" />
                    Editar
                  </button>

                  <button
                    className="TaskCardDeleteButton"
                    type="button"
                    onClick={() => onDelete(task.id)}
                  >
                    <img src={deleteIcon} alt="" />
                    Excluir
                  </button>
                </div>
              )}
            </div>
          </div>

          {task.description && (
            <button
              className="TaskCardDescriptionButton"
              type="button"
              onClick={() => onToggleDescription(task.id)}
            >
              {isDescriptionOpen ? 'Esconder descrição ▲' : 'Ler descrição ▼'}
            </button>
          )}

          {isDescriptionOpen && task.description && (
            <p className="TaskCardDescription">{task.description}</p>
          )}

          <div className="TaskCardActions">
            {task.status !== 'todo' && (
              <button
                className="TaskCardMoveButton TaskCardMoveButtonBack"
                type="button"
                onClick={() => onMove(task, 'backward')}
              >
                <img
                  src={NavigateBefore}
                  alt="Voltar task"
                  className="TaskCardMoveIcon TaskCardMoveIconBack TaskCardMoveIconBackDefault"
                />

                <img
                  src={NavigateBeforeBranco}
                  alt=""
                  className="TaskCardMoveIcon TaskCardMoveIconBack TaskCardMoveIconBackBranco TaskCardMoveIconBackHover"
                />
              </button>
            )}

            {task.status !== 'done' && (
              <button
                className="TaskCardMoveButton TaskCardMoveButtonForward"
                type="button"
                onClick={() => onMove(task, 'forward')}
              >
                <img
                  src={nextIcon}
                  alt="Avançar task"
                  className="TaskCardMoveIcon TaskCardMoveIconNext"
                />
              </button>
            )}

            {task.status === 'done' && (
              <button
                className="TaskCardMoveButton TaskCardMoveButtonForward"
                type="button"
                onClick={() => onMove(task, 'reset')}
              >
                <img
                    src={replayIcon}
                    alt="Reiniciar task"
                    className="TaskCardMoveIcon TaskCardMoveIconReplay"
                  />
              </button>
            )}
          </div>
        </div>
      )}
    </Draggable>
  )
}

export default TaskCard