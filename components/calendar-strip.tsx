'use client'

import { format, startOfWeek, addDays } from 'date-fns'
import { cn } from '@/lib/utils'
import { useTodoStore } from '@/store/todo-store'

interface CalendarStripProps {
  selectedDate: Date
  onSelectDate: (date: Date) => void
}

export function CalendarStrip({ selectedDate, onSelectDate }: CalendarStripProps) {
  const startDate = startOfWeek(selectedDate)
  const weekDays = Array.from({ length: 7 }).map((_, i) => addDays(startDate, i))
  const todos = useTodoStore((state) => state.todos)

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <div className="flex justify-between items-center space-x-2">
        {weekDays.map((date) => {
          const isSelected = format(date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
          const hasTasks = todos.some(todo => todo.date === format(date, 'yyyy-MM-dd'))
          return (
            <button
              key={date.toISOString()}
              onClick={() => onSelectDate(date)}
              className={cn(
                "flex-1 flex flex-col items-center p-2 rounded-lg transition-colors relative",
                isSelected
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              )}
            >
              <span className="text-sm font-medium">
                {format(date, 'EEE')[0]}
              </span>
              <span className="text-lg">
                {format(date, 'd')}
              </span>
              {hasTasks && (
                <span className="absolute bottom-1 w-1 h-1 bg-blue-500 rounded-full" />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

