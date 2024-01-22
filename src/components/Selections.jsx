import React, { useEffect, useState } from "react";
import './Selections.css'
import { snippets } from "../data/Snippets";

export const Selections = (props) => {

    const {selection, setSelection, page} = props
    const [filter, setFilter] = useState('')
    let placeholder = "Try 'geometry', 'array', 'vector'"
    

    let array = snippets.js
    if(page == 0) {
        //p5.js
        array = snippets.js
    } else if(page == 1) {
        //glsl
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

    function handleClick(e, index) {
        setSelection(index)
    }

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


    useEffect(() => {
        var buttons = document.getElementsByClassName('selection-button')
        for(let i = 0; i < buttons.length; i++) {
            if(i == selection) {

                buttons[i].style.backgroundColor = '#252525'
                buttons[i].style.color = '#f5f5f5'
            }
        }
    }, [selection])

    function handleChange(e) {
        setFilter(e.target.value)

        // filteredArray = []
        // array.map((a, index) => {
        //     if(a.name.toLowerCase().includes(filter.toLowerCase()) || a.tags.includes(filter.toLowerCase())) {
        //         filteredArray.push(a)
                    
        //     }
            
        // })
    
    }

    array.sort(dynamicSort('name'))
    

    function AllNames() {
        return (
            <div className="selections">
                {array.map((a, index) => {
                    if(a.name.toLowerCase().includes(filter.toLowerCase()) || a.tags.includes(filter.toLowerCase())) {
                        return(
                            
                            <div className="selection-button" onClick={(e)=>handleClick(e, index)} key={index}>
                            <h4 className="selection-name"  key={index}>{a.name}</h4>
                            </div>
                            
                        
                        )  
                    }
                })}
            </div>
        );
    }

    function AllColors() {
        return(
            <div className="selections">
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