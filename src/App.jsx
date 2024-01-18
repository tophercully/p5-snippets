import { useState } from 'react'
import './App.css'
import { Selections } from './components/Selections'
import { Display } from './components/Display'
import { Nav } from './components/Nav'

import { Analytics } from '@vercel/analytics/react';

function App() {
  const [selection, setSelection] = useState(0)
  const [page, setPage] = useState(0)


  return (
    <>
    <div className='app-container'>
      
      <Nav page={page} setPage={setPage} setSelection={setSelection}/>
      <div className='main-body'>
        <Selections selection={selection} setSelection={setSelection} page={page}/>
        <br></br>
        <Display selection={selection} page={page}/>
      </div>
      
    </div>
    <Analytics />
    </>
  )
}

export default App
