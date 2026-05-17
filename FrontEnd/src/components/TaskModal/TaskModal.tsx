import type { FormEvent } from 'react'
import { useTheme } from '../../contexts/ThemeContext'
import './TaskModal.css'

interface TaskModalProps {
  title: string
  titleValue: string
  descriptionValue: string
  submitLabel: string
  onTitleChange: (value: string) => void
  onDescriptionChange: (value: string) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  onClose: () => void
}

function TaskModal({
  title,
  titleValue,
  descriptionValue,
  submitLabel,
  onTitleChange,
  onDescriptionChange,
  onSubmit,
  onClose,
}: TaskModalProps) {
  const { theme } = useTheme()

  return (
    <div className="TaskModalOverlay" onClick={onClose}>
      <div
        className={`TaskModalContent ${theme}`}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="TaskModalHeader">
          <h2 className="TaskModalTitle">{title}</h2>

          <button
            className="TaskModalCloseButton"
            type="button"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <form onSubmit={onSubmit} className="TaskModalForm">
          <label>Título *</label>
          <input
            type="text"
            placeholder="Título da task"
            value={titleValue}
            onChange={(event) => onTitleChange(event.target.value)}
          />

          <label>Descrição</label>
          <textarea
            placeholder="Descrição da task (opcional)"
            value={descriptionValue}
            onChange={(event) => onDescriptionChange(event.target.value)}
            rows={4}
          />

          <button type="submit" className="TaskModalSubmitButton">
            {submitLabel}
          </button>
        </form>
      </div>
    </div>
  )
}

export default TaskModal