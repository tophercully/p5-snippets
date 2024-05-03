import { useEffect, useState } from 'react'
import './UserHome.css'
import { useLocalStorage } from '@uidotdev/usehooks'
import { loadAllSnippets } from '../../backend/loadAllSnippets'
import { loadFavorites } from '../../backend/loadFavorites'
import { loadFavoriteSnippets } from '../../backend/loadFavoriteSnippets'

import { HeaderNav } from '../components/HeaderNav'
import { UserSelections } from '../components/UserSelections'
import { UserDisplay } from '../components/UserDisplay'
import { UserNav } from '../components/UserNav'
import { Footer } from '../components/Footer'

export const UserHome = () => {
  const [ profile, setProfile ] = useLocalStorage('profile', localStorage.getItem('profile') ? localStorage.getItem('profile') : null);
  const [ favorites, setFavorites ] = useLocalStorage('favorites', localStorage.getItem('favorites') ? localStorage.getItem('favorites') : []);
  
  const [selection, setSelection] = useState(null)
  const [page, setPage] = useState({name:'userCreated', index:1})
  const [allSnippets, setAllSnippets] = useState()
  const [snippets, setSnippets] = useState([])
  const [triggerUpdateFavorites, setTriggerUpdateFavorites] = useState(false)

  console.log('favorites', favorites)
  //update favorites list when triggered or on page change
  useEffect(()=>{
    async function updateFavorites() {
        console.log('updating favorites')
        
        const response = await loadFavorites(profile.id)
        console.log(response)
        setFavorites(response)
    }
    if(triggerUpdateFavorites || page.name == 'favorites') {
        updateFavorites()
    }
  }, [page, triggerUpdateFavorites])
  
  
  //sets the snippet library content based on page state
  useEffect(()=>{
    async function getSnippets() {
        if(page.name == 'userCreated') {
            const response = await loadAllSnippets()
            setSnippets(response)
        } else if(page.name == 'favorites') {
            const response = await loadFavorites(profile.id)
            console.log(response)

            setSnippets(response)
        }
    }
    getSnippets()
  },[page])

  return (
    <div className='user-home-container'>
        <HeaderNav/>
        <UserNav page={page} setPage={setPage} setSelection={setSelection}/>
        <div className='main-body'>
            <UserSelections selection={selection} setSelection={setSelection} page={page} snippets={snippets} favorites={favorites}/>
            <UserDisplay selection={selection} favorites={favorites} page={page} setTriggerUpdateFavorites={setTriggerUpdateFavorites} profile={profile}/>
        </div>
        <Footer/>
    </div>
  )
}