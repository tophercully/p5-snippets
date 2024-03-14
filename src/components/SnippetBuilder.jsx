import './SnippetBuilder.css'
import React, { useState } from 'react'
import { newSnippet } from '../../backend/newSnippet'
import { useLocalStorage } from '@uidotdev/usehooks'
import Editor from '@monaco-editor/react';


export const SnippetBuilder = (props) => {
    const [ user, setUser ] = useLocalStorage('user', localStorage.getItem('user') ? localStorage.getItem('user') : null);
    const [ profile, setProfile ] = useLocalStorage('profile', localStorage.getItem('profile') ? localStorage.getItem('profile') : null);
    const [loggedIn, setLoggedIn] = useLocalStorage('loggedIn', localStorage.getItem('loggedIn') ? localStorage.getItem('loggedIn') : false)
    const [ code, setCode ] = useState()
    const [snippet, setSnippet] = useState({
        name:'',
        code:'',
        tags:'',
        author:'',
    })

    const handleChange = (e) => {
        const {name, value} = e.target
        const newValue = value
        setSnippet({
            ...snippet,
            [name] : newValue,
        })
    }
    function handleCodeChange(value, e) {
        setSnippet({
            ...snippet,
            code : value,
        })
      }

    function createSnippet() {
        console.log('working')
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        newSnippet({
            ...snippet,
            author:profile.name,
            id:profile.id,
        })
    }

    return(
        <div className='snippet-builder'>
            <form className='builder-form'>
                <p className='builder-form-label'>Name</p>
                <input className='builder-form-input' id='input-name' placeholder='Name' name='name' onChange={handleChange}></input>
                <p className='builder-form-label'>Code</p>
                <Editor
                    height="100%"
                    width='100%'
                    options={{
                        scrollBeyondLastLine:true,
                        fontSize:"20px"
                    }}
                    theme='vs-dark'
                    defaultLanguage="javascript"
                    defaultValue="//<3"
                    onChange={handleCodeChange}
                />
                <p className='builder-form-label'>Tags</p>
                <input className='builder-form-input' id='input-tags' placeholder='Tags' name='tags' onChange={handleChange}></input>
                <button className='builder-button' onClick={handleSubmit}>Save</button>
            </form>
        </div>
    )
}