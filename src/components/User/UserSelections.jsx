import React, { useEffect, useState } from "react";
import '../Selections.css'
import { dynamicSort } from "../../Utility/Tools";


export const UserSelections = (props) => {
    const snippets = props.snippets
    const {selection, setSelection, page} = props
    const [scrollPos, setScrollPos] = useState(0)
    const [filter, setFilter] = useState('')
    

    let array = snippets
    console.log('array', array)

    if(array && array.name) {
        array.sort(dynamicSort('name'))
    }

    function handleClick(e, index) {
        setScrollPos(document.getElementById('selections').scrollTop)
        setSelection(array[index])
    }

    function debounce(callback, delay) {
        let timer
        return function() {
          clearTimeout(timer)
          timer = setTimeout(() => {
            callback();
          }, delay)
        }
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
        // console.log('set scrollbar back')
    }, [selection])


    function handleChange(e) {
        setFilter(e.target.value)
    }

    
    

    function AllNames() {
        if(array) {

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
        } else {
            return(
                <div className="selections" id="selections">
                    <div className="selection-button">
                        <h4 className="selection-name">Nothing here yet</h4>
                    </div>
                </div>
            )
        }
    }


    return(
        <div className="selection-box">
            <input type="text" className="searchbar" onChange={handleChange} placeholder={'search'}></input>
            <AllNames />
        </div>
    )
}