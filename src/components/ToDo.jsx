import React, { useEffect, useState, useRef } from 'react'
import './ToDo.css'
import { Button } from 'react-bootstrap';
import { deleteTodo, getAllToDo, updateToDo, uploadToDo } from '../services/allAPI';
import { IoMdDoneAll } from 'react-icons/io'
import { FiEdit } from 'react-icons/fi'
import { MdDelete } from 'react-icons/md'

function ToDo() {

  const [todo, setTodo] = useState('')
  const [allTodos, setAllTodos] = useState([])
  const [editID,setEditID] = useState(0)
  // console.log(todo);

  // CREAT

  const addTodo = async () => {
    if (todo?.length > 0) {
      if (editID) {
        // Edit the existing todo
        const updatedTodo = {
          id: editID,
          text: todo,
          completed: false
        };

        // Make API call to updateToDo
        await updateToDo(editID, updatedTodo);
        setEditID(0);

      } else {
        // Create a new todo
        const response = await uploadToDo({
          id: Date.now(),
          text: todo,
          completed: false
        });
        // console.log(response);
      }

      setTodo('');
    }
    else {
      alert("Please Enter Your Task!!!")
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  //READ

  const getAllTodos = async () => {
    // Make API call getAllToDo
    const { data } = await getAllToDo()
    // console.log(data);
    setAllTodos(data)
  }

  //UPDATE

  const handleEdit = (id) => {
    const todoToEdit = allTodos.find(todo => todo.id === id)
    setTodo(todoToEdit.text)
    setEditID(todoToEdit.id)

  }

  const handleComplete = async (id) => {
    const todoToUpdate = allTodos.find(todo => todo.id === id)
    if(todoToUpdate){
      todoToUpdate.completed = !todoToUpdate.completed

      // Make API call updateToDo
      await updateToDo(id, todoToUpdate)
      setAllTodos([...allTodos]);
    }
  }


  //DELETE

  const handleDelete = async (id) => {
    // Make API call deleteTodo
    await deleteTodo(id)
    getAllTodos()
  }

  // for input field focus
  const inputRef = useRef('null')

  useEffect(() => {
    inputRef.current.focus();
    getAllTodos()
  })

  return (
    <>
      <div className='container d-flex justify-content-between align-items-center'>
        <div className='col-sm-0 col-md-1 col-lg-3'></div>
        <div className='todo-container col-sm-12 col-md-10 col-lg-6'>
          <h2 className='text-center text-white'>TODO APP</h2>
          <form className='form-group d-flex' onSubmit={handleSubmit}>
            <input type="text" placeholder='Enter Your ToDo' value={todo} className='form-control fw-bold' onChange={(e) => setTodo(e.target.value)} ref={inputRef} />
            <Button variant="danger p-2" onClick={addTodo}> {editID ? 'EDIT' : 'ADD'} </Button>
          </form>
          <div className='mt-4'>
            <ul>
              {
                allTodos?.length > 0 ?
                  allTodos.map((todo,index) => (
                    <li key={index} id={todo.completed ? 'list-item' : ''} className='form-control bg-black text-white border-0 py-2 d-flex justify-content-between align-items-center'><span className='todo-text'>{todo.text}</span>
                      <span className="d-flex justify-content-around">
                        <IoMdDoneAll role='button' className='ms-2 text-success' title='Complete' onClick={()=>handleComplete(todo.id)} />
                        <FiEdit role='button' className='ms-2 text-info' title='Edit' onClick={()=>handleEdit(todo.id)} />
                        <MdDelete role='button' className='ms-2 text-warning' title='Delete' onClick={()=>handleDelete(todo.id)} />
                      </span>
                    </li>
                  )) : <p className='fs-5 text-info text-center'>No tasks</p>
              }
            </ul>
          </div>
        </div>
        <div className='col-sm-0 col-md-1 col-lg-3'></div>
      </div>
    </>
  )
}

export default ToDo;
