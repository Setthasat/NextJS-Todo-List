"use server"; // idk 02
import { revalidatePath } from "next/cache";

let todos = []; //database

export async function addTodo(formData) {
    const description = formData.get("description"); //get description from form
    //validate data
    if (!description) {
        console.log("Description is required");
    }
    // ปั่น data
    const newTodo = {
        id: Date.now().toString(),
        description,
        completed: false,
    };
    // add data to database
    todos.push(newTodo);
    console.log("Todo created:", newTodo);
    revalidatePath("/"); //reload index
}

export async function updateTodo(formData) {
    const id = formData.get("id"); // get id  from form
    const description = formData.get("description");//get description from form
    //validate data
    if (!id || !description) {
        console.log("ID and description are required");
    }
    // loop every index in todos to find a match id 
    todos = todos.map(todo => todo.id === id ? { ...todo, description } : todo);
    console.log("Todo updated:", id);

    revalidatePath("/");  //reload index
}

export async function deleteTodo(formData) {
    const id = formData.get("id"); //get id from form
    //validate data
    if (!id) {
        console.log("ID is required");
    }
    //delete  data from database ( filter every index except that deleted form )
    todos = todos.filter(todo => todo.id !== id);
    console.log("Todo deleted:", id);

    revalidatePath("/"); //reload index
}
