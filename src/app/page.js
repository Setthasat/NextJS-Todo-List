"use client"; // idk 01

import { addTodo, updateTodo, deleteTodo } from "../app/actions/todoActions";
import { useState } from "react";

export default function Home() {

  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (!input) {
      return;
    }
    const formData = new FormData(); // create object
    formData.append("description", input); // add input to description in formData

    const newTodo = {
      id: todos.length,
      description: input,
      completed: false
    };

    setTodos((prev) => [...prev, newTodo]); //add todo to list
    await addTodo(formData); // create form
    setInput(""); // Clear the input field
  };

  const handleDeleteTodo = async (id) => {
    const formData = new FormData(); // create object
    formData.append("id", id); // add id to id in formData
    await deleteTodo(formData); // call delete todo function
    setTodos((prev) => prev.filter(todo => todo.id !== id)); // Update local state
  };

  const handleToggleComplete = async (id) => {
    const todo = todos.find((todo) => todo.id === id); // find form by id 
    const updatedTodo = { ...todo, completed: !todo.completed }; // change complete to opposite

    const formData = new FormData();// create object
    formData.append("id", id); // add id to id in formData
    formData.append("description", updatedTodo.description);// add input to description in formData

    await updateTodo(formData); // call update todo function
    setTodos((prev) => prev.map(todo => (todo.id === id ? updatedTodo : todo))); // find and update 
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-violet-600 to-pink-400">
      <div className="bg-white/30 p-8 rounded-lg border backdrop-blur-3xl  shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center tracking-widest text-white">TODO LIST</h1>
        <form onSubmit={handleAddTodo} className="flex mb-4">
          <input
            className="border-b border-l border-t  rounded-l focus:outline-none px-4 py-2 w-full"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a new task..."
          />
          <button className={`${input.length > 0 ? "bg-blue-500 hover:bg-blue-600" : "bg-red-600 cursor-not-allowed"} text-white px-4 py-2 rounded-r`}>
            Add
          </button>
        </form>
        <ul className="list-none p-0">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className={`flex justify-between items-center mb-2 p-2 border-b `}
            >
              <span className={`cursor-pointer text-white ${todo.completed ? "line-through text-gray-400" : ""
                }`} onClick={() => handleToggleComplete(todo.id)}>
                {todo.description}
              </span>
              <button className="text-red-500 hover:text-red-600" onClick={() => handleDeleteTodo(todo.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
