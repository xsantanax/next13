import React from "react"
import { Todo } from "../../../typings"

type PageProps = {
  params: {
    todoId: string
  }
}

const fetchTodo = async (todoId: string) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${todoId}`,
    { next: { revalidate: 60 } }
  )
  const todo = await response.json()
  return todo
}

async function TodoPage({ params: { todoId } }: PageProps) {
  const todo: Todo = await fetchTodo(todoId)
  //   return <div>TodoPage: {todoId}</div>
  return (
    <div className="p-10 bg-yellow-200 border-2 m-2 shadow-lg">
      <p>
        #{todo.id}:{todo.title}
      </p>
      <p>Completed: {todo.completed ? "Yes" : "No"}</p>
      <p className="border-t border-black mt-5 text-right">
        By User: {todo.userId}
      </p>
    </div>
  )
}

export default TodoPage

export async function generateStaticParams() {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos")
  const todos: Todo[] = await response.json()

  //for this demo
  const trimmedTodos = todos.splice(0, 10)

  // I want it like this: [{todoId: '1'}, {todoId: '2'}, {todoId: '3'}, ...]
  return trimmedTodos.map((todo) => ({
    // return todos.map((todo) => ({
    todoId: todo.id.toString()
  }))
}
