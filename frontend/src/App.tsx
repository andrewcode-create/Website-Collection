import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <iframe src="https://example.com/" width={window.innerWidth - 500} height={window.innerHeight-100}></iframe>
      </div>
    </>
  )
}

export default App
