"use client"

import { useState } from "react"
import { Plus, Trash2, Edit2, Check, X } from "lucide-react"
import { Button } from "./ui/button";
import { Input } from "./ui/input"
import { Checkbox } from "./ui/checkbox"

interface Task {
  id: number
  text: string
  completed: boolean
}

export function TaskManagerComponent() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTask, setNewTask] = useState("")
  const [editingTask, setEditingTask] = useState<number | null>(null)
  const [editText, setEditText] = useState("")

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }])
      setNewTask("")
    }
  }

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const toggleComplete = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
  }

  const startEditing = (id: number, text: string) => {
    setEditingTask(id)
    setEditText(text)
  }

  const saveEdit = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: editText } : task
      )
    )
    setEditingTask(null)
  }

  const cancelEdit = () => {
    setEditingTask(null)
    setEditText("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Gestor de Tareas</h1>
        <div className="flex mb-6">
          <Input
            type="text"
            placeholder="Nueva tarea..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="flex-grow mr-2"
          />
          <Button onClick={addTask} className="bg-green-500 hover:bg-green-600">
            <Plus className="mr-2 h-4 w-4" /> Añadir
          </Button>
        </div>
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center bg-gray-50 p-4 rounded-lg shadow transition-all duration-300 hover:shadow-md"
            >
              {editingTask === task.id ? (
                <>
                  <Input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="flex-grow mr-2"
                  />
                  <Button onClick={() => saveEdit(task.id)} className="mr-2 bg-blue-500 hover:bg-blue-600">
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button onClick={cancelEdit} className="bg-gray-500 hover:bg-gray-600">
                    <X className="h-4 w-4" />
                  </Button>
                </>
              ) : (
                <>
                  <Checkbox
                    id={`task-${task.id}`}
                    checked={task.completed}
                    onCheckedChange={() => toggleComplete(task.id)}
                    className="mr-2"
                  />
                  <label
                    htmlFor={`task-${task.id}`}
                    className={`flex-grow ${
                      task.completed ? "line-through text-gray-500" : "text-gray-800"
                    }`}
                  >
                    {task.text}
                  </label>
                  <Button
                    onClick={() => startEditing(task.id, task.text)}
                    className="mr-2 bg-yellow-500 hover:bg-yellow-600"
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button onClick={() => deleteTask(task.id)} className="bg-red-500 hover:bg-red-600">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </>
              )}
            </li>
          ))}
        </ul>
        {tasks.length === 0 && (
          <p className="text-center text-gray-500 mt-4">No hay tareas. ¡Añade una para comenzar!</p>
        )}
      </div>
    </div>
  )
}