import React, {useEffect} from "react";
import './Nav.css'

export const Nav = (props) => {
    const {page, setPage, setSelection} = props 

    useEffect(() => {
        var pages = document.getElementsByClassName('nav-button')
        for(let i = 0; i < pages.length; i++) {
            if(i == page) {
                pages[i].style.backgroundColor = '#252525'
                pages[i].style.color = '#f5f5f5'
            } else {
                pages[i].style.backgroundColor = '#f5f5f5'
                pages[i].style.color = '#252525'
            }
        }
    }, [page])

    function handleClick(index) {
        setPage(index)
        setSelection(0)
    }

    return(
        <div className="navBar">
            <button className="nav-button" onClick={()=>handleClick(0)} key='0'>p5.js</button>
            <button className="nav-button" onClick={()=>handleClick(1)} key='1'>GLSL</button>
            <button className="nav-button" onClick={()=>handleClick(2)} key='2'>Color</button>
        </div>
    )
}