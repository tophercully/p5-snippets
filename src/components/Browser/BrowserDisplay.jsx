import React, { useEffect, useState } from "react";
import '../Display.css'
import "highlight.js/styles/github-dark.css";
import { CodeBlock } from "../CodeBlock";
import { addFavorite } from "../../../backend/addFavorite";
import { deleteFavorite } from "../../../backend/deleteFavorite";


export const BrowserDisplay = (props) => {
    const {selection, favorites, setTriggerUpdateFavorites, profile} = props
    const [isFavorite, setIsFavorite] = useState(favorites.includes(selection))
    const [triggerToggleThisFavorite, setTriggerToggleThisFavorite] = useState(false)
    console.log('favorite?', isFavorite)
    console.log('selection', selection)

    let language = 'javascript'
    
    function copyCode(e) {
        navigator.clipboard.writeText(selection.code);
        console.log('code copied to clipboard')
    }    
    
    function handleFavorite() {
        console.log('handling favorite')
        if(!isFavorite) {
            setIsFavorite(true)
        } else {
            setIsFavorite(false)
        }
        setTriggerToggleThisFavorite(true)
    }
    //update database and update the global state favorites array
    useEffect(()=>{
        async function handler() {
           if(selection && selection.snippetID) {
                if(isFavorite) {
                    await addFavorite(profile.id, selection.snippetID)
                } else {
                    await deleteFavorite(profile.id, selection.snippetID)
                }
            }
        }
        if(triggerToggleThisFavorite) {
            console.log('should be triggering')
            setTriggerUpdateFavorites(true)
            setTriggerToggleThisFavorite(false)
            handler()
        }
    }, [isFavorite])

    useEffect(()=>{
        setIsFavorite(favorites.includes(selection))
    },[selection])
    

    if(selection) {
        return(
            <div className="display">
                <div className="display-info">
                    <h1 className="display-title">{selection.name}</h1>
                    <p className="display-author">{selection.author}</p>
                </div>
                <CodeBlock language={language} code={selection.code} onClick={copyCode}/>
                <div className="display-buttons">
                    <button className="edit-button"></button>
                    <button className="favorite-button" onClick={handleFavorite}>{isFavorite ? 'unfavorite' : 'favorite'}</button>
                </div>
            </div>

        )
    } else {
        return(
            <div className="display">
            <p className="error-display" style={{color:'#f5f5f5', justifySelf:'center'}}>error</p>
        </div>
        
        )
    }
}
