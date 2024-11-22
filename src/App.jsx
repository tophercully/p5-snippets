import { useState } from 'react'
import './App.css'
import { Selections } from './components/Selections'
import { Display } from './components/Display'
import { Nav } from './components/Nav'

import { Analytics } from '@vercel/analytics/react';
import { Footer } from './components/Footer'

function App() {
  const [selection, setSelection] = useState(0)
  const [page, setPage] = useState(0)


  return (
    <>
    <div className='app-container'>
      <h1 className='title'>SNIPPETS FOR ART</h1>
      <div className='news-div'>

      <span className='news' >Update! Snippets for Art has been expanded to{' '}<a href='https://snippp.io'>Snippp.io</a></span>
      <span >Create your own toolkits, find snippets and toolkits from a variety of creative coders and other developers!</span>
      </div>
      <Nav page={page} setPage={setPage} setSelection={setSelection}/>
      <div className='main-body'>
        <Selections selection={selection} setSelection={setSelection} page={page}/>
        <br></br>
        <Display selection={selection} page={page}/>
      </div>
      <Footer/>
    </div>
    <Analytics />
    </>
  )
}

export default App
