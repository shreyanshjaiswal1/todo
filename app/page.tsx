'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { CalendarStrip } from '@/components/calendar-strip'
import { TodoItem } from '@/components/todo-item'
import { useTodoStore } from '@/store/todo-store'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from "@/components/ui/badge"

export default function TodoPage() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [newTask, setNewTask] = useState('')
  const { todos, addTodo, toggleTodo, editTodo, deleteTodo } = useTodoStore()

  const todaysTodos = todos.filter(
    (todo) => todo.date === format(selectedDate, 'yyyy-MM-dd')
  )

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault()
    if (newTask.trim()) {
      addTodo({
        title: newTask,
        completed: false,
        date: format(selectedDate, 'yyyy-MM-dd'),
      })
      setNewTask('')
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container max-w-md mx-auto py-6">
        <CalendarStrip
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
        />
        <form onSubmit={handleAddTodo} className="flex space-x-2 mt-6 px-4">
          <Input
            type="text"
            placeholder="Add a new task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="flex-1"
          />
          <Button type="submit">Add Task</Button>
        </form>
        <div className="flex justify-between items-center mt-6 px-4">
          <h2 className="text-xl font-semibold">Tasks for {format(selectedDate, 'MMMM d, yyyy')}</h2>
          <Badge variant="outline">
            {todaysTodos.filter(todo => todo.completed).length}/{todaysTodos.length} Complete
          </Badge>
        </div>
        <div className="space-y-2 mt-6 px-4">
          {todaysTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={() => toggleTodo(todo.id)}
              onEdit={(updates) => editTodo(todo.id, updates)}
              onDelete={() => deleteTodo(todo.id)}
            />
          ))}
          {todaysTodos.length === 0 && (
            <p className="text-center text-muted-foreground py-6">
              No tasks for this day
            </p>
          )}
        </div>
      </div>
    </main>
  )
}

