import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <h1>Galactic Discussions</h1>
      <h2>A Star Wars Forum</h2>
    </div>
  )
}

export default App