import React, {useEffect} from "react";
import '../Nav.css'

export const UserNav = (props) => {
    const {page, setPage, pageIndex, setSelection, snippets} = props 

    useEffect(() => {
        var pages = document.getElementsByClassName('nav-button')
        for(let i = 0; i < pages.length; i++) {
            if(i == pageIndex) {
                pages[i].style.backgroundColor = 'var(--text)'
                pages[i].style.color = 'var(--bg)'
                pages[i].style.flex = '1.2'
            } else {
                pages[i].style.backgroundColor = 'var(--bg)'
                pages[i].style.color = 'var(--text)'
                pages[i].style.flex = '1'
            }
        }
    }, [page])

    function handleClick(buttonPage) {
        setPage(buttonPage)
        // setSelection(snippets[0])
    }

    return(
        <div className="navBar">
            <button className="nav-button" onClick={()=>handleClick({name:'userCreated', index:0})} key='0'>My Snippets</button>
            <button className="nav-button" onClick={()=>handleClick({name:'favorites', index:1})} key='1'>Favorites</button>
        </div>
    )
}