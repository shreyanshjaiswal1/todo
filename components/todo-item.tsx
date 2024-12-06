'use client'

import { useState } from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Pencil, Trash2, X, Check } from 'lucide-react'
import type { Todo } from '@/store/todo-store'

interface TodoItemProps {
  todo: Todo
  onToggle: () => void
  onEdit: (updates: Partial<Todo>) => void
  onDelete: () => void
}

export function TodoItem({ todo, onToggle, onEdit, onDelete }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedTitle, setEditedTitle] = useState(todo.title)

  const handleSave = () => {
    onEdit({ title: editedTitle })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedTitle(todo.title)
    setIsEditing(false)
  }

  return (
    <div className="flex items-center space-x-2 p-2">
      <div className="flex items-center space-x-2 flex-1">
        <Checkbox
          checked={todo.completed}
          onCheckedChange={onToggle}
          id={`todo-${todo.id}`}
        />
        {isEditing ? (
          <Input
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="flex-1"
          />
        ) : (
          <label
            htmlFor={`todo-${todo.id}`}
            className={`flex-1 ${todo.completed ? 'line-through text-muted-foreground' : ''}`}
          >
            {todo.title}
          </label>
        )}
      </div>
      {isEditing ? (
        <>
          <Button size="sm" onClick={handleSave}>
            <Check className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="outline" onClick={handleCancel}>
            <X className="h-4 w-4" />
          </Button>
        </>
      ) : (
        <>
          <Button size="sm" variant="ghost" onClick={() => setIsEditing(true)}>
            <Pencil className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="ghost" onClick={onDelete}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </>
      )}
    </div>
  )
}

