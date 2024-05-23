import React, { useEffect, useState } from "react";
import './Selections.css'
// import { snippets } from "../data/Snippets";

function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        /* next line works with strings and numbers, 
         * and you may want to customize it to your needs
         */
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

export const Selections = (props) => {
    const snippets = props.snippets
    const {selection, setSelection, page} = props
    const [scrollPos, setScrollPos] = useState(0)
    const [filter, setFilter] = useState('')

    var thisBox = document.getElementById('selections')
    let placeholder = "Try 'geometry', 'array', 'vector'"

        let array = snippets
        if(page == 0) {
            //vanilla js
            array = snippets.js
        } else if(page == 1) {
            //p5.js
            array = snippets.p5
            placeholder = "Try 'polar', 'grid', 'flower'"
        } else if(page == 2) {
            //glsl
            array = snippets.glsl
            placeholder = "Try 'fBm', 'color', 'contrast'"
        } else {
            //colors
            array = snippets.palettes
            placeholder = "Try 'warm', 'purple', 'monochrome'"
        }
        array.sort(dynamicSort('name'))
    
    

    function handleClick(e, index) {
        setScrollPos(document.getElementById('selections').scrollTop)
        setSelection(index)
    }

    useEffect(() => {
        //highlight selection
        var buttons = document.getElementsByClassName('selection-button')
        for(let i = 0; i < buttons.length; i++) {
            if(i == selection) {
                buttons[i].style.backgroundColor = 'var(--text)'
                buttons[i].style.color = 'var(--bg)'
            }
        }

        
        
    }, [selection])
    

    useEffect(()=>{
        //return to last scrollbar position
        document.getElementById('selections').addEventListener("scrollend", (event) => {
            debounce(()=>{console.log('scrolling stopped')
            setScrollPos(document.getElementById('selections').scrollTop)}, 100)
        }, {once : true});
    }, [selection])
    useEffect(()=>{
        document.getElementById('selections').scrollTop = scrollPos
        console.log('set scrollbar back')
    }, [selection])


    function handleChange(e) {
        setFilter(e.target.value)
    }

    function AllNames() {
        return (
            <div className="selections" id="selections">
                {array.map((a, index) => {
                    if(a.name.toLowerCase().includes(filter.toLowerCase()) || a.tags.includes(filter.toLowerCase())) {
                        return(
                            <div className="selection-button" onClick={(e)=>handleClick(e, index)} key={index}>
                                <h4 className="selection-name"  key={index}>{a.name}</h4>
                                <p className="selection-author">{a.author}</p>
                            </div>
                        )  
                    }
                })}
            </div>
        );
    }

    function AllColors() {
        return(
            <div className="selections" id="selections">
                {array.map((a, index) => {
                    if(a.name.toLowerCase().includes(filter.toLowerCase()) || a.tags.includes(filter.toLowerCase())) {
                        return(
                          
                            <div className="selection-button" onClick={(e)=>handleClick(e, index)} key={index}>
                                <h4 className="selection-name"  key={index}>{a.name}</h4>
                                
                                <div className="palette">
                                    {
                                        
                                    array[index].code.map((a, indexB)=> {
                                        const col = array[index].code[indexB]
                                        try{
                                            const wid = 100/array[index].code.length
                                            return <div className="pal-block" key={indexB} style={{backgroundColor: col, width:'2vw'}}></div>
                                        } finally {
                                            // const blocks = document.
                                        }
                                    })}
                                    <br></br>
                                </div>
                            </div>
                        )  
                    }
                })}
            </div>
        )
    }

    function All() {
        if(page==3) {
            return <AllColors/>
        } else {
            return <AllNames/>
        }
    }

    return(
        <div className="selection-box">
            <input type="text" className="searchbar" onChange={handleChange} placeholder={placeholder}></input>
            <All />
        </div>
    )
}