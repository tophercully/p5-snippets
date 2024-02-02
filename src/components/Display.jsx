import React, { useEffect, useState } from "react";
import './Display.css'
import "highlight.js/styles/github-dark.css";
import { CodeBlock } from "./CodeBlock";
import { snippets } from "../data/Snippets";

export const Display = (props) => {
    const {selection, page} = props
    // const [mousePos, setMousePos] = useState({
    //     x: 0,
    //     y:0,
    // })

    let array = snippets.p5
    let language = 'javascript'
    if(page == 0) {
        //p5.js
        array = snippets.js
    } else if(page == 1) {
        //glsl
        array = snippets.p5
    } else if(page == 2) {
        //colors
        array = snippets.glsl
        language = 'glsl'
    } else {
        //colors
        array = snippets.palettes
    }

    array.sort(dynamicSort('name'))

    
    
    function copyCode(e) {
        if(page == 3) {
            navigator.clipboard.writeText(JSON.stringify(array[selection].code));
            console.log('code copied to clipboard')
        } else {
            navigator.clipboard.writeText(array[selection].code);
            console.log('code copied to clipboard')
        }
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
    
    function Palette() {
        return(
            <img src="array[selection].img" className="example-image"></img>
        )
    }

    const moveCursor = (e) => {
        const mouseY = e.clientY;
        const mouseX = e.clientX;
        
        // debounce(()=>{console.log(mouseX, mouseY)}, 10)
        console.log(mouseX, mouseY)
        

        setMousePos({
            x: mouseX,
            y: mouseY,
        })
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
    
    
    

    if(array[selection] && page != 3) {
        return(
            <div className="display" onClick={copyCode}>
                {/* <h3 className="mouse-message" id="mouse-message" src="click.png">CLICK TO COPY :)</h3> */}
                <br></br>
                <CodeBlock language={language} code={array[selection].code}/>
                <div className="copy-button" onClick={copyCode}><img className="copy-icon" src="/copy.svg"></img></div>
            </div>

        )
    } else if(array[selection] && page == 3) {
        return(
            <>
            <div className="display" key={page} onClick={copyCode} style={{
                flexDirection:'column'
            }}>
                {/* <div className="mouse-message" id="mouse-message" src="click.png"></div> */}
                <div 
                    className="copy-button-B" 
                    onClick={copyCode}>
                    <img 
                    className="copy-icon" 
                    src="/copy.svg" 
                    style={{
                        alignSelf:'flex-end'
                    }}></img>
                </div>
                {array[selection].code.map((a)=> {
                    return <p className="javascript" style={{backgroundColor:a}}>{a}</p>
                })}
                <br></br>
            </div>
            </>
        )
    } else {
        return(
            <div className="display">
            <p className="error-display" style={{color:'#f5f5f5', justifySelf:'center'}}>error</p>
        </div>
        
        )
    }
}
