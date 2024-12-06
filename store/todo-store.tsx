import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Todo {
  id: string
  title: string
  completed: boolean
  date: string
}

interface TodoStore {
  todos: Todo[]
  addTodo: (todo: Omit<Todo, 'id'>) => void
  toggleTodo: (id: string) => void
  editTodo: (id: string, updates: Partial<Todo>) => void
  deleteTodo: (id: string) => void
}

export const useTodoStore = create<TodoStore>()(
  persist(
    (set) => ({
      todos: [],
      addTodo: (todo) =>
        set((state) => ({
          todos: [...state.todos, { ...todo, id: crypto.randomUUID() }],
        })),
      toggleTodo: (id) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          ),
        })),
      editTodo: (id, updates) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, ...updates } : todo
          ),
        })),
      deleteTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        })),
    }),
    {
      name: 'todo-storage',
    }
  )
)


