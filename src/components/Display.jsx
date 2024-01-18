import React, { useEffect } from "react";
import { p5Snippets } from "../data/P5Snippets";
import { glslSnippets } from "../data/glslSnippets";
import { colorPals } from "../data/colorPals";
import hljs from "highlight.js";
import javascript from 'highlight.js/lib/languages/javascript';
import glsl from 'highlight.js/lib/languages/glsl';
import './Display.css'
import "highlight.js/styles/monokai.css";
import ReactHighlight from "react-highlight";


export const Display = (props) => {
    const {selection, page} = props
    

    let array = p5Snippets
    let language = 'javascript'
    if(page == 0) {
        //p5.js
        array = p5Snippets
        hljs.registerLanguage('javascript', javascript);
    } else if(page == 1) {
        //glsl
        array = glslSnippets
        hljs.registerLanguage('glsl', glsl);
        language = 'glsl'
        
    } else {
        //colors
        array = colorPals
    }

    array.sort(dynamicSort('name'))

    
    
    function copyCode(e) {
        navigator.clipboard.writeText(array[selection].code);
        console.log('code copied to clipboard')
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

    

    if(array[selection]) {
        return(
            <div className="display">
                <br></br>
                <ReactHighlight className={language}>{array[selection].code}</ReactHighlight>
                <button className="copy-button" onClick={copyCode}><img className="copy-icon" src="copy.svg"></img></button>
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
