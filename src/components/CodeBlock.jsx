import React, { useEffect } from "react";
import hljs from "highlight.js";

import './CodeBlock.css'
import "highlight.js/styles/monokai.css";
import ReactHighlight from "react-highlight";



export const CodeBlock = (props) => {
    const {language, code} = props
    useEffect(()=>{
        hljs.highlightAll()
    }, [props.code])
    return(
        <ReactHighlight className={language}>{code}</ReactHighlight>
    )
}