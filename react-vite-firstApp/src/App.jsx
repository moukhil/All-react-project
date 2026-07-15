import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [post_id, setPost_id] = useState('')
  const [post_data, setpost_data] = useState(null)

  const fecth_data = async () => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${post_id}`)
    const data = await response.json()
    setpost_data(data)
  }

  useEffect(() => {
    if (post_id !== '') {
      fecth_data
    }
  }, [post_id])
  
  return (
    <div className="container">
      <div className="search">
        <h1>Search Post by ID</h1>

        <input type="text" placeholder='Search ID' onChange={(e) => { setPost_id(e.target.value) }} />
        <button onClick={fecth_data}>Submit</button>

      </div>

      <div className="card">
        {post_data ? (
          post_data.id ? (
            <div>
              <h2>{post_data.title}</h2>
              <p>{post_data.body}</p>
            </div>
          ) : (
            <p>Post not found</p>
          )
        ) : (
          <p>Enter a Post ID to search</p>
        )}
      </div>
    </div>
  )
}

export default App
