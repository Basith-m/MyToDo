import { commonAPI } from "./commonAPI"
import { serverURL } from "./serverURL"

// Upload a ToDo to json server
export const uploadToDo = async (reqBody)=>{
    // make post http request to http://localhost:4000/todos to add todo in json server and return response to ToDo component
    return await commonAPI("POST",`${serverURL}/todos`,reqBody)
}

// get all ToDo from json server
export const getAllToDo = async ()=>{
    // make get http request to http://localhost:4000/todos to get todos from json server and return response to ToDo component
    return await commonAPI("GET",`${serverURL}/todos`,"")
}

// Update a ToDo from json server
export const updateToDo = async (id,updatedData)=>{
    // make update http request to http://localhost:4000/todos to update todo from json server and return response to ToDo component
    return await commonAPI("PUT",`${serverURL}/todos/${id}`,updatedData)
}

// remove a ToDo from json server
export const deleteTodo = async (id)=>{
    // make delete http request to http://localhost:4000/todos to detlete todo from json server and return response to ToDo component
    return await commonAPI("DELETE",`${serverURL}/todos/${id}`,{})
}

