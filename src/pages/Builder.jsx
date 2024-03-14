import { useState } from 'react'
import './Builder.css'
import { HeaderNav } from '../components/HeaderNav'
import { SnippetBuilder } from '../components/SnippetBuilder'
import { Footer } from '../components/Footer'

export const Builder = () => {
  const [selection, setSelection] = useState(0)
  const [page, setPage] = useState(0)


  return (
    <div className='builder-container'>
      <div className='header-container'>
        <HeaderNav/>
      </div>
      <div className='main-body'>
        <SnippetBuilder/>
      </div>
      <Footer/>
    </div>
  )
}