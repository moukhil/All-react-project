import { useState, useEffect } from 'react'
import NavBar from './components/navBar'
function App() {
  const [todo_text, setTodo_text] = useState('')
  const [todos, setTodos] = useState([])

  useEffect(() => {
    let todoStr = localStorage.getItem("todos")
    if (todoStr) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])

  const saveTodo = (todosToSave) => {
    localStorage.setItem("todos", JSON.stringify(todosToSave));
  };
  const handelText = (e) => {
    setTodo_text(e.target.value)
  }
  const handelAdd = () => {
    if (todo_text.trim() === '') {
      alert("Please enter a todo !!");
    } else {
      const newTodo = {
        id: Date.now(),
        todo_text: todo_text,
        isCompleted: false
      };

      const updatedTodos = [...todos, newTodo]
      setTodos(updatedTodos)
      saveTodo(updatedTodos)
      setTodo_text('')
    }
  }
  const handelCheck = (e) => {
    const id = parseInt(e.target.name)
    const index = todos.findIndex(item => {
      return item.id === id
    })
    let newTodo = [...todos]
    newTodo[index].isCompleted = !newTodo[index].isCompleted
    setTodos(newTodo)
    saveTodo(newTodo)

  }
  const handelEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    console.log(t[0].todo_text);

    setTodo_text(t[0].todo_text)
    const newTodo = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newTodo)
    saveTodo(newTodo)
  }
  const handelDelete = (e, id) => {
    const newTodo = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newTodo)
    saveTodo(newTodo)
  }
  return (
    <>
      <NavBar />
      <div className="container bg-violet-100 mx-auto my-5 p-5 rounded-xl">
        <div className="addTodo my-5 ">
          <h2 className="text-lg font-bold ">Add a Todo</h2>
          <input onChange={handelText} className='outline-none w-1/2 p-1' type="text" value={todo_text} />
          <button onClick={handelAdd} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md mx-6">Add</button>
        </div>
        <h2 className='text-xl font-bold'>Your Todo's </h2>
        <div className="todos">
          {todos.map((item) => {
            return <div key={item.id} className="todo w-1/2 flex justify-between items-center my-2">
              <div className="todo_text flex gap-4">
                <input type="checkbox" name={item.id} onClick={handelCheck} />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo_text}</div>
              </div>
              <div className="btn">
                <button onClick={(e) => { handelEdit(e, item.id) }} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md mx-1">Edit</button>
                <button onClick={(e) => { handelDelete(e, item.id) }} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md mx-1">Delete</button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
// Ctrl+Shift+P → "Developer: Reload Window"